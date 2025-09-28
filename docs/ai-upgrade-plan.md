# AI Upgrade Path for Hero100 Fitness Tracker

This document outlines a pragmatic roadmap for enhancing the Hero100 Fitness Tracker with AI-driven capabilities, third-party integrations, and essential operational guardrails.

## 1. High-Impact Public Repositories and APIs

### A. Exercise and Nutrition Data
- **[wger](https://wger.de/en/software/api)** – FLOSS fitness manager with an exercise wiki and nutrition data. Use to seed the exercise database and borrow information architecture. *License: AGPL-3; ensure compliant data usage.*
- **[ExerciseDB API](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)** – ~1.3–1.5k exercises with body parts, equipment, images/GIFs; easy service to consume.
- **[Open Food Facts API](https://world.openfoodfacts.org/data)** – Barcode-based lookups for ingredient and nutrition data (Nutri-Score, etc.).
- **[USDA FoodData Central](https://fdc.nal.usda.gov/api-guide.html)** – Authoritative nutrition data (requires a free API key).
- **Commercial options** (optional): [Nutritionix](https://www.nutritionix.com/business/api) or [Edamam](https://developer.edamam.com/) for natural language recipe parsing.

### B. Health and Device Data
- **[Apple HealthKit](https://developer.apple.com/healthkit/)** – Granular workout and metric tracking for iOS; requires user consent.
- **[Android Health Connect](https://developer.android.com/health-and-fitness/guides/health-connect)** – Modern Android health data access; plan migrations from Google Fit REST.
- **[Strava API](https://developers.strava.com/)** – Display user-specific activity data. **Do not** use for model training; respect new data-use restrictions.
- **[Terra API](https://tryterra.co/)** – Aggregates multiple wearable integrations (Garmin, Oura, Fitbit, Apple, etc.) with webhook support.
- **Direct integrations**: Fitbit and Garmin Health (note Garmin program enrollment requirements).

### C. Pose and Rep Counting
- **[MediaPipe Pose (BlazePose)](https://developers.google.com/mediapipe/solutions/vision/pose_landmarker)** – On-device detection of 33 keypoints for realtime rep counting and form cues.

### D. AI Frameworks and Modeling
- **[LangChain](https://www.langchain.com/) / [LangGraph](https://langchain-ai.github.io/langgraph/)** or **[LlamaIndex](https://www.llamaindex.ai/)** – Orchestrate Retrieval-Augmented Generation (RAG) for "AI coach" features.
- **[Darts](https://unit8co.github.io/darts/)** – Time-series modeling for load, plateaus, and adherence risk.
- **[RecBole](https://recbole.io/)** – Modern recommender models for personalized workout suggestions.

### E. Observability and Analytics
- **[PostHog](https://posthog.com/)** or **[Amplitude](https://amplitude.com/)** – Product analytics, experiments, and feature flags.
- **[Sentry](https://sentry.io/)** – Error and performance monitoring with excellent Next.js and React Native support.

## 2. AI Features to Add (Sprint-Friendly)

1. **AI Workout Plan Genie**  
   Generate 100-day "Hero100" programs aligned to user goals, equipment, injuries, and time budget. Use RAG over the exercise catalog plus domain rules for periodization and progressive overload. Persist context in a vector store (e.g., pgvector on Postgres/Supabase). Ensure Strava data is kept out of model training and only shown to its owners.

2. **On-Device Rep Counting and Form Cues**  
   Count reps for squats, push-ups, curls, etc., and give real-time feedback on angles and tempo. Implement with MediaPipe Pose, computing angles (hip–knee–ankle, elbow alignment) locally for low latency and privacy.

3. **Adherence and Plateau Radar**  
   Detect upcoming drop-offs using time-series signals such as session streaks, intensity, and RPE. Use Darts for anomaly detection or forecasting and trigger proactive nudges (push notifications, WhatsApp).

4. **Barcode to Macros and Meal Ideas**  
   Scan food items to retrieve nutrition facts via Open Food Facts (with optional augmentation from FoodData Central or commercial APIs) and propose meal combinations to hit macro targets.

5. **"Ask My Coach" Chat**  
   Provide contextual answers about recovery, workout adjustments, and habit formation via an LLM agent. Use LangGraph or LlamaIndex with guardrails to avoid medical advice.

6. **Wearable Ingestion and Insights**  
   Sync metrics such as HRV, sleep, and step counts via HealthKit/Health Connect or Terra. Translate them into readiness scores and session adjustments. Maintain strict compliance with Strava data policies.

## 3. Suggested Service Provider Stack

- **Authentication**: Clerk (passkeys, social login, strong Next.js/React support) or Supabase Auth for a Postgres-native solution.
- **Database & Serverless**: Supabase Postgres with Row-Level Security and pgvector for embeddings.
- **Web**: Next.js (App Router).
- **Mobile**: Expo/React Native with Expo push notifications.
- **Payments**: Stripe Billing for subscription management.
- **Messaging**: Twilio WhatsApp for reminders and check-ins (fast sandbox onboarding).
- **Analytics and Experiments**: PostHog (self-hosted or cloud) or Amplitude.
- **Error and Performance Monitoring**: Sentry for both web and mobile clients.

## 4. Security and Privacy Baseline

- Align with **OWASP ASVS** (web) and **OWASP MASVS** (mobile) checklists. Encrypt personally identifiable information at rest, follow least-privilege access, and avoid committing secrets.
- Be explicit in Terms of Service: no model training on Strava data; only display a user's own Strava activity.
- Minimize handling of raw video; keep pose processing on-device.
- When integrating HealthKit or Health Connect, comply with their data usage and consent policies.

---

This roadmap can be implemented incrementally—adopt the data sources first, wire up foundational services, and then layer in AI-powered features with strong privacy practices.
