import Phaser from 'phaser';
import { SKILL_DATA, SkillSnippet } from './content';

export class MainScene extends Phaser.Scene {
    private skill: string = 'Python';
    private snippets: SkillSnippet[] = [];
    private currentSnippetIndex = 0;
    private typedText = "";
    private focusLevel = 100;
    
    // UI Elements
    private codeText!: Phaser.GameObjects.Text;
    private explanationText!: Phaser.GameObjects.Text;
    private tunnelGraphics!: Phaser.GameObjects.Graphics;
    private particles!: Phaser.GameObjects.Particles.ParticleEmitter;
    
    // Stats & Flow State
    private startTime = 0;
    private totalChars = 0;
    private errors = 0;
    private currentStreak = 0;
    private maxStreak = 0;
    private isFinished = false;
    private isFlowState = false;

    // Audio Context for ASMR
    private audioCtx!: AudioContext;

    constructor() {
        super('MainScene');
    }

    init(data: { skill: string }) {
        this.skill = data.skill || 'Python';
        this.snippets = SKILL_DATA[this.skill];
        this.currentSnippetIndex = 0;
        this.typedText = "";
        this.isFinished = false;
        this.startTime = Date.now();
        this.currentStreak = 0;
        this.maxStreak = 0;
        this.isFlowState = false;
        
        // Init Audio
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
    }

    preload() {
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('spark', 'assets/particles/blue.png');
    }

    create() {
        this.tunnelGraphics = this.add.graphics();
        
        // Flow State Particles
        this.particles = this.add.particles(0, 0, 'spark', {
            speed: 200,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            lifespan: 800,
            tint: 0xffaa00,
            emitting: false
        });
        
        // Main Code Display
        this.codeText = this.add.text(400, 300, '', {
            fontFamily: 'Share Tech Mono',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        // Explanation text (appears after snippet)
        this.explanationText = this.add.text(400, 450, '', {
            fontFamily: 'Share Tech Mono',
            fontSize: '18px',
            color: '#00f3ff',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5).setAlpha(0);

        // Setup Keyboard
        this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
            if (this.isFinished) return;
            // Prevent default browser scrolling for spacebar
            if(event.key === ' ' && event.target === document.body) {
                event.preventDefault();
            }
            this.handleInput(event);
        });

        this.updateSnippet();
    }

    private playASMRClick() {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800 + Math.random() * 200, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);
        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.05);
    }

    private playErrorGlitch() {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, this.audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.2);
        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.2);
    }

    private speakExplanation(text: string) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop current
            const msg = new SpeechSynthesisUtterance(text);
            msg.rate = 1.1;
            msg.pitch = 0.9;
            // Try to find a good voice
            const voices = window.speechSynthesis.getVoices();
            const englishVoice = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-US'));
            if (englishVoice) msg.voice = englishVoice;
            window.speechSynthesis.speak(msg);
        }
    }

    private updateSnippet() {
        if (this.currentSnippetIndex >= this.snippets.length) {
            this.endSession();
            return;
        }
        this.typedText = "";
        this.renderText();
    }

    private handleInput(event: KeyboardEvent) {
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        
        const target = this.snippets[this.currentSnippetIndex].text;
        const key = event.key;

        if (key.length === 1) { // Single character
            if (key === target[this.typedText.length]) {
                this.typedText += key;
                this.totalChars++;
                this.currentStreak++;
                if (this.currentStreak > this.maxStreak) this.maxStreak = this.currentStreak;
                this.playASMRClick();

                if (this.isFlowState) {
                    this.particles.emitParticleAt(this.codeText.x, this.codeText.y);
                }

            } else {
                this.errors++;
                this.currentStreak = 0;
                this.cameras.main.shake(100, 0.005);
                this.playErrorGlitch();
            }
        }

        if (this.typedText === target) {
            this.completeSnippet();
        } else {
            this.renderText();
        }
    }

    private completeSnippet() {
        const explanation = this.snippets[this.currentSnippetIndex].explanation;
        this.explanationText.setText(explanation);
        this.explanationText.setAlpha(1);
        
        // JARVIS Voice AI
        this.speakExplanation(explanation);
        
        this.time.delayedCall(3000, () => {
            this.explanationText.setAlpha(0);
            this.currentSnippetIndex++;
            this.updateSnippet();
        });
    }

    private renderText() {
        const target = this.snippets[this.currentSnippetIndex].text;
        // Visual indicator of progress
        // Phaser text doesn't support inline rich text easily, so we use a hack:
        // Replace typed text with spaces or special char to show remaining, but let's keep it simple
        // In a real app we'd use BBCodeText or multiple text objects.
        this.codeText.setText(target);
        
        if (this.typedText.length > 0) {
            this.codeText.setTint(0x888888); // Dim whole text
            // In a full implementation, we'd overlay the typed part in Cyan.
            // For now, the text color changes based on flow state globally.
        } else {
            this.codeText.clearTint();
        }
    }

    update() {
        if (this.isFinished) return;

        // Draw Tunnel Visuals
        this.drawTunnel();

        // Calculate Stats
        const now = Date.now();
        const minutes = (now - this.startTime) / 60000;
        const wpm = Math.round((this.totalChars / 5) / Math.max(0.01, minutes)) || 0;
        const accuracy = Math.round(((this.totalChars - this.errors) / Math.max(1, this.totalChars)) * 100);
        const progress = Math.round((this.currentSnippetIndex / this.snippets.length) * 100);

        // Flow State Logic (High Focus + High Streak)
        if (this.focusLevel >= 90 && this.currentStreak > 15) {
            if (!this.isFlowState) {
                this.isFlowState = true;
                document.body.classList.add('flow-state-active');
                document.getElementById('flow-state-indicator')!.style.opacity = '1';
                this.codeText.setTint(0xffaa00);
            }
        } else {
            if (this.isFlowState) {
                this.isFlowState = false;
                document.body.classList.remove('flow-state-active');
                document.getElementById('flow-state-indicator')!.style.opacity = '0';
                this.codeText.clearTint();
            }
        }

        // Apply Focus Effects (Mental Fog)
        if (!this.isFlowState && this.focusLevel < 50) {
            this.codeText.setAlpha(0.3 + (this.focusLevel / 100));
            this.codeText.setScale(1 + (50 - this.focusLevel) / 500);
        } else {
            this.codeText.setAlpha(1);
            this.codeText.setScale(this.isFlowState ? 1.05 : 1); // Slight pop in flow state
        }

        // Update HTML HUD
        (window as any).updateStats({ wpm, accuracy, progress, streak: this.currentStreak, maxStreak: this.maxStreak });
    }

    private drawTunnel() {
        this.tunnelGraphics.clear();
        const time = this.time.now * (this.isFlowState ? 0.005 : 0.002);
        const color = this.isFlowState ? 0xffaa00 : 0x00f3ff;
        
        for (let i = 0; i < 5; i++) {
            const size = ((time + i * 0.4) % 2) * 400;
            const alpha = 1 - (size / 800);
            this.tunnelGraphics.lineStyle(this.isFlowState ? 4 : 2, color, alpha);
            this.tunnelGraphics.strokeRect(400 - size, 300 - size * 0.75, size * 2, size * 1.5);
        }
    }

    setFocusLevel(level: number) {
        this.focusLevel = level;
    }

    private endSession() {
        this.isFinished = true;
        (window as any).onSessionEnd();
    }
}
