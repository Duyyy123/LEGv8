var canvas = document.getElementById('ADD-4');
var ctx = canvas.getContext('2d');
var initialPosX = 10;
var initialPosY = 10;
// Start a new path for the shape
ctx.beginPath();

// Move to the first point (starting point of the shape)
ctx.moveTo(initialPosX, initialPosY);

// Draw a line to the second point
ctx.lineTo(initialPosX, initialPosY + 50);

// Draw a line to the third point
ctx.lineTo(initialPosX + 20, initialPosY + 70);
ctx.lineTo(initialPosX, initialPosY + 90);
ctx.lineTo(initialPosX, initialPosY + 140);
ctx.lineTo(initialPosX + 100, initialPosY + 100);
ctx.lineTo(initialPosX + 100, initialPosY + 40);
ctx.lineTo(initialPosX, initialPosY);


// Close the path by connecting back to the starting point
// ctx.closePath();

// Set the color of the shape's outline
ctx.strokeStyle = 'black';

// Draw the shape outline
ctx.stroke();

ctx.font = '20px Arial';
ctx.fillStyle = 'black';
ctx.fillText('ADD', 150, 150);  

console.log("ADD-4");