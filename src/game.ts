import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private stars!: Phaser.Physics.Arcade.Group;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private focusLevel = 100;
  private isDistracted = false;

  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('star', 'assets/demoscene/ball-tuna.png');
    this.load.image('player', 'assets/sprites/phaser-dude.png');
  }

  create() {
    this.add.image(400, 300, 'sky');

    this.player = this.physics.add.sprite(400, 500, 'player');
    this.player.setCollideWorldBounds(true);

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 5,
      setXY: { x: 12, y: 0, stepX: 140 }
    });

    this.stars.children.iterate((child) => {
      const star = child as Phaser.Physics.Arcade.Image;
      star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      star.setVelocityY(Phaser.Math.Between(50, 150));
      return true;
    });

    this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this);

    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#fff' });
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    const multiplier = this.focusLevel / 100;

    if (this.focusLevel < 30) {
        if (!this.isDistracted) {
            this.isDistracted = true;
            this.physics.pause();
            this.player.setTint(0xff0000);
        }
        return;
    } else {
        if (this.isDistracted) {
            this.isDistracted = false;
            this.physics.resume();
            this.player.clearTint();
        }
    }

    // Adjust speed based on focus
    const speed = 160 * (0.5 + multiplier * 0.5);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    } else {
      this.player.setVelocityX(0);
    }

    // Respawn stars
    this.stars.children.iterate((child) => {
        const star = child as Phaser.Physics.Arcade.Image;
        if (star.y > 600) {
            star.setY(0);
            star.setX(Phaser.Math.Between(0, 800));
            star.setVelocityY(Phaser.Math.Between(50, 150) * multiplier);
        }
        return true;
    });
  }

  setFocusLevel(level: number) {
    this.focusLevel = level;
  }

  collectStar(_player: any, star: any) {
    star.disableBody(true, true);
    this.score += Math.round(10 * (this.focusLevel / 100));
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {
        const s = child as Phaser.Physics.Arcade.Image;
        s.enableBody(true, s.x, 0, true, true);
        return true;
      });
    }
  }

  getFinalScore() {
      return this.score;
  }
}
