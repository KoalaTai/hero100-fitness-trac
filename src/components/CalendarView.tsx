import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DayRecord, UserSettings } from '../App'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { format, subDays, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

interface CalendarViewProps {
  records: DayRecord[]
  setRecords: (records: DayRecord[] | ((prev: DayRecord[]) => DayRecord[])) => void
  settings: UserSettings
}

export function CalendarView({ records, setRecords, settings }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDayStatus = (date: string) => {
    const record = records.find(r => r.date === date)
    if (!record) return 'missed'
    
    const targets = {
      pushups: Math.round(settings.level),
      situps: Math.round(settings.level),
      squats: Math.round(settings.level),
      runDistance: settings.level / 10
    }
    
    const { exercises } = record
    const completedCount = [
      exercises.pushups >= targets.pushups,
      exercises.situps >= targets.situps,
      exercises.squats >= targets.squats,
      exercises.runDistance >= targets.runDistance
    ].filter(Boolean).length
    
    if (completedCount === 4) return 'complete'
    if (completedCount > 0) return 'partial'
    return 'missed'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-accent text-accent-foreground'
      case 'partial': return 'bg-yellow-500 text-white'
      case 'missed': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const today = new Date()
  const thirtyDaysAgo = subDays(today, 30)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Activity Calendar</h2>
        <p className="text-muted-foreground">Last 30 days of progress</p>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentMonth(subDays(currentMonth, 30))}
        >
          <CaretLeft className="w-4 h-4" />
        </Button>
        <h3 className="text-lg font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
          disabled={currentMonth >= today}
        >
          <CaretRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {monthDays.map(date => {
          const dateStr = date.toISOString().split('T')[0]
          const status = getDayStatus(dateStr)
          const isInRange = date >= thirtyDaysAgo && date <= today
          const isFuture = date > today
          
          return (
            <Button
              key={dateStr}
              variant="ghost"
              className={`
                h-12 p-1 text-xs rounded-lg
                ${getStatusColor(status)}
                ${!isInRange ? 'opacity-30' : ''}
                ${isFuture ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}
                ${selectedDate?.toISOString().split('T')[0] === dateStr ? 'ring-2 ring-primary' : ''}
              `}
              onClick={() => !isFuture && setSelectedDate(date)}
              disabled={isFuture}
              aria-label={`${format(date, 'MMMM d, yyyy')} - ${status === 'complete' ? 'Completed' : status === 'partial' ? 'Partially completed' : 'Missed'}`}
            >
              <div>
                <div className="font-medium">{format(date, 'd')}</div>
                {status === 'complete' && <div className="text-xs">✓</div>}
                {status === 'partial' && <div className="text-xs">◐</div>}
              </div>
            </Button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-accent"></div>
          <span>Complete</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-yellow-500"></div>
          <span>Partial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-muted"></div>
          <span>Missed</span>
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
              <Badge variant="outline">
                {getDayStatus(selectedDate.toISOString().split('T')[0]) === 'complete' ? '✓ Complete' : 
                 getDayStatus(selectedDate.toISOString().split('T')[0]) === 'partial' ? '◐ Partial' : '○ Missed'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DayDetails 
              date={selectedDate.toISOString().split('T')[0]}
              records={records}
              settings={settings}
              onClose={() => setSelectedDate(null)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface DayDetailsProps {
  date: string
  records: DayRecord[]
  settings: UserSettings
  onClose: () => void
}

function DayDetails({ date, records, settings, onClose }: DayDetailsProps) {
  const record = records.find(r => r.date === date)
  
  const targets = {
    pushups: Math.round(settings.level),
    situps: Math.round(settings.level),
    squats: Math.round(settings.level),
    runDistance: settings.level / 10
  }

  const exercises = record?.exercises || {
    pushups: 0,
    situps: 0,
    squats: 0,
    runDistance: 0
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
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{exercises.pushups}</div>
          <div className="text-sm text-muted-foreground">Push-ups</div>
          <div className="text-xs">Target: {targets.pushups}</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold">{exercises.situps}</div>
          <div className="text-sm text-muted-foreground">Sit-ups</div>
          <div className="text-xs">Target: {targets.situps}</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold">{exercises.squats}</div>
          <div className="text-sm text-muted-foreground">Squats</div>
          <div className="text-xs">Target: {targets.squats}</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold">{formatDistance(exercises.runDistance)}</div>
          <div className="text-sm text-muted-foreground">Running</div>
          <div className="text-xs">Target: {getTargetDistance()}</div>
        </div>
      </div>

      {record?.streakOnThatDate && (
        <div className="text-center p-2 bg-accent/10 rounded-lg">
          <div className="text-sm font-medium">Streak on this date: {record.streakOnThatDate} days</div>
        </div>
      )}

      <Button variant="outline" onClick={onClose} className="w-full">
        Close
      </Button>
    </div>
  )
}