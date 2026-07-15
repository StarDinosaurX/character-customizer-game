# CharacterMaker - Tomodachi-Style Creator & Game

A browser-based character customization tool inspired by Tomodachi Life's Mii creator, combined with a fun mini-game where your custom character collects items and avoids enemies.

## 🎮 Features

- **Character Customizer**: Create unique characters by customizing:
  - Skin tone, face shape, eye style & color
  - Nose & mouth styles
  - Hair style & color
  - Eyebrows, and character name
  
- **Interactive Mini-Game**:
  - Move your character with Arrow Keys or WASD
  - Collect golden orbs for points (+10 each)
  - Avoid red enemies (each hit costs -5 health)
  - Particle effects when collecting items
  - Pause/Resume gameplay
  - Game over when health reaches 0

- **Randomizer**: Generate random character designs instantly
- **Persistent Gameplay**: Play with your custom character
- **Responsive Design**: Works on desktop and mobile browsers

## 📁 File Structure


## 🚀 How to Run

### Option 1: Local File (Easiest)
1. Download or clone all files into a folder
2. Double-click `index.html` in your file explorer
- Or right-click → "Open with" → Choose your browser

3. The game will load immediately in your browser

### Option 2: Local Web Server (Recommended for best performance)
If you have Python 3 installed:
cd /path/to/character-customizer-game
python -m http.server 8000
Then visit: http://localhost:8000 in your browser

If you have Python 2:
python -m SimpleHTTPServer 8000

Option 3: Using Node.js & http-server
Install http-server globally: npm install -g http-server
Navigate to your game folder and run: http-server
Visit the URL shown (typically http://localhost:8080)

Option 4: Deploy to GitHub Pages (Free Hosting)
Create a GitHub repository named character-customizer-game
Upload all files (index.html, styles.css, main.js, README.md)
Go to Settings → Pages → Select main branch → Save
Your game will be live at: https://yourusername.github.io/character-customizer-game

# 🎮 How to Play
Character Creator Screen
1. Use dropdown menus to customize your character
2. See real-time preview on the left canvas
3. Click Random to generate random designs
4. Enter a character name
5. Click Save & Play to start the game
Game Screen
1. Move Left/Right: Arrow keys or A/D keys
2. Collect: Gold orbs = +10 points
3. Avoid: Red enemies = -5 health
4. Pause: Click Pause button or press ESC (functionality for ESC can be added)
5. Game Over: When health reaches 0
6. Back: Return to creator to make a new character
