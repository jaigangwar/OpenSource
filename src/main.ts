import Phaser from 'phaser';
import { MainScene } from './game';
import { FocusTracker } from './tracker';
import Chart from 'chart.js/auto';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  transparent: true,
  scene: MainScene
};

let game: Phaser.Game;
let tracker: FocusTracker | null = null;
let focusHistory: number[] = [];
let sessionInterval: any;
let wpmHistory: number[] = [];
let currentStats = { wpm: 0, accuracy: 100, progress: 0 };
let currentNeuralMode = false;

const webcamElement = document.getElementById('webcam') as HTMLVideoElement;
const focusVal = document.getElementById('focus-val') as HTMLElement;
const focusBar = document.getElementById('focus-bar') as HTMLElement;

// Typing HUD
const wpmVal = document.getElementById('wpm-val') as HTMLElement;
const accVal = document.getElementById('acc-val') as HTMLElement;
const progVal = document.getElementById('prog-val') as HTMLElement;

// Global Hooks
(window as any).updateStats = (stats: any) => {
    currentStats = stats;
    wpmVal.innerText = `${stats.wpm} WPM`;
    accVal.innerText = `${stats.accuracy}%`;
    progVal.innerText = `${stats.progress}%`;
};

(window as any).onSessionEnd = () => {
    endSession();
};

(window as any).startApp = async (isNeuralMode: boolean, skill: string) => {
    currentNeuralMode = isNeuralMode;

    if (isNeuralMode) {
        try {
            webcamElement.style.display = 'block';
            const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
            webcamElement.srcObject = stream;
            tracker = new FocusTracker(webcamElement);
            await tracker.initialize();
        } catch (err) {
            console.error("Camera access failed", err);
            alert("Camera required for Neural Link. Falling back to Manual Override.");
            currentNeuralMode = false;
            webcamElement.style.display = 'none';
        }
    } else {
        webcamElement.style.display = 'none';
        focusVal.innerText = "100%";
        focusBar.style.width = "100%";
    }

    game = new Phaser.Game(config);
    
    // Pass skill and mode to scene once it's ready
    game.events.once('ready', () => {
        game.scene.start('MainScene', { skill, isNeuralMode: currentNeuralMode });
    });

    startMonitoring();
};


function startMonitoring() {
  focusHistory = [];
  wpmHistory = [];
  
  sessionInterval = setInterval(() => {
    let currentFocus = 100;

    if (currentNeuralMode && tracker) {
        currentFocus = tracker.calculateFocus();
    }

    focusHistory.push(currentFocus);
    wpmHistory.push(currentStats.wpm);

    // Update UI if in Neural Mode (otherwise it's locked at 100%)
    if (currentNeuralMode) {
        focusVal.innerText = `${Math.round(currentFocus)}%`;
        focusBar.style.width = `${currentFocus}%`;
        
        if (currentFocus > 80) {
            focusBar.style.backgroundColor = '#00f3ff';
            focusBar.style.boxShadow = '0 0 15px #00f3ff';
        } else if (currentFocus > 40) {
            focusBar.style.backgroundColor = '#ffeb3b';
            focusBar.style.boxShadow = '0 0 10px #ffeb3b';
        } else {
            focusBar.style.backgroundColor = '#ff00ff';
            focusBar.style.boxShadow = '0 0 15px #ff00ff';
        }
    }

    // Update Game
    const scene = game.scene.getScene('MainScene') as MainScene;
    if (scene && scene.setFocusLevel) {
        scene.setFocusLevel(currentFocus);
    }

  }, 1000);
}

function endSession() {
  clearInterval(sessionInterval);
  const dashboard = document.getElementById('dashboard') as HTMLElement;
  dashboard.style.display = 'flex';
  
  // Hide game container smoothly
  const appContainer = document.getElementById('app');
  if(appContainer) appContainer.style.opacity = '0';

  const avgFocus = currentNeuralMode 
        ? Math.round(focusHistory.reduce((a, b) => a + b, 0) / Math.max(1, focusHistory.length))
        : 100;
  
  document.getElementById('res-wpm')!.innerText = currentStats.wpm.toString();
  document.getElementById('res-acc')!.innerText = currentStats.accuracy.toString();
  document.getElementById('res-focus')!.innerText = avgFocus.toString();
  
  const maxStreakElem = (window as any).maxStreakAchieved || 0;
  document.getElementById('res-streak')!.innerText = maxStreakElem.toString();

  // Rank Calculation
  const score = (currentStats.wpm * 0.5) + (currentStats.accuracy * 0.3) + (avgFocus * 0.2);
  let rank = 'D';
  let color = '#ff0000';
  if (score > 85) { rank = 'S'; color = '#00f3ff'; }
  else if (score > 70) { rank = 'A'; color = '#00ff00'; }
  else if (score > 55) { rank = 'B'; color = '#ffeb3b'; }
  else if (score > 40) { rank = 'C'; color = '#ff9800'; }

  const rankDisplay = document.getElementById('rank-display') as HTMLElement;
  rankDisplay.innerHTML = `RANK: <span style="color:${color}">${rank}</span>`;
  rankDisplay.style.textShadow = `0 0 20px ${color}`;

  const canvas = document.getElementById('analytics-chart') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: focusHistory.map((_, i) => `${i}s`),
        datasets: [
          {
            label: 'Focus Stability %',
            data: focusHistory,
            borderColor: '#00f3ff',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            label: 'Typing Speed (WPM)',
            data: wpmHistory,
            borderColor: '#ff00ff',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: '#fff', font: { family: 'Orbitron' } } }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            min: 0, max: 100,
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#00f3ff' }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            min: 0,
            grid: { drawOnChartArea: false },
            ticks: { color: '#ff00ff' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#888' }
          }
        }
      }
    });
  }
}
