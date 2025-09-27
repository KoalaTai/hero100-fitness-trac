import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useKV } from '@github/spark/hooks'

export function DisclaimerDialog() {
  const [showDisclaimer, setShowDisclaimer] = useKV<boolean>('hero100-disclaimer-seen', true)
  const [agreed, setAgreed] = useState(false)

  const handleAgree = () => {
    if (agreed) {
      setShowDisclaimer(false)
    }
  }

  return (
    <Dialog open={showDisclaimer} onOpenChange={() => {}}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Hero100</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Health & Safety Disclaimer</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hero100 is a general wellness app designed to help you track basic fitness activities. 
              This is not medical advice. Stop exercising immediately if you feel unwell, dizzy, 
              or experience any discomfort.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Please consult with a healthcare professional before starting any new fitness routine, 
              especially if you have existing health conditions, injuries, or concerns about your 
              physical fitness.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              By using this app, you acknowledge that you participate in physical activities at your 
              own risk and that you are responsible for your own health and safety.
            </p>
          </div>

          <div className="p-4 bg-accent/10 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">🔒 Your Privacy</h4>
            <p className="text-xs text-muted-foreground">
              All your data stays on your device. No analytics, no tracking, no external servers. 
              You have complete control over your fitness information.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="disclaimer-agree" 
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(!!checked)}
            />
            <Label htmlFor="disclaimer-agree" className="text-sm">
              I understand and agree to these terms
            </Label>
          </div>

          <Button 
            onClick={handleAgree} 
            disabled={!agreed}
            className="w-full"
            size="lg"
          >
            Continue to Hero100
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}