// Word search setup
const words = ['JAVASCRIPT', 'HTML', 'CSS', 'WEB', 'CODE', 'BROWSER', 'SCRIPT'];
const gridSize = 12;
let wordGrid = [];

// Generate the word search grid
function createGrid() {
    wordGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
    placeWordsInGrid();
    fillEmptySpaces();
    renderGrid();
    displayWordsToFind();
}

// Randomly place words in the grid
function placeWordsInGrid() {
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            const direction = getRandomDirection();
            const startRow = getRandomInt(gridSize);
            const startCol = getRandomInt(gridSize);

            if (canPlaceWord(word, startRow, startCol, direction)) {
                placeWord(word, startRow, startCol, direction);
                placed = true;
            }
        }
    });
}

// Check if a word can be placed in the given direction without collision
function canPlaceWord(word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        const newRow = row + direction.row * i;
        const newCol = col + direction.col * i;
        if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize || (wordGrid[newRow][newCol] && wordGrid[newRow][newCol] !== word[i])) {
            return false;
        }
    }
    return true;
}

// Place a word in the grid
function placeWord(word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        const newRow = row + direction.row * i;
        const newCol = col + direction.col * i;
        wordGrid[newRow][newCol] = word[i];
    }
}

// Fill empty spaces in the grid with random letters
function fillEmptySpaces() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (!wordGrid[row][col]) {
                wordGrid[row][col] = letters.charAt(getRandomInt(letters.length));
            }
        }
    }
}

// Render the grid in the HTML table
function renderGrid() {
    const table = document.getElementById('wordGrid');
    table.innerHTML = '';
    for (let row = 0; row < gridSize; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < gridSize; col++) {
            const td = document.createElement('td');
            td.textContent = wordGrid[row][col];
            td.addEventListener('click', () => handleCellClick(td, row, col));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

// Display the list of words to find
function displayWordsToFind() {
    const wordList = document.getElementById('wordsToFind');
    wordList.innerHTML = '';
    words.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        wordList.appendChild(li);
    });
}

// Handle cell click to mark word guesses
function handleCellClick(cell, row, col) {
    cell.style.backgroundColor = '#FFD700'; // Highlight selected cell
}

// Utility functions
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomDirection() {
    const directions = [
        { row: 0, col: 1 },    // Horizontal right
        { row: 1, col: 0 },    // Vertical down
        { row: 1, col: 1 },    // Diagonal down-right
        { row: -1, col: 1 },   // Diagonal up-right
    ];
    return directions[getRandomInt(directions.length)];
}

// Initialize the game
createGrid();
