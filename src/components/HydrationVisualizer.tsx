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

        {/* Body Silhouette with Hydration Visualization */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <svg width="120" height="200" viewBox="0 0 120 200" className="text-muted-foreground">
              {/* Body outline */}
              <path
                d="M60 20 
                   C55 20 50 25 50 30
                   L50 45
                   C45 50 40 55 40 65
                   L40 120
                   C40 130 45 135 50 135
                   L50 160
                   C45 165 40 170 40 180
                   L40 190
                   C40 195 45 200 50 200
                   L70 200
                   C75 200 80 195 80 190
                   L80 180
                   C80 170 75 165 70 160
                   L70 135
                   C75 135 80 130 80 120
                   L80 65
                   C80 55 75 50 70 45
                   L70 30
                   C70 25 65 20 60 20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-40"
              />
              
              {/* Head */}
              <circle 
                cx="60" 
                cy="15" 
                r="12" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="opacity-40"
              />
              
              {/* Hydration fill */}
              <defs>
                <linearGradient id="hydrationGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              
              {hydrationPercentage > 0 && (
                <path
                  d="M60 20 
                     C55 20 50 25 50 30
                     L50 45
                     C45 50 40 55 40 65
                     L40 120
                     C40 130 45 135 50 135
                     L50 160
                     C45 165 40 170 40 180
                     L40 190
                     C40 195 45 200 50 200
                     L70 200
                     C75 200 80 195 80 190
                     L80 180
                     C80 170 75 165 70 160
                     L70 135
                     C75 135 80 130 80 120
                     L80 65
                     C80 55 75 50 70 45
                     L70 30
                     C70 25 65 20 60 20 Z"
                  fill="url(#hydrationGradient)"
                  clipPath="url(#hydrationClip)"
                  className="water-fill"
                />
              )}
              
              {/* Clip path for hydration level */}
              <defs>
                <clipPath id="hydrationClip">
                  <rect 
                    x="0" 
                    y={200 - (hydrationPercentage / 100) * 180} 
                    width="120" 
                    height={(hydrationPercentage / 100) * 180}
                  />
                </clipPath>
              </defs>
              
              {/* Water droplets animation */}
              {current > 0 && (
                <g>
                  {Array.from({ length: Math.min(current, 6) }, (_, i) => (
                    <circle
                      key={i}
                      cx={45 + (i % 2) * 30}
                      cy={50 + (i * 20)}
                      r="1.5"
                      fill="#60a5fa"
                      className="droplet-fall"
                      style={{ 
                        animationDelay: `${i * 0.3}s`,
                        opacity: Math.max(0.3, 1 - (i * 0.15))
                      }}
                    />
                  ))}
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-blue-500 mb-1">
            {Math.round(hydrationPercentage)}%
          </div>
          <div className="text-sm text-muted-foreground">
            Hydrated
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