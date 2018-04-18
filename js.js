var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var draw_color = "#ff0000";
var draw_line_linewidth = 25,
  clearsize = 25;
var start_x = 0;
start_y = 0;
var onDown = false,
  onClear = false;

window.onload = function(e) {
  ChangeCanvasSize();
};
window.onresize = function(e) {
  ChangeCanvasSize();
};

if(document.body.ontouchstart === undefined){
canvas.onmousedown = function(e) {
  onDown = true;
  if (onClear) {
    draw_arc(e.clientX, e.clientY, clearsize / 2, "white");
  } else {
    draw_arc(e.clientX, e.clientY, draw_line_linewidth / 2, draw_color);
  }
  start_x = e.clientX;
  start_y = e.clientY;
};

canvas.onmousemove = function(e) {
  if (onDown) {
    if (onClear) {
      if (draw_line_linewidth >= 5) {
        draw_line(start_x, start_y, e.clientX, e.clientY, "white", clearsize);
        draw_arc(e.clientX, e.clientY, clearsize / 2 - 0.1, "white");
      } else {
        draw_line(start_x, start_y, e.clientX, e.clientY, "white", clearsize);
      }
    } else {
      if (draw_line_linewidth >= 5) {
        draw_line(
          start_x,
          start_y,
          e.clientX,
          e.clientY,
          draw_color,
          draw_line_linewidth
        );
        draw_arc(
          e.clientX,
          e.clientY,
          draw_line_linewidth / 2 - 0.1,
          draw_color
        );
      } else {
        draw_line(
          start_x,
          start_y,
          e.clientX,
          e.clientY,
          draw_color,
          draw_line_linewidth
        );
      }
    }
  }
  start_x = e.clientX;
  start_y = e.clientY;
};

canvas.onmouseup = function(e) {
  onDown = false;
};
}else{
  canvas.ontouchstart=function(e){
    onDown = true;
    if (onClear) {
      draw_arc(e.touches[0].clientX, e.touches[0].clientY, clearsize / 2, "white");
    } else {
      draw_arc(e.touches[0].clientX, e.touches[0].clientY, draw_line_linewidth / 2, draw_color);
    }
    start_x = e.touches[0].clientX;
    start_y = e.touches[0].clientY;
  }
  canvas.ontouchmove=function(e){
    if (onDown) {
      if (onClear) {
        if (draw_line_linewidth >= 5) {
          draw_line(start_x, start_y, e.touches[0].clientX, e.touches[0].clientY, "white", clearsize);
          draw_arc(e.touches[0].clientX, e.touches[0].clientY, clearsize / 2 - 0.1, "white");
        } else {
          draw_line(start_x, start_y, e.touches[0].clientX, e.touches[0].clientY, "white", clearsize);
        }
      } else {
        if (draw_line_linewidth >= 5) {
          draw_line(
            start_x,
            start_y,
            e.touches[0].clientX,
            e.touches[0].clientY,
            draw_color,
            draw_line_linewidth
          );
          draw_arc(
            e.touches[0].clientX,
            e.touches[0].clientY,
            draw_line_linewidth / 2 - 0.1,
            draw_color
          );
        } else {
          draw_line(
            start_x,
            start_y,
            e.touches[0].clientX,
            e.touches[0].clientY,
            draw_color,
            draw_line_linewidth
          );
        }
      }
    }
    start_x = e.touches[0].clientX;
    start_y = e.touches[0].clientY;
  }
  canvas.ontouchend = function(event){
    onDown = false;
  }
}

function draw_arc(x, y, size, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

function draw_line(start_x, start_y, end_x, end_y, color, linewidth) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = linewidth;
  ctx.moveTo(start_x, start_y);
  ctx.lineTo(end_x, end_y);
  ctx.stroke();
}

function ChangeCanvasSize() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

////////////////////////////////////////////////////////////////////////

eraser.onclick = function() {
  onClear = true;
  eraser.classList.add("active");
  paint.classList.remove("active");
  eraserMenu.style.display = "";
  paintMenu.style.display = "none";
};
paint.onclick = function() {
  onClear = false;
  paint.classList.add("active");
  eraser.classList.remove("active");
  eraserMenu.style.display = "none";
  paintMenu.style.display = "";
};

clear.onclick = function(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

download.onclick = function(){
  var a = document.createElement("a");
  a.href = canvas.toDataURL("image/jpeg");
  document.body.appendChild(a);
  a.download = "我的图画";
  console.log(a);
  a.click();
};

eraserSize.onchange = function(e) {
  clearsize = e.target.value;
  eraserSizeValue.innerText = e.target.value;
};

paintSize.onchange = function(e) {
  draw_line_linewidth = e.target.value;
  paintSizeValue.innerText = e.target.value;
};

paintColor.onchange = function(e) {
  draw_color = e.target.value;
};