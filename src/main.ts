import Phaser from 'phaser';
import { MainScene } from './game';
import { FocusTracker } from './tracker';
import Chart from 'chart.js/auto';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: MainScene
};

let game: Phaser.Game;
let tracker: FocusTracker;
let focusHistory: number[] = [];
let sessionInterval: any;

const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
const overlay = document.getElementById('overlay') as HTMLElement;
const loadingText = document.getElementById('loading') as HTMLElement;
const webcamElement = document.getElementById('webcam') as HTMLVideoElement;
const focusVal = document.getElementById('focus-val') as HTMLElement;
const focusBar = document.getElementById('focus-bar') as HTMLElement;

startBtn.addEventListener('click', async () => {
  startBtn.classList.add('hidden');
  loadingText.classList.remove('hidden');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    webcamElement.srcObject = stream;

    tracker = new FocusTracker(webcamElement);
    await tracker.initialize();

    overlay.classList.add('hidden');
    game = new Phaser.Game(config);

    startMonitoring();
  } catch (err) {
    console.error("Error starting game:", err);
    alert("Camera access is required for FocusBound!");
    startBtn.classList.remove('hidden');
    loadingText.classList.add('hidden');
  }
});

function startMonitoring() {
  sessionInterval = setInterval(() => {
    const currentFocus = tracker.calculateFocus();
    focusHistory.push(currentFocus);

    // Update UI
    focusVal.innerText = `${Math.round(currentFocus)}%`;
    focusBar.style.width = `${currentFocus}%`;
    focusBar.style.backgroundColor = currentFocus > 60 ? '#4caf50' : currentFocus > 30 ? '#ffeb3b' : '#f44336';

    // Update Game
    const scene = game.scene.getScene('MainScene') as MainScene;
    if (scene) {
        scene.setFocusLevel(currentFocus);
    }

    // Auto-end after 30 seconds for demo
    if (focusHistory.length >= 30) {
        endSession();
    }
  }, 1000);
}

function endSession() {
  clearInterval(sessionInterval);
  const dashboard = document.getElementById('dashboard') as HTMLElement;
  const finalScoreElem = document.getElementById('final-score') as HTMLElement;
  dashboard.classList.remove('hidden');

  const avgFocus = focusHistory.reduce((a, b) => a + b, 0) / focusHistory.length;
  finalScoreElem.innerText = `Average Focus Score: ${Math.round(avgFocus)}%`;

  const ctx = (document.getElementById('analytics-chart') as HTMLCanvasElement).getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: focusHistory.map((_, i) => `${i}s`),
        datasets: [{
          label: 'Focus Level %',
          data: focusHistory,
          borderColor: '#007bff',
          tension: 0.1,
          fill: true,
          backgroundColor: 'rgba(0, 123, 255, 0.1)'
        }]
      },
      options: {
        scales: { y: { min: 0, max: 100 } }
      }
    });
  }
}
