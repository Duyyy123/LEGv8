var canvas = document.getElementById('ALU');
var ctx = canvas.getContext('2d');

// Start a new path for the shape
ctx.beginPath();

// Move to the first point (starting point of the shape)
ctx.moveTo(200, 200);

// Draw a line to the second point
ctx.lineTo(200, 250);

// Draw a line to the third point
ctx.lineTo(220, 270);

ctx.lineTo(200, 290);
ctx.lineTo(200, 340);

ctx.lineTo(300, 300);
ctx.lineTo(300, 240);
ctx.lineTo(200, 200);
// Close the path by connecting back to the starting point
// ctx.closePath();

// Set the color of the shape's outline
ctx.strokeStyle = 'black';

// Draw the shape outline
ctx.stroke();

ctx.font = '20px Arial';
ctx.fillStyle = 'black';
ctx.fillText('ALU', 250, 250);  
