# Hero100 Fitness AI Upgrade Roadmap

This document outlines a pragmatic path to introduce AI-powered experiences and supporting infrastructure to Hero100 Fitness. The plan is structured around high-impact data sources, feature concepts, third-party services, and security considerations.

## 1. Public Repositories & APIs

### Exercise & Nutrition Data
- **wger** – Open-source fitness manager with exercise and nutrition datasets served via REST. Licensed under AGPL-3; reuse data responsibly.
- **ExerciseDB API** – Provides ~1.3–1.5k exercises with body part, equipment, and media metadata.
- **Open Food Facts API** – Free barcode lookups returning nutrition, ingredients, and Nutri-Score.
- **USDA FoodData Central** – Authoritative nutrient data (requires free API key).
- **Nutritionix / Edamam** *(optional)* – Commercial nutrition APIs with meal parsing.

### Health & Device Data
- **Apple HealthKit** – Rich workout metrics with granular samples on iOS.
- **Android Health Connect** – Modern Android health data layer; plan migrations off Google Fit REST.
- **Strava API** – Display a user’s own Strava activities only; prohibit model training on Strava data.
- **Terra API** – Aggregated wearable API (Garmin, Oura, Fitbit, Apple, etc.) with webhook events.
- **Fitbit / Garmin Health** – Direct integrations where deeper access is required (Garmin needs program enrollment).

### Pose & Rep Counting
- **MediaPipe Pose (BlazePose)** – 33 landmark keypoints enabling realtime rep counting and form cues.

### AI Frameworks & Modeling
- **LangChain / LangGraph / LlamaIndex** – LLM orchestration and retrieval-augmented generation (RAG) for AI coaching.
- **Darts** – Time-series modeling for load management, plateau detection, and adherence forecasting.
- **RecBole** – Recommender system toolkit for personalized workout or exercise suggestions.

### Observability & Analytics
- **PostHog / Amplitude** – Product analytics, experimentation, and feature flagging.
- **Sentry** – Error and performance monitoring for web and mobile clients.

## 2. AI Features (Ship in Sprints)

1. **AI Workout Plan Genie** – Generate 100-day “Hero100” programs tailored to goals, equipment, injuries, and time budgets. Use RAG over the exercise catalog with LLM constraint handling; persist context in a vector store such as `pgvector`.
2. **On-device Rep Counting & Form Cues** – Implement MediaPipe Pose to count reps and highlight form issues (e.g., squat depth, elbow flare) without uploading video.
3. **Adherence & Plateau Radar** – Apply Darts time-series models to detect streak risk or plateaus and trigger proactive nudges.
4. **Barcode → Macros & Meal Ideas** – Integrate Open Food Facts (and optionally FDC/Edamam/Nutritionix) for instant nutrition lookups and macro planning.
5. **“Ask My Coach” Chat** – RAG-based assistant over user logs and curated knowledge with guardrails to avoid medical advice.
6. **Wearable Ingestion & Insights** – Sync HRV, sleep, and activity from HealthKit/Health Connect (or Terra) to personalize readiness scores; never train on Strava data.

## 3. Service Provider Stack

- **Authentication** – Clerk (passkeys, social login, excellent Next.js/React support) or Supabase Auth for a Postgres-first approach.
- **Database & Serverless** – Supabase Postgres with Row Level Security and `pgvector` extensions.
- **Web** – Next.js (App Router) for the primary web experience.
- **Mobile** – Expo/React Native with built-in push notification support.
- **Payments** – Stripe Billing for subscription management.
- **Messaging** – Twilio WhatsApp for reminders and check-ins.
- **Analytics & Experiments** – PostHog (self-hosted or cloud) or Amplitude.
- **Errors & Performance** – Sentry integrations for Next.js and React Native.

## 4. Security & Privacy Baseline

- Adhere to OWASP ASVS (web) and OWASP MASVS (mobile) for secure development. Encrypt PII at rest, enforce least privilege, and avoid storing secrets in version control.
- Update Terms of Service to state that Strava data is never used for model training and is only displayed to the authenticated user.
- Keep pose estimation entirely on-device to minimize raw video handling.
- Comply with HealthKit and Health Connect policies for consent, data usage, and user transparency.

---

This roadmap can be adopted incrementally, starting with data seeding and analytics foundations, then layering AI capabilities aligned with user value and compliance requirements.
