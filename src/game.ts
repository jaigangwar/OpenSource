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
    private cursor!: Phaser.GameObjects.Rectangle;
    private explanationText!: Phaser.GameObjects.Text;
    private tunnelGraphics!: Phaser.GameObjects.Graphics;
    
    // Stats
    private startTime = 0;
    private totalChars = 0;
    private errors = 0;
    private isFinished = false;

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
    }

    preload() {
        // No heavy assets needed for this mode
    }

    create() {
        this.tunnelGraphics = this.add.graphics();
        
        // Main Code Display
        this.codeText = this.add.text(400, 300, '', {
            fontFamily: 'Share Tech Mono',
            fontSize: '32px',
            color: '#444',
            align: 'center',
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        // Explanation text (appears after snippet)
        this.explanationText = this.add.text(400, 450, '', {
            fontFamily: 'Share Tech Mono',
            fontSize: '18px',
            color: '#00f3ff',
            align: 'center'
        }).setOrigin(0.5).setAlpha(0);

        // Setup Keyboard
        this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
            if (this.isFinished) return;
            this.handleInput(event);
        });

        this.updateSnippet();
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
        const target = this.snippets[this.currentSnippetIndex].text;
        const key = event.key;

        if (key.length === 1) { // Single character
            if (key === target[this.typedText.length]) {
                this.typedText += key;
                this.totalChars++;
            } else {
                this.errors++;
                this.cameras.main.shake(100, 0.002);
            }
        } else if (key === 'Backspace') {
            // Optional: allow backspace if we want to allow error correction
            // For this mode, let's keep it strict (must type correct key to proceed)
        }

        if (this.typedText === target) {
            this.completeSnippet();
        } else {
            this.renderText();
        }
    }

    private completeSnippet() {
        this.explanationText.setText(this.snippets[this.currentSnippetIndex].explanation);
        this.explanationText.setAlpha(1);
        
        this.time.delayedCall(2000, () => {
            this.explanationText.setAlpha(0);
            this.currentSnippetIndex++;
            this.updateSnippet();
        });
    }

    private renderText() {
        const target = this.snippets[this.currentSnippetIndex].text;
        
        // We use two texts or styled text to show progress
        // Phaser text doesn't support multiple colors easily in one object without hacks
        // Let's use a simple approach: [Typed (Cyan)][Remaining (Gray)]
        this.codeText.setText(target);
        
        // Highlight logic could be done with a second text object overlay
        // For simplicity, we just update the content for now
        // Let's improve this with actual coloring if possible
    }

    update() {
        // Draw Tunnel Visuals
        this.drawTunnel();

        // Apply Focus Effects (Mental Fog)
        const blur = Math.max(0, (100 - this.focusLevel) / 10);
        // Phaser doesn't have a simple .setBlur on text, but we can use postFX in 3.60
        // If not available, we simulate with alpha and scale
        if (this.focusLevel < 50) {
            this.codeText.setAlpha(0.3 + (this.focusLevel / 100));
            this.codeText.setScale(1 + (50 - this.focusLevel) / 500);
        } else {
            this.codeText.setAlpha(1);
            this.codeText.setScale(1);
        }

        // Update Stats to UI
        const now = Date.now();
        const minutes = (now - this.startTime) / 60000;
        const wpm = Math.round((this.totalChars / 5) / minutes) || 0;
        const accuracy = Math.round(((this.totalChars - this.errors) / Math.max(1, this.totalChars)) * 100);
        const progress = Math.round((this.currentSnippetIndex / this.snippets.length) * 100);

        (window as any).updateStats({ wpm, accuracy, progress });
    }

    private drawTunnel() {
        this.tunnelGraphics.clear();
        const time = this.time.now * 0.002;
        
        // Draw expanding rectangles to simulate moving through a tunnel
        for (let i = 0; i < 5; i++) {
            const size = ((time + i * 0.4) % 2) * 400;
            const alpha = 1 - (size / 800);
            this.tunnelGraphics.lineStyle(2, 0x00f3ff, alpha);
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

    getStats() {
        const now = Date.now();
        const minutes = (now - this.startTime) / 60000;
        return {
            wpm: Math.round((this.totalChars / 5) / minutes),
            accuracy: Math.round(((this.totalChars - this.errors) / Math.max(1, this.totalChars)) * 100)
        };
    }
}
