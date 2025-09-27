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
              
              {/* Enhanced anatomically detailed human cartoon character */}
              <g className="human-figure" filter="url(#shadow)">
                
                {/* Base skin layer with enhanced muscle definition */}
                <g fill="#FDB99B" stroke="none">
                  {/* Head - perfect circle */}
                  <circle cx="80" cy="22" r="16" />
                  
                  {/* Neck - trapezius definition */}
                  <path d="M74 38 
                           C76 36 80 36 84 38
                           C86 40 84 46 82 50
                           L78 50
                           C76 46 74 40 74 38 Z" />
                  
                  {/* Enhanced torso with clear muscle segments */}
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
                  
                  {/* Left shoulder - deltoid definition */}
                  <ellipse cx="50" cy="58" rx="8" ry="12" transform="rotate(-20 50 58)" />
                  <ellipse cx="44" cy="72" rx="6" ry="14" transform="rotate(-10 44 72)" />
                  
                  {/* Left upper arm - bicep and tricep */}
                  <ellipse cx="42" cy="68" rx="6" ry="18" transform="rotate(-15 42 68)" />
                  <ellipse cx="38" cy="72" rx="4" ry="12" transform="rotate(-15 38 72)" />
                  
                  {/* Left forearm - with muscle definition */}
                  <ellipse cx="34" cy="92" rx="5" ry="16" transform="rotate(-5 34 92)" />
                  <ellipse cx="32" cy="88" rx="3" ry="10" transform="rotate(-5 32 88)" />
                  
                  {/* Right shoulder - deltoid definition */}
                  <ellipse cx="110" cy="58" rx="8" ry="12" transform="rotate(20 110 58)" />
                  <ellipse cx="116" cy="72" rx="6" ry="14" transform="rotate(10 116 72)" />
                  
                  {/* Right upper arm - bicep and tricep */}
                  <ellipse cx="118" cy="68" rx="6" ry="18" transform="rotate(15 118 68)" />
                  <ellipse cx="122" cy="72" rx="4" ry="12" transform="rotate(15 122 72)" />
                  
                  {/* Right forearm - with muscle definition */}
                  <ellipse cx="126" cy="92" rx="5" ry="16" transform="rotate(5 126 92)" />
                  <ellipse cx="128" cy="88" rx="3" ry="10" transform="rotate(5 128 88)" />
                  
                  {/* Enhanced hands with thumb */}
                  <ellipse cx="30" cy="110" rx="4" ry="6" transform="rotate(-10 30 110)" />
                  <circle cx="28" cy="107" r="2" />
                  <ellipse cx="130" cy="110" rx="4" ry="6" transform="rotate(10 130 110)" />
                  <circle cx="132" cy="107" r="2" />
                  
                  {/* Hip area with gluteal definition */}
                  <ellipse cx="80" cy="146" rx="18" ry="12" />
                  <ellipse cx="72" cy="144" rx="6" ry="8" />
                  <ellipse cx="88" cy="144" rx="6" ry="8" />
                  
                  {/* Left thigh - quadriceps and hamstring segments */}
                  <ellipse cx="68" cy="165" rx="8" ry="20" />
                  <ellipse cx="65" cy="160" rx="5" ry="15" />
                  <ellipse cx="71" cy="160" rx="5" ry="15" />
                  <ellipse cx="68" cy="175" rx="6" ry="12" />
                  
                  {/* Right thigh - quadriceps and hamstring segments */}
                  <ellipse cx="92" cy="165" rx="8" ry="20" />
                  <ellipse cx="89" cy="160" rx="5" ry="15" />
                  <ellipse cx="95" cy="160" rx="5" ry="15" />
                  <ellipse cx="92" cy="175" rx="6" ry="12" />
                  
                  {/* Left calf - gastrocnemius and soleus */}
                  <ellipse cx="68" cy="200" rx="6" ry="18" />
                  <ellipse cx="66" cy="195" rx="4" ry="12" />
                  <ellipse cx="70" cy="195" rx="4" ry="12" />
                  <ellipse cx="68" cy="210" rx="5" ry="10" />
                  
                  {/* Right calf - gastrocnemius and soleus */}
                  <ellipse cx="92" cy="200" rx="6" ry="18" />
                  <ellipse cx="90" cy="195" rx="4" ry="12" />
                  <ellipse cx="94" cy="195" rx="4" ry="12" />
                  <ellipse cx="92" cy="210" rx="5" ry="10" />
                  
                  {/* Enhanced feet with ankle definition */}
                  <ellipse cx="64" cy="225" rx="3" ry="8" />
                  <ellipse cx="64" cy="232" rx="9" ry="4" />
                  <ellipse cx="96" cy="225" rx="3" ry="8" />
                  <ellipse cx="96" cy="232" rx="9" ry="4" />
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
                
                {/* Enhanced muscle definition lines - anatomically detailed */}
                <g stroke="#E8A575" strokeWidth="0.8" fill="none" opacity="0.4">
                  {/* Pectoral muscles - chest definition */}
                  <path d="M68 60 Q80 65 92 60" />
                  <path d="M70 68 Q80 72 90 68" />
                  <path d="M72 64 L88 64" />
                  
                  {/* Serratus anterior - ribcage muscles */}
                  <path d="M95 75 Q98 78 95 82" />
                  <path d="M95 82 Q98 85 95 89" />
                  <path d="M65 75 Q62 78 65 82" />
                  <path d="M65 82 Q62 85 65 89" />
                  
                  {/* Enhanced rectus abdominis - six-pack definition */}
                  <line x1="76" y1="88" x2="76" y2="130" />
                  <line x1="84" y1="88" x2="84" y2="130" />
                  <path d="M68 92 L92 92" />
                  <path d="M68 102 L92 102" />
                  <path d="M68 112 L92 112" />
                  <path d="M68 122 L92 122" />
                  
                  {/* Obliques - side ab definition */}
                  <path d="M62 95 Q68 98 65 105" />
                  <path d="M98 95 Q92 98 95 105" />
                  <path d="M60 105 Q66 108 63 115" />
                  <path d="M100 105 Q94 108 97 115" />
                  
                  {/* Deltoid definition - shoulder muscles */}
                  <path d="M48 55 Q52 60 48 65" />
                  <path d="M112 55 Q108 60 112 65" />
                  <ellipse cx="50" cy="60" rx="6" ry="3" fill="none" />
                  <ellipse cx="110" cy="60" rx="6" ry="3" fill="none" />
                  
                  {/* Bicep definition */}
                  <path d="M38 65 Q42 70 38 75" />
                  <path d="M122 65 Q118 70 122 75" />
                  
                  {/* Tricep definition */}
                  <path d="M46 65 Q50 70 46 75" />
                  <path d="M114 65 Q110 70 114 75" />
                  
                  {/* Forearm muscles */}
                  <path d="M30 85 Q34 90 30 95" />
                  <path d="M130 85 Q126 90 130 95" />
                  <path d="M36 88 L36 100" />
                  <path d="M124 88 L124 100" />
                  
                  {/* Vastus medialis and lateralis - quad definition */}
                  <path d="M64 155 L64 180" />
                  <path d="M72 155 L72 180" />
                  <path d="M88 155 L88 180" />
                  <path d="M96 155 L96 180" />
                  
                  {/* Hamstring definition */}
                  <path d="M66 160 Q68 170 66 180" />
                  <path d="M94 160 Q92 170 94 180" />
                  
                  {/* Gastrocnemius - calf muscle heads */}
                  <path d="M64 190 Q68 195 64 205" />
                  <path d="M72 190 Q68 195 72 205" />
                  <path d="M88 190 Q92 195 88 205" />
                  <path d="M96 190 Q92 195 96 205" />
                  
                  {/* Soleus - deeper calf muscle */}
                  <path d="M66 200 L66 215" />
                  <path d="M70 200 L70 215" />
                  <path d="M90 200 L90 215" />
                  <path d="M94 200 L94 215" />
                  
                  {/* Tibialis anterior - shin muscle */}
                  <path d="M62 190 L62 220" />
                  <path d="M98 190 L98 220" />
                  
                  {/* Gluteus maximus definition */}
                  <path d="M70 142 Q76 146 70 150" />
                  <path d="M90 142 Q84 146 90 150" />
                </g>
              </g>
              
              {/* Enhanced muscle group highlighting - more anatomically precise */}
              
              {/* Pectoral muscles (pushups) - major and minor */}
              {muscleActivation.chest && (
                <g className="muscle-highlight">
                  <ellipse cx="72" cy="68" rx="10" ry="8" fill="url(#chestGradient)" className="animate-pulse" opacity="0.7" />
                  <ellipse cx="88" cy="68" rx="10" ry="8" fill="url(#chestGradient)" className="animate-pulse" opacity="0.7" />
                  <path d="M68 62 Q80 70 92 62" fill="url(#chestGradient)" opacity="0.5" />
                  <ellipse cx="74" cy="74" rx="6" ry="5" fill="url(#chestGradient)" opacity="0.4" />
                  <ellipse cx="86" cy="74" rx="6" ry="5" fill="url(#chestGradient)" opacity="0.4" />
                </g>
              )}
              
              {/* Anterior deltoid (pushups) - front shoulder */}
              {muscleActivation.shoulders && (
                <g className="muscle-highlight">
                  <ellipse cx="50" cy="58" rx="6" ry="10" fill="url(#shoulderGradient)" className="animate-pulse" opacity="0.8" />
                  <ellipse cx="110" cy="58" rx="6" ry="10" fill="url(#shoulderGradient)" className="animate-pulse" opacity="0.8" />
                  <ellipse cx="44" cy="72" rx="4" ry="8" fill="url(#shoulderGradient)" opacity="0.6" />
                  <ellipse cx="116" cy="72" rx="4" ry="8" fill="url(#shoulderGradient)" opacity="0.6" />
                </g>
              )}
              
              {/* Triceps (pushups) - all three heads */}
              {muscleActivation.triceps && (
                <g className="muscle-highlight">
                  <ellipse cx="38" cy="72" rx="3" ry="10" fill="url(#shoulderGradient)" opacity="0.7" />
                  <ellipse cx="122" cy="72" rx="3" ry="10" fill="url(#shoulderGradient)" opacity="0.7" />
                  <ellipse cx="42" cy="75" rx="2" ry="8" fill="url(#shoulderGradient)" opacity="0.5" />
                  <ellipse cx="118" cy="75" rx="2" ry="8" fill="url(#shoulderGradient)" opacity="0.5" />
                </g>
              )}
              
              {/* Rectus abdominis (situps) - enhanced six-pack definition */}
              {muscleActivation.abs && (
                <g className="muscle-highlight">
                  {/* Upper abs */}
                  <rect x="73" y="88" width="6" height="8" rx="3" fill="url(#coreGradient)" className="animate-pulse" opacity="0.8" />
                  <rect x="81" y="88" width="6" height="8" rx="3" fill="url(#coreGradient)" className="animate-pulse" opacity="0.8" />
                  {/* Middle abs */}
                  <rect x="73" y="98" width="6" height="8" rx="3" fill="url(#coreGradient)" className="animate-pulse" opacity="0.8" />
                  <rect x="81" y="98" width="6" height="8" rx="3" fill="url(#coreGradient)" className="animate-pulse" opacity="0.8" />
                  {/* Lower abs */}
                  <rect x="73" y="108" width="6" height="8" rx="3" fill="url(#coreGradient)" opacity="0.7" />
                  <rect x="81" y="108" width="6" height="8" rx="3" fill="url(#coreGradient)" opacity="0.7" />
                  {/* Lower lower abs */}
                  <rect x="73" y="118" width="6" height="8" rx="3" fill="url(#coreGradient)" opacity="0.6" />
                  <rect x="81" y="118" width="6" height="8" rx="3" fill="url(#coreGradient)" opacity="0.6" />
                </g>
              )}
              
              {/* External obliques (situps) - enhanced side definition */}
              {muscleActivation.core && (
                <g className="muscle-highlight">
                  <ellipse cx="60" cy="95" rx="3" ry="10" fill="url(#coreGradient)" opacity="0.6" />
                  <ellipse cx="100" cy="95" rx="3" ry="10" fill="url(#coreGradient)" opacity="0.6" />
                  <ellipse cx="58" cy="110" rx="3" ry="12" fill="url(#coreGradient)" opacity="0.5" />
                  <ellipse cx="102" cy="110" rx="3" ry="12" fill="url(#coreGradient)" opacity="0.5" />
                  <ellipse cx="62" cy="125" rx="4" ry="8" fill="url(#coreGradient)" opacity="0.4" />
                  <ellipse cx="98" cy="125" rx="4" ry="8" fill="url(#coreGradient)" opacity="0.4" />
                </g>
              )}
              
              {/* Quadriceps (squats) - all four heads */}
              {muscleActivation.quads && (
                <g className="muscle-highlight">
                  {/* Vastus lateralis */}
                  <ellipse cx="72" cy="165" rx="4" ry="16" fill="url(#legGradient)" className="animate-pulse" opacity="0.8" />
                  <ellipse cx="88" cy="165" rx="4" ry="16" fill="url(#legGradient)" className="animate-pulse" opacity="0.8" />
                  {/* Vastus medialis */}
                  <ellipse cx="65" cy="170" rx="3" ry="14" fill="url(#legGradient)" className="animate-pulse" opacity="0.8" />
                  <ellipse cx="95" cy="170" rx="3" ry="14" fill="url(#legGradient)" className="animate-pulse" opacity="0.8" />
                  {/* Rectus femoris */}
                  <ellipse cx="68" cy="160" rx="3" ry="18" fill="url(#legGradient)" opacity="0.7" />
                  <ellipse cx="92" cy="160" rx="3" ry="18" fill="url(#legGradient)" opacity="0.7" />
                  {/* Vastus intermedius (deeper) */}
                  <ellipse cx="68" cy="168" rx="5" ry="12" fill="url(#legGradient)" opacity="0.5" />
                  <ellipse cx="92" cy="168" rx="5" ry="12" fill="url(#legGradient)" opacity="0.5" />
                </g>
              )}
              
              {/* Gluteus maximus, medius, minimus (squats) */}
              {muscleActivation.glutes && (
                <g className="muscle-highlight">
                  <ellipse cx="72" cy="146" rx="8" ry="8" fill="url(#legGradient)" opacity="0.7" />
                  <ellipse cx="88" cy="146" rx="8" ry="8" fill="url(#legGradient)" opacity="0.7" />
                  <ellipse cx="70" cy="140" rx="4" ry="5" fill="url(#legGradient)" opacity="0.5" />
                  <ellipse cx="90" cy="140" rx="4" ry="5" fill="url(#legGradient)" opacity="0.5" />
                </g>
              )}
              
              {/* Hamstrings (running) - biceps femoris, semitendinosus, semimembranosus */}
              {muscleActivation.hamstrings && (
                <g className="muscle-highlight">
                  <ellipse cx="66" cy="170" rx="3" ry="14" fill="url(#legGradient)" opacity="0.6" />
                  <ellipse cx="94" cy="170" rx="3" ry="14" fill="url(#legGradient)" opacity="0.6" />
                  <ellipse cx="70" cy="175" rx="2" ry="12" fill="url(#legGradient)" opacity="0.5" />
                  <ellipse cx="90" cy="175" rx="2" ry="12" fill="url(#legGradient)" opacity="0.5" />
                </g>
              )}
              
              {/* Gastrocnemius and soleus (running) - calf complex */}
              {muscleActivation.calves && (
                <g className="muscle-highlight">
                  {/* Gastrocnemius - two heads */}
                  <ellipse cx="66" cy="200" rx="3" ry="12" fill="url(#legGradient)" className="animate-pulse" opacity="0.8" />
                  <ellipse cx="70" cy="200" rx="3" ry="12" fill="url(#legGradient)" className="animate-pulse" opacity="0.8" />
                  <ellipse cx="90" cy="200" rx="3" ry="12" fill="url(#legGradient)" className="animate-pulse" opacity="0.8" />
                  <ellipse cx="94" cy="200" rx="3" ry="12" fill="url(#legGradient)" className="animate-pulse" opacity="0.8" />
                  {/* Soleus - deeper muscle */}
                  <ellipse cx="68" cy="210" rx="4" ry="8" fill="url(#legGradient)" opacity="0.6" />
                  <ellipse cx="92" cy="210" rx="4" ry="8" fill="url(#legGradient)" opacity="0.6" />
                  {/* Tibialis anterior - shin */}
                  <ellipse cx="62" cy="205" rx="2" ry="12" fill="url(#legGradient)" opacity="0.4" />
                  <ellipse cx="98" cy="205" rx="2" ry="12" fill="url(#legGradient)" opacity="0.4" />
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
              
              {/* Enhanced hydration overlay - flowing through the detailed body */}
              {hydrationPercentage > 20 && (
                <g className="hydration-overlay" opacity={Math.min(hydrationPercentage / 100, 0.25)}>
                  {/* Head hydration */}
                  <circle cx="80" cy="22" r="16" fill="url(#hydrationGradient)" />
                  
                  {/* Enhanced neck and trapezius hydration */}
                  <path d="M74 38 
                           C76 36 80 36 84 38
                           C86 40 84 46 82 50
                           L78 50
                           C76 46 74 40 74 38 Z" 
                           fill="url(#hydrationGradient)" />
                  
                  {/* Body hydration flow - following the enhanced muscle structure */}
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
                  
                  {/* Shoulder and arm hydration - following deltoid structure */}
                  <ellipse cx="50" cy="58" rx="8" ry="12" transform="rotate(-20 50 58)" fill="url(#hydrationGradient)" opacity="0.6" />
                  <ellipse cx="110" cy="58" rx="8" ry="12" transform="rotate(20 110 58)" fill="url(#hydrationGradient)" opacity="0.6" />
                  
                  {/* Upper arm hydration */}
                  <ellipse cx="42" cy="68" rx="6" ry="18" transform="rotate(-15 42 68)" fill="url(#hydrationGradient)" opacity="0.7" />
                  <ellipse cx="118" cy="68" rx="6" ry="18" transform="rotate(15 118 68)" fill="url(#hydrationGradient)" opacity="0.7" />
                  
                  {/* Forearm hydration */}
                  <ellipse cx="34" cy="92" rx="5" ry="16" transform="rotate(-5 34 92)" fill="url(#hydrationGradient)" opacity="0.6" />
                  <ellipse cx="126" cy="92" rx="5" ry="16" transform="rotate(5 126 92)" fill="url(#hydrationGradient)" opacity="0.6" />
                  
                  {/* Hip and glute hydration */}
                  <ellipse cx="80" cy="146" rx="18" ry="12" fill="url(#hydrationGradient)" opacity="0.7" />
                  
                  {/* Thigh hydration - following quadriceps structure */}
                  <ellipse cx="68" cy="165" rx="8" ry="20" fill="url(#hydrationGradient)" opacity="0.8" />
                  <ellipse cx="92" cy="165" rx="8" ry="20" fill="url(#hydrationGradient)" opacity="0.8" />
                  
                  {/* Calf hydration - following gastrocnemius structure */}
                  <ellipse cx="68" cy="200" rx="6" ry="18" fill="url(#hydrationGradient)" opacity="0.7" />
                  <ellipse cx="92" cy="200" rx="6" ry="18" fill="url(#hydrationGradient)" opacity="0.7" />
                  
                  {/* Enhanced animated water droplets flowing through body systems */}
                  {Array.from({ length: Math.min(current, 6) }, (_, i) => (
                    <circle
                      key={i}
                      cx={74 + (i % 3) * 4 + Math.sin(i) * 2}
                      cy={50 + (i * 25)}
                      r={1.5 + (i % 2) * 0.5}
                      fill="#06b6d4"
                      className="animate-bounce"
                      style={{ 
                        animationDelay: `${i * 0.4}s`, 
                        animationDuration: '3s',
                        opacity: 0.9 - (i * 0.1)
                      }}
                    />
                  ))}
                  
                  {/* Enhanced hydration circulation - through major body systems */}
                  <path d="M80 22 Q75 35 80 50" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.5" />
                  <path d="M80 50 Q85 80 80 110" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.5" />
                  <path d="M80 110 Q75 130 80 146" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.5" />
                  <path d="M80 146 Q68 165 68 200" stroke="#06b6d4" strokeWidth="0.8" fill="none" opacity="0.4" />
                  <path d="M80 146 Q92 165 92 200" stroke="#06b6d4" strokeWidth="0.8" fill="none" opacity="0.4" />
                  
                  {/* Lymphatic system representation */}
                  <path d="M50 58 Q65 75 80 85" stroke="#06b6d4" strokeWidth="0.6" fill="none" opacity="0.3" />
                  <path d="M110 58 Q95 75 80 85" stroke="#06b6d4" strokeWidth="0.6" fill="none" opacity="0.3" />
                </g>
              )}
              
              {/* Enhanced muscle group labels - anatomically precise positioning */}
              <g className="text-xs font-medium fill-current opacity-80">
                {muscleActivation.chest && (
                  <>
                    <text x="45" y="65" textAnchor="middle" className="font-semibold text-red-600 drop-shadow">
                      Pectorals
                    </text>
                    <text x="45" y="75" textAnchor="middle" className="font-normal text-red-500 text-[10px]">
                      Major & Minor
                    </text>
                  </>
                )}
                {muscleActivation.shoulders && (
                  <>
                    <text x="25" y="55" textAnchor="middle" className="font-semibold text-orange-600 drop-shadow">
                      Deltoids
                    </text>
                    <text x="135" y="55" textAnchor="middle" className="font-semibold text-orange-600 drop-shadow">
                      Deltoids
                    </text>
                  </>
                )}
                {muscleActivation.triceps && (
                  <>
                    <text x="25" y="80" textAnchor="middle" className="font-normal text-orange-500 text-[10px]">
                      Triceps
                    </text>
                    <text x="135" y="80" textAnchor="middle" className="font-normal text-orange-500 text-[10px]">
                      Triceps
                    </text>
                  </>
                )}
                {muscleActivation.abs && (
                  <>
                    <text x="120" y="100" textAnchor="middle" className="font-semibold text-green-600 drop-shadow">
                      Rectus
                    </text>
                    <text x="120" y="110" textAnchor="middle" className="font-normal text-green-500 text-[10px]">
                      Abdominis
                    </text>
                  </>
                )}
                {muscleActivation.core && (
                  <>
                    <text x="45" y="115" textAnchor="middle" className="font-normal text-green-500 text-[10px]">
                      External
                    </text>
                    <text x="45" y="125" textAnchor="middle" className="font-normal text-green-500 text-[10px]">
                      Obliques
                    </text>
                  </>
                )}
                {muscleActivation.quads && (
                  <>
                    <text x="45" y="165" textAnchor="middle" className="font-semibold text-blue-600 drop-shadow">
                      Quadriceps
                    </text>
                    <text x="45" y="175" textAnchor="middle" className="font-normal text-blue-500 text-[10px]">
                      Four Heads
                    </text>
                  </>
                )}
                {muscleActivation.glutes && (
                  <>
                    <text x="45" y="146" textAnchor="middle" className="font-normal text-blue-500 text-[10px]">
                      Gluteus
                    </text>
                  </>
                )}
                {muscleActivation.hamstrings && (
                  <>
                    <text x="120" y="175" textAnchor="middle" className="font-normal text-blue-500 text-[10px]">
                      Hamstrings
                    </text>
                  </>
                )}
                {muscleActivation.calves && (
                  <>
                    <text x="120" y="200" textAnchor="middle" className="font-semibold text-blue-600 drop-shadow">
                      Calves
                    </text>
                    <text x="120" y="210" textAnchor="middle" className="font-normal text-blue-500 text-[10px]">
                      Gastrocnemius
                    </text>
                  </>
                )}
                {muscleActivation.cardio && (
                  <>
                    <text x="120" y="72" textAnchor="middle" className="font-semibold text-purple-600 drop-shadow">
                      Cardio
                    </text>
                    <text x="120" y="82" textAnchor="middle" className="font-normal text-purple-500 text-[10px]">
                      System
                    </text>
                  </>
                )}
              </g>
            </svg>
          </div>
        </div>

        {/* Enhanced muscle group status with more anatomical detail */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-blue-500 mb-1">
            {Math.round(hydrationPercentage)}%
          </div>
          <div className="text-sm text-muted-foreground mb-3">
            {hydrationPercentage >= 100 ? 'Optimally Hydrated! 🌊' : 
             hydrationPercentage >= 85 ? 'Well Hydrated 💧' :
             hydrationPercentage >= 65 ? 'Adequately Hydrated 💦' :
             hydrationPercentage >= 40 ? 'Mildly Dehydrated 🥤' :
             hydrationPercentage >= 20 ? 'Dehydrated ⚠️' :
             'Severely Dehydrated 🚨'}
          </div>
          
          {/* Enhanced exercise completion status with anatomical precision */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
              muscleActivation.chest ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gray-100 text-gray-500'
            }`}>
              <div className={`w-3 h-3 rounded-full transition-all ${
                muscleActivation.chest ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
              }`} />
              <div>
                <div className="font-medium">Upper Body</div>
                <div className="text-[10px] opacity-75">Pectorals, Deltoids, Triceps</div>
              </div>
            </div>
            
            <div className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
              muscleActivation.core ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-500'
            }`}>
              <div className={`w-3 h-3 rounded-full transition-all ${
                muscleActivation.core ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`} />
              <div>
                <div className="font-medium">Core</div>
                <div className="text-[10px] opacity-75">Rectus Abdominis, Obliques</div>
              </div>
            </div>
            
            <div className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
              muscleActivation.quads ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-gray-100 text-gray-500'
            }`}>
              <div className={`w-3 h-3 rounded-full transition-all ${
                muscleActivation.quads ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
              }`} />
              <div>
                <div className="font-medium">Lower Body</div>
                <div className="text-[10px] opacity-75">Quadriceps, Glutes, Calves</div>
              </div>
            </div>
            
            <div className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
              muscleActivation.cardio ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-gray-100 text-gray-500'
            }`}>
              <div className={`w-3 h-3 rounded-full transition-all ${
                muscleActivation.cardio ? 'bg-purple-500 animate-pulse' : 'bg-gray-400'
              }`} />
              <div>
                <div className="font-medium">Cardiovascular</div>
                <div className="text-[10px] opacity-75">Heart, Lungs, Circulation</div>
              </div>
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