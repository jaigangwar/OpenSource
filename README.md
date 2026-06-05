# Neuro-Type: AI Skill Accelerator

**Neuro-Type** is a futuristic, attention-controlled typing and learning game built for hackathons. It leverages Computer Vision (AI) to track your focus in real-time. The game acts as a "Skill Accelerator" where your learning efficiency (clarity and score) is directly tied to your mental focus.

## 🚀 The Concept
Instead of just typing, you select a technical skill (e.g., Python, SQL, React) and type out real code snippets. 
- **High Focus**: The text is crystal clear, and you gain mastery points faster. Your typing speed (WPM) and focus stability sync up for a high score.
- **Low Focus**: If you look away, blink excessively, or get distracted, a "Mental Fog" sets in. The text becomes blurry and distorted, forcing you to recenter your attention to continue learning.

## 🔥 Mind-Blowing Features (Hackathon Winners)
1. **JARVIS-Style AI Voice Assistant**: Using the Web Speech API, the game audibly reads out the explanations of the code snippets you just typed, providing a multi-sensory learning experience.
2. **FLOW STATE (God Mode)**: If your focus exceeds 90% and you maintain a high typing streak without errors, the game enters "Flow State". The UI transforms into a glowing golden Matrix with particle effects, indicating peak cognitive performance.
3. **Procedural ASMR Audio Engine**: Synthesized mechanical keyboard clicks (Web Audio API) trigger on every correct keystroke, with harsh glitch sounds on errors, providing instant auditory biofeedback.
4. **Mental Fog Integration**: Direct neural feedback where low focus physically blurs the screen and distorts the learning environment.

## 🛠️ Tech Stack
- **AI/ML**: [MediaPipe Face Landmarker](https://developers.google.com/mediapipe/solutions/vision/face_landmarker) for real-time gaze and head-pose tracking.
- **Game Engine**: [Phaser 3](https://phaser.io/) for high-performance 2D web rendering.
- **Audio & Speech**: Web Audio API (Procedural ASMR) & Web Speech API (Voice TTS).
- **Visuals**: Vanilla CSS (Cyberpunk Theme) & Phaser graphics.
- **Analytics**: [Chart.js](https://www.chartjs.org/) for post-session focus and WPM correlation reports.
- **Build Tool**: [Vite](https://vitejs.dev/) + TypeScript.

## 🎮 How to Play
1. **Initiate Connection**: Click the start button and allow camera access.
2. **Select Neural Pathway**: Choose a skill you want to practice (e.g., Python).
3. **Sync your Focus**: Stay centered and keep your eyes on the screen.
4. **Type to Learn**: Type the code snippets exactly as they appear. Listen to the ASMR feedback!
5. **Achieve Flow State**: Don't make mistakes and keep focus >90% to trigger the golden overdrive visuals.
6. **Analyze**: At the end of the session, view your **Rank** (S to D) based on your average WPM, Accuracy, and Focus Stability.

## 🛠️ Setup & Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and start your neural training!
