import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExerciseData, DayRecord, UserSettings } from '../App'
import { HydrationVisualizer } from './HydrationVisualizer'
import { Plus, Minus } from '@phosphor-icons/react'

interface TodayViewProps {
  settings: UserSettings
  records: DayRecord[]
  setRecords: (records: DayRecord[] | ((prev: DayRecord[]) => DayRecord[])) => void
  currentStreak: number
  setCurrentStreak: (streak: number | ((prev: number) => number)) => void
}

export function TodayView({ settings, records, setRecords, currentStreak, setCurrentStreak }: TodayViewProps) {
  const [todayData, setTodayData] = useState<ExerciseData>({
    pushups: 0,
    situps: 0,
    squats: 0,
    runDistance: 0,
    hydration: 0
  })
  
  const [showCelebration, setShowCelebration] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const todayRecord = records.find(r => r.date === today)

  useEffect(() => {
    if (todayRecord) {
      setTodayData(todayRecord.exercises)
    }
  }, [todayRecord])

  const targets = {
    pushups: Math.round(settings.level),
    situps: Math.round(settings.level),
    squats: Math.round(settings.level),
    runDistance: settings.level / 10,
    hydration: 8 // 8 glasses of water (standard daily recommendation)
  }

  const getProgress = (current: number, target: number) => {
    return Math.min(current / target, 1) * 100
  }

  const isExerciseComplete = (current: number, target: number) => {
    return current >= target
  }

  const isAllComplete = () => {
    return isExerciseComplete(todayData.pushups, targets.pushups) &&
           isExerciseComplete(todayData.situps, targets.situps) &&
           isExerciseComplete(todayData.squats, targets.squats) &&
           isExerciseComplete(todayData.runDistance, targets.runDistance) &&
           isExerciseComplete(todayData.hydration, targets.hydration)
  }

  const updateExercise = (exercise: keyof ExerciseData, delta: number) => {
    const newData = { ...todayData }
    const currentValue = newData[exercise]
    const target = targets[exercise]
    const maxAllowed = target * 1.5 // Prevent mis-taps
    
    newData[exercise] = Math.max(0, Math.min(currentValue + delta, maxAllowed))
    setTodayData(newData)
    
    // Update records
    setRecords((prev) => {
      const existing = prev.find(r => r.date === today)
      const wasComplete = existing?.completed || false
      const newCompleted = isExerciseComplete(newData.pushups, targets.pushups) &&
                         isExerciseComplete(newData.situps, targets.situps) &&
                         isExerciseComplete(newData.squats, targets.squats) &&
                         isExerciseComplete(newData.runDistance, targets.runDistance) &&
                         isExerciseComplete(newData.hydration, targets.hydration)
      
      const newRecord: DayRecord = {
        date: today,
        level: settings.level,
        exercises: newData,
        completed: newCompleted,
        streakOnThatDate: currentStreak + (newCompleted && !wasComplete ? 1 : 0)
      }
      
      const updated = existing
        ? prev.map(r => r.date === today ? newRecord : r)
        : [...prev, newRecord]
      
      return updated
    })
  }

  const completeDay = () => {
    if (!isAllComplete()) return
    
    const wasAlreadyComplete = todayRecord?.completed || false
    if (wasAlreadyComplete) return
    
    setCurrentStreak((prev) => prev + 1)
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 2000)
  }

  const formatDistance = (distance: number) => {
    if (settings.units === 'imperial') {
      const miles = distance / 1.60934
      return `${miles.toFixed(1)} mi`
    }
    return `${distance.toFixed(1)} km`
  }

  const getTargetDistance = () => {
    if (settings.units === 'imperial') {
      const miles = targets.runDistance / 1.60934
      return `${miles.toFixed(1)} mi`
    }
    return `${targets.runDistance.toFixed(1)} km`
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Today's Progress</h2>
        <p className="text-muted-foreground">Level {settings.level}% • {new Date().toLocaleDateString()}</p>
      </div>

      <div className="grid gap-4">
        {/* Push-ups */}
        <ExerciseCard
          name="Push-ups"
          icon="💪"
          current={todayData.pushups}
          target={targets.pushups}
          unit="reps"
          onAdjust={(delta) => updateExercise('pushups', delta)}
          progress={getProgress(todayData.pushups, targets.pushups)}
          complete={isExerciseComplete(todayData.pushups, targets.pushups)}
        />

        {/* Sit-ups */}
        <ExerciseCard
          name="Sit-ups"
          icon="🔥"
          current={todayData.situps}
          target={targets.situps}
          unit="reps"
          onAdjust={(delta) => updateExercise('situps', delta)}
          progress={getProgress(todayData.situps, targets.situps)}
          complete={isExerciseComplete(todayData.situps, targets.situps)}
        />

        {/* Squats */}
        <ExerciseCard
          name="Squats"
          icon="🦵"
          current={todayData.squats}
          target={targets.squats}
          unit="reps"
          onAdjust={(delta) => updateExercise('squats', delta)}
          progress={getProgress(todayData.squats, targets.squats)}
          complete={isExerciseComplete(todayData.squats, targets.squats)}
        />

        {/* Running */}
        <ExerciseCard
          name="Running"
          icon="🏃‍♂️"
          current={parseFloat(formatDistance(todayData.runDistance).split(' ')[0])}
          target={parseFloat(getTargetDistance().split(' ')[0])}
          unit={settings.units === 'metric' ? 'km' : 'mi'}
          onAdjust={(delta) => {
            const kmDelta = settings.units === 'imperial' ? delta * 1.60934 : delta
            updateExercise('runDistance', kmDelta)
          }}
          progress={getProgress(todayData.runDistance, targets.runDistance)}
          complete={isExerciseComplete(todayData.runDistance, targets.runDistance)}
          increment={settings.units === 'imperial' ? 0.5 : 1.0}
        />

        {/* Hydration */}
        <HydrationVisualizer
          current={todayData.hydration}
          target={targets.hydration}
          onAdjust={(delta) => updateExercise('hydration', delta)}
          complete={isExerciseComplete(todayData.hydration, targets.hydration)}
          exerciseData={todayData}
          exerciseTargets={targets}
        />
      </div>

      {isAllComplete() && !todayRecord?.completed && (
        <Card className={`border-accent bg-accent/10 ${showCelebration ? 'celebrate' : ''}`}>
          <CardContent className="pt-6 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="font-semibold text-lg mb-2">Day Complete!</h3>
            <p className="text-muted-foreground mb-4">Great job finishing all your exercises!</p>
            <Button onClick={completeDay} size="lg" className="w-full">
              Complete Day & Build Streak
            </Button>
          </CardContent>
        </Card>
      )}

      {todayRecord?.completed && (
        <Card className="border-accent bg-accent/10">
          <CardContent className="pt-6 text-center">
            <div className="text-4xl mb-2">✅</div>
            <h3 className="font-semibold text-lg">Day Already Complete</h3>
            <p className="text-muted-foreground">Streak preserved! Come back tomorrow.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface ExerciseCardProps {
  name: string
  icon: string
  current: number
  target: number
  unit: string
  onAdjust: (delta: number) => void
  progress: number
  complete: boolean
  increment?: number
}

function ExerciseCard({ name, icon, current, target, unit, onAdjust, progress, complete, increment = 10 }: ExerciseCardProps) {
  return (
    <Card className={`transition-colors ${complete ? 'border-accent bg-accent/5' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">{icon}</span>
            <h3 className="font-medium">{name}</h3>
            {complete && <Badge variant="secondary" className="bg-accent text-accent-foreground">✓</Badge>}
          </div>
          <div className="text-sm text-muted-foreground">
            {current.toFixed(unit === 'km' || unit === 'mi' ? 1 : 0)} / {target.toFixed(unit === 'km' || unit === 'mi' ? 1 : 0)} {unit}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${name} progress: ${current} of ${target} ${unit} complete`}
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAdjust(-increment)}
            disabled={current <= 0}
            aria-label={`Decrease ${name.toLowerCase()} by ${increment}`}
          >
            <Minus className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => onAdjust(increment)}
            size="sm"
            className="px-6"
            aria-label={`Add ${increment} ${unit} to ${name.toLowerCase()}`}
          >
            <Plus className="w-4 h-4 mr-1" />
            {increment} {unit}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onAdjust(increment)}
            aria-label={`Increase ${name.toLowerCase()} by ${increment}`}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}