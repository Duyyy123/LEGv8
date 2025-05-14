var canvas = document.getElementById("OR-GATE");
var ctx = canvas.getContext("2d");

// Vẽ đường cong bên trái (gốc OR)
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.quadraticCurveTo(80, 100, 50, 150);
ctx.stroke();

// Vẽ đường cong phía trên (phần trên của OR)
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.quadraticCurveTo(150, 50, 200, 100);
ctx.stroke();

// Vẽ đường cong phía dưới (phần dưới của OR)
ctx.beginPath();
ctx.moveTo(50, 150);
ctx.quadraticCurveTo(150, 150, 200, 100);
ctx.stroke();

// Đầu vào A
ctx.beginPath();
ctx.moveTo(20, 70);
ctx.lineTo(50, 70);
ctx.stroke();

// Đầu vào B
ctx.beginPath();
ctx.moveTo(20, 130);
ctx.lineTo(50, 130);
ctx.stroke();

// Đầu ra
ctx.beginPath();
ctx.moveTo(200, 100);
ctx.lineTo(240, 100);
ctx.stroke();

// Nhãn
ctx.font = "16px Arial";
ctx.fillText("A", 5, 75);
ctx.fillText("B", 5, 135);
ctx.fillText("A OR B", 245, 105);
