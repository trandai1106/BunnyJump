import Phaser from '../lib/phaser.js'

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('game-over')
    }

    preload() {
        // sound effect
        this.load.audio('lose', 'assets/sfx/lose.ogg')
    }

    create() {
        const width = this.scale.width
        const height = this.scale.height

        this.add.text(width * 0.5, height * 0.4, 'Game Over', 
            { 
                color: '#fff', 
                fontSize: 50, 
                fontFamily: 'monospace' 
            }).setOrigin(0.5)
        this.add.text(width * 0.5, height * 0.6, 'Press SPACE to play again', 
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
}