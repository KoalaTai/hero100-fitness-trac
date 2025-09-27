import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus, Drop } from '@phosphor-icons/react'

interface HydrationVisualizerProps {
  current: number
  target: number
  onAdjust: (delta: number) => void
  complete: boolean
}

export function HydrationVisualizer({ current, target, onAdjust, complete }: HydrationVisualizerProps) {
  const hydrationPercentage = Math.min((current / target) * 100, 100)
  
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

        {/* Human/Android Body Hydration Visualization */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <svg 
              width="140" 
              height="220" 
              viewBox="0 0 140 220" 
              className={`text-muted-foreground hydration-body transition-all duration-500 ${
                hydrationPercentage >= 100 ? 'hydrated' : ''
              }`}
            >
              <defs>
                {/* Hydration gradient with wave effect */}
                <linearGradient id="hydrationGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.9" />
                  <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.7" />
                  <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.3" />
                </linearGradient>
                
                {/* Clip path for hydration level with wave effect */}
                <clipPath id="hydrationClip">
                  <rect 
                    x="0" 
                    y={220 - (hydrationPercentage / 100) * 190} 
                    width="140" 
                    height={(hydrationPercentage / 100) * 190}
                  />
                </clipPath>

                {/* Body mask for proper filling */}
                <mask id="bodyMask">
                  <rect width="140" height="220" fill="black"/>
                  {/* Head */}
                  <circle cx="70" cy="18" r="15" fill="white"/>
                  {/* Neck */}
                  <rect x="62" y="30" width="16" height="12" rx="8" fill="white"/>
                  {/* Main body */}
                  <path
                    d="M70 40
                       C80 40 90 45 90 55
                       L90 70
                       C95 75 100 80 100 90
                       L100 130
                       C100 140 95 145 90 145
                       L90 160
                       C90 170 85 175 80 175
                       L80 195
                       C80 200 75 205 70 205
                       L70 205
                       C65 205 60 200 60 195
                       L60 175
                       C55 175 50 170 50 160
                       L50 145
                       C45 145 40 140 40 130
                       L40 90
                       C40 80 45 75 50 70
                       L50 55
                       C50 45 60 40 70 40 Z"
                    fill="white"
                  />
                  {/* Arms */}
                  <ellipse cx="25" cy="75" rx="8" ry="25" fill="white"/>
                  <ellipse cx="115" cy="75" rx="8" ry="25" fill="white"/>
                  {/* Legs */}
                  <ellipse cx="55" cy="185" rx="8" ry="20" fill="white"/>
                  <ellipse cx="85" cy="185" rx="8" ry="20" fill="white"/>
                </mask>
              </defs>
              
              {/* Android/Human body outline */}
              <g stroke="currentColor" strokeWidth="2.5" fill="none" className="opacity-50">
                {/* Head with slight android/tech feel */}
                <circle cx="70" cy="18" r="15"/>
                <circle cx="65" cy="15" r="1.5" fill="currentColor" className="opacity-60"/> {/* Eye */}
                <circle cx="75" cy="15" r="1.5" fill="currentColor" className="opacity-60"/> {/* Eye */}
                <path d="M65 22 Q70 25 75 22" strokeWidth="1.5" className="opacity-60"/> {/* Mouth */}
                
                {/* Neck */}
                <rect x="62" y="30" width="16" height="12" rx="8"/>
                
                {/* Main torso - slightly robotic proportions */}
                <path d="M70 40
                         C80 40 90 45 90 55
                         L90 70
                         C95 75 100 80 100 90
                         L100 130
                         C100 140 95 145 90 145
                         L90 160
                         C90 170 85 175 80 175
                         L80 195
                         C80 200 75 205 70 205
                         L70 205
                         C65 205 60 200 60 195
                         L60 175
                         C55 175 50 170 50 160
                         L50 145
                         C45 145 40 140 40 130
                         L40 90
                         C40 80 45 75 50 70
                         L50 55
                         C50 45 60 40 70 40 Z"/>
                
                {/* Arms */}
                <ellipse cx="25" cy="75" rx="8" ry="25"/>
                <ellipse cx="115" cy="75" rx="8" ry="25"/>
                
                {/* Legs */}
                <ellipse cx="55" cy="185" rx="8" ry="20"/>
                <ellipse cx="85" cy="185" rx="8" ry="20"/>
                
                {/* Tech details */}
                <circle cx="70" cy="60" r="3" className="opacity-30"/> {/* Chest indicator */}
                <rect x="65" y="80" width="10" height="3" rx="1" className="opacity-20"/> {/* Body panel */}
                <rect x="65" y="90" width="10" height="3" rx="1" className="opacity-20"/> {/* Body panel */}
              </g>
              
              {/* Hydration fill with wave effect */}
              {hydrationPercentage > 0 && (
                <rect
                  x="0"
                  y="0"
                  width="140"
                  height="220"
                  fill="url(#hydrationGradient)"
                  mask="url(#bodyMask)"
                  clipPath="url(#hydrationClip)"
                  className="water-fill"
                />
              )}
              
              {/* Animated water particles inside body */}
              {current > 0 && (
                <g mask="url(#bodyMask)">
                  {Array.from({ length: Math.min(current, 8) }, (_, i) => (
                    <g key={i}>
                      <circle
                        cx={50 + (i % 3) * 20}
                        cy={60 + (i * 15)}
                        r="2"
                        fill="#0ea5e9"
                        className="droplet-fall"
                        style={{ 
                          animationDelay: `${i * 0.4}s`,
                          opacity: Math.max(0.4, 1 - (i * 0.12))
                        }}
                      />
                      {/* Small bubble effect */}
                      <circle
                        cx={55 + (i % 2) * 15}
                        cy={80 + (i * 12)}
                        r="1"
                        fill="#60a5fa"
                        className="droplet-fall"
                        style={{ 
                          animationDelay: `${i * 0.5 + 0.2}s`,
                          opacity: 0.6
                        }}
                      />
                    </g>
                  ))}
                </g>
              )}

              {/* Hydration level indicator line */}
              {hydrationPercentage > 5 && (
                <line
                  x1="30"
                  y1={220 - (hydrationPercentage / 100) * 190}
                  x2="110"
                  y2={220 - (hydrationPercentage / 100) * 190}
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="opacity-70"
                />
              )}
            </svg>
          </div>
        </div>

        {/* Progress indicator with status */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-blue-500 mb-1">
            {Math.round(hydrationPercentage)}%
          </div>
          <div className="text-sm text-muted-foreground">
            {hydrationPercentage >= 100 ? 'Fully Hydrated! 🌊' : 
             hydrationPercentage >= 75 ? 'Well Hydrated 💧' :
             hydrationPercentage >= 50 ? 'Getting There 💦' :
             hydrationPercentage >= 25 ? 'Need More Water 🥤' :
             'Dehydrated ⚠️'}
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