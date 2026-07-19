// How to run: Link this file in index.html with <script src="main.js"></script>

// ========== CHARACTER CREATOR (3D) ==========
class CharacterCreator {
    constructor() {
        this.canvas = document.getElementById('previewCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.character = this.getDefaultCharacter();
        this.rotation = { x: 0, y: 0 };
        this.zoom = 1;
        this.isDragging = false;
        this.lastMouse = { x: 0, y: 0 };
        this.setupEventListeners();
        this.setupCanvasEvents();
        this.draw();
        this.loadSavedCharacters();
    }

    getDefaultCharacter() {
        return {
            skinTone: '#6b5344',
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

        // Buttons
        document.getElementById('randomBtn').addEventListener('click', () => this.randomize());
        document.getElementById('saveCharBtn').addEventListener('click', () => this.showSaveModal());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());

        // Save Modal
        document.getElementById('confirmSaveBtn').addEventListener('click', () => this.confirmSave());
        document.getElementById('cancelSaveBtn').addEventListener('click', () => this.hideSaveModal());

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
    }

    setupCanvasEvents() {
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.onMouseUp());
        this.canvas.addEventListener('mouseleave', () => this.onMouseUp());
        this.canvas.addEventListener('wheel', (e) => this.onScroll(e));
    }

    onMouseDown(e) {
        this.isDragging = true;
        this.lastMouse = { x: e.clientX, y: e.clientY };
    }

    onMouseMove(e) {
        if (!this.isDragging) return;
        
        const dx = e.clientX - this.lastMouse.x;
        const dy = e.clientY - this.lastMouse.y;
        
        this.rotation.y += dx * 0.01;
        this.rotation.x += dy * 0.01;
        
        this.lastMouse = { x: e.clientX, y: e.clientY };
        this.draw();
    }

    onMouseUp() {
        this.isDragging = false;
    }

    onScroll(e) {
        e.preventDefault();
        this.zoom += e.deltaY > 0 ? -0.1 : 0.1;
        this.zoom = Math.max(0.5, Math.min(2, this.zoom));
        this.draw();
    }

    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(tabName).classList.add('active');
        event.target.classList.add('active');
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
        const names = ['Alex', 'Jordan', 'Casey', 'Riley', 'Morgan', 'Taylor', 'Devon', 'Quinn', 'Sage', 'River'];

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
            name: names[Math.floor(Math.random() * names.length)]
        };

        this.updateUIValues();
        this.draw();
    }

    reset() {
        this.character = this.getDefaultCharacter();
        this.rotation = { x: 0, y: 0 };
        this.zoom = 1;
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
        document.getElementById('charName').value = this.character.name;
    }

    draw() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        
        // Clear canvas with gradient
        const gradient = this.ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, '#e0c3fc');
        gradient.addColorStop(1, '#8ec5fc');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, w, h);

        // Save context state
        this.ctx.save();
        
        // Move to center
        this.ctx.translate(w / 2, h / 2);
        
        // Apply zoom
        this.ctx.scale(this.zoom, this.zoom);
        
        // Apply 3D rotation (simple isometric effect)
        const skewFactor = Math.sin(this.rotation.y) * 0.3;
        this.ctx.transform(1 + skewFactor, Math.sin(this.rotation.x) * 0.2, 0, 1, 0, 0);

        // Draw character
        this.drawCharacter();
        
        // Restore context
        this.ctx.restore();
    }

    drawCharacter() {
        const cx = 0;
        const cy = 0;

        this.drawHair(cx, cy - 20);
        this.drawFace(cx, cy);
        this.drawEyebrows(cx, cy);
        this.drawEyes(cx, cy);
        this.drawNose(cx, cy);
        this.drawMouth(cx, cy);
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
            
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy + 40, size * 0.9, size * 1.1, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (style === 'spiky') {
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
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy - 95, size * 1.25, size * 0.7, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            this.ctx.fillRect(cx - size * 0.9, cy - 50, size * 0.45, size * 1.2);
            this.ctx.fillRect(cx + size * 0.45, cy - 50, size * 0.45, size * 1.2);
            
            this.ctx.strokeRect(cx - size * 0.9, cy - 50, size * 0.45, size * 1.2);
            this.ctx.strokeRect(cx + size * 0.45, cy - 50, size * 0.45, size * 1.2);
        } else if (style === 'pixie') {
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
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy - 95, size * 1.3, size * 0.7, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
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
            this.ctx.beginPath();
            this.ctx.arc(cx, cy + 12, 14, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            
            this.ctx.fillStyle = '#fff';
            this.ctx.beginPath();
            this.ctx.arc(cx - 6, cy + 8, 4, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (style === 'pointed') {
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

    showSaveModal() {
        document.getElementById('saveModal').classList.remove('hidden');
        document.getElementById('saveName').value = this.character.name;
        document.getElementById('saveName').focus();
    }

    hideSaveModal() {
        document.getElementById('saveModal').classList.add('hidden');
    }

    confirmSave() {
        const name = document.getElementById('saveName').value.trim();
        if (!name) {
            alert('Please enter a character name');
            return;
        }

        const saved = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
        const charToSave = { ...this.character, name, savedDate: new Date().toLocaleString() };
        saved.push(charToSave);
        localStorage.setItem('savedCharacters', JSON.stringify(saved));
        
        this.hideSaveModal();
        this.loadSavedCharacters();
        alert(`Character "${name}" saved successfully!`);
    }

    loadSavedCharacters() {
        const saved = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
        const list = document.getElementById('savedCharactersList');
        
        if (saved.length === 0) {
            list.innerHTML = '<p class="empty-message">No saved characters yet</p>';
            return;
        }

        list.innerHTML = saved.map((char, idx) => `
            <div class="character-item">
                <div>
                    <div class="character-item-name">${char.name}</div>
                    <div class="character-item-date">${char.savedDate}</div>
                </div>
                <div class="character-item-actions">
                    <button class="char-btn-small char-btn-load" onclick="creator.loadCharacter(${idx})">Load</button>
                    <button class="char-btn-small char-btn-delete" onclick="creator.deleteCharacter(${idx})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    loadCharacter(idx) {
        const saved = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
        if (saved[idx]) {
            this.character = { ...saved[idx] };
            this.rotation = { x: 0, y: 0 };
            this.zoom = 1;
            this.updateUIValues();
            this.draw();
            // Switch back to appearance tab
            document.getElementById('appearance').classList.add('active');
            document.getElementById('saved').classList.remove('active');
            document.querySelectorAll('.tab-btn')[0].classList.add('active');
            document.querySelectorAll('.tab-btn')[1].classList.remove('active');
        }
    }

    deleteCharacter(idx) {
        if (confirm('Delete this character?')) {
            const saved = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
            saved.splice(idx, 1);
            localStorage.setItem('savedCharacters', JSON.stringify(saved));
            this.loadSavedCharacters();
        }
    }
}

// ========== INITIALIZATION ==========
let creator = null;

document.addEventListener('DOMContentLoaded', () => {
    creator = new CharacterCreator();
});