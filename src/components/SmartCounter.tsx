import { useState, useEffect } from 'react'
import { useMotionDetection, ExerciseType } from '@/hooks/useMotionDetection'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Play, 
  Pause, 
  ArrowCounterClockwise, 
  DeviceMobile,
  Warning,
  CheckCircle
} from '@phosphor-icons/react'

interface SmartCounterProps {
  exerciseType: ExerciseType
  onCountUpdate: (count: number) => void
  targetReps?: number
  disabled?: boolean
}

const EXERCISE_LABELS = {
  pushup: 'Push-ups',
  situp: 'Sit-ups',
  squat: 'Squats'
}

const EXERCISE_INSTRUCTIONS = {
  pushup: 'Hold your device firmly against your chest. The counter will detect the up and down motion of push-ups.',
  situp: 'Hold your device against your chest or place it on your stomach. The counter will detect the sit-up motion.',
  squat: 'Hold your device firmly in your hands. The counter will detect the up and down motion of squats.'
}

export function SmartCounter({ 
  exerciseType, 
  onCountUpdate, 
  targetReps = 0,
  disabled = false 
}: SmartCounterProps) {
  const {
    isActive,
    repCount,
    isSupported,
    permissionStatus,
    startDetection,
    stopDetection,
    resetCount
  } = useMotionDetection(exerciseType)

  const [showInstructions, setShowInstructions] = useState(true)

  // Update parent component when count changes
  useEffect(() => {
    onCountUpdate(repCount)
  }, [repCount, onCountUpdate])

  const handleStart = async () => {
    const success = await startDetection()
    if (success) {
      setShowInstructions(false)
    }
  }

  const handleStop = () => {
    stopDetection()
    setShowInstructions(true)
  }

  const handleReset = () => {
    resetCount()
    onCountUpdate(0)
  }

  if (!isSupported) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DeviceMobile className="w-5 h-5" />
            Smart {EXERCISE_LABELS[exerciseType]} Counter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Warning className="h-4 w-4" />
            <AlertDescription>
              Motion detection is not supported on this device. Please use the manual counter instead.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (permissionStatus === 'denied') {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DeviceMobile className="w-5 h-5" />
            Smart {EXERCISE_LABELS[exerciseType]} Counter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Warning className="h-4 w-4" />
            <AlertDescription>
              Motion sensor access was denied. Please enable device motion permissions in your browser settings and reload the page.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const progress = targetReps > 0 ? (repCount / targetReps) * 100 : 0
  const isComplete = targetReps > 0 && repCount >= targetReps

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DeviceMobile className="w-5 h-5" />
            Smart {EXERCISE_LABELS[exerciseType]} Counter
          </div>
          <div className="flex items-center gap-2">
            {isActive && (
              <Badge variant="secondary" className="animate-pulse">
                Detecting
              </Badge>
            )}
            {isComplete && (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Complete
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Count Display */}
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            {repCount}
            {targetReps > 0 && (
              <span className="text-lg text-muted-foreground ml-2">
                / {targetReps}
              </span>
            )}
          </div>
          
          {/* Progress Bar */}
          {targetReps > 0 && (
            <div className="w-full bg-secondary rounded-full h-2 mb-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          )}
        </div>

        {/* Instructions */}
        {showInstructions && !isActive && (
          <Alert>
            <DeviceMobile className="h-4 w-4" />
            <AlertDescription>
              <strong>How to use:</strong> {EXERCISE_INSTRUCTIONS[exerciseType]}
            </AlertDescription>
          </Alert>
        )}

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          {!isActive ? (
            <Button 
              onClick={handleStart} 
              size="lg"
              disabled={disabled}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Counter
            </Button>
          ) : (
            <Button 
              onClick={handleStop} 
              variant="secondary"
              size="lg"
              className="flex items-center gap-2"
            >
              <Pause className="w-4 h-4" />
              Stop Counter
            </Button>
          )}
          
          {repCount > 0 && (
            <Button 
              onClick={handleReset} 
              variant="outline"
              size="lg"
              disabled={disabled}
              className="flex items-center gap-2"
            >
              <ArrowCounterClockwise className="w-4 h-4" />
              Reset
            </Button>
          )}
        </div>

        {/* Status Information */}
        {isActive && (
          <div className="text-center text-sm text-muted-foreground">
            <p>Keep your device steady and perform the exercise with controlled movements.</p>
            <p className="mt-1">The counter will automatically detect each rep.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}