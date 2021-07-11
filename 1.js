window.addEventListener('load',main,false);
function main() {
  var ctx = canvas_example.getContext('2d');
  var w=canvas_example.width;
  var h=canvas_example.height;

  var bird = new Image();
  var bird1 = new Image();
  var bg = new Image();
  var spike = new Image();
  var spike1 = new Image();
  var hscore = new Image();

  bird.src = "img/bird.png";
  bird1.src = "img/bird1.png";
  bg.src = "img/bg.png";
  spike.src = "img/spike.png";
  spike1.src = "img/spike1.png";
  hscore.src = "img/hs.png";


  var x = 133; //координаты птицы
  var y = 290; //
  var vx = 0; //скорость по х
  var vy = 0; // скорость по у
  var g = 0; // ускорение у
  var t = 2; // условное время
  var a = 0 // ускорение х
  var l = 30; // длина шипов
  var q = 0;//для функции рандома
  var s = 0;//счет
  var hs = 0;//heigh score


  canvas_example.onmousedown = function() {
      vy = -3;
      t = 2.5 ;
      if(vx >= 0){vx = 3}
      else{vx = -3}
      g = 0.04;
}

  function draw_bird() {
   vy += g*t;
   y = y + vy*t;
   t=t+0.05
   if (t>5){t = 5}
   if ((x>-50)&&(x<350)&&(vx>0)){x +=vx}
   if ((x>260)&&(vx>0)){x = 262;vx = -vx;s++;}
   if ((x>-50)&&(x<550)&&(vx<0)){x +=vx}
   if ((x<5)&&(vx<0)){x = 5;vx = -vx;s++;}
   if (vy>3){vy = 3}
   if (vx>=0){ctx.drawImage(bird, x, y);}
   else{ctx.drawImage(bird1, x, y);}
 }


  function random_spike() {
    r = []
    sr = s/2+4;
    if(sr>16){sr = 16}
    r[0] = Math.round(Math.random()*20)
    for(var i = 1; i < sr; i++){
      q=Math.round(Math.random()*20)
      while (r.indexOf(q)+1 != 0){q=Math.round(Math.random()*20)}
      r[i]=q
    }
    function compareNumbers(a, b) {return a - b;}
    r.sort(compareNumbers)
    for (var i = 0; i<r.length; i++){
      if (r[i+1]-r[i]===2){r[i+1]=r[i+1]-1}
    }
    if(r[0]==1 && r[1]==2){r[0]=25; r[1]=26}
    }


  function draw_spike(){
    for(var j = 0; j < 20; j++){ctx.drawImage(spike, 0, r[j]*l)}
  }
  function draw_spike1(){
    for(var j = 0; j < 20; j++){ctx.drawImage(spike1, 270, r[j]*l)}
  }

  function drawScore() {
      ctx.font = "35px Arial";
      ctx.fillStyle = "#0095DD";
      if(s<10){ctx.fillText(s, 141, 316)}
      else{ctx.fillText(s, 131, 316)}
  }
  function drawHeighScore() {
      ctx.font = "40px Arial";
      ctx.fillStyle = "#008080";
      ctx.fillText(hs, 310, 90)
  }

hscore.onload = draw_bird;
//////////////////////////////////////////////////////////////////////////////
setInterval(function() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(hscore, 300, 0);
  drawScore();
  if(s>hs){hs =s }
  drawHeighScore();
  draw_bird();
  if((x === 5) || (x === 259)){random_spike();}
  if (s>0 && vx<0){draw_spike();
    for (i=0;i<20;i++){
      if (y>r[i]*l-15 && y<r[i]*l+20 && x<10){x =133;y = 290;vx = 0;vy = 0;g = 0;if(s>1){r = []};s = 0;}
    }}
  if (s>0 && vx>0){
    draw_spike1();
    for (i=0;i<20;i++){
      if (y>r[i]*l-15 && y<r[i]*l+20 && x>250){x =133;y = 290;vx = 0;vy = 0;g = 0;if(s>1){r = []};s = 0;}
    }}
    if (y>574){x =133;y = 290;vx = 0;vy = 0;g = 0;if(s>1){r = []};s = 0;c = 0;
  }
    if (y<5){x =133;y = 290;vx = 0;vy = 0;g = 0;if(s>1){r = []};s = 0;};


}, 1000 / 60  );

}
