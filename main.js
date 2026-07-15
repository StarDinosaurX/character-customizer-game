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
            skinTone: '#f4cdb4',
            faceShape: 'round',
            eyeStyle: 'round',
            eyeColor: '#4a4a4a',
            noseStyle: 'small',
            mouthStyle: 'smile',
            hairStyle: 'short',
            hairColor: '#2c2416',
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
        const skins = ['#f4cdb4', '#e8b89c', '#d4a574', '#c9935a', '#a0826d', '#8b6f47', '#6b5344'];
        const faces = ['round', 'square', 'oval', 'rect', 'diamond'];
        const eyes = ['round', 'almond', 'droopy', 'wide'];
        const eyeColors = ['#4a4a4a', '#8b4513', '#4169e1', '#228b22', '#6b4423'];
        const noses = ['small', 'round', 'pointed'];
        const mouths = ['smile', 'big', 'neutral', 'sad'];
        const hairs = ['short', 'long', 'spiky', 'curly', 'bob', 'pixie', 'wavy'];
        const hairColors = ['#2c2416', '#4a3c2a', '#8b6f47', '#d4a574', '#ffd700', '#dc143c', '#8b4789'];
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
        
        // Gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, '#e0c3fc');
        gradient.addColorStop(1, '#8ec5fc');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, w, h);

        this.drawHair(w / 2, h / 2 - 20);
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

        const w = 100, h = 130;
        const shape = this.character.faceShape;

        if (shape === 'round') {
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy, w, h, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (shape === 'square') {
            const size = 100;
            this.ctx.fillRect(cx - size, cy - size * 1.2, size * 2, size * 2.2);
            this.ctx.strokeRect(cx - size, cy - size * 1.2, size * 2, size * 2.2);
        } else if (shape === 'oval') {
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy, w * 0.8, h * 1.1, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (shape === 'rect') {
            const rw = 95, rh = 145;
            this.ctx.fillRect(cx - rw, cy - rh, rw * 2, rh * 2);
            this.ctx.strokeRect(cx - rw, cy - rh, rw * 2, rh * 2);
        } else if (shape === 'diamond') {
            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy - h * 1.2);
            this.ctx.lineTo(cx + w * 1.1, cy);
            this.ctx.lineTo(cx, cy + h * 1.2);
            this.ctx.lineTo(cx - w * 1.1, cy);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    drawHair(cx, cy) {
        this.ctx.fillStyle = this.character.hairColor;
        this.ctx.strokeStyle = '#2c2416';
        this.ctx.lineWidth = 2;

        const style = this.character.hairStyle;
        const size = 70;

        if (style === 'short') {
            // Short hair - covers top and sides
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy - 95, size * 1.3, size * 0.7, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.ellipse(cx - 70, cy - 40, size * 0.5, size * 0.6, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.ellipse(cx + 70, cy - 40, size * 0.5, size * 0.6, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'long') {
            // Long hair down sides and back
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy - 95, size * 1.3, size * 0.7, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.ellipse(cx - 85, cy + 20, size * 0.6, size * 1.3, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.ellipse(cx + 85, cy + 20, size * 0.6, size * 1.3, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            // Back hair
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy + 40, size * 0.9, size * 1.1, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'spiky') {
            // Spiky hair with individual spikes
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy - 90, size * 1.2, size * 0.6, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            for (let i = 0; i < 7; i++) {
                const angle = (i / 7) * Math.PI - Math.PI / 2;
                const x1 = cx + Math.cos(angle) * size * 0.8;
                const y1 = cy - 90 + Math.sin(angle) * size * 0.5;
                const x2 = cx + Math.cos(angle) * (size * 1.3);
                const y2 = cy - 120 + Math.sin(angle) * (size * 0.8);
                
                this.ctx.beginPath();
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
                this.ctx.lineWidth = 12;
                this.ctx.stroke();
            }
        } else if (style === 'curly') {
            // Curly fluffy hair
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy - 95, size * 1.4, size * 0.8, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                const x = cx + Math.cos(angle) * size * 1.2;
                const y = cy - 80 + Math.sin(angle) * size * 0.6;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 18, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();
            }
        } else if (style === 'bob') {
            // Bob cut - straight sides with full top
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy - 95, size * 1.25, size * 0.7, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            this.ctx.fillRect(cx - size * 0.9, cy - 50, size * 0.45, size * 1.2);
            this.ctx.fillRect(cx + size * 0.45, cy - 50, size * 0.45, size * 1.2);
            
            this.ctx.strokeRect(cx - size * 0.9, cy - 50, size * 0.45, size * 1.2);
            this.ctx.strokeRect(cx + size * 0.45, cy - 50, size * 0.45, size * 1.2);
        } else if (style === 'pixie') {
            // Short pixie cut
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy - 90, size * 0.9, size * 0.6, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.ellipse(cx - 65, cy - 35, size * 0.4, size * 0.5, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.ellipse(cx + 65, cy - 35, size * 0.4, size * 0.5, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'wavy') {
            // Wavy long hair
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy - 95, size * 1.3, size * 0.7, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            // Wavy sides
            for (let i = 0; i < 3; i++) {
                const y = cy - 40 + i * 50;
                this.ctx.beginPath();
                this.ctx.bezierCurveTo(
                    cx - size * 0.8, y,
                    cx - size * 1.2, y + 30,
                    cx - size * 0.8, y + 50
                );
                this.ctx.bezierCurveTo(
                    cx - size * 0.9, y + 60,
                    cx - size * 0.6, y + 70,
                    cx - size * 0.7, y + 80
                );
                this.ctx.lineTo(cx - size * 0.5, y + 80);
                this.ctx.lineTo(cx - size * 0.5, y);
                this.ctx.fill();
                this.ctx.stroke();
            }
            
            for (let i = 0; i < 3; i++) {
                const y = cy - 40 + i * 50;
                this.ctx.beginPath();
                this.ctx.bezierCurveTo(
                    cx + size * 0.8, y,
                    cx + size * 1.2, y + 30,
                    cx + size * 0.8, y + 50
                );
                this.ctx.bezierCurveTo(
                    cx + size * 0.9, y + 60,
                    cx + size * 0.6, y + 70,
                    cx + size * 0.7, y + 80
                );
                this.ctx.lineTo(cx + size * 0.5, y + 80);
                this.ctx.lineTo(cx + size * 0.5, y);
                this.ctx.fill();
                this.ctx.stroke();
            }
        }
    }

    drawEyes(cx, cy) {
        this.drawEye(cx - 40, cy - 20);
        this.drawEye(cx + 40, cy - 20);
    }

    drawEye(ex, ey) {
        this.ctx.fillStyle = '#fff';
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2.5;

        const style = this.character.eyeStyle;
        const size = 22;

        if (style === 'round') {
            this.ctx.beginPath();
            this.ctx.arc(ex, ey, size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'almond') {
            this.ctx.beginPath();
            this.ctx.ellipse(ex, ey, size * 1.1, size * 0.65, Math.PI / 6, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'droopy') {
            this.ctx.beginPath();
            this.ctx.moveTo(ex - size, ey - 5);
            this.ctx.quadraticCurveTo(ex, ey + size * 0.7, ex + size, ey - 5);
            this.ctx.quadraticCurveTo(ex + size * 0.8, ey - size * 0.5, ex, ey - size * 0.3);
            this.ctx.quadraticCurveTo(ex - size * 0.8, ey - size * 0.5, ex - size, ey - 5);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'wide') {
            this.ctx.beginPath();
            this.ctx.ellipse(ex, ey, size * 1.3, size * 0.7, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        }

        // Iris and pupil
        this.ctx.fillStyle = this.character.eyeColor;
        this.ctx.beginPath();
        this.ctx.arc(ex, ey, size * 0.45, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(ex + size * 0.1, ey - size * 0.1, size * 0.25, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(ex + size * 0.15, ey - size * 0.15, size * 0.1, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawEyebrows(cx, cy) {
        this.ctx.strokeStyle = this.character.hairColor;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        const style = this.character.eyebrowStyle;
        let width = 3;

        if (style === 'thick') width = 5.5;
        if (style === 'thin') width = 1.5;

        this.ctx.lineWidth = width;

        if (style === 'angry') {
            // Angry eyebrows angle UP toward center (positive slope, left brow and right brow mirror)
            this.ctx.beginPath();
            this.ctx.moveTo(cx - 60, cy - 55);
            this.ctx.lineTo(cx - 25, cy - 65);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(cx + 25, cy - 65);
            this.ctx.lineTo(cx + 60, cy - 55);
            this.ctx.stroke();
        } else {
            this.ctx.beginPath();
            this.ctx.moveTo(cx - 60, cy - 48);
            this.ctx.lineTo(cx - 20, cy - 48);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(cx + 20, cy - 48);
            this.ctx.lineTo(cx + 60, cy - 48);
            this.ctx.stroke();
        }
    }

    drawNose(cx, cy) {
        this.ctx.fillStyle = this.character.skinTone;
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;

        const style = this.character.noseStyle;

        if (style === 'small') {
            // Small nose - just small lines
            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy + 5);
            this.ctx.lineTo(cx - 3, cy + 15);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy + 5);
            this.ctx.lineTo(cx + 3, cy + 15);
            this.ctx.stroke();
            
            this.ctx.fillRect(cx - 2, cy + 12, 4, 6);
        } else if (style === 'round') {
            // Round bulbous nose
            this.ctx.beginPath();
            this.ctx.arc(cx, cy + 12, 14, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            this.ctx.fillStyle = '#fff';
            this.ctx.beginPath();
            this.ctx.arc(cx - 6, cy + 8, 4, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (style === 'pointed') {
            // Pointed triangle nose
            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy + 3);
            this.ctx.lineTo(cx - 10, cy + 18);
            this.ctx.lineTo(cx + 10, cy + 18);
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
            this.ctx.arc(cx, cy + 58, 28, 0, Math.PI);
            this.ctx.stroke();
        } else if (style === 'big') {
            this.ctx.fillStyle = 'rgba(255, 150, 180, 0.6)';
            this.ctx.beginPath();
            this.ctx.arc(cx, cy + 58, 32, 0, Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'neutral') {
            this.ctx.beginPath();
            this.ctx.moveTo(cx - 28, cy + 55);
            this.ctx.lineTo(cx + 28, cy + 55);
            this.ctx.stroke();
        } else if (style === 'sad') {
            this.ctx.beginPath();
            this.ctx.arc(cx, cy + 70, 28, Math.PI, 0);
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