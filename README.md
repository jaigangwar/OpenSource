# Neuro-Type: AI Skill Accelerator

**Neuro-Type** is a futuristic, attention-controlled typing and learning game built for hackathons. It leverages Computer Vision (AI) to track your focus in real-time. The game acts as a "Skill Accelerator" where your learning efficiency (clarity and score) is directly tied to your mental focus.

## 🚀 The Concept
Instead of just typing, you select a technical skill (e.g., Python, SQL, React) and type out real code snippets. 
- **High Focus**: The text is crystal clear, and you gain mastery points faster. Your typing speed (WPM) and focus stability sync up for a high score.
- **Low Focus**: If you look away, blink excessively, or get distracted, a "Mental Fog" sets in. The text becomes blurry and distorted, forcing you to recenter your attention to continue learning.

This project demonstrates a novel use of **Edge AI** for bio-feedback in educational gaming and deep-work training.

## 🛠️ Tech Stack
- **AI/ML**: [MediaPipe Face Landmarker](https://developers.google.com/mediapipe/solutions/vision/face_landmarker) for real-time gaze and head-pose tracking.
- **Game Engine**: [Phaser 3](https://phaser.io/) for high-performance 2D web rendering.
- **Visuals**: Vanilla CSS (Cyberpunk Theme) & Phaser graphics.
- **Analytics**: [Chart.js](https://www.chartjs.org/) for post-session focus and WPM correlation reports.
- **Build Tool**: [Vite](https://vitejs.dev/) + TypeScript.

## 🎮 How to Play
1. **Initiate Connection**: Click the start button and allow camera access.
2. **Select Neural Pathway**: Choose a skill you want to practice (e.g., Python).
3. **Sync your Focus**: Stay centered and keep your eyes on the screen.
4. **Type to Learn**: Type the code snippets exactly as they appear. 
5. **Fight the Fog**: If your focus drops, the text blurs. Regain focus to clear the screen!
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

## 🏆 Hackathon Value
- **Innovative Interaction**: Moves beyond traditional input methods by directly linking cognitive state to UI rendering.
- **Real-world Application**: Can be adapted for EdTech platforms, ADHD focus training, or developer productivity tools.
- **Polished UX**: Seamlessly integrates AI tracking with dynamic web visuals.
