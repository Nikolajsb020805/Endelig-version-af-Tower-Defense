import Tower from './Tower.js';
import Enemy from './fjende.js';
import Tower2 from './Tower2.js';
import Tower3 from './Tower3.js';

 
export default class underspil extends Phaser.Scene{
    constructor() {
        super({
            key: "underspil",
            physics: {
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            }
        });
    }
    
    

    preload(){
        this.load.image('turret', 'assets/Turret.png');
        this.load.image('fjende', 'assets/Fjende.png');
        this.load.image('baggrund', 'assets/ban.png');
        this.load.image('shop', 'assets/shoppe.png');
        this.load.image('Shotgun_Turret', 'assets/Shotgun_Turret.png');
        this.load.image('Rocket_Turret', 'assets/Rocket_Turret.png');
        
    }


    create() {
        this.add.image(384, 384, 'baggrund').setDisplaySize(768, 768);
        this.add.image(898, 384, 'shop').setDisplaySize(260, 768);
        this.add.image(870, 150, 'turret').setDisplaySize(260, 128);
        this.add.text(870, 220, 'Towers = $100', { fontSize: '16px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.image(870, 300, 'Shotgun_Turret').setDisplaySize(260, 128);
        this.add.text(890, 370, 'Shotguns Towers = $200', { fontSize: '16px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.image(890, 450, 'Rocket_Turret').setDisplaySize(260, 128);
        this.add.text(890, 520, 'Rocket Towers = $500', { fontSize: '16px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);

        this.money = 500;
        this.moneyText = this.add.text(800, 550, 'Money: $' + this.money, { fontSize: '24px', fill: '#fff', stroke: '#000', strokeThickness: 2 });

        this.waveReward = 100;

        this.health = 10;
        this.healthText = this.add.text(800, 600, 'Health: 10', { fontSize: '24px', fill: '#ff0000', stroke: '#000', strokeThickness: 2 });

        this.currentWave = 1;
        this.enemiesPerWave = 3; 
        this.waveText = this.add.text(800, 650, 'Wave: 1', { fontSize: '24px', fill: '#00ff00', stroke: '#000', strokeThickness: 2 });
        this.waveInProgress = false;

        this.projectiles = this.physics.add.group();

        this.tower = new Tower(this, -600, -4000, this.projectiles);
        this.tower2 = new Tower2(this, -2800, -2000, this.projectiles);
        this.tower3 = new Tower3(this, -2800, -6000, this.projectiles);

        this.towers = [this.tower, this.tower2, this.tower3];

        const basicTowerZone = this.add.zone(870, 190, 220, 100).setOrigin(0.5).setInteractive({ cursor: 'pointer' });
        const shotgunZone = this.add.zone(870, 310, 220, 100).setOrigin(0.5).setInteractive({ cursor: 'pointer' });
        const rocketZone = this.add.zone(870, 430, 220, 100).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

        basicTowerZone.on('pointerdown', () => this.selectTower('basic'));
        shotgunZone.on('pointerdown', () => this.selectTower('shotgun'));
        rocketZone.on('pointerdown', () => this.selectTower('rocket'));

        this.input.on('pointermove', (pointer) => {
            if (this.placementPreview) {
                this.placementPreview.setPosition(pointer.x, pointer.y);
                const canPlace = this.canPlaceTower(pointer.x, pointer.y);
                this.placementPreview.setTint(canPlace ? 0x00ff00 : 0xff0000);
            }
        });

        this.input.on('pointerdown', (pointer) => {
            if (this.selectedTowerType && pointer.x < 800) { 
                this.placeTower(pointer.x, pointer.y);
            }
        });

        this.enemies = [];
        this.enemySprites = [];

        this.startWave();
    }

    startWave() {
        this.enemies = [];
        this.enemySprites = [];

        this.waveInProgress = true;
        const enemyCount = this.enemiesPerWave + Math.floor((this.currentWave - 1) / 2); 
        const spacing = 60;
        this.waveReward = 100 + Math.floor((this.currentWave - 1) / 5) * 5; 

        for (let i = 0; i < enemyCount; i++) {
            const enemy = new Enemy();

            enemy.speed = 2 + Math.floor((this.currentWave - 1) / 10) * 0.5; 
            enemy.health = 4 + Math.floor((this.currentWave - 1) / 6); 
            
            enemy.x -= i * spacing;
            enemy.y += i * 10;

            this.enemies.push(enemy);

            const enemySprite = this.physics.add.image(enemy.x, enemy.y, 'fjende').setDisplaySize(50, 50);
            enemySprite.body.setImmovable(true);
            this.enemySprites.push(enemySprite);
        }
    }



    update() {

        if (!this.enemies || this.enemies.length === 0) return;

        this.enemies.forEach((enemy, index) => {
            if (enemy.alive) {
                enemy.update();
                const sprite = this.enemySprites[index];
                sprite.setPosition(enemy.x, enemy.y);
            } else {
                const sprite = this.enemySprites[index];
                if (sprite.active) {
                    sprite.disableBody(true, true);
                }
            }
        });

        const aliveEnemies = this.enemies.filter(enemy => enemy.alive).length;
        if (aliveEnemies === 0 && this.waveInProgress) {
            this.waveInProgress = false;

            this.money += this.waveReward;
            this.moneyText.setText('Money: $' + this.money);

            this.currentWave++;
            this.waveText.setText('Wave: ' + this.currentWave);

            this.time.delayedCall(2000, () => {
                this.startWave();
            });
        }

        const target = this.enemies.find((e) => e.alive);
        if (target) {
            this.towers.forEach((tower) => tower.update(target));
        }

        this.enemies.forEach((enemy, index) => {
            if (enemy.alive && enemy.currentPoint >= enemy.path.length - 1) {
                const finalPoint = enemy.path[enemy.path.length - 1];
                const distanceToEnd = Phaser.Math.Distance.Between(enemy.x, enemy.y, finalPoint.x, finalPoint.y);

                if (distanceToEnd < 10) { 
                    console.log('Enemy reached the end! Health before:', this.health);
                    this.health -= 1;
                    this.healthText.setText('Health: ' + this.health);
                    enemy.alive = false; 
                    enemy.rewarded = true; 

                    const sprite = this.enemySprites[index];
                    if (sprite.active) {
                        sprite.disableBody(true, true);
                    }

                    if (this.health <= 0) {
                        console.log('Game Over! Health:', this.health);
                        this.scene.start('slutspil'); 
                    }
                }
            }
        });

        this.projectiles.getChildren().forEach((projectile) => {
            if (!projectile.active) return;

            this.enemies.forEach((enemy, index) => {
                if (!enemy.alive) return;

                const dx = projectile.x - enemy.x;
                const dy = projectile.y - enemy.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 25) {
                    const died = enemy.takeDamage(projectile.damage || this.tower.damage);
                    projectile.destroy();

                    if (died && !enemy.rewarded) {
                        this.money += 10;
                        this.moneyText.setText('Money: $' + this.money);
                        enemy.rewarded = true;

                        const enemySprite = this.enemySprites[index];
                        if (enemySprite.active) {
                            enemySprite.disableBody(true, true);
                        }
                    }
                }
            });
        });
    }

    selectTower(type) {
        const prices = { basic: 100, shotgun: 200, rocket: 500 };
        const TowerClass = { basic: Tower, shotgun: Tower2, rocket: Tower3 }[type];

        if (!TowerClass) return;
        if (this.money < prices[type]) {
            console.log('Not enough money to buy', type);
            return;
        }

        this.selectedTowerType = type;

        if (this.placementPreview) this.placementPreview.destroy();
        const spriteKey = { basic: 'turret', shotgun: 'Shotgun_Turret', rocket: 'Rocket_Turret' }[type];
        this.placementPreview = this.add.image(0, 0, spriteKey).setOrigin(0.5).setDisplaySize(192, 96).setAlpha(0.7);
    }

    canPlaceTower(x, y) {
        const pathPoints = [
            {x: -100, y: 131.25}, {x: 0, y: 131.25}, {x: 50, y: 131.25}, {x: 100, y: 131.25}, {x: 120, y: 131.25}, {x: 165, y: 131.25}, 
            {x: 165, y: 180},{x: 165, y: 230},{x: 165, y: 280},{x: 165, y: 320},{x: 165, y: 380},{x: 165, y: 430},{x: 165, y: 480}, {x: 165, y: 525},
            {x: 210, y: 525},{x: 260, y: 525},{x: 310, y: 525},{x: 350, y: 525}, {x: 375, y: 525}, 
            {x: 375, y: 480},{x: 375, y: 430},{x: 375, y: 380},{x: 375, y: 330},{x: 375, y: 280},{x: 375, y: 230},{x: 375, y: 180},{x: 375, y: 135}, 
            {x: 320, y: 135},{x: 370, y: 135},{x: 420, y: 135},{x: 470, y: 135},{x: 520, y: 135},{x: 570, y: 135},{x: 620, y: 135},{x: 645, y: 135}, 
            {x: 645, y: 180},{x: 645, y: 230},{x: 645, y: 280},{x: 645, y: 330},{x: 645, y: 380},{x: 645, y: 430},{x: 645, y: 480},{x: 645, y: 530},{x: 645, y: 580},{x: 645, y: 630},{x: 645, y: 680},{x: 645, y: 730}, {x: 645, y: 800}
        ];

        for (let point of pathPoints) {
            const distance = Phaser.Math.Distance.Between(x, y, point.x, point.y);
            if (distance < 50) return false; 
        }

        for (let tower of this.towers) {
            const distance = Phaser.Math.Distance.Between(x, y, tower.player.x, tower.player.y);
            if (distance < 50) return false; 
        }

        return true;
    }

    placeTower(x, y) {
        if (!this.selectedTowerType || !this.canPlaceTower(x, y)) return;

        const prices = { basic: 100, shotgun: 200, rocket: 500 };
        const TowerClass = { basic: Tower, shotgun: Tower2, rocket: Tower3 }[this.selectedTowerType];

        this.money -= prices[this.selectedTowerType];
        this.moneyText.setText('Money: $' + this.money);

        const newTower = new TowerClass(this, x, y, this.projectiles);
        this.towers.push(newTower);

        // Clean up placement mode
        this.selectedTowerType = null;
        if (this.placementPreview) {
            this.placementPreview.destroy();
            this.placementPreview = null;
        }
    }
}