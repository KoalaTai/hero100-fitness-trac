import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus, Drop } from '@phosphor-icons/react'
import { ExerciseData } from '../App'

interface HydrationVisualizerProps {
  current: number
  target: number
  onAdjust: (delta: number) => void
  complete: boolean
  exerciseData: ExerciseData
  exerciseTargets: {
    pushups: number
    situps: number
    squats: number
    runDistance: number
  }
}

export function HydrationVisualizer({ 
  current, 
  target, 
  onAdjust, 
  complete,
  exerciseData,
  exerciseTargets 
}: HydrationVisualizerProps) {
  const hydrationPercentage = Math.min((current / target) * 100, 100)
  
  // Calculate muscle group activation based on exercises
  const muscleActivation = {
    chest: exerciseData.pushups >= exerciseTargets.pushups,
    shoulders: exerciseData.pushups >= exerciseTargets.pushups,
    triceps: exerciseData.pushups >= exerciseTargets.pushups,
    core: exerciseData.situps >= exerciseTargets.situps,
    abs: exerciseData.situps >= exerciseTargets.situps,
    quads: exerciseData.squats >= exerciseTargets.squats,
    glutes: exerciseData.squats >= exerciseTargets.squats,
    calves: exerciseData.runDistance >= exerciseTargets.runDistance,
    hamstrings: exerciseData.runDistance >= exerciseTargets.runDistance,
    cardio: exerciseData.runDistance >= exerciseTargets.runDistance
  }
  
  return (
    <Card className={`transition-colors ${complete ? 'border-accent bg-accent/5' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Drop className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium">Hydration</h3>
            {complete && <Badge variant="secondary" className="bg-accent text-accent-foreground">✓</Badge>}
          </div>
          <div className="text-sm text-muted-foreground">
            {current} / {target} glasses
          </div>
        </div>

        {/* Human Body Muscle Group Visualization */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <svg 
              width="160" 
              height="240" 
              viewBox="0 0 160 240" 
              className="text-muted-foreground muscle-body transition-all duration-500"
            >
              <defs>
                {/* Muscle activation gradients */}
                <radialGradient id="chestGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0.3" />
                </radialGradient>
                
                <radialGradient id="shoulderGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0.3" />
                </radialGradient>
                
                <radialGradient id="coreGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity="0.3" />
                </radialGradient>
                
                <radialGradient id="legGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.3" />
                </radialGradient>

                <radialGradient id="cardioGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
                </radialGradient>

                <radialGradient id="hydrationGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0.2" />
                </radialGradient>
              </defs>
              
              {/* Base human body outline */}
              <g stroke="currentColor" strokeWidth="2" fill="none" className="opacity-60">
                {/* Head */}
                <circle cx="80" cy="20" r="15" />
                <circle cx="76" cy="17" r="1.5" fill="currentColor" className="opacity-40" />
                <circle cx="84" cy="17" r="1.5" fill="currentColor" className="opacity-40" />
                <path d="M76 22 Q80 24 84 22" strokeWidth="1" className="opacity-50" />
                
                {/* Neck */}
                <rect x="75" y="35" width="10" height="8" rx="5" />
                
                {/* Torso outline */}
                <path d="M80 43
                        C95 43 105 48 105 58
                        C105 65 103 72 100 78
                        C98 84 96 90 94 96
                        L94 110
                        C94 120 91 130 86 140
                        C84 145 81 150 80 152
                        C79 150 76 145 74 140
                        C69 130 66 120 66 110
                        L66 96
                        C64 90 62 84 60 78
                        C57 72 55 65 55 58
                        C55 48 65 43 80 43 Z"/>
                
                {/* Pelvis */}
                <ellipse cx="80" cy="165" rx="20" ry="12" />
                
                {/* Arms */}
                <ellipse cx="35" cy="65" rx="6" ry="20" transform="rotate(-15 35 65)" />
                <ellipse cx="125" cy="65" rx="6" ry="20" transform="rotate(15 125 65)" />
                <ellipse cx="30" cy="88" rx="5" ry="18" />
                <ellipse cx="130" cy="88" rx="5" ry="18" />
                
                {/* Hands */}
                <circle cx="28" cy="106" r="4" />
                <circle cx="132" cy="106" r="4" />
                
                {/* Legs */}
                <ellipse cx="68" cy="190" rx="8" ry="25" />
                <ellipse cx="92" cy="190" rx="8" ry="25" />
                <ellipse cx="66" cy="215" rx="6" ry="15" />
                <ellipse cx="94" cy="215" rx="6" ry="15" />
                
                {/* Feet */}
                <ellipse cx="62" cy="232" rx="8" ry="4" />
                <ellipse cx="98" cy="232" rx="8" ry="4" />
              </g>
              
              {/* Muscle Group Highlighting */}
              
              {/* Chest muscles (pushups) */}
              {muscleActivation.chest && (
                <g className="muscle-highlight">
                  <ellipse cx="80" cy="70" rx="18" ry="12" fill="url(#chestGradient)" className="animate-pulse" />
                  <path d="M65 65 Q80 75 95 65 Q80 80 65 65" fill="url(#chestGradient)" opacity="0.6" />
                </g>
              )}
              
              {/* Shoulder muscles (pushups) */}
              {muscleActivation.shoulders && (
                <g className="muscle-highlight">
                  <circle cx="35" cy="55" r="8" fill="url(#shoulderGradient)" className="animate-pulse" />
                  <circle cx="125" cy="55" r="8" fill="url(#shoulderGradient)" className="animate-pulse" />
                </g>
              )}
              
              {/* Triceps (pushups) */}
              {muscleActivation.triceps && (
                <g className="muscle-highlight">
                  <ellipse cx="30" cy="75" rx="3" ry="12" fill="url(#shoulderGradient)" opacity="0.7" />
                  <ellipse cx="130" cy="75" rx="3" ry="12" fill="url(#shoulderGradient)" opacity="0.7" />
                </g>
              )}
              
              {/* Core/Abs (situps) */}
              {muscleActivation.abs && (
                <g className="muscle-highlight">
                  <ellipse cx="77" cy="95" rx="4" ry="12" fill="url(#coreGradient)" className="animate-pulse" />
                  <ellipse cx="83" cy="95" rx="4" ry="12" fill="url(#coreGradient)" className="animate-pulse" />
                  <ellipse cx="77" cy="115" rx="4" ry="8" fill="url(#coreGradient)" opacity="0.6" />
                  <ellipse cx="83" cy="115" rx="4" ry="8" fill="url(#coreGradient)" opacity="0.6" />
                </g>
              )}
              
              {/* Obliques (situps) */}
              {muscleActivation.core && (
                <g className="muscle-highlight">
                  <path d="M65 100 Q70 108 72 115 Q68 118 65 115 Q60 108 65 100" fill="url(#coreGradient)" opacity="0.5" />
                  <path d="M95 100 Q90 108 88 115 Q92 118 95 115 Q100 108 95 100" fill="url(#coreGradient)" opacity="0.5" />
                </g>
              )}
              
              {/* Quadriceps (squats) */}
              {muscleActivation.quads && (
                <g className="muscle-highlight">
                  <ellipse cx="68" cy="180" rx="6" ry="15" fill="url(#legGradient)" className="animate-pulse" />
                  <ellipse cx="92" cy="180" rx="6" ry="15" fill="url(#legGradient)" className="animate-pulse" />
                </g>
              )}
              
              {/* Glutes (squats) */}
              {muscleActivation.glutes && (
                <g className="muscle-highlight">
                  <ellipse cx="75" cy="155" rx="8" ry="8" fill="url(#legGradient)" opacity="0.7" />
                  <ellipse cx="85" cy="155" rx="8" ry="8" fill="url(#legGradient)" opacity="0.7" />
                </g>
              )}
              
              {/* Hamstrings (running) */}
              {muscleActivation.hamstrings && (
                <g className="muscle-highlight">
                  <ellipse cx="68" cy="195" rx="4" ry="18" fill="url(#legGradient)" opacity="0.6" />
                  <ellipse cx="92" cy="195" rx="4" ry="18" fill="url(#legGradient)" opacity="0.6" />
                </g>
              )}
              
              {/* Calves (running) */}
              {muscleActivation.calves && (
                <g className="muscle-highlight">
                  <ellipse cx="66" cy="218" rx="4" ry="12" fill="url(#legGradient)" className="animate-pulse" />
                  <ellipse cx="94" cy="218" rx="4" ry="12" fill="url(#legGradient)" className="animate-pulse" />
                </g>
              )}
              
              {/* Cardiovascular system (running) */}
              {muscleActivation.cardio && (
                <g className="muscle-highlight">
                  <circle cx="75" cy="75" r="4" fill="url(#cardioGradient)" className="animate-pulse">
                    <animate attributeName="r" values="4;6;4" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                  {/* Circulatory lines */}
                  <path d="M75 75 Q65 85 68 190" stroke="url(#cardioGradient)" strokeWidth="2" fill="none" opacity="0.4" />
                  <path d="M75 75 Q85 85 92 190" stroke="url(#cardioGradient)" strokeWidth="2" fill="none" opacity="0.4" />
                  <path d="M75 75 Q60 70 35 65" stroke="url(#cardioGradient)" strokeWidth="2" fill="none" opacity="0.4" />
                  <path d="M75 75 Q100 70 125 65" stroke="url(#cardioGradient)" strokeWidth="2" fill="none" opacity="0.4" />
                </g>
              )}
              
              {/* Hydration overlay */}
              {hydrationPercentage > 20 && (
                <g className="hydration-overlay" opacity={Math.min(hydrationPercentage / 100, 0.3)}>
                  <circle cx="80" cy="20" r="15" fill="url(#hydrationGradient)" />
                  <rect x="75" y="35" width="10" height="8" rx="5" fill="url(#hydrationGradient)" />
                  <path d="M80 43 C95 43 105 48 105 58 C105 65 103 72 100 78 C98 84 96 90 94 96 L94 110 C94 120 91 130 86 140 C84 145 81 150 80 152 C79 150 76 145 74 140 C69 130 66 120 66 110 L66 96 C64 90 62 84 60 78 C57 72 55 65 55 58 C55 48 65 43 80 43 Z" fill="url(#hydrationGradient)" />
                  
                  {/* Animated water droplets */}
                  {Array.from({ length: Math.min(current, 4) }, (_, i) => (
                    <circle
                      key={i}
                      cx={75 + (i % 2) * 10}
                      cy={60 + (i * 30)}
                      r="2"
                      fill="#06b6d4"
                      className="animate-bounce"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </g>
              )}
              
              {/* Muscle group labels */}
              <g className="text-xs font-medium fill-current opacity-70">
                {muscleActivation.chest && <text x="45" y="70" textAnchor="middle">Chest</text>}
                {muscleActivation.core && <text x="115" y="100" textAnchor="middle">Core</text>}
                {muscleActivation.quads && <text x="45" y="180" textAnchor="middle">Quads</text>}
                {muscleActivation.calves && <text x="115" y="215" textAnchor="middle">Calves</text>}
                {muscleActivation.cardio && <text x="115" y="75" textAnchor="middle">Heart</text>}
              </g>
            </svg>
          </div>
        </div>

        {/* Muscle Group Status */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-blue-500 mb-1">
            {Math.round(hydrationPercentage)}%
          </div>
          <div className="text-sm text-muted-foreground mb-3">
            {hydrationPercentage >= 100 ? 'Fully Hydrated! 🌊' : 
             hydrationPercentage >= 75 ? 'Well Hydrated 💧' :
             hydrationPercentage >= 50 ? 'Getting There 💦' :
             hydrationPercentage >= 25 ? 'Need More Water 🥤' :
             'Dehydrated ⚠️'}
          </div>
          
          {/* Exercise completion status */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className={`flex items-center gap-1 p-2 rounded ${
              muscleActivation.chest ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                muscleActivation.chest ? 'bg-red-500' : 'bg-gray-400'
              }`} />
              Chest & Arms
            </div>
            <div className={`flex items-center gap-1 p-2 rounded ${
              muscleActivation.core ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                muscleActivation.core ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              Core
            </div>
            <div className={`flex items-center gap-1 p-2 rounded ${
              muscleActivation.quads ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                muscleActivation.quads ? 'bg-blue-500' : 'bg-gray-400'
              }`} />
              Legs
            </div>
            <div className={`flex items-center gap-1 p-2 rounded ${
              muscleActivation.cardio ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                muscleActivation.cardio ? 'bg-purple-500' : 'bg-gray-400'
              }`} />
              Cardio
            </div>
          </div>
        </div>

        {/* Glass indicators */}
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: target }, (_, i) => (
            <div
              key={i}
              className={`w-7 h-10 rounded-b-lg border-2 transition-all duration-500 flex items-end p-1 ${
                i < current 
                  ? 'border-blue-400 bg-gradient-to-t from-blue-500 via-blue-400 to-blue-200 shadow-sm' 
                  : 'border-gray-300 bg-gray-50'
              }`}
              aria-label={`Glass ${i + 1} ${i < current ? 'filled' : 'empty'}`}
            >
              {i < current && (
                <div className="w-full h-full rounded-b-md bg-blue-600 opacity-20" />
              )}
              {/* Glass shine effect */}
              <div className="absolute inset-0 w-1 bg-gradient-to-b from-white to-transparent opacity-30 rounded-l-md" />
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAdjust(-1)}
            disabled={current <= 0}
            aria-label="Decrease hydration by 1 glass"
          >
            <Minus className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => onAdjust(1)}
            size="sm"
            className="px-6"
            aria-label="Add 1 glass of water"
          >
            <Drop className="w-4 h-4 mr-1" />
            Add Glass
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onAdjust(1)}
            aria-label="Increase hydration by 1 glass"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}