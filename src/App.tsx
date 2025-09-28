import { useEffect, useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { TodayView } from './components/TodayView'
import { CalendarView } from './components/CalendarView'
import { SettingsView } from './components/SettingsView'
import { OnboardingView } from './components/OnboardingView'
import { DisclaimerDialog } from './components/DisclaimerDialog'
import { SelfTestPanel } from './components/SelfTestPanel'
import { FinalReportView } from './components/FinalReportView'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Calendar, Gear, House, TestTube, FileText } from '@phosphor-icons/react'

export type ExerciseData = {
  pushups: number
  situps: number
  squats: number
  runDistance: number
  hydration: number
}

export type DayType = 'training' | 'mobility' | 'rest'

export type DayRecord = {
  date: string
  level: number
  exercises: ExerciseData
  completed: boolean
  streakOnThatDate: number
  dayType: DayType
}

export type UserSettings = {
  level: number
  units: 'metric' | 'imperial'
  reminderTime?: string
  onboarded: boolean
}

function App() {
  const [settings, setSettings] = useKV<UserSettings>('hero100-settings', {
    level: 50,
    units: 'metric',
    onboarded: false
  })
  
  const [records, setRecords] = useKV<DayRecord[]>('hero100-records', [])
  const [currentStreak, setCurrentStreak] = useKV<number>('hero100-streak', 0)

  const [activeTab, setActiveTab] = useState('today')
  const [showSelfTest, setShowSelfTest] = useState(false)
  const [showFinalReport, setShowFinalReport] = useState(false)

  // Provide defaults if undefined (shouldn't happen but TypeScript safety)
  const safeSettings = settings || { level: 50, units: 'metric' as const, onboarded: false }
  const safeRecords = records || []
  const safeCurrentStreak = currentStreak || 0

  useEffect(() => {
    if (!records || records.length === 0) return

    const needsMigration = records.some(record => record.dayType === undefined)

    if (needsMigration) {
      setRecords(prev =>
        (prev || []).map(record =>
          record.dayType ? record : { ...record, dayType: 'training' as DayType }
        )
      )
    }
  }, [records, setRecords])

  const normalizedRecords = safeRecords.map(record =>
    record.dayType ? record : { ...record, dayType: 'training' as DayType }
  )

  if (!safeSettings.onboarded) {
    return (
      <OnboardingView 
        onComplete={(newSettings) => {
          setSettings({ ...newSettings, onboarded: true })
        }}
      />
    )
  }

  if (showSelfTest) {
    return (
      <SelfTestPanel 
        records={normalizedRecords}
        setRecords={setRecords}
        currentStreak={safeCurrentStreak}
        setCurrentStreak={setCurrentStreak}
        onBack={() => setShowSelfTest(false)}
      />
    )
  }

  if (showFinalReport) {
    return (
      <FinalReportView 
        records={normalizedRecords}
        currentStreak={safeCurrentStreak}
        onBack={() => setShowFinalReport(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Hero100</h1>
              {safeCurrentStreak > 0 && (
                <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-sm font-medium">
                  🔥 {safeCurrentStreak}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowSelfTest(true)}
                aria-label="Open self-test panel"
              >
                <TestTube className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowFinalReport(true)}
                aria-label="View final report"
              >
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="today" className="flex items-center gap-2">
              <House className="w-4 h-4" />
              Today
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Gear className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-0">
            <TodayView
              settings={safeSettings}
              records={normalizedRecords}
              setRecords={setRecords}
              currentStreak={safeCurrentStreak}
              setCurrentStreak={setCurrentStreak}
            />
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            <CalendarView
              records={normalizedRecords}
              setRecords={setRecords}
              settings={safeSettings}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <SettingsView
              settings={safeSettings}
              setSettings={setSettings}
              records={normalizedRecords}
              setRecords={setRecords}
              setCurrentStreak={setCurrentStreak}
            />
          </TabsContent>
        </Tabs>
      </main>

      <DisclaimerDialog />
    </div>
  )
}

export default App
