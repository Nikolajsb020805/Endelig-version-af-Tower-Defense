export default class Tower {
    constructor(scene, x, y, projectiles) {
        this.scene = scene;
        this.player = scene.add.image(x, y, 'turret').setOrigin(0.5).setDisplaySize(192, 96);
        this.range = 200;
        this.projectiles = projectiles;
        this.lastShot = 0;
        this.shootCooldown = 1000; 
        this.damage = 3;
    }

    update(enemy) {
        if (!enemy) return; 
        
        const enemyPos = enemy.getPosition();
        
        const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            enemyPos.x,
            enemyPos.y
        );

        if (distance <= this.range) {
            const angle = Phaser.Math.Angle.Between(
                this.player.x,
                this.player.y,
                enemyPos.x,
                enemyPos.y
            );

            this.player.rotation = angle;

            
            if (this.scene.time.now - this.lastShot > this.shootCooldown) {
                this.shoot(angle, enemy);
                this.lastShot = this.scene.time.now;
            }
        }
    }

    shoot(angle, enemy) {
       
        const projectile = this.scene.add.circle(this.player.x, this.player.y, 5, 0xffff00);
        this.scene.physics.add.existing(projectile);
        projectile.damage = this.damage;
        this.projectiles.add(projectile);
        this.scene.physics.velocityFromRotation(angle, 1700, projectile.body.velocity);

        this.scene.time.delayedCall(300, () => {
            if (projectile && projectile.active) projectile.destroy();
        });
    }
}