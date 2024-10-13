let pacArray = []; // This will hold all the PacMan objects.
let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;

function setToRandom(scale) {
  return Math.random() * scale;
}

// Create a PacMan at a random position
function makePac() {
  let velocity = {
    x: setToRandom(10),
    y: setToRandom(10),
  };
  let position = {
    x: setToRandom(pageWidth - 100), // Ensure PacMan starts within screen width
    y: setToRandom(pageHeight - 100), // Ensure PacMan starts within screen height
  };

  // Create new PacMan image
  let gameArea = document.getElementById('gameArea'); // Assuming you have a div with id 'gameArea'
  let newPac = document.createElement('img');
  newPac.src = 'PacMan1.png'; // Path to your pacman image
  newPac.style.position = 'absolute';
  newPac.width = 100; // Set the size of the PacMan
  newPac.style.left = position.x + 'px';
  newPac.style.top = position.y + 'px';

  // Add the new PacMan to the DOM
  gameArea.appendChild(newPac);

  // Add the PacMan object to the pacArray
  pacArray.push({ position, velocity, newPac });
}

// This function moves all the PacMen
function update() {
  pacArray.forEach((item) => {
    checkCollisions(item);

    // Update the PacMan's position
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    // Apply new position to the DOM element
    item.newPac.style.left = item.position.x + 'px';
    item.newPac.style.top = item.position.y + 'px';
  });

  setTimeout(update, 20); // Call update function repeatedly
}

// This function checks for collision with screen boundaries
function checkCollisions(item) {
  if (item.position.x + item.newPac.width >= pageWidth || item.position.x <= 0) {
    item.velocity.x = -item.velocity.x; // Reverse X direction on collision
  }
  if (item.position.y + item.newPac.height >= pageHeight || item.position.y <= 0) {
    item.velocity.y = -item.velocity.y; // Reverse Y direction on collision
  }
}

// Add an event listener to the 'Add PacMan' button
document.getElementById('addPacman').addEventListener('click', makePac);

// Add an event listener to the 'Start Game' button
document.getElementById('startGame').addEventListener('click', update);

