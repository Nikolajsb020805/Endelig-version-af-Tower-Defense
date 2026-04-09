export const Enemy_liv = 2;// pt livene på fjenden dør på 1 så man skal pluse det enlige tal med 1 for at det skal passe med det antal skud der skal til for at dræbe fjenden. 

const DEFAULT_PATH = [
    {x: -100, y: 131.25},
    {x: 165, y: 131.25},
    {x: 165, y: 525},
    {x: 375, y: 525},
    {x: 375, y: 135},   
    {x: 645, y: 135}, 
    {x: 645, y: 800}
    
];

export default class Enemy {
    constructor(path = DEFAULT_PATH) {
        this.path = path;      // liste af koordinater
        this.currentPoint = 0; // hvilket punkt den går mod
        this.x = path[0].x;
        this.y = path[0].y;
        this.speed = 2;
        this.health = Enemy_liv;
        this.alive = true;
        this.rewarded = false; 
    }

    update() {
        if (this.currentPoint >= this.path.length - 1) return;

        let target = this.path[this.currentPoint + 1];

        let dx = target.x - this.x;
        let dy = target.y - this.y;

        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.speed) {
            this.currentPoint++;
        } else {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }
    }

    takeDamage(damage) {
        if (!this.alive) return false;

        this.health -= damage;
        if (this.health <= 0) {
            this.alive = false;
            return true;
        }
        return false;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }
}

