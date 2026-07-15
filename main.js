// How to run: Link this file in index.html with <script src="main.js"></script>

// ========== CHARACTER CREATOR ==========
class CharacterCreator {
    constructor() {
        this.canvas = document.getElementById('previewCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.character = this.getDefaultCharacter();
        this.setupEventListeners();
        this.draw();
    }

    getDefaultCharacter() {
        return {
            skinTone: '#d4a574',
            faceShape: 'round',
            eyeStyle: 'round',
            eyeColor: '#4a4a4a',
            noseStyle: 'small',
            mouthStyle: 'smile',
            hairStyle: 'short',
            hairColor: '#1a1a1a',
            eyebrowStyle: 'normal',
            name: 'MyChar'
        };
    }

    setupEventListeners() {
        const inputs = ['skinTone', 'faceShape', 'eyeStyle', 'eyeColor', 
                       'noseStyle', 'mouthStyle', 'hairStyle', 'hairColor', 'eyebrowStyle'];
        
        inputs.forEach(id => {
            const elem = document.getElementById(id);
            if (elem) elem.addEventListener('change', (e) => {
                this.character[id] = e.target.value;
                this.draw();
            });
        });

        const nameInput = document.getElementById('charName');
        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                this.character.name = e.target.value || 'MyChar';
            });
        }

        document.getElementById('randomBtn').addEventListener('click', () => this.randomize());
        document.getElementById('saveCharBtn').addEventListener('click', () => this.saveAndPlay());
    }

    randomize() {
        const skins = ['#fdbcb4', '#f4a460', '#d4a574', '#a0826d', '#6b4423'];
        const faces = ['round', 'square', 'oval', 'heart'];
        const eyes = ['round', 'almond', 'droopy', 'wide'];
        const eyeColors = ['#4a4a4a', '#8b4513', '#4169e1', '#228b22', '#dc143c'];
        const noses = ['small', 'round', 'pointed'];
        const mouths = ['smile', 'big', 'neutral', 'sad'];
        const hairs = ['short', 'long', 'spiky', 'curly', 'straight'];
        const hairColors = ['#1a1a1a', '#8b4513', '#ffd700', '#ff4500', '#e6e6fa'];
        const eyebrows = ['normal', 'thick', 'thin', 'angry'];

        this.character = {
            skinTone: skins[Math.floor(Math.random() * skins.length)],
            faceShape: faces[Math.floor(Math.random() * faces.length)],
            eyeStyle: eyes[Math.floor(Math.random() * eyes.length)],
            eyeColor: eyeColors[Math.floor(Math.random() * eyeColors.length)],
            noseStyle: noses[Math.floor(Math.random() * noses.length)],
            mouthStyle: mouths[Math.floor(Math.random() * mouths.length)],
            hairStyle: hairs[Math.floor(Math.random() * hairs.length)],
            hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
            eyebrowStyle: eyebrows[Math.floor(Math.random() * eyebrows.length)],
            name: 'Randomized'
        };

        this.updateUIValues();
        this.draw();
    }

    updateUIValues() {
        const ids = ['skinTone', 'faceShape', 'eyeStyle', 'eyeColor', 'noseStyle', 
                    'mouthStyle', 'hairStyle', 'hairColor', 'eyebrowStyle'];
        ids.forEach(id => {
            const elem = document.getElementById(id);
            if (elem) elem.value = this.character[id];
        });
    }

    draw() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, w, h);

        this.drawHair(w / 2, h / 2);
        this.drawFace(w / 2, h / 2);
        this.drawEyebrows(w / 2, h / 2);
        this.drawEyes(w / 2, h / 2);
        this.drawNose(w / 2, h / 2);
        this.drawMouth(w / 2, h / 2);
    }

    drawFace(cx, cy) {
        this.ctx.fillStyle = this.character.skinTone;
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 3;

        const w = 120, h = 140;
        const shape = this.character.faceShape;

        if (shape === 'round') {
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy, w, h, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (shape === 'square') {
            this.ctx.fillRect(cx - w, cy - h, w * 2, h * 2);
            this.ctx.strokeRect(cx - w, cy - h, w * 2, h * 2);
        } else if (shape === 'oval') {
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy, w * 0.85, h, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (shape === 'heart') {
            this.drawHeart(cx, cy, w);
        }
    }

    drawHeart(cx, cy, size) {
        this.ctx.fillStyle = this.character.skinTone;
        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy + size * 0.7);
        this.ctx.quadraticCurveTo(cx - size * 0.7, cy - size * 0.2, cx - size * 0.7, cy - size * 0.4);
        this.ctx.quadraticCurveTo(cx - size * 0.7, cy - size * 0.8, cx, cy - size * 0.5);
        this.ctx.quadraticCurveTo(cx + size * 0.7, cy - size * 0.8, cx + size * 0.7, cy - size * 0.4);
        this.ctx.quadraticCurveTo(cx + size * 0.7, cy - size * 0.2, cx, cy + size * 0.7);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawHair(cx, cy) {
        this.ctx.fillStyle = this.character.hairColor;
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;

        const style = this.character.hairStyle;
        const size = 60;

        if (style === 'short') {
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy - 80, size * 1.2, size * 0.6, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'long') {
            this.ctx.fillRect(cx - size * 0.8, cy - 80, size * 1.6, size * 1.4);
            this.ctx.strokeRect(cx - size * 0.8, cy - 80, size * 1.6, size * 1.4);
        } else if (style === 'spiky') {
            for (let i = 0; i < 5; i++) {
                const angle = (i / 5) * Math.PI + Math.PI * 0.5;
                const x1 = cx + Math.cos(angle) * size * 0.8;
                const y1 = cy - 80 + Math.sin(angle) * size * 0.8;
                const x2 = cx + Math.cos(angle) * size;
                const y2 = cy - 100 + Math.sin(angle) * size;
                this.ctx.beginPath();
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
                this.ctx.lineWidth = 15;
                this.ctx.stroke();
            }
        } else if (style === 'curly') {
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const x = cx + Math.cos(angle) * size;
                const y = cy - 70 + Math.sin(angle) * size * 0.5;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 20, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();
            }
        } else if (style === 'straight') {
            this.ctx.beginPath();
            this.ctx.moveTo(cx - size, cy - 80);
            this.ctx.lineTo(cx - size, cy + size * 0.5);
            this.ctx.lineTo(cx + size, cy + size * 0.5);
            this.ctx.lineTo(cx + size, cy - 80);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    drawEyes(cx, cy) {
        this.drawEye(cx - 35, cy - 20);
        this.drawEye(cx + 35, cy - 20);
    }

    drawEye(ex, ey) {
        this.ctx.fillStyle = '#fff';
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;

        const style = this.character.eyeStyle;
        const size = 20;

        if (style === 'round') {
            this.ctx.beginPath();
            this.ctx.arc(ex, ey, size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'almond') {
            this.ctx.beginPath();
            this.ctx.ellipse(ex, ey, size, size * 0.7, Math.PI / 6, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'droopy') {
            this.ctx.beginPath();
            this.ctx.ellipse(ex, ey + 5, size, size * 0.8, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'wide') {
            this.ctx.beginPath();
            this.ctx.ellipse(ex, ey, size * 1.2, size * 0.6, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        }

        this.ctx.fillStyle = this.character.eyeColor;
        this.ctx.beginPath();
        this.ctx.arc(ex, ey, size * 0.5, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(ex - size * 0.2, ey - size * 0.2, size * 0.2, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawEyebrows(cx, cy) {
        this.ctx.strokeStyle = this.character.hairColor;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        const style = this.character.eyebrowStyle;
        let width = 3;

        if (style === 'thick') width = 6;
        if (style === 'thin') width = 1.5;

        this.ctx.lineWidth = width;

        if (style === 'angry') {
            this.ctx.beginPath();
            this.ctx.moveTo(cx - 55, cy - 50);
            this.ctx.lineTo(cx - 25, cy - 60);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(cx + 25, cy - 60);
            this.ctx.lineTo(cx + 55, cy - 50);
            this.ctx.stroke();
        } else {
            this.ctx.beginPath();
            this.ctx.moveTo(cx - 55, cy - 45);
            this.ctx.lineTo(cx - 25, cy - 45);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(cx + 25, cy - 45);
            this.ctx.lineTo(cx + 55, cy - 45);
            this.ctx.stroke();
        }
    }

    drawNose(cx, cy) {
        this.ctx.fillStyle = this.character.skinTone;
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;

        const style = this.character.noseStyle;

        if (style === 'small') {
            this.ctx.fillRect(cx - 5, cy, 10, 15);
            this.ctx.strokeRect(cx - 5, cy, 10, 15);
        } else if (style === 'round') {
            this.ctx.beginPath();
            this.ctx.arc(cx, cy + 8, 12, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'pointed') {
            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy - 5);
            this.ctx.lineTo(cx - 8, cy + 15);
            this.ctx.lineTo(cx + 8, cy + 15);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    drawMouth(cx, cy) {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';

        const style = this.character.mouthStyle;

        if (style === 'smile') {
            this.ctx.beginPath();
            this.ctx.arc(cx, cy + 50, 25, 0, Math.PI);
            this.ctx.stroke();
        } else if (style === 'big') {
            this.ctx.fillStyle = 'rgba(255, 192, 203, 0.5)';
            this.ctx.beginPath();
            this.ctx.arc(cx, cy + 50, 35, 0, Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'neutral') {
            this.ctx.beginPath();
            this.ctx.moveTo(cx - 25, cy + 50);
            this.ctx.lineTo(cx + 25, cy + 50);
            this.ctx.stroke();
        } else if (style === 'sad') {
            this.ctx.beginPath();
            this.ctx.arc(cx, cy + 65, 25, Math.PI, 0);
            this.ctx.stroke();
        }
    }

    saveAndPlay() {
        gameManager.startGame(this.character);
    }
}

// ========== GAME ENGINE ==========
class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collidesWith(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }
}

class Player extends GameObject {
    constructor(character) {
        super(375, 500, 50, 50);
        this.character = character;
        this.velocity = { x: 0, y: 0 };
        this.speed = 5;
    }

    update(keys) {
        this.velocity.x = 0;
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) this.velocity.x = -this.speed;
        if (keys['ArrowRight'] || keys['d'] || keys['D']) this.velocity.x = this.speed;

        this.x += this.velocity.x;
        this.x = Math.max(0, Math.min(this.x, 800 - this.width));
    }

    draw(ctx) {
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = '#4a4a4a';
        ctx.beginPath();
        ctx.arc(this.x + 15, this.y + 15, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + 35, this.y + 15, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Collectible extends GameObject {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.collected = false;
    }

    draw(ctx) {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y + 10, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFA500';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

class Enemy extends GameObject {
    constructor(x, y) {
        super(x, y, 30, 30);
        this.velocityX = Math.random() > 0.5 ? 2 : -2;
    }

    update() {
        this.x += this.velocityX;
        if (this.x <= 0 || this.x + this.width >= 800) {
            this.velocityX *= -1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#FF6347';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y + 10, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + 20, this.y + 10, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Particle {
    constructor(x, y, vx, vy, life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = life;
        this.maxLife = life;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2;
        this.life--;
    }

    draw(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

class GameManager {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.keys = {};
        this.isPaused = false;
        this.isGameOver = false;
        this.score = 0;
        this.health = 100;
        this.particles = [];
        this.character = null;
        this.player = null;
        this.collectibles = [];
        this.enemies = [];
        this.frameCount = 0;

        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);

        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('resumeBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('backBtn').addEventListener('click', () => this.backToCreator());
        document.getElementById('backFromPauseBtn').addEventListener('click', () => this.backToCreator());
        document.getElementById('newGameBtn').addEventListener('click', () => this.newGame());
        document.getElementById('backFromGameOverBtn').addEventListener('click', () => this.backToCreator());
    }

    startGame(character) {
        this.character = character;
        this.player = new Player(character);
        this.score = 0;
        this.health = 100;
        this.isGameOver = false;
        this.isPaused = false;
        this.collectibles = [];
        this.enemies = [];
        this.particles = [];
        this.frameCount = 0;

        document.getElementById('charTitle').textContent = `Game - ${character.name}`;
        document.getElementById('creatorScreen').classList.remove('active');
        document.getElementById('gameScreen').classList.add('active');
        document.getElementById('pauseOverlay').classList.add('hidden');
        document.getElementById('gameOverOverlay').classList.add('hidden');

        this.spawnCollectibles(5);
        this.spawnEnemies(2);
        this.gameLoop();
    }

    spawnCollectibles(count) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * (800 - 20);
            const y = Math.random() * (400 - 20);
            this.collectibles.push(new Collectible(x, y));
        }
    }

    spawnEnemies(count) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * (800 - 30);
            const y = Math.random() * 200 + 50;
            this.enemies.push(new Enemy(x, y));
        }
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        document.getElementById('pauseOverlay').classList.toggle('hidden');
    }

    backToCreator() {
        document.getElementById('gameScreen').classList.remove('active');
        document.getElementById('creatorScreen').classList.add('active');
    }

    newGame() {
        this.startGame(this.character);
    }

    gameLoop = () => {
        if (!this.isPaused && !this.isGameOver) {
            this.update();
        }
        this.draw();

        if (!this.isGameOver) {
            requestAnimationFrame(this.gameLoop);
        }
    };

    update() {
        this.frameCount++;

        this.player.update(this.keys);

        this.enemies.forEach(e => e.update());

        this.collectibles = this.collectibles.filter(c => {
            if (this.player.collidesWith(c)) {
                this.score += 10;
                this.createParticles(c.x + 10, c.y + 10);
                return false;
            }
            return true;
        });

        this.enemies.forEach(enemy => {
            if (this.player.collidesWith(enemy)) {
                this.health -= 5;
                this.createParticles(enemy.x, enemy.y);
            }
        });

        if (this.collectibles.length === 0 && this.frameCount % 60 === 0) {
            this.spawnCollectibles(2);
        }

        this.particles.forEach(p => p.update());
        this.particles = this.particles.filter(p => p.life > 0);

        if (this.health <= 0) {
            this.endGame();
        }

        document.getElementById('score').textContent = this.score;
        document.getElementById('health').textContent = this.health;
    }

    createParticles(x, y) {
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const vx = Math.cos(angle) * 3;
            const vy = Math.sin(angle) * 3;
            this.particles.push(new Particle(x, y, vx, vy, 30));
        }
    }

    draw() {
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, 800, 600);

        this.collectibles.forEach(c => c.draw(this.ctx));
        this.enemies.forEach(e => e.draw(this.ctx));
        this.player.draw(this.ctx);
        this.particles.forEach(p => p.draw(this.ctx));
    }

    endGame() {
        this.isGameOver = true;
        document.getElementById('finalScore').textContent = `Final Score: ${this.score}`;
        document.getElementById('gameOverOverlay').classList.remove('hidden');
    }
}

// ========== INITIALIZATION ==========
let creator = null;
let gameManager = null;

document.addEventListener('DOMContentLoaded', () => {
    creator = new CharacterCreator();
    gameManager = new GameManager();
});
