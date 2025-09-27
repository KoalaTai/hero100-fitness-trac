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

        {/* Human Body Hydration Visualization */}
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
                    y={220 - (hydrationPercentage / 100) * 195} 
                    width="140" 
                    height={(hydrationPercentage / 100) * 195}
                  />
                </clipPath>

                {/* Body mask for proper filling - realistic human proportions */}
                <mask id="bodyMask">
                  <rect width="140" height="220" fill="black"/>
                  
                  {/* Head - realistic human skull shape */}
                  <path d="M70 5 
                          C82 5 88 12 88 22
                          C88 28 86 32 82 35
                          C80 37 76 38 70 38
                          C64 38 60 37 58 35
                          C54 32 52 28 52 22
                          C52 12 58 5 70 5 Z" 
                        fill="white"/>
                  
                  {/* Neck - natural cylinder */}
                  <rect x="62" y="38" width="16" height="12" rx="8" fill="white"/>
                  
                  {/* Torso - anatomically correct human silhouette */}
                  <path d="M70 50
                          C90 50 100 55 100 65
                          C100 70 98 75 95 80
                          C92 85 90 90 88 95
                          L88 105
                          C88 115 85 125 80 135
                          C78 140 75 145 70 148
                          C65 145 62 140 60 135
                          C55 125 52 115 52 105
                          L52 95
                          C50 90 48 85 45 80
                          C42 75 40 70 40 65
                          C40 55 50 50 70 50 Z" 
                        fill="white"/>
                  
                  {/* Pelvis and hips - natural human shape */}
                  <ellipse cx="70" cy="155" rx="25" ry="15" fill="white"/>
                  
                  {/* Arms - realistic arm proportions */}
                  <ellipse cx="25" cy="75" rx="8" ry="25" fill="white" transform="rotate(-10 25 75)"/>
                  <ellipse cx="115" cy="75" rx="8" ry="25" fill="white" transform="rotate(10 115 75)"/>
                  <ellipse cx="20" cy="100" rx="6" ry="20" fill="white"/>
                  <ellipse cx="120" cy="100" rx="6" ry="20" fill="white"/>
                  
                  {/* Legs - proper human leg proportions */}
                  <ellipse cx="58" cy="180" rx="10" ry="30" fill="white"/>
                  <ellipse cx="82" cy="180" rx="10" ry="30" fill="white"/>
                  <ellipse cx="56" cy="200" rx="8" ry="18" fill="white"/>
                  <ellipse cx="84" cy="200" rx="8" ry="18" fill="white"/>
                </mask>
              </defs>
              
              {/* Realistic human body outline */}
              <g stroke="currentColor" strokeWidth="1.8" fill="none" className="opacity-70">
                
                {/* Head - realistic human skull contour */}
                <path d="M70 5 
                        C82 5 88 12 88 22
                        C88 28 86 32 82 35
                        C80 37 76 38 70 38
                        C64 38 60 37 58 35
                        C54 32 52 28 52 22
                        C52 12 58 5 70 5 Z"/>
                
                {/* Detailed facial features */}
                <ellipse cx="64" cy="18" rx="2" ry="1.5" fill="currentColor" className="opacity-60"/> {/* Left eye */}
                <ellipse cx="76" cy="18" rx="2" ry="1.5" fill="currentColor" className="opacity-60"/> {/* Right eye */}
                <circle cx="64" cy="17.5" r="0.8" fill="white" className="opacity-80"/> {/* Left eye highlight */}
                <circle cx="76" cy="17.5" r="0.8" fill="white" className="opacity-80"/> {/* Right eye highlight */}
                
                {/* Eyebrows */}
                <path d="M61 15 Q64 14 67 15" strokeWidth="1" className="opacity-50"/>
                <path d="M73 15 Q76 14 79 15" strokeWidth="1" className="opacity-50"/>
                
                {/* Nose - more defined */}
                <path d="M70 20 L69 24 Q70 25 71 24 L70 20" fill="currentColor" className="opacity-40"/>
                <circle cx="68.5" cy="24" r="0.5" fill="currentColor" className="opacity-30"/> {/* Left nostril */}
                <circle cx="71.5" cy="24" r="0.5" fill="currentColor" className="opacity-30"/> {/* Right nostril */}
                
                {/* Mouth - more natural */}
                <path d="M66 28 Q70 30 74 28" strokeWidth="1.2" className="opacity-70"/>
                
                {/* Hair - more detailed */}
                <path d="M54 15 Q58 8 70 8 Q82 8 86 15 Q84 10 80 12 Q75 6 70 6 Q65 6 60 12 Q56 10 54 15" 
                      strokeWidth="1.5" className="opacity-50" fill="currentColor" fillOpacity="0.1"/>
                
                {/* Neck - cylindrical */}
                <rect x="62" y="38" width="16" height="12" rx="8" ry="6"/>
                
                {/* Shoulders and chest - anatomically correct */}
                <path d="M70 50
                        C90 50 100 55 100 65
                        C100 70 98 75 95 80
                        C92 85 90 90 88 95
                        L88 105
                        C88 115 85 125 80 135
                        C78 140 75 145 70 148
                        C65 145 62 140 60 135
                        C55 125 52 115 52 105
                        L52 95
                        C50 90 48 85 45 80
                        C42 75 40 70 40 65
                        C40 55 50 50 70 50 Z"/>
                
                {/* Pelvis */}
                <ellipse cx="70" cy="155" rx="25" ry="15"/>
                
                {/* Arms - realistic proportions with joints */}
                <ellipse cx="25" cy="75" rx="8" ry="25" transform="rotate(-10 25 75)"/>
                <ellipse cx="115" cy="75" rx="8" ry="25" transform="rotate(10 115 75)"/>
                <circle cx="25" cy="65" r="4" className="opacity-40"/> {/* Left shoulder joint */}
                <circle cx="115" cy="65" r="4" className="opacity-40"/> {/* Right shoulder joint */}
                
                {/* Forearms */}
                <ellipse cx="20" cy="100" rx="6" ry="20"/>
                <ellipse cx="120" cy="100" rx="6" ry="20"/>
                <circle cx="20" cy="85" r="3" className="opacity-40"/> {/* Left elbow */}
                <circle cx="120" cy="85" r="3" className="opacity-40"/> {/* Right elbow */}
                
                {/* Hands - more detailed */}
                <ellipse cx="18" cy="120" rx="4" ry="6" className="opacity-60"/>
                <ellipse cx="122" cy="120" rx="4" ry="6" className="opacity-60"/>
                
                {/* Thighs */}
                <ellipse cx="58" cy="180" rx="10" ry="30"/>
                <ellipse cx="82" cy="180" rx="10" ry="30"/>
                <circle cx="58" cy="160" r="4" className="opacity-40"/> {/* Left hip joint */}
                <circle cx="82" cy="160" r="4" className="opacity-40"/> {/* Right hip joint */}
                
                {/* Calves */}
                <ellipse cx="56" cy="200" rx="8" ry="18"/>
                <ellipse cx="84" cy="200" rx="8" ry="18"/>
                <circle cx="56" cy="190" r="3" className="opacity-40"/> {/* Left knee */}
                <circle cx="84" cy="190" r="3" className="opacity-40"/> {/* Right knee */}
                
                {/* Feet - more realistic */}
                <ellipse cx="54" cy="216" rx="10" ry="5" className="opacity-60"/>
                <ellipse cx="86" cy="216" rx="10" ry="5" className="opacity-60"/>
                
                {/* Body details */}
                <line x1="65" y1="60" x2="75" y2="60" strokeWidth="1" className="opacity-25"/> {/* Collar bone */}
                <circle cx="70" cy="85" r="1.5" className="opacity-25"/> {/* Navel */}
                <line x1="70" y1="68" x2="70" y2="75" strokeWidth="0.8" className="opacity-20"/> {/* Center line */}
                
                {/* Muscle definition hints */}
                <path d="M60 75 Q65 78 70 75 Q75 78 80 75" strokeWidth="0.8" className="opacity-15"/> {/* Chest muscles */}
                <ellipse cx="63" cy="95" rx="3" ry="8" className="opacity-10"/> {/* Left abs */}
                <ellipse cx="77" cy="95" rx="3" ry="8" className="opacity-10"/> {/* Right abs */}
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
              
              {/* Animated water particles showing realistic circulation */}
              {current > 0 && (
                <g mask="url(#bodyMask)">
                  {/* Brain/head hydration - cognitive function */}
                  {current >= 1 && (
                    <g>
                      <circle cx="66" cy="20" r="1" fill="#0ea5e9" className="droplet-fall" 
                              style={{ animationDelay: '0.1s', opacity: 0.8 }} />
                      <circle cx="74" cy="22" r="1" fill="#3b82f6" className="droplet-fall" 
                              style={{ animationDelay: '0.3s', opacity: 0.7 }} />
                    </g>
                  )}
                  
                  {/* Heart and circulatory system */}
                  {Array.from({ length: Math.min(current, 5) }, (_, i) => (
                    <g key={`circulation-${i}`}>
                      <circle
                        cx={66 + (i % 3) * 4}
                        cy={75 + (i * 6)}
                        r="1.5"
                        fill="#0ea5e9"
                        className="droplet-fall"
                        style={{ 
                          animationDelay: `${i * 0.4}s`,
                          opacity: Math.max(0.5, 0.9 - (i * 0.1))
                        }}
                      />
                    </g>
                  ))}
                  
                  {/* Kidney and filtration system */}
                  {current >= 3 && (
                    <g>
                      <circle cx="58" cy="110" r="1.5" fill="#60a5fa" className="droplet-fall" 
                              style={{ animationDelay: '0.8s', opacity: 0.7 }} />
                      <circle cx="82" cy="112" r="1.5" fill="#60a5fa" className="droplet-fall" 
                              style={{ animationDelay: '1.0s', opacity: 0.7 }} />
                    </g>
                  )}
                  
                  {/* Digestive system hydration */}
                  {Array.from({ length: Math.min(current, 3) }, (_, i) => (
                    <circle
                      key={`digestive-${i}`}
                      cx={65 + (i % 2) * 10}
                      cy={90 + (i * 15)}
                      r="2"
                      fill="#93c5fd"
                      className="droplet-fall"
                      style={{ 
                        animationDelay: `${i * 0.7 + 0.5}s`,
                        opacity: 0.6
                      }}
                    />
                  ))}
                  
                  {/* Limb circulation - arms and legs */}
                  {current >= 4 && (
                    <>
                      {/* Arms */}
                      <circle cx="25" cy="85" r="1" fill="#60a5fa" className="droplet-fall" 
                              style={{ animationDelay: '1.2s', opacity: 0.6 }} />
                      <circle cx="115" cy="87" r="1" fill="#60a5fa" className="droplet-fall" 
                              style={{ animationDelay: '1.4s', opacity: 0.6 }} />
                      
                      {/* Legs */}
                      <circle cx="58" cy="175" r="1" fill="#60a5fa" className="droplet-fall" 
                              style={{ animationDelay: '1.6s', opacity: 0.6 }} />
                      <circle cx="82" cy="177" r="1" fill="#60a5fa" className="droplet-fall" 
                              style={{ animationDelay: '1.8s', opacity: 0.6 }} />
                    </>
                  )}
                  
                  {/* Joint lubrication indicators */}
                  {current >= 6 && (
                    <>
                      <circle cx="25" cy="65" r="0.5" fill="#93c5fd" className="droplet-fall" 
                              style={{ animationDelay: '2s', opacity: 0.5 }} />
                      <circle cx="115" cy="65" r="0.5" fill="#93c5fd" className="droplet-fall" 
                              style={{ animationDelay: '2.2s', opacity: 0.5 }} />
                      <circle cx="56" cy="190" r="0.5" fill="#93c5fd" className="droplet-fall" 
                              style={{ animationDelay: '2.4s', opacity: 0.5 }} />
                      <circle cx="84" cy="190" r="0.5" fill="#93c5fd" className="droplet-fall" 
                              style={{ animationDelay: '2.6s', opacity: 0.5 }} />
                    </>
                  )}
                  
                  {/* Cellular hydration indicators throughout body */}
                  {current >= 7 && (
                    <g opacity="0.4">
                      <circle cx="45" cy="70" r="0.8" fill="#dbeafe" className="droplet-fall" 
                              style={{ animationDelay: '3s' }} />
                      <circle cx="95" cy="72" r="0.8" fill="#dbeafe" className="droplet-fall" 
                              style={{ animationDelay: '3.2s' }} />
                      <circle cx="50" cy="130" r="0.8" fill="#dbeafe" className="droplet-fall" 
                              style={{ animationDelay: '3.4s' }} />
                      <circle cx="90" cy="132" r="0.8" fill="#dbeafe" className="droplet-fall" 
                              style={{ animationDelay: '3.6s' }} />
                    </g>
                  )}
                </g>
              )}

              {/* Hydration level indicator line */}
              {hydrationPercentage > 5 && (
                <line
                  x1="30"
                  y1={220 - (hydrationPercentage / 100) * 195}
                  x2="110"
                  y2={220 - (hydrationPercentage / 100) * 195}
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