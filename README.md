## Inspiration
Traders obsess over indicators and backtests—but the human behind the screen gets ignored. Stress and fatigue drive bad decisions more than bad code. MoodTrade was born to close that gap by fusing real‑time biofeedback with algorithmic risk controls.

## What it does
- Streams heart rate, HRV, and movement from your wearable  
- Computes a rolling “stress index” on‑device  
- Dynamically adjusts leverage, position size, and SL/TP based on your current mood  
- Logs quick voice/text notes per trade and correlates them with performance  
- (Opt‑in) Compares your emotional‑trade metrics anonymously on a leaderboard

## How we built it
1. **Frontend (React Native + Tailwind)**  
   - Integrated HealthKit and Google Fit for live vitals  
   - Built screens for stress index, position controls, and journaling  
2. **On‑Device ML (TensorFlow Lite)**  
   - Trained and quantized a lightweight stress classifier  
   - Ensured sub‑50 ms inference on mid‑range devices  
3. **Backend & Trading Engine**  
   - Python microservice exposing REST/WebSocket APIs  
   - Stubbed dummy strategies that modulate position size from stress scores  
4. **Real‑Time Messaging (Bolt SDK)**  
   - Low‑latency signaling between app and bot  
   - End‑to‑end encryption for all mood data

## Challenges we ran into
- **Noisy Sensor Data:** Wearables produce jittery signals—calibration and smoothing took multiple UX iterations.  
- **Privacy vs. Performance:** Balancing model size, speed, and on‑device inference without sacrificing accuracy.  
- **One‑Shot Time Constraint:** Delivering a fully functional biofeedback → risk modulation demo in a single sprint forced ruthless prioritization.

## Accomplishments that we're proud of
- Real‑time biofeedback loop demo: stress index driving live position‑size changes  
- On‑device TensorFlow Lite model under 8 KB for lightning‑fast inference  
- Secure end‑to‑end encrypted pipeline with Bolt for sub‑100 ms messaging

## What we learned
- On‑device ML demands extreme model optimization for speed and privacy  
- Real traders value simple, human‑centered UX over complex analytics dashboards  
- Rapid prototyping with React Native + Tailwind accelerates delivery without sacrificing polish

## What’s next for MoodTrade
- Add voice‑note journaling with sentiment analysis  
- Launch an anonymous “MoodMatch” leaderboard with Bolt micropayments  
- Enable on‑device model fine‑tuning so each trader personalizes their own stress thresholds  
