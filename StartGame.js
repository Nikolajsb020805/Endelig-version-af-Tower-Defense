export default class StartGame extends Phaser.Scene{
    constructor(){
        super({key: 'StartGame',
        });
    }

    preload(){
        this.load.image('baggrund', 'assets/ban.png'); // Husk filendelse!
        this.load.image('pil', 'assets/pil.png');
        this.load.image('hus', 'assets/hus.png');
        this.load.image('shop', 'assets/shoppe.png');
        this.load.image('Shotgun_Turret', 'assets/Shotgun_Turret.png');
        this.load.image('Rocket_Turret', 'assets/Rocket_Turret.png');
        this.load.image('turret', 'assets/Turret.png');
       
        
        
     
    }

    create() {
        
        
        this.add.image(384, 384, 'baggrund').setDisplaySize(768, 768);
        this.add.image(898, 384, 'shop').setDisplaySize(260, 768);
        this.add.image(870, 150, 'turret').setDisplaySize(260, 128);
        
        this.add.text(870, 220, 'Towers = $100', { fontSize: '16px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.image(870, 300, 'Shotgun_Turret').setDisplaySize(260, 128);
        
        this.add.text(890, 370, 'Shotgun-Towers = $200', { fontSize: '16px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.image(890, 450, 'Rocket_Turret').setDisplaySize(260, 128);
        
        this.add.text(890, 520, 'Rocket-Towers = $500', { fontSize: '16px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        
        this.add.text(384, 70, 'Velkommen til Tower Defense!', { fontSize: '32px', fill: 'rgb(204, 0, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(420, 180, 'Dit mål er at forsvare dit hus mod bølger af fjender.', { fontSize: '20px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(420, 200, 'Du starter med $500 og tjener penge ved at besejre fjender', { fontSize: '20px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(420, 220 , 'fjenerne bliver stæker for hver bøgle', { fontSize: '20px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(420, 240 , 'Du kan bygge tre forskellige tårne for at beskytte dig mod fjenerne: ', { fontSize: '20px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(420, 260 , 'Standard Tower: skuder et skud og skyder hurtigt.', { fontSize: '20px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(420, 280 , 'Shotgun Tower: skyder 3 skud og skyder hurtigt', { fontSize: '20px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(420, 300 , 'Rocket Tower: skyder et stort skyd men skyder dubbel så langsomt', { fontSize: '20px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(420, 320 , 'fjenderne kommer i bøgler, og kommer fra den rød pil', { fontSize: '20px', fill: 'rgb(255, 255, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        
        
       
        window.TimeRangestamp = { now: 0 };// the coconut
        this.add.image(50, 145, 'pil').setDisplaySize(128, 128);
        this.add.image(650, 700, 'hus').setDisplaySize(110, 110);

        
        const startText = this.add.text(384, 600, 'Klik for at starte', { fontSize: '28px', fill: 'rgb(204, 0, 255)', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        startText.setInteractive({ useHandCursor: true });
       

        
        this.input.once('pointerdown', () => {
            this.scene.start('underspil');
        });
    }
}

    