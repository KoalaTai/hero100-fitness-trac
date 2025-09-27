import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { UserSettings, DayRecord } from '../App'
import { Download, Upload, Trash, Info } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface SettingsViewProps {
  settings: UserSettings
  setSettings: (settings: UserSettings | ((prev: UserSettings) => UserSettings)) => void
  records: DayRecord[]
  setRecords: (records: DayRecord[] | ((prev: DayRecord[]) => DayRecord[])) => void
  setCurrentStreak: (streak: number | ((prev: number) => number)) => void
}

export function SettingsView({ 
  settings, 
  setSettings, 
  records, 
  setRecords, 
  setCurrentStreak 
}: SettingsViewProps) {
  const [showAbout, setShowAbout] = useState(false)

  const handleLevelChange = (newLevel: number) => {
    setSettings(prev => ({ ...prev, level: newLevel }))
  }

  const handleUnitsChange = (newUnits: 'metric' | 'imperial') => {
    setSettings(prev => ({ ...prev, units: newUnits }))
  }

  const handleReminderChange = (time: string) => {
    setSettings(prev => ({ ...prev, reminderTime: time || undefined }))
  }

  const exportData = () => {
    const csvHeaders = 'date,levelPercent,pushups,situps,squats,runDistanceKm,completed,streakOnThatDate\n'
    const csvData = records.map(record => 
      `${record.date},${record.level},${record.exercises.pushups},${record.exercises.situps},${record.exercises.squats},${record.exercises.runDistance},${record.completed},${record.streakOnThatDate}`
    ).join('\n')
    
    const blob = new Blob([csvHeaders + csvData], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hero100-data-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Data exported successfully!')
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string
        const lines = csv.trim().split('\n')
        const headers = lines[0].split(',')
        
        if (!headers.includes('date') || !headers.includes('pushups') || !headers.includes('situps') || !headers.includes('squats') || !headers.includes('runDistanceKm')) {
          toast.error('Invalid CSV format. Please check the file.')
          return
        }

        const importedRecords: DayRecord[] = []
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',')
          const record: DayRecord = {
            date: values[0],
            level: Number(values[1]) || settings.level,
            exercises: {
              pushups: Number(values[2]) || 0,
              situps: Number(values[3]) || 0,
              squats: Number(values[4]) || 0,
              runDistance: Number(values[5]) || 0
            },
            completed: values[6] === 'true',
            streakOnThatDate: Number(values[7]) || 0
          }
          importedRecords.push(record)
        }

        // Merge with existing records, keeping newer data
        setRecords(prev => {
          const merged = [...prev]
          importedRecords.forEach(imported => {
            const existingIndex = merged.findIndex(r => r.date === imported.date)
            if (existingIndex >= 0) {
              merged[existingIndex] = imported
            } else {
              merged.push(imported)
            }
          })
          return merged.sort((a, b) => a.date.localeCompare(b.date))
        })

        toast.success(`Imported ${importedRecords.length} records successfully!`)
      } catch (error) {
        toast.error('Failed to import data. Please check the file format.')
      }
    }
    
    reader.readAsText(file)
    event.target.value = ''
  }

  const resetAllData = () => {
    if (confirm('Are you sure you want to delete all your fitness data? This cannot be undone.')) {
      setRecords([])
      setCurrentStreak(0)
      toast.success('All data has been reset.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Settings & Data</h2>
        <p className="text-muted-foreground">Customize your experience and manage your data</p>
      </div>

      {/* Level Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Fitness Level</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="level-slider">Current Level: {settings.level}%</Label>
            <Input
              id="level-slider"
              type="range"
              min="10"
              max="100"
              step="10"
              value={settings.level}
              onChange={(e) => handleLevelChange(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground">
              Daily targets: {Math.round(settings.level)} push-ups, {Math.round(settings.level)} sit-ups, {Math.round(settings.level)} squats, {(settings.level/10).toFixed(1)} {settings.units === 'metric' ? 'km' : 'mi'} run
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Units & Reminder */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="units-select">Distance Units</Label>
            <Select value={settings.units} onValueChange={handleUnitsChange}>
              <SelectTrigger id="units-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Kilometers</SelectItem>
                <SelectItem value="imperial">Miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reminder-time">Daily Reminder (Optional)</Label>
            <Input
              id="reminder-time"
              type="time"
              value={settings.reminderTime || ''}
              onChange={(e) => handleReminderChange(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Note: Reminders are limited in web apps. Consider adding Hero100 to your home screen for better notification support.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <label htmlFor="import-file" className="cursor-pointer">
                <Upload className="w-4 h-4" />
                Import CSV
                <input
                  id="import-file"
                  type="file"
                  accept=".csv"
                  onChange={importData}
                  className="hidden"
                />
              </label>
            </Button>
          </div>

          <div className="pt-4 border-t">
            <Button onClick={resetAllData} variant="destructive" className="flex items-center gap-2">
              <Trash className="w-4 h-4" />
              Reset All Data
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              This will permanently delete all your fitness records and reset your streak.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & About */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy & Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-accent/10 rounded-lg">
            <h4 className="font-medium text-sm mb-2">🔒 Privacy-First Design</h4>
            <p className="text-xs text-muted-foreground">
              All your fitness data stays on your device. No analytics, no tracking, no external servers. 
              Your privacy is completely protected.
            </p>
          </div>
          
          <Button variant="outline" onClick={() => setShowAbout(true)} className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            About Hero100
          </Button>
        </CardContent>
      </Card>

      {/* About Dialog */}
      {showAbout && (
        <Dialog open={showAbout} onOpenChange={setShowAbout}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>About Hero100</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-1">Health Disclaimer</h4>
                <p className="text-muted-foreground">
                  Hero100 is a general wellness app and is not medical advice. Stop exercising if you feel unwell. 
                  Consult a healthcare professional before starting any new fitness routine, especially if you have health conditions.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Data & Privacy</h4>
                <p className="text-muted-foreground">
                  All data is stored locally on your device. No information is sent to external servers. 
                  You have complete control over your fitness data through export/import functionality.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Version</h4>
                <p className="text-muted-foreground">Hero100 v1.0 - Minimalist Fitness PWA</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}