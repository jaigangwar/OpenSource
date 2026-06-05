# FocusBound: AI-Powered Neural Interface Game

**FocusBound** is a futuristic, attention-controlled arcade game built for hackathons. It leverages Computer Vision (AI) to track your focus in real-time, making your "Attention" the primary controller for your performance and survival.

## 🚀 The Concept
In most games, you control things with your hands. In **FocusBound**, you control the game with your mind (via your eyes and head pose). 
- **High Focus**: Clear visuals, fast movement, and high scoring.
- **Low Focus**: Screen glitches, sluggish controls, and dangerous instability.

This project demonstrates a novel use of **Edge AI** for bio-feedback in gaming and productivity.

## 🛠️ Tech Stack
- **AI/ML**: [MediaPipe Face Landmarker](https://developers.google.com/mediapipe/solutions/vision/face_landmarker) for real-time gaze and head-pose tracking.
- **Game Engine**: [Phaser 3](https://phaser.io/) for high-performance 2D web gaming.
- **Visuals**: Vanilla CSS (Cyberpunk Theme) & Phaser Pipelines.
- **Analytics**: [Chart.js](https://www.chartjs.org/) for post-session focus stability reports.
- **Build Tool**: [Vite](https://vitejs.dev/) + TypeScript.

## 🎮 How to Play
1. **Initialize Link**: Click the start button and allow camera access.
2. **Sync your Focus**: Stay centered and keep your eyes on the screen.
3. **Dodge Asteroids**: Use Arrow Keys to move. Your speed depends on your **Neuro-Focus** level.
4. **Maintain Stability**: If you look away or blink excessively, the screen will shake and glitch, and your score multiplier will drop.
5. **Analyze**: At the end of the session, view your **Neural Sync Stability** report to see how your focus fluctuated.

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
- **Innovative Interaction**: Moves beyond traditional input methods.
- **Real-world Application**: Could be adapted for deep-work training or accessibility.
- **Polished UX**: Seamlessly integrates AI tracking with game feedback.
