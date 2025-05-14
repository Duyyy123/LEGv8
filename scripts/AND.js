var canvas = document.getElementById("AND-GATE");
var ctx = canvas.getContext("2d");

// Vẽ phần hình chữ nhật bên trái (thân cổng AND)
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(100, 50);
ctx.lineTo(100, 150);
ctx.lineTo(50, 150);
ctx.closePath();
ctx.stroke();

// Vẽ phần cong bên phải (nửa hình tròn)
ctx.beginPath();
ctx.moveTo(100, 50);
ctx.arc(100, 100, 50, -Math.PI / 2, Math.PI / 2, false);
ctx.stroke();

// Đầu vào (input lines)
ctx.beginPath();
ctx.moveTo(30, 70); // input 1
ctx.lineTo(50, 70);
ctx.moveTo(30, 130); // input 2
ctx.lineTo(50, 130);
ctx.stroke();

// Đầu ra (output line)
ctx.beginPath();
ctx.moveTo(150, 100);
ctx.lineTo(180, 100);
ctx.stroke();

// Nhãn
ctx.font = "16px Arial";
ctx.fillText("A", 10, 75);
ctx.fillText("B", 10, 135);
ctx.fillText("A AND B", 190, 105);

console.log("AND gate drawn");
