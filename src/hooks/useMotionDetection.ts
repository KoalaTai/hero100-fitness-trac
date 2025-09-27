import { useState, useEffect, useRef, useCallback } from 'react'

export type ExerciseType = 'pushup' | 'situp' | 'squat'

interface MotionData {
  acceleration: {
    x: number
    y: number
    z: number
  }
  rotation: {
    alpha: number
    beta: number
    gamma: number
  }
  timestamp: number
}

interface ExerciseDetectionConfig {
  // Acceleration thresholds for each exercise
  accelerationThreshold: number
  // Minimum time between reps (in ms) to avoid double counting
  minRepInterval: number
  // Movement pattern validation
  movementPattern: {
    primaryAxis: 'x' | 'y' | 'z'
    direction: 'positive' | 'negative' | 'both'
    minMagnitude: number
  }
}

const EXERCISE_CONFIGS: Record<ExerciseType, ExerciseDetectionConfig> = {
  pushup: {
    accelerationThreshold: 8,
    minRepInterval: 800,
    movementPattern: {
      primaryAxis: 'z',
      direction: 'both',
      minMagnitude: 6
    }
  },
  situp: {
    accelerationThreshold: 6,
    minRepInterval: 1000,
    movementPattern: {
      primaryAxis: 'y',
      direction: 'both',
      minMagnitude: 5
    }
  },
  squat: {
    accelerationThreshold: 7,
    minRepInterval: 900,
    movementPattern: {
      primaryAxis: 'y',
      direction: 'both',
      minMagnitude: 5.5
    }
  }
}

export function useMotionDetection(exerciseType: ExerciseType) {
  const [isActive, setIsActive] = useState(false)
  const [repCount, setRepCount] = useState(0)
  const [isSupported, setIsSupported] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'pending'>('pending')
  
  const motionDataRef = useRef<MotionData[]>([])
  const lastRepTimeRef = useRef<number>(0)
  const repStateRef = useRef<'ready' | 'in_motion' | 'completed'>('ready')
  const baselineRef = useRef<{ x: number, y: number, z: number } | null>(null)

  // Check if device motion is supported
  useEffect(() => {
    const checkSupport = () => {
      const hasDeviceMotion = 'DeviceMotionEvent' in window
      const hasDeviceOrientation = 'DeviceOrientationEvent' in window
      setIsSupported(hasDeviceMotion && hasDeviceOrientation)
    }
    
    checkSupport()
  }, [])

  // Request permissions for iOS devices
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false

    try {
      // For iOS 13+ devices, request permission
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        const motionPermission = await (DeviceMotionEvent as any).requestPermission()
        const orientationPermission = await (DeviceOrientationEvent as any).requestPermission()
        
        if (motionPermission === 'granted' && orientationPermission === 'granted') {
          setPermissionStatus('granted')
          return true
        } else {
          setPermissionStatus('denied')
          return false
        }
      } else {
        // For non-iOS devices, assume permission is granted
        setPermissionStatus('granted')
        return true
      }
    } catch (error) {
      console.error('Permission request failed:', error)
      setPermissionStatus('denied')
      return false
    }
  }, [isSupported])

  // Calculate movement magnitude
  const calculateMagnitude = useCallback((x: number, y: number, z: number): number => {
    return Math.sqrt(x * x + y * y + z * z)
  }, [])

  // Detect exercise pattern
  const detectExercisePattern = useCallback((motionData: MotionData[], config: ExerciseDetectionConfig): boolean => {
    if (motionData.length < 10) return false // Need enough data points

    const recentData = motionData.slice(-10)
    const { primaryAxis, direction, minMagnitude } = config.movementPattern

    // Calculate baseline if not set
    if (!baselineRef.current && recentData.length >= 5) {
      const avgX = recentData.reduce((sum, d) => sum + d.acceleration.x, 0) / recentData.length
      const avgY = recentData.reduce((sum, d) => sum + d.acceleration.y, 0) / recentData.length
      const avgZ = recentData.reduce((sum, d) => sum + d.acceleration.z, 0) / recentData.length
      baselineRef.current = { x: avgX, y: avgY, z: avgZ }
    }

    if (!baselineRef.current) return false

    // Analyze movement pattern
    let maxDeviation = 0
    let hasSignificantMovement = false

    for (const data of recentData) {
      const deviation = {
        x: data.acceleration.x - baselineRef.current.x,
        y: data.acceleration.y - baselineRef.current.y,
        z: data.acceleration.z - baselineRef.current.z
      }

      const primaryAxisDeviation = Math.abs(deviation[primaryAxis])
      maxDeviation = Math.max(maxDeviation, primaryAxisDeviation)

      if (primaryAxisDeviation > minMagnitude) {
        hasSignificantMovement = true
      }
    }

    // Check for completion pattern (return to baseline)
    const latestData = recentData[recentData.length - 1]
    const currentDeviation = Math.abs(latestData.acceleration[primaryAxis] - baselineRef.current[primaryAxis])
    const isNearBaseline = currentDeviation < minMagnitude * 0.3

    return hasSignificantMovement && maxDeviation > minMagnitude && isNearBaseline
  }, [])

  // Handle motion events
  useEffect(() => {
    if (!isActive || permissionStatus !== 'granted') return

    const config = EXERCISE_CONFIGS[exerciseType]
    
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      if (!event.acceleration || !event.rotationRate) return

      const motionData: MotionData = {
        acceleration: {
          x: event.acceleration.x || 0,
          y: event.acceleration.y || 0,
          z: event.acceleration.z || 0
        },
        rotation: {
          alpha: event.rotationRate.alpha || 0,
          beta: event.rotationRate.beta || 0,
          gamma: event.rotationRate.gamma || 0
        },
        timestamp: Date.now()
      }

      // Store motion data (keep only last 50 points for performance)
      motionDataRef.current.push(motionData)
      if (motionDataRef.current.length > 50) {
        motionDataRef.current.shift()
      }

      // Calculate total acceleration magnitude
      const magnitude = calculateMagnitude(
        motionData.acceleration.x,
        motionData.acceleration.y,
        motionData.acceleration.z
      )

      const now = Date.now()
      const timeSinceLastRep = now - lastRepTimeRef.current

      // State machine for rep detection
      if (repStateRef.current === 'ready') {
        if (magnitude > config.accelerationThreshold) {
          repStateRef.current = 'in_motion'
        }
      } else if (repStateRef.current === 'in_motion') {
        // Check if motion pattern matches exercise and enough time has passed
        if (timeSinceLastRep > config.minRepInterval) {
          const isValidPattern = detectExercisePattern(motionDataRef.current, config)
          
          if (isValidPattern && magnitude < config.accelerationThreshold * 0.7) {
            // Rep completed
            setRepCount(prev => prev + 1)
            lastRepTimeRef.current = now
            repStateRef.current = 'ready'
            
            // Reset baseline for next rep
            baselineRef.current = null
          }
        }
        
        // Reset if motion stops without completing rep
        if (magnitude < config.accelerationThreshold * 0.5 && timeSinceLastRep > 2000) {
          repStateRef.current = 'ready'
        }
      }
    }

    window.addEventListener('devicemotion', handleDeviceMotion)
    
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion)
    }
  }, [isActive, permissionStatus, exerciseType, calculateMagnitude, detectExercisePattern])

  const startDetection = useCallback(async () => {
    if (!isSupported) {
      console.error('Device motion not supported')
      return false
    }

    const hasPermission = await requestPermissions()
    if (!hasPermission) {
      console.error('Permission denied for device motion')
      return false
    }

    // Reset state
    setRepCount(0)
    motionDataRef.current = []
    lastRepTimeRef.current = 0
    repStateRef.current = 'ready'
    baselineRef.current = null
    setIsActive(true)
    
    return true
  }, [isSupported, requestPermissions])

  const stopDetection = useCallback(() => {
    setIsActive(false)
    repStateRef.current = 'ready'
  }, [])

  const resetCount = useCallback(() => {
    setRepCount(0)
    lastRepTimeRef.current = 0
    repStateRef.current = 'ready'
    baselineRef.current = null
  }, [])

  return {
    isActive,
    repCount,
    isSupported,
    permissionStatus,
    startDetection,
    stopDetection,
    resetCount
  }
}