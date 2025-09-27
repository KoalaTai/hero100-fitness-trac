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

                {/* Shadow filter */}
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
                </filter>
              </defs>
              
              {/* Clean, modern human cartoon character */}
              <g className="human-figure" filter="url(#shadow)">
                
                {/* Base skin layer */}
                <g fill="#FDB99B" stroke="none">
                  {/* Head - perfect circle */}
                  <circle cx="80" cy="22" r="16" />
                  
                  {/* Neck - clean connection */}
                  <rect x="74" y="38" width="12" height="12" rx="6" />
                  
                  {/* Main torso - anatomically correct */}
                  <path d="M80 50
                           C95 50 105 54 105 62
                           C105 70 103 78 101 86
                           C99 94 97 102 95 110
                           C93 118 91 126 88 134
                           C86 140 83 144 80 146
                           C77 144 74 140 72 134
                           C69 126 67 118 65 110
                           C63 102 61 94 59 86
                           C57 78 55 70 55 62
                           C55 54 65 50 80 50 Z" />
                  
                  {/* Left arm segments */}
                  <ellipse cx="42" cy="68" rx="7" ry="20" transform="rotate(-15 42 68)" />
                  <ellipse cx="34" cy="92" rx="6" ry="18" transform="rotate(-5 34 92)" />
                  
                  {/* Right arm segments */}
                  <ellipse cx="118" cy="68" rx="7" ry="20" transform="rotate(15 118 68)" />
                  <ellipse cx="126" cy="92" rx="6" ry="18" transform="rotate(5 126 92)" />
                  
                  {/* Hands */}
                  <circle cx="30" cy="110" r="5" />
                  <circle cx="130" cy="110" r="5" />
                  
                  {/* Hip area */}
                  <ellipse cx="80" cy="146" rx="18" ry="12" />
                  
                  {/* Thigh muscles */}
                  <ellipse cx="68" cy="170" rx="9" ry="24" />
                  <ellipse cx="92" cy="170" rx="9" ry="24" />
                  
                  {/* Calf muscles */}
                  <ellipse cx="68" cy="205" rx="7" ry="20" />
                  <ellipse cx="92" cy="205" rx="7" ry="20" />
                  
                  {/* Feet */}
                  <ellipse cx="64" cy="228" rx="8" ry="4" />
                  <ellipse cx="96" cy="228" rx="8" ry="4" />
                </g>
                
                {/* Athletic wear */}
                <g>
                  {/* Tank top */}
                  <path d="M65 54 
                           L95 54 
                           C97 54 98 56 98 58
                           L98 82
                           C98 84 96 86 94 86
                           L66 86
                           C64 86 62 84 62 82
                           L62 58
                           C62 56 63 54 65 54 Z" 
                           fill="#2563EB" />
                  
                  {/* Shorts */}
                  <rect x="66" y="140" width="28" height="24" rx="4" fill="#1E40AF" />
                  
                  {/* Tank top straps */}
                  <path d="M72 54 Q76 48 80 54" fill="#2563EB" />
                  <path d="M80 54 Q84 48 88 54" fill="#2563EB" />
                </g>
                
                {/* Facial features - cleaner design */}
                <g>
                  {/* Eyes */}
                  <ellipse cx="74" cy="19" rx="3" ry="4" fill="white" />
                  <ellipse cx="86" cy="19" rx="3" ry="4" fill="white" />
                  <circle cx="74" cy="19" r="2" fill="#333" />
                  <circle cx="86" cy="19" r="2" fill="#333" />
                  <circle cx="75" cy="18" r="0.8" fill="white" />
                  <circle cx="87" cy="18" r="0.8" fill="white" />
                  
                  {/* Eyebrows */}
                  <path d="M71 15 Q74 13 77 15" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M83 15 Q86 13 89 15" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" fill="none" />
                  
                  {/* Nose */}
                  <path d="M78 22 Q80 24 82 22" stroke="#E8A575" strokeWidth="2" strokeLinecap="round" fill="none" />
                  
                  {/* Mouth - smiling */}
                  <path d="M76 26 Q80 29 84 26" stroke="#D4621C" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>
                
                {/* Hair - modern style */}
                <path d="M65 15 
                         Q72 8 80 8 
                         Q88 8 95 15
                         Q92 12 88 11
                         Q84 10 80 10
                         Q76 10 72 11
                         Q68 12 65 15 Z" 
                         fill="#8B4513" />
                
                {/* Muscle definition lines - subtle */}
                <g stroke="#E8A575" strokeWidth="1" fill="none" opacity="0.3">
                  {/* Chest definition */}
                  <path d="M68 60 Q80 65 92 60" />
                  <path d="M70 70 Q80 72 90 70" />
                  
                  {/* Abs definition */}
                  <line x1="76" y1="90" x2="76" y2="120" />
                  <line x1="84" y1="90" x2="84" y2="120" />
                  <path d="M70 95 L90 95" />
                  <path d="M70 105 L90 105" />
                  <path d="M70 115 L90 115" />
                  
                  {/* Arm definition */}
                  <path d="M35 75 Q42 75 49 75" />
                  <path d="M111 75 Q118 75 125 75" />
                  
                  {/* Leg definition */}
                  <path d="M72 155 L72 185" />
                  <path d="M88 155 L88 185" />
                </g>
              </g>
              
              {/* Muscle Group Highlighting - Anatomically correct positioning */}
              
              {/* Chest muscles (pushups) - positioned over pectorals */}
              {muscleActivation.chest && (
                <g className="muscle-highlight">
                  <ellipse cx="72" cy="68" rx="8" ry="6" fill="url(#chestGradient)" className="animate-pulse" opacity="0.7" />
                  <ellipse cx="88" cy="68" rx="8" ry="6" fill="url(#chestGradient)" className="animate-pulse" opacity="0.7" />
                  <path d="M68 65 Q80 72 92 65" fill="url(#chestGradient)" opacity="0.4" />
                </g>
              )}
              
              {/* Shoulder muscles (pushups) - deltoids */}
              {muscleActivation.shoulders && (
                <g className="muscle-highlight">
                  <ellipse cx="42" cy="68" rx="5" ry="12" fill="url(#shoulderGradient)" className="animate-pulse" opacity="0.8" />
                  <ellipse cx="118" cy="68" rx="5" ry="12" fill="url(#shoulderGradient)" className="animate-pulse" opacity="0.8" />
                </g>
              )}
              
              {/* Triceps (pushups) - back of arms */}
              {muscleActivation.triceps && (
                <g className="muscle-highlight">
                  <ellipse cx="35" cy="80" rx="3" ry="12" fill="url(#shoulderGradient)" opacity="0.6" />
                  <ellipse cx="125" cy="80" rx="3" ry="12" fill="url(#shoulderGradient)" opacity="0.6" />
                </g>
              )}
              
              {/* Core/Abs (situps) - rectus abdominis */}
              {muscleActivation.abs && (
                <g className="muscle-highlight">
                  <rect x="73" y="88" width="6" height="16" rx="3" fill="url(#coreGradient)" className="animate-pulse" opacity="0.8" />
                  <rect x="81" y="88" width="6" height="16" rx="3" fill="url(#coreGradient)" className="animate-pulse" opacity="0.8" />
                  <rect x="73" y="106" width="6" height="12" rx="3" fill="url(#coreGradient)" opacity="0.6" />
                  <rect x="81" y="106" width="6" height="12" rx="3" fill="url(#coreGradient)" opacity="0.6" />
                  <rect x="73" y="120" width="6" height="10" rx="3" fill="url(#coreGradient)" opacity="0.4" />
                  <rect x="81" y="120" width="6" height="10" rx="3" fill="url(#coreGradient)" opacity="0.4" />
                </g>
              )}
              
              {/* Obliques (situps) - side abs */}
              {muscleActivation.core && (
                <g className="muscle-highlight">
                  <ellipse cx="62" cy="105" rx="4" ry="18" fill="url(#coreGradient)" opacity="0.5" />
                  <ellipse cx="98" cy="105" rx="4" ry="18" fill="url(#coreGradient)" opacity="0.5" />
                </g>
              )}
              
              {/* Quadriceps (squats) - front thigh */}
              {muscleActivation.quads && (
                <g className="muscle-highlight">
                  <ellipse cx="68" cy="170" rx="6" ry="18" fill="url(#legGradient)" className="animate-pulse" opacity="0.8" />
                  <ellipse cx="92" cy="170" rx="6" ry="18" fill="url(#legGradient)" className="animate-pulse" opacity="0.8" />
                </g>
              )}
              
              {/* Glutes (squats) - positioned at hip area */}
              {muscleActivation.glutes && (
                <g className="muscle-highlight">
                  <ellipse cx="72" cy="146" rx="8" ry="8" fill="url(#legGradient)" opacity="0.6" />
                  <ellipse cx="88" cy="146" rx="8" ry="8" fill="url(#legGradient)" opacity="0.6" />
                </g>
              )}
              
              {/* Hamstrings (running) - back thigh */}
              {muscleActivation.hamstrings && (
                <g className="muscle-highlight">
                  <ellipse cx="68" cy="175" rx="4" ry="16" fill="url(#legGradient)" opacity="0.5" />
                  <ellipse cx="92" cy="175" rx="4" ry="16" fill="url(#legGradient)" opacity="0.5" />
                </g>
              )}
              
              {/* Calves (running) - lower leg */}
              {muscleActivation.calves && (
                <g className="muscle-highlight">
                  <ellipse cx="68" cy="205" rx="4" ry="14" fill="url(#legGradient)" className="animate-pulse" opacity="0.8" />
                  <ellipse cx="92" cy="205" rx="4" ry="14" fill="url(#legGradient)" className="animate-pulse" opacity="0.8" />
                </g>
              )}
              
              {/* Cardiovascular system (running) - heart and circulation */}
              {muscleActivation.cardio && (
                <g className="muscle-highlight">
                  <circle cx="75" cy="72" r="4" fill="url(#cardioGradient)" className="animate-pulse">
                    <animate attributeName="r" values="4;6;4" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                  {/* Enhanced circulatory system */}
                  <path d="M75 72 Q65 85 68 170" stroke="url(#cardioGradient)" strokeWidth="2" fill="none" opacity="0.4" />
                  <path d="M75 72 Q85 85 92 170" stroke="url(#cardioGradient)" strokeWidth="2" fill="none" opacity="0.4" />
                  <path d="M75 72 Q55 68 42 68" stroke="url(#cardioGradient)" strokeWidth="1.5" fill="none" opacity="0.3" />
                  <path d="M75 72 Q95 68 118 68" stroke="url(#cardioGradient)" strokeWidth="1.5" fill="none" opacity="0.3" />
                  {/* Lung representation */}
                  <ellipse cx="70" cy="76" rx="6" ry="8" fill="url(#cardioGradient)" opacity="0.2" />
                  <ellipse cx="90" cy="76" rx="6" ry="8" fill="url(#cardioGradient)" opacity="0.2" />
                </g>
              )}
              
              {/* Hydration overlay - flowing through the body */}
              {hydrationPercentage > 20 && (
                <g className="hydration-overlay" opacity={Math.min(hydrationPercentage / 100, 0.3)}>
                  {/* Head hydration */}
                  <circle cx="80" cy="22" r="16" fill="url(#hydrationGradient)" />
                  
                  {/* Body hydration flow - anatomically accurate */}
                  <path d="M80 50
                           C95 50 105 54 105 62
                           C105 70 103 78 101 86
                           C99 94 97 102 95 110
                           C93 118 91 126 88 134
                           C86 140 83 144 80 146
                           C77 144 74 140 72 134
                           C69 126 67 118 65 110
                           C63 102 61 94 59 86
                           C57 78 55 70 55 62
                           C55 54 65 50 80 50 Z" 
                           fill="url(#hydrationGradient)" />
                  
                  {/* Arms hydration */}
                  <ellipse cx="42" cy="68" rx="7" ry="20" transform="rotate(-15 42 68)" fill="url(#hydrationGradient)" opacity="0.6" />
                  <ellipse cx="118" cy="68" rx="7" ry="20" transform="rotate(15 118 68)" fill="url(#hydrationGradient)" opacity="0.6" />
                  
                  {/* Legs hydration */}
                  <ellipse cx="68" cy="170" rx="9" ry="24" fill="url(#hydrationGradient)" opacity="0.7" />
                  <ellipse cx="92" cy="170" rx="9" ry="24" fill="url(#hydrationGradient)" opacity="0.7" />
                  
                  {/* Animated water droplets flowing through body */}
                  {Array.from({ length: Math.min(current, 4) }, (_, i) => (
                    <circle
                      key={i}
                      cx={76 + (i % 2) * 8}
                      cy={60 + (i * 30)}
                      r="2"
                      fill="#06b6d4"
                      className="animate-bounce"
                      style={{ 
                        animationDelay: `${i * 0.6}s`, 
                        animationDuration: '2.5s',
                        opacity: 0.8 
                      }}
                    />
                  ))}
                  
                  {/* Hydration circulation lines */}
                  <path d="M80 22 Q75 35 80 50" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.4" />
                  <path d="M80 50 Q85 80 80 110" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.4" />
                  <path d="M80 110 Q75 130 80 146" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.4" />
                </g>
              )}
              
              {/* Muscle group labels - Better positioned and cleaner */}
              <g className="text-xs font-medium fill-current opacity-80">
                {muscleActivation.chest && (
                  <text x="45" y="68" textAnchor="middle" className="font-semibold text-red-600 drop-shadow">
                    Chest
                  </text>
                )}
                {muscleActivation.core && (
                  <text x="115" y="105" textAnchor="middle" className="font-semibold text-green-600 drop-shadow">
                    Core
                  </text>
                )}
                {muscleActivation.quads && (
                  <text x="45" y="170" textAnchor="middle" className="font-semibold text-blue-600 drop-shadow">
                    Quads
                  </text>
                )}
                {muscleActivation.calves && (
                  <text x="115" y="205" textAnchor="middle" className="font-semibold text-blue-600 drop-shadow">
                    Calves
                  </text>
                )}
                {muscleActivation.cardio && (
                  <text x="115" y="76" textAnchor="middle" className="font-semibold text-purple-600 drop-shadow">
                    Heart
                  </text>
                )}
                {muscleActivation.shoulders && (
                  <text x="45" y="50" textAnchor="middle" className="font-semibold text-orange-600 drop-shadow">
                    Shoulders
                  </text>
                )}
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