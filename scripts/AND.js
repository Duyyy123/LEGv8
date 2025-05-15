var canvas = document.getElementById("AND-GATE");
var ctx = canvas.getContext("2d");
var initialPosX = 50;
var initialPosY = 50;

// Vẽ phần hình chữ nhật bên trái (thân cổng AND)

ctx.beginPath();
ctx.moveTo(initialPosX, initialPosY);
ctx.lineTo(initialPosX + 50, initialPosY);
ctx.lineTo(initialPosX + 50, initialPosY + 100);
ctx.lineTo(initialPosX, initialPosY + 100);
ctx.closePath();
ctx.stroke();


// Vẽ phần cong bên phải (nửa hình tròn)
ctx.beginPath();
ctx.moveTo(initialPosX + 50, initialPosY);
ctx.arc(initialPosX + 50, initialPosY + 50, 50, -Math.PI / 2, Math.PI / 2, false);
ctx.stroke();
// Đầu vào (input lines)
ctx.beginPath();
ctx.moveTo(initialPosX - 20, initialPosY + 20); // input 1
ctx.lineTo(initialPosX, initialPosY + 20);
ctx.moveTo(initialPosX - 20, initialPosY + 80); // input 2
ctx.lineTo(initialPosX, initialPosY + 80);
ctx.stroke();

// Đầu vào A
ctx.beginPath();
ctx.moveTo(initialPosX + 100, initialPosY + 50);
ctx.lineTo(initialPosX + 130, initialPosY + 50);
ctx.stroke();

// Nhãn
ctx.font = "16px Arial";
ctx.fillText("A", 10, 75);
ctx.fillText("B", 10, 135);
ctx.fillText("A AND B", 190, 105);

console.log("AND gate drawn");
