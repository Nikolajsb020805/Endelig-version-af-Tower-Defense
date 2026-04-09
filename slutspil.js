export default class slutspil extends Phaser.Scene{
    constructor(){
        super({key: 'slutspil',
        physics: {
            arcade: {
                gravity: { y: 0 },
                debug: false
            },
            
        }});
    }

    preload(){
     this.load.image('Gameover', 'assets/Game_over.png');
    }
    create() {
        
    this.add.image(512, 384, 'Gameover').setDisplaySize(1024, 768);
    
    }
    update() { 
    
    }
}