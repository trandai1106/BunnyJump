import Phaser from '../lib/phaser.js'

export default class GameOver extends Phaser.Scene {
    heightPoint
    carrotCollected
    text
    IsTransparencyText

    constructor() {
        super('game-over')
    }

    init (data) {
        this.heightPoint = (data.heightPoint == null) ? 0 : data.heightPoint
        this.carrotCollected = (data.carrotCollected == null) ? 0 : data.carrotCollected
    }

    preload() {
        // sound effect
        this.load.audio('lose', 'assets/sfx/lose.ogg')
        
        // load the carrot image
        this.load.image('carrot', 'assets/sprites/carrot.png')
    }

    create() {
        this.IsTransparencyText = true;

        const width = this.scale.width
        const height = this.scale.height

        this.add.text(width * 0.5, height * 0.2, 'Height: ' + this.heightPoint + ' m', 
        { 
            color: '#fff', 
            fontSize: 56, 
            fontFamily: 'monospace' 
        }).setOrigin(0.5)

        
        this.add.image(width * 0.3, height * 0.4, 'carrot')
                .setScale(0.8)
                .setOrigin(0, 0.5) 

        this.add.text(width * 0.3 + 70, height * 0.4, ' × ' + this.carrotCollected, 
        { 
            color: '#fff', 
            fontSize: 44, 
            fontFamily: 'monospace' 
        }).setOrigin(0, 0.5)
        
        this.add.text(width * 0.5, height * 0.6, 'Game Over', 
            { 
                color: '#fff', 
                fontSize: 50, 
                fontFamily: 'monospace' 
            }).setOrigin(0.5)
        this.text = this.add.text(width * 0.5, height * 0.7, 'Press SPACE to play again', 
            { 
                color: '#fff', 
                fontSize: 30, 
                fontFamily: 'monospace' 
            }).setOrigin(0.5)

        // play again by pressing space
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('game')
        })

        // sound effect
        this.sound.play('lose')
    }

    update() {
        if (this.IsTransparencyText)
        {
            this.text.alpha -= 0.01
        }
        else
        {
            this.text.alpha += 0.01
        }

        if (this.text.alpha <= 0.4 && this.IsTransparencyText) {
            this.IsTransparencyText = false
        }
        else if (this.text.alpha >= 1 && !this.IsTransparencyText) {
            this.IsTransparencyText = true
        }
        
    }
}