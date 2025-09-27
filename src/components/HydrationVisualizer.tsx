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
              
              {/* Base human body - Cartoon style character */}
              <g stroke="none" className="opacity-90">
                {/* Main body skin tone */}
                <g fill="#F3E5AB">
                  {/* Head */}
                  <circle cx="80" cy="20" r="14" />
                  
                  {/* Neck */}
                  <rect x="76" y="34" width="8" height="10" rx="4" />
                  
                  {/* Torso */}
                  <path d="M80 44
                          C92 44 100 48 100 55
                          C100 62 98 68 96 75
                          C94 82 93 88 92 95
                          L92 105
                          C92 115 89 125 85 135
                          C83 140 81 145 80 147
                          C79 145 77 140 75 135
                          C71 125 68 115 68 105
                          L68 95
                          C67 88 66 82 64 75
                          C62 68 60 62 60 55
                          C60 48 68 44 80 44 Z"/>
                  
                  {/* Arms */}
                  <ellipse cx="40" cy="60" rx="5" ry="18" transform="rotate(-10 40 60)" />
                  <ellipse cx="120" cy="60" rx="5" ry="18" transform="rotate(10 120 60)" />
                  <ellipse cx="35" cy="80" rx="4" ry="16" />
                  <ellipse cx="125" cy="80" rx="4" ry="16" />
                  
                  {/* Hands */}
                  <circle cx="33" cy="96" r="4" />
                  <circle cx="127" cy="96" r="4" />
                  
                  {/* Legs */}
                  <ellipse cx="70" cy="175" rx="7" ry="28" />
                  <ellipse cx="90" cy="175" rx="7" ry="28" />
                  <ellipse cx="68" cy="208" rx="5" ry="16" />
                  <ellipse cx="92" cy="208" rx="5" ry="16" />
                  
                  {/* Feet */}
                  <ellipse cx="65" cy="226" rx="7" ry="3" />
                  <ellipse cx="95" cy="226" rx="7" ry="3" />
                </g>
                
                {/* Clothing/Shorts */}
                <rect x="68" y="140" width="24" height="20" rx="3" fill="#4A90E2" />
                
                {/* Facial features */}
                <g fill="#333">
                  {/* Eyes */}
                  <circle cx="76" cy="17" r="2" />
                  <circle cx="84" cy="17" r="2" />
                  <circle cx="76" cy="17" r="1" fill="white" />
                  <circle cx="84" cy="17" r="1" fill="white" />
                  
                  {/* Nose */}
                  <ellipse cx="80" cy="20" rx="1" ry="2" fill="#E8D5A3" />
                  
                  {/* Mouth */}
                  <path d="M77 23 Q80 25 83 23" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </g>
                
                {/* Hair */}
                <path d="M67 12 Q80 5 93 12 Q90 8 80 8 Q70 8 67 12" fill="#8B4513" />
                
                {/* Body outline for definition */}
                <g stroke="#D4B896" strokeWidth="1.5" fill="none" className="opacity-40">
                  <circle cx="80" cy="20" r="14" />
                  <path d="M80 44 C92 44 100 48 100 55 C100 62 98 68 96 75 C94 82 93 88 92 95 L92 105 C92 115 89 125 85 135 C83 140 81 145 80 147 C79 145 77 140 75 135 C71 125 68 115 68 105 L68 95 C67 88 66 82 64 75 C62 68 60 62 60 55 C60 48 68 44 80 44 Z"/>
                  <ellipse cx="70" cy="175" rx="7" ry="28" />
                  <ellipse cx="90" cy="175" rx="7" ry="28" />
                </g>
              </g>
              
              {/* Muscle Group Highlighting - Better integrated with character */}
              
              {/* Chest muscles (pushups) */}
              {muscleActivation.chest && (
                <g className="muscle-highlight">
                  <ellipse cx="80" cy="62" rx="14" ry="8" fill="url(#chestGradient)" className="animate-pulse" />
                  <path d="M70 58 Q80 68 90 58 Q80 72 70 58" fill="url(#chestGradient)" opacity="0.5" />
                </g>
              )}
              
              {/* Shoulder muscles (pushups) */}
              {muscleActivation.shoulders && (
                <g className="muscle-highlight">
                  <ellipse cx="40" cy="50" rx="6" ry="8" fill="url(#shoulderGradient)" className="animate-pulse" />
                  <ellipse cx="120" cy="50" rx="6" ry="8" fill="url(#shoulderGradient)" className="animate-pulse" />
                </g>
              )}
              
              {/* Triceps (pushups) */}
              {muscleActivation.triceps && (
                <g className="muscle-highlight">
                  <ellipse cx="35" cy="68" rx="2.5" ry="10" fill="url(#shoulderGradient)" opacity="0.7" />
                  <ellipse cx="125" cy="68" rx="2.5" ry="10" fill="url(#shoulderGradient)" opacity="0.7" />
                </g>
              )}
              
              {/* Core/Abs (situps) */}
              {muscleActivation.abs && (
                <g className="muscle-highlight">
                  <ellipse cx="76" cy="85" rx="3" ry="10" fill="url(#coreGradient)" className="animate-pulse" />
                  <ellipse cx="84" cy="85" rx="3" ry="10" fill="url(#coreGradient)" className="animate-pulse" />
                  <ellipse cx="76" cy="100" rx="3" ry="6" fill="url(#coreGradient)" opacity="0.6" />
                  <ellipse cx="84" cy="100" rx="3" ry="6" fill="url(#coreGradient)" opacity="0.6" />
                  <ellipse cx="76" cy="115" rx="3" ry="6" fill="url(#coreGradient)" opacity="0.4" />
                  <ellipse cx="84" cy="115" rx="3" ry="6" fill="url(#coreGradient)" opacity="0.4" />
                </g>
              )}
              
              {/* Obliques (situps) */}
              {muscleActivation.core && (
                <g className="muscle-highlight">
                  <path d="M68 90 Q72 98 74 108 Q70 112 68 108 Q64 98 68 90" fill="url(#coreGradient)" opacity="0.5" />
                  <path d="M92 90 Q88 98 86 108 Q90 112 92 108 Q96 98 92 90" fill="url(#coreGradient)" opacity="0.5" />
                </g>
              )}
              
              {/* Quadriceps (squats) */}
              {muscleActivation.quads && (
                <g className="muscle-highlight">
                  <ellipse cx="70" cy="165" rx="5" ry="12" fill="url(#legGradient)" className="animate-pulse" />
                  <ellipse cx="90" cy="165" rx="5" ry="12" fill="url(#legGradient)" className="animate-pulse" />
                </g>
              )}
              
              {/* Glutes (squats) */}
              {muscleActivation.glutes && (
                <g className="muscle-highlight">
                  <ellipse cx="75" cy="148" rx="6" ry="6" fill="url(#legGradient)" opacity="0.7" />
                  <ellipse cx="85" cy="148" rx="6" ry="6" fill="url(#legGradient)" opacity="0.7" />
                </g>
              )}
              
              {/* Hamstrings (running) */}
              {muscleActivation.hamstrings && (
                <g className="muscle-highlight">
                  <ellipse cx="70" cy="180" rx="3" ry="15" fill="url(#legGradient)" opacity="0.6" />
                  <ellipse cx="90" cy="180" rx="3" ry="15" fill="url(#legGradient)" opacity="0.6" />
                </g>
              )}
              
              {/* Calves (running) */}
              {muscleActivation.calves && (
                <g className="muscle-highlight">
                  <ellipse cx="68" cy="212" rx="3" ry="10" fill="url(#legGradient)" className="animate-pulse" />
                  <ellipse cx="92" cy="212" rx="3" ry="10" fill="url(#legGradient)" className="animate-pulse" />
                </g>
              )}
              
              {/* Cardiovascular system (running) */}
              {muscleActivation.cardio && (
                <g className="muscle-highlight">
                  <circle cx="76" cy="65" r="3" fill="url(#cardioGradient)" className="animate-pulse">
                    <animate attributeName="r" values="3;5;3" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                  {/* Simplified circulatory lines */}
                  <path d="M76 65 Q68 75 70 175" stroke="url(#cardioGradient)" strokeWidth="1.5" fill="none" opacity="0.3" />
                  <path d="M76 65 Q84 75 90 175" stroke="url(#cardioGradient)" strokeWidth="1.5" fill="none" opacity="0.3" />
                  <path d="M76 65 Q50 60 40 60" stroke="url(#cardioGradient)" strokeWidth="1.5" fill="none" opacity="0.3" />
                  <path d="M76 65 Q106 60 120 60" stroke="url(#cardioGradient)" strokeWidth="1.5" fill="none" opacity="0.3" />
                </g>
              )}
              
              {/* Hydration overlay - flowing through the body */}
              {hydrationPercentage > 20 && (
                <g className="hydration-overlay" opacity={Math.min(hydrationPercentage / 100, 0.25)}>
                  {/* Head hydration */}
                  <circle cx="80" cy="20" r="14" fill="url(#hydrationGradient)" />
                  
                  {/* Body hydration flow */}
                  <path d="M80 44 C92 44 100 48 100 55 C100 62 98 68 96 75 C94 82 93 88 92 95 L92 105 C92 115 89 125 85 135 C83 140 81 145 80 147 C79 145 77 140 75 135 C71 125 68 115 68 105 L68 95 C67 88 66 82 64 75 C62 68 60 62 60 55 C60 48 68 44 80 44 Z" fill="url(#hydrationGradient)" />
                  
                  {/* Animated water droplets flowing through body */}
                  {Array.from({ length: Math.min(current, 3) }, (_, i) => (
                    <circle
                      key={i}
                      cx={78 + (i % 2) * 4}
                      cy={50 + (i * 25)}
                      r="1.5"
                      fill="#06b6d4"
                      className="animate-bounce"
                      style={{ animationDelay: `${i * 0.4}s`, animationDuration: '2s' }}
                    />
                  ))}
                </g>
              )}
              
              {/* Muscle group labels - Better positioned */}
              <g className="text-xs font-medium fill-current opacity-70">
                {muscleActivation.chest && <text x="50" y="62" textAnchor="middle" className="font-semibold">Chest</text>}
                {muscleActivation.core && <text x="110" y="95" textAnchor="middle" className="font-semibold">Core</text>}
                {muscleActivation.quads && <text x="50" y="165" textAnchor="middle" className="font-semibold">Quads</text>}
                {muscleActivation.calves && <text x="110" y="212" textAnchor="middle" className="font-semibold">Calves</text>}
                {muscleActivation.cardio && <text x="110" y="65" textAnchor="middle" className="font-semibold">Heart</text>}
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