import fjende from './fjende.js';
import Tower from './Tower.js';
import StartGame from './startgame.js';
import underspil from './underspil.js';
import slutspil from './slutspil.js';


let tower; 

// tilføj billeder her:
// function preload() {
    
//     this.load.image('turret', 'assets/Turret.png');
// }

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'gameCanvas',
    scene: [StartGame, underspil, slutspil],
};

const game = new Phaser.Game(config);

// function create() {
    
    
//     tower = new Tower(this, 600, 600);
// }

// function update() {
//     if (tower) {
//         tower.update(this.input.activePointer);
//     }
// }
