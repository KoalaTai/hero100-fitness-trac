# Hero100 - Minimalist Fitness PWA

A privacy-focused, offline-first fitness tracking app that helps users maintain a daily routine of four exercises with streak tracking and progress visualization.

**Experience Qualities**:
1. **Simplicity**: Clean, distraction-free interface that focuses on the essential daily actions without overwhelming features
2. **Privacy**: Complete offline functionality with zero external data collection - all user data stays local
3. **Accessibility**: Universal design that works for all users including keyboard navigation, screen readers, and motion-sensitive individuals

**Complexity Level**: Light Application (multiple features with basic state)
The app manages daily exercise tracking, streak calculations, calendar views, and data persistence while maintaining simplicity through focused core features.

## Essential Features

### Daily Exercise Tracking
- **Functionality**: Track four exercises (push-ups, sit-ups, squats, run) with quick-add buttons and progress visualization
- **Purpose**: Make daily logging effortless and rewarding through immediate visual feedback
- **Trigger**: User opens app or taps quick-add buttons throughout the day  
- **Progression**: Open app → View today's progress → Tap +10 reps or +1km → See progress fill → Complete all four → Celebrate completion
- **Success criteria**: Progress accurately reflects user input, visual feedback is immediate, completion triggers streak increment

### Level-Based Scaling
- **Functionality**: User selects difficulty level (10%-100%) that scales daily targets proportionally
- **Purpose**: Accommodate different fitness levels and allow progressive advancement
- **Trigger**: Initial onboarding or settings adjustment
- **Progression**: Choose level → See scaled targets → Adjust as fitness improves
- **Success criteria**: 30% level shows 30/30/30 reps + 3.0km, calculations are accurate across all levels

### Streak Tracking
- **Functionality**: Count consecutive days of completing all four exercise targets
- **Purpose**: Motivate consistency through gamification and visible progress
- **Trigger**: Completing all four exercises in a day
- **Progression**: Complete day → Streak increments → Visual celebration → Maintain motivation
- **Success criteria**: Streak accurately counts consecutive complete days, resets on missed days, back-editing cannot inflate current streak

### Calendar History
- **Functionality**: 30-day rolling calendar with color-coded completion status
- **Purpose**: Provide visual overview of consistency patterns and allow historical data review
- **Trigger**: User taps calendar tab or wants to review past performance
- **Progression**: Open calendar → See color-coded grid → Tap date → View/edit day details → Return to overview
- **Success criteria**: Accurate color coding (green=complete, amber=partial, gray=missed), tap-to-edit functionality works

### Data Export/Import
- **Functionality**: CSV export/import for data portability and backup
- **Purpose**: Give users full control over their fitness data and enable platform migration
- **Trigger**: User initiates from settings menu
- **Progression**: Settings → Export → Download CSV file / Import → Select file → Data merges correctly
- **Success criteria**: CSV format matches specification, import preserves streak logic integrity

## Edge Case Handling

- **Mis-taps**: Clamp totals at 1.5x target to prevent accidental over-logging
- **Timezone Changes**: Use local date at time of action for consistent daily attribution  
- **Data Corruption**: Validate imported data format and provide error feedback
- **Offline Usage**: Full functionality available without internet connection
- **Reduced Motion**: Respect OS accessibility settings for animations
- **Back-editing**: Allow historical edits but prevent streak inflation

## Design Direction

The design should feel clean, trustworthy, and motivating - like a premium fitness tool that respects the user's privacy and time. Minimal interface with purposeful use of color to indicate progress states, following accessibility guidelines for contrast and readability.

## Color Selection

Analogous color scheme using blues and greens to convey trust, health, and progress with calming psychological associations.

- **Primary Color**: Deep Blue (oklch(0.4 0.15 240)) - Communicates reliability and focus for primary actions
- **Secondary Colors**: Soft Blue (oklch(0.7 0.1 240)) for secondary actions, Light Blue (oklch(0.9 0.05 240)) for backgrounds  
- **Accent Color**: Vibrant Green (oklch(0.6 0.15 140)) - Success states and completion indicators
- **Foreground/Background Pairings**: 
  - Background (White oklch(1 0 0)): Dark Gray text (oklch(0.2 0 0)) - Ratio 16:1 ✓
  - Primary (Deep Blue): White text (oklch(1 0 0)) - Ratio 8.2:1 ✓
  - Accent (Green): White text (oklch(1 0 0)) - Ratio 5.1:1 ✓
  - Card (Light Blue): Dark text (oklch(0.2 0 0)) - Ratio 14.5:1 ✓

## Font Selection

Typography should convey clarity and accessibility while feeling modern and approachable - Inter font family provides excellent readability across devices and sizes.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter SemiBold/24px/normal spacing  
  - H3 (Exercise Names): Inter Medium/18px/normal spacing
  - Body Text: Inter Regular/16px/relaxed line height (1.6)
  - Small Text: Inter Regular/14px/relaxed line height

## Animations

Subtle, purposeful animations that enhance usability without distraction - focusing on progress feedback and state transitions while respecting user motion preferences.

- **Purposeful Meaning**: Progress fills communicate completion, gentle celebrations reward achievement, smooth transitions maintain context
- **Hierarchy of Movement**: Progress indicators get primary animation focus, UI transitions are secondary, decorative animations are minimal

## Component Selection

- **Components**: Card for exercise tracking blocks, Button for quick-add actions, Calendar from date-fns for history view, Progress indicators for visual feedback, Dialog for settings and disclaimers
- **Customizations**: Custom progress visualization (body silhouette or rings), streak counter badge, exercise quick-add components
- **States**: Buttons show disabled/active/pressed states, progress fills animate on updates, completion celebrations respect motion preferences  
- **Icon Selection**: Plus/Minus for adjustments, Calendar for history, Settings gear, Export/Import arrows, Exercise-specific icons
- **Spacing**: Consistent 16px base unit, 8px for tight spacing, 24px for section separation, 32px for major layout breaks
- **Mobile**: Single-column layout, large touch targets (44px minimum), collapsible sections, swipe gestures for calendar navigation