import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private asteroids!: Phaser.Physics.Arcade.Group;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private focusLevel = 100;
  private isGlitching = false;
  private particles!: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('space', 'assets/skies/space3.png');
    this.load.image('ship', 'assets/sprites/fmship.png');
    this.load.image('asteroid', 'assets/sprites/pangball.png');
    this.load.image('flare', 'assets/particles/blue.png');
  }

  create() {
    // Background
    this.add.tileSprite(400, 300, 800, 600, 'space');

    // Player Ship
    this.player = this.physics.add.sprite(400, 500, 'ship');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.8);
    this.player.setDrag(100);

    // Thruster Particles
    const flare = this.add.particles(0, 0, 'flare', {
        speed: 100,
        scale: { start: 0.4, end: 0 },
        blendMode: 'ADD',
        lifespan: 300
    });
    flare.startFollow(this.player, 0, 20);
    this.particles = flare;

    // Obstacles
    this.asteroids = this.physics.add.group();
    this.time.addEvent({
        delay: 1000,
        callback: this.spawnAsteroid,
        callbackScope: this,
        loop: true
    });

    // HUD
    this.scoreText = this.add.text(16, 16, 'SYNC SCORE: 0', { 
        fontFamily: 'Orbitron',
        fontSize: '24px', 
        color: '#00f3ff' 
    });

    this.cursors = this.input.keyboard!.createCursorKeys();

    // Collisions
    this.physics.add.overlap(this.player, this.asteroids, this.handleCollision, undefined, this);

    // Initial Camera State
    this.cameras.main.setRoundPixels(true);
  }

  private spawnAsteroid() {
    if (this.focusLevel < 20) return; // Don't spawn if connection is lost

    const x = Phaser.Math.Between(0, 800);
    const asteroid = this.asteroids.create(x, -50, 'asteroid');
    asteroid.setScale(Phaser.Math.FloatBetween(0.5, 1.2));
    asteroid.setVelocityY(Phaser.Math.Between(100, 300) * (0.5 + (this.focusLevel / 100) * 0.5));
    asteroid.setTint(0x888888);
  }

  update() {
    const multiplier = this.focusLevel / 100;

    // 1. Visual Effects based on Focus
    if (this.focusLevel < 40) {
        if (!this.isGlitching) {
            this.isGlitching = true;
            this.cameras.main.setAlpha(0.7);
        }
        this.cameras.main.shake(100, 0.005 * (1 - multiplier));
        this.player.setTint(0xff0000);
        this.particles.setActive(false);
    } else {
        if (this.isGlitching) {
            this.isGlitching = false;
            this.cameras.main.setAlpha(1);
            this.player.clearTint();
        }
        this.particles.setActive(true);
        // Sync thruster intensity with focus
        this.particles.setScale({ start: 0.4 * multiplier, end: 0 });
    }

    // 2. Movement tied to Focus
    const baseSpeed = 300;
    const currentSpeed = baseSpeed * (0.2 + multiplier * 0.8);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-currentSpeed);
      this.player.setAngle(-15);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(currentSpeed);
      this.player.setAngle(15);
    } else {
      this.player.setVelocityX(0);
      this.player.setAngle(0);
    }

    // 3. Scoring & Cleanup
    this.asteroids.children.iterate((child) => {
        const ast = child as Phaser.Physics.Arcade.Image;
        if (ast.y > 650) {
            ast.destroy();
            if (this.focusLevel > 50) {
                this.score += Math.round(5 * multiplier);
                this.scoreText.setText('SYNC SCORE: ' + this.score);
            }
        }
        return true;
    });
  }

  private handleCollision(player: any, _asteroid: any) {
    this.cameras.main.flash(500, 255, 0, 0);
    this.score = Math.max(0, this.score - 50);
    this.scoreText.setText('SYNC SCORE: ' + this.score);
    _asteroid.destroy();
    
    // Brief stun
    player.setAlpha(0.5);
    this.time.delayedCall(1000, () => player.setAlpha(1));
  }

  setFocusLevel(level: number) {
    this.focusLevel = level;
  }
}
