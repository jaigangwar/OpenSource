import Phaser from 'phaser';
import { SKILL_DATA, SkillSnippet } from './content';

export class MainScene extends Phaser.Scene {
    private skill: string = 'Python';
    private isNeuralMode: boolean = false;
    private snippets: SkillSnippet[] = [];
    private currentSnippetIndex = 0;
    private typedText = "";
    private focusLevel = 100;
    
    // UI Elements (Phaser)
    private flowParticles!: Phaser.GameObjects.Particles.ParticleEmitter;
    private explosionParticles!: Phaser.GameObjects.Particles.ParticleEmitter;
    
    // HTML UI Elements
    private codeOverlay!: HTMLElement | null;
    private codeHTML!: HTMLElement | null;
    private explHTML!: HTMLElement | null;
    
    // Stats & Flow State
    private startTime = 0;
    private totalChars = 0;
    private errors = 0;
    private currentStreak = 0;
    private maxStreak = 0;
    private isFinished = false;
    private isWaitingForNext = false;
    private isFlowState = false;

    // Audio Context for ASMR
    private audioCtx!: AudioContext;

    constructor() {
        super('MainScene');
    }

    init(data: { skill: string, isNeuralMode: boolean, customData?: SkillSnippet[] }) {
        this.skill = data.skill || 'Python';
        this.isNeuralMode = data.isNeuralMode !== undefined ? data.isNeuralMode : true;
        
        if (data.customData && data.customData.length > 0) {
            this.snippets = data.customData;
        } else {
            this.snippets = SKILL_DATA[this.skill] || SKILL_DATA["Python"];
        }

        // HEAVY SANITIZATION: Remove \r and trailing whitespace which breaks matching
        this.snippets = this.snippets.map(s => ({
            text: s.text.replace(/\r/g, '').trimEnd(),
            explanation: s.explanation
        }));

        this.currentSnippetIndex = 0;
        this.typedText = "";
        this.isFinished = false;
        this.isWaitingForNext = false;
        this.startTime = Date.now();
        this.currentStreak = 0;
        this.maxStreak = 0;
        this.isFlowState = false;
        this.focusLevel = 100;
        
        this.codeOverlay = document.getElementById('code-overlay');
        this.codeHTML = document.getElementById('code-text');
        this.explHTML = document.getElementById('explanation-text');
        
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
        // Flow State Particles
        this.flowParticles = this.add.particles(0, 0, 'spark', {
            speed: 200, scale: { start: 0.5, end: 0 }, blendMode: 'ADD', lifespan: 800, tint: 0xffaa00, emitting: false
        });

        // Snippet Explosion Particles
        this.explosionParticles = this.add.particles(0, 0, 'flare', {
            speed: { min: 200, max: 600 }, angle: { min: 0, max: 360 }, scale: { start: 0.8, end: 0 },
            blendMode: 'ADD', lifespan: 1000, gravityY: 300, emitting: false
        });
        
        this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
            if (this.isFinished || this.isWaitingForNext) return;
            this.handleInput(event);
        });

        this.updateSnippet();
    }

    private playASMRClick() {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(700 + Math.random() * 300, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);
        osc.connect(gainNode); gainNode.connect(this.audioCtx.destination);
        osc.start(); osc.stop(this.audioCtx.currentTime + 0.05);
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
        osc.connect(gainNode); gainNode.connect(this.audioCtx.destination);
        osc.start(); osc.stop(this.audioCtx.currentTime + 0.2);
    }

    private playEpicChime() {
        if (!this.audioCtx) return;
        [440, 554, 659, 880].forEach((freq, index) => {
            const osc = this.audioCtx.createOscillator(); const gainNode = this.audioCtx.createGain();
            osc.type = 'sine'; osc.frequency.value = freq;
            gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime + index * 0.05);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioCtx.currentTime + index * 0.05 + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.0);
            osc.connect(gainNode); gainNode.connect(this.audioCtx.destination);
            osc.start(this.audioCtx.currentTime + index * 0.05); osc.stop(this.audioCtx.currentTime + 1.0);
        });
    }

    private playFlowEntrySound() {
        if (!this.audioCtx) return;
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
            msg.rate = 1.1; msg.pitch = 0.9;
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
        this.isWaitingForNext = false;
        this.typedText = "";
        this.renderText();
    }

    private handleInput(event: KeyboardEvent) {
        if (event.metaKey || (event.ctrlKey && !event.altKey)) return;
        
        const target = this.snippets[this.currentSnippetIndex].text;
        const key = event.key;

        if (key.length === 1 || key === 'Enter') { 
            const charToMatch = key === 'Enter' ? '\n' : key;
            const expectedChar = target[this.typedText.length];

            if (charToMatch === expectedChar) {
                this.typedText += expectedChar;
                this.totalChars++;
                this.currentStreak++;
                if (this.currentStreak > this.maxStreak) {
                    this.maxStreak = this.currentStreak;
                    (window as any).maxStreakAchieved = this.maxStreak;
                }
                
                // Smart Auto-Indent
                if (expectedChar === '\n') {
                    while (this.typedText.length < target.length && 
                           (target[this.typedText.length] === ' ' || target[this.typedText.length] === '\t')) {
                        this.typedText += target[this.typedText.length];
                        this.totalChars++; 
                    }
                }

                this.playASMRClick();
                this.cameras.main.zoomTo(1.02, 30, 'Linear', true, (cam, prog) => { if (prog === 1) cam.zoomTo(1, 30); });

                if (this.isFlowState) {
                    this.flowParticles.emitParticleAt(Phaser.Math.Between(100, 700), Phaser.Math.Between(200, 400));
                }

            } else {
                // Ignore redundant spaces if already indented
                if (charToMatch === ' ' && expectedChar !== ' ' && 
                   (this.typedText.endsWith(' ') || this.typedText.endsWith('\n') || this.typedText.endsWith('\t'))) {
                    return;
                }

                this.errors++;
                this.currentStreak = 0;
                if(this.codeOverlay) {
                    this.codeOverlay.classList.remove('shake-error');
                    void this.codeOverlay.offsetWidth;
                    this.codeOverlay.classList.add('shake-error');
                }
                this.cameras.main.shake(150, 0.01);
                this.cameras.main.flash(200, 255, 0, 0);
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
        this.isWaitingForNext = true; // LOCK INPUT
        const explanation = this.snippets[this.currentSnippetIndex].explanation;
        
        if (this.explHTML) {
            this.explHTML.innerText = explanation;
            this.explHTML.style.opacity = '1';
        }
        
        this.explosionParticles.emitParticleAt(400, 300, 50);
        this.cameras.main.flash(300, 255, 255, 255);
        this.playEpicChime();
        this.speakExplanation(explanation);
        
        // Faster delay for better gameplay flow (2.5 seconds)
        this.time.delayedCall(2500, () => {
            if (this.explHTML) this.explHTML.style.opacity = '0';
            this.currentSnippetIndex++;
            this.updateSnippet();
        });
    }

    private escapeHTML(str: string) {
        return str.replace(/[&<>'"]/g, tag => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[tag]||tag));
    }

    private renderText() {
        const target = this.snippets[this.currentSnippetIndex].text;
        if (!this.codeHTML) return;

        const typed = target.substring(0, this.typedText.length);
        let cursorChar = target.substring(this.typedText.length, this.typedText.length + 1);
        const remaining = target.substring(this.typedText.length + 1);

        if (cursorChar === '\n') cursorChar = '↵\n';
        else if (cursorChar === '') cursorChar = ' ';

        this.codeHTML.innerHTML = `<span class="typed-correct">${this.escapeHTML(typed)}</span><span class="typed-cursor">${this.escapeHTML(cursorChar)}</span><span>${this.escapeHTML(remaining)}</span>`;
    }

    update() {
        if (this.isFinished) return;
        
        const now = Date.now();
        const elapsedMinutes = (now - this.startTime) / 60000;
        const effectiveMinutes = Math.max(0.1, elapsedMinutes); 
        const wpm = Math.round((this.totalChars / 5) / effectiveMinutes) || 0;
        const accuracy = Math.round(((this.totalChars - this.errors) / Math.max(1, this.totalChars)) * 100);
        const progress = Math.round((this.currentSnippetIndex / this.snippets.length) * 100);

        if (!this.isNeuralMode) this.focusLevel = 100;

        if (this.focusLevel >= 90 && this.currentStreak > 20) {
            if (!this.isFlowState) {
                this.isFlowState = true;
                document.body.classList.add('flow-state-active');
                document.getElementById('flow-state-indicator')!.style.opacity = '1';
                this.cameras.main.flash(500, 255, 170, 0); // Gold flash on entry
                this.playFlowEntrySound();
            }
        } else if (this.isFlowState) {
            this.isFlowState = false;
            document.body.classList.remove('flow-state-active');
            document.getElementById('flow-state-indicator')!.style.opacity = '0';
        }

        if (this.isNeuralMode && this.codeOverlay) {
            if (!this.isFlowState && this.focusLevel < 50) {
                const blurAmount = Math.max(0, 5 - (this.focusLevel / 10));
                this.codeOverlay.style.filter = `blur(${blurAmount}px)`;
                this.codeOverlay.style.opacity = `${0.3 + (this.focusLevel / 100)}`;
                this.cameras.main.shake(100, 0.001 * ((50 - this.focusLevel) / 10));
            } else {
                this.codeOverlay.style.filter = `none`;
                this.codeOverlay.style.opacity = `1`;
            }
        }
        (window as any).updateStats({ wpm, accuracy, progress, streak: this.currentStreak, maxStreak: this.maxStreak });
    }

    setFocusLevel(level: number) {
        if (this.isNeuralMode) this.focusLevel = level;
        else this.focusLevel = 100;
    }

    private endSession() {
        this.isFinished = true;
        if(this.codeOverlay) this.codeOverlay.style.display = 'none';
        (window as any).onSessionEnd();
    }
}
