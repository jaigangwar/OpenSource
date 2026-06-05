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
    arcade: { gravity: { x: 0, y: 0 }, debug: false }
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
    const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
    });
    webcamElement.srcObject = stream;

    tracker = new FocusTracker(webcamElement);
    await tracker.initialize();

    overlay.classList.add('hidden');
    game = new Phaser.Game(config);

    startMonitoring();
  } catch (err) {
    console.error("Error starting game:", err);
    alert("Neural Link Failed: Camera access is required.");
    startBtn.classList.remove('hidden');
    loadingText.classList.add('hidden');
  }
});

function startMonitoring() {
  focusHistory = [];
  sessionInterval = setInterval(() => {
    const currentFocus = tracker.calculateFocus();
    focusHistory.push(currentFocus);

    // Update UI
    focusVal.innerText = `${Math.round(currentFocus)}%`;
    focusBar.style.width = `${currentFocus}%`;
    
    // Cyberpunk color shifting
    if (currentFocus > 70) {
        focusBar.style.backgroundColor = '#00f3ff'; // Cyan
        focusBar.style.boxShadow = '0 0 15px #00f3ff';
    } else if (currentFocus > 40) {
        focusBar.style.backgroundColor = '#ffeb3b'; // Yellow
        focusBar.style.boxShadow = '0 0 10px #ffeb3b';
    } else {
        focusBar.style.backgroundColor = '#ff00ff'; // Magenta
        focusBar.style.boxShadow = '0 0 15px #ff00ff';
    }

    // Update Game
    const scene = game.scene.getScene('MainScene') as MainScene;
    if (scene) {
        scene.setFocusLevel(currentFocus);
    }

    // Auto-end after 60 seconds for a full session
    if (focusHistory.length >= 60) {
        endSession();
    }
  }, 1000);
}

function endSession() {
  clearInterval(sessionInterval);
  const dashboard = document.getElementById('dashboard') as HTMLElement;
  const finalScoreElem = document.getElementById('final-score') as HTMLElement;
  dashboard.classList.remove('hidden');

  const avgFocus = Math.round(focusHistory.reduce((a, b) => a + b, 0) / focusHistory.length);
  finalScoreElem.innerHTML = `NEURAL SYNC STABILITY: <span style="color:#00f3ff">${avgFocus}%</span>`;

  const canvas = document.getElementById('analytics-chart') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: focusHistory.map((_, i) => `${i}s`),
        datasets: [{
          label: 'Focus Stability %',
          data: focusHistory,
          borderColor: '#00f3ff',
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(0, 243, 255, 0.1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#888', font: { family: 'Share Tech Mono' } }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#888', font: { family: 'Share Tech Mono' } }
          }
        }
      }
    });
  }
}
