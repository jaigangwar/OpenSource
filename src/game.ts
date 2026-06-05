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
    private flowParticles!: Phaser.GameObjects.Particles.ParticleEmitter;
    private explosionParticles!: Phaser.GameObjects.Particles.ParticleEmitter;
    
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
        this.snippets = SKILL_DATA[this.skill] || SKILL_DATA["Python"];
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
        if(this.audioCtx.state === 'suspended') this.audioCtx.resume();
    }

    preload() {
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('spark', 'assets/particles/blue.png');
        this.load.image('flare', 'assets/particles/yellow.png');
    }

    create() {
        this.tunnelGraphics = this.add.graphics();
        
        // Flow State Particles
        this.flowParticles = this.add.particles(0, 0, 'spark', {
            speed: 200,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            lifespan: 800,
            tint: 0xffaa00,
            emitting: false
        });

        // Snippet Explosion Particles
        this.explosionParticles = this.add.particles(0, 0, 'flare', {
            speed: { min: 200, max: 600 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.8, end: 0 },
            blendMode: 'ADD',
            lifespan: 1000,
            gravityY: 300,
            emitting: false
        });
        
        // Main Code Display
        this.codeText = this.add.text(400, 300, '', {
            fontFamily: 'Share Tech Mono',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 700 },
            lineSpacing: 10
        }).setOrigin(0.5);

        // Explanation text (appears after snippet)
        this.explanationText = this.add.text(400, 480, '', {
            fontFamily: 'Share Tech Mono',
            fontSize: '20px',
            color: '#00f3ff',
            align: 'center',
            wordWrap: { width: 650 },
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: { x: 20, y: 10 }
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
        // Pitch varies slightly for realism
        osc.frequency.setValueAtTime(700 + Math.random() * 300, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
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
        osc.frequency.linearRampToValueAtTime(80, this.audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.2);
        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.2);
    }

    private playEpicChime() {
        if (!this.audioCtx) return;
        // Synth Chime for completing a snippet
        [440, 554, 659, 880].forEach((freq, index) => {
            const osc = this.audioCtx.createOscillator();
            const gainNode = this.audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime + index * 0.05);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioCtx.currentTime + index * 0.05 + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.0);
            osc.connect(gainNode);
            gainNode.connect(this.audioCtx.destination);
            osc.start(this.audioCtx.currentTime + index * 0.05);
            osc.stop(this.audioCtx.currentTime + 1.0);
        });
    }

    private playFlowEntrySound() {
        if (!this.audioCtx) return;
        // Deep bass sweep / sonic boom
        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.audioCtx.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.5);
        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 1.5);
    }

    private speakExplanation(text: string) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const msg = new SpeechSynthesisUtterance(text);
            msg.rate = 1.1;
            msg.pitch = 0.9;
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

        if (key.length === 1) { 
            if (key === target[this.typedText.length]) {
                this.typedText += key;
                this.totalChars++;
                this.currentStreak++;
                if (this.currentStreak > this.maxStreak) this.maxStreak = this.currentStreak;
                this.playASMRClick();

                if (this.isFlowState) {
                    this.flowParticles.emitParticleAt(
                        Phaser.Math.Between(100, 700), 
                        Phaser.Math.Between(200, 400)
                    );
                }

            } else {
                this.errors++;
                this.currentStreak = 0;
                // Severe screen shake on error
                this.cameras.main.shake(150, 0.01);
                this.cameras.main.flash(200, 255, 0, 0); // Red flash
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
        
        // Explode particles & white flash
        this.explosionParticles.emitParticleAt(400, 300, 50);
        this.cameras.main.flash(300, 255, 255, 255);
        this.playEpicChime();

        // Tweens for smooth text appearance
        this.tweens.add({
            targets: this.explanationText,
            alpha: 1,
            y: 450,
            duration: 500,
            ease: 'Power2'
        });
        
        // JARVIS Voice AI
        this.speakExplanation(explanation);
        
        this.time.delayedCall(4000, () => {
            this.tweens.add({
                targets: this.explanationText,
                alpha: 0,
                y: 480,
                duration: 300,
                onComplete: () => {
                    this.currentSnippetIndex++;
                    this.updateSnippet();
                }
            });
        });
    }

    private renderText() {
        const target = this.snippets[this.currentSnippetIndex].text;
        this.codeText.setText(target);
        
        if (this.typedText.length > 0) {
            this.codeText.setTint(0x666666); 
        } else {
            this.codeText.clearTint();
        }
    }

    update() {
        if (this.isFinished) return;

        this.drawTunnel();

        const now = Date.now();
        const minutes = (now - this.startTime) / 60000;
        const wpm = Math.round((this.totalChars / 5) / Math.max(0.01, minutes)) || 0;
        const accuracy = Math.round(((this.totalChars - this.errors) / Math.max(1, this.totalChars)) * 100);
        const progress = Math.round((this.currentSnippetIndex / this.snippets.length) * 100);

        // Flow State Logic
        if (this.focusLevel >= 90 && this.currentStreak > 20) {
            if (!this.isFlowState) {
                this.isFlowState = true;
                document.body.classList.add('flow-state-active');
                document.getElementById('flow-state-indicator')!.style.opacity = '1';
                this.codeText.setTint(0xffaa00);
                this.cameras.main.flash(500, 255, 170, 0); // Gold flash on entry
                this.playFlowEntrySound();
            }
        } else {
            if (this.isFlowState) {
                this.isFlowState = false;
                document.body.classList.remove('flow-state-active');
                document.getElementById('flow-state-indicator')!.style.opacity = '0';
                this.codeText.clearTint();
            }
        }

        // Fog Effect
        if (!this.isFlowState && this.focusLevel < 50) {
            this.codeText.setAlpha(0.2 + (this.focusLevel / 100));
            this.codeText.setScale(1 + (50 - this.focusLevel) / 300);
            // Constant subtle shake to indicate instability
            this.cameras.main.shake(100, 0.001 * ((50 - this.focusLevel) / 10));
        } else {
            this.codeText.setAlpha(1);
            this.codeText.setScale(this.isFlowState ? 1.05 : 1);
        }

        (window as any).updateStats({ wpm, accuracy, progress, streak: this.currentStreak, maxStreak: this.maxStreak });
    }

    private drawTunnel() {
        this.tunnelGraphics.clear();
        const time = this.time.now * (this.isFlowState ? 0.008 : 0.002); // Faster in flow state
        const color = this.isFlowState ? 0xffaa00 : 0x00f3ff;
        
        for (let i = 0; i < 6; i++) {
            const size = ((time + i * 0.3) % 2) * 500;
            const alpha = 1 - (size / 1000);
            this.tunnelGraphics.lineStyle(this.isFlowState ? 6 : 2, color, alpha);
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