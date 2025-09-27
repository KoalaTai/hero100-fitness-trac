import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { UserSettings } from '../App'

interface OnboardingViewProps {
  onComplete: (settings: UserSettings) => void
}

export function OnboardingView({ onComplete }: OnboardingViewProps) {
  const [level, setLevel] = useState(50)
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric')
  const [reminderTime, setReminderTime] = useState('')
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false)

  const handleSubmit = () => {
    if (!agreedToDisclaimer) return
    
    onComplete({
      level,
      units,
      reminderTime: reminderTime || undefined,
      onboarded: true
    })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary mb-2">Hero100</CardTitle>
          <p className="text-muted-foreground">Welcome to your daily fitness companion</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="level">Fitness Level ({level}%)</Label>
            <div className="space-y-2">
              <Input
                id="level"
                type="range"
                min="10"
                max="100"
                step="10"
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                className="w-full"
                aria-label={`Fitness level ${level} percent`}
              />
              <div className="text-sm text-muted-foreground text-center">
                Daily targets: {Math.round(level)} push-ups, {Math.round(level)} sit-ups, {Math.round(level)} squats, {(level/10).toFixed(1)} {units === 'metric' ? 'km' : 'mi'} run
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="units">Distance Units</Label>
            <Select value={units} onValueChange={(value: 'metric' | 'imperial') => setUnits(value)}>
              <SelectTrigger id="units">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Kilometers</SelectItem>
                <SelectItem value="imperial">Miles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminder">Daily Reminder (Optional)</Label>
            <Input
              id="reminder"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              placeholder="Set reminder time"
            />
          </div>

          <div className="space-y-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm">Health Disclaimer</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hero100 is a general wellness app. This is not medical advice. 
              Stop exercising if you feel unwell. Consult a healthcare professional 
              before starting any new fitness routine, especially if you have health conditions.
            </p>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="disclaimer" 
                checked={agreedToDisclaimer}
                onCheckedChange={(checked) => setAgreedToDisclaimer(!!checked)}
              />
              <Label htmlFor="disclaimer" className="text-sm">
                I understand and agree to the health disclaimer
              </Label>
            </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={!agreedToDisclaimer}
            className="w-full"
            size="lg"
          >
            Start My Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}