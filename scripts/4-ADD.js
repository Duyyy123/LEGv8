var canvas = document.getElementById('ADD-4');
var ctx = canvas.getContext('2d');

// Start a new path for the shape
ctx.beginPath();

// Move to the first point (starting point of the shape)
ctx.moveTo(100, 100);

// Draw a line to the second point
ctx.lineTo(100, 150);

// Draw a line to the third point
ctx.lineTo(120, 170);

ctx.lineTo(100, 190);
ctx.lineTo(100, 240);

ctx.lineTo(200, 200);
ctx.lineTo(200, 140);
ctx.lineTo(100, 100);
// Close the path by connecting back to the starting point
// ctx.closePath();

// Set the color of the shape's outline
ctx.strokeStyle = 'black';

// Draw the shape outline
ctx.stroke();

ctx.font = '20px Arial';
ctx.fillStyle = 'black';
ctx.fillText('ADD', 150, 150);  