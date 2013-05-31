
function init(){
  var canvas = document.getElementById('canvas');
  stage = new createjs.Stage(canvas);
  centerX = canvas.width/2;
  centerY = canvas.height/2;
  width = canvas.width;
  height = canvas.height;
  raindrops = [];

  var queue = new createjs.LoadQueue(false);



  var sun = new createjs.Bitmap('assets/sun_moon/sun_moon-01.svg');
  var moon = new createjs.Bitmap('assets/sun_moon/sun_moon-02.svg');
  var sky1 = new createjs.Bitmap('assets/sky/sky.png');
  var sky2 = new createjs.Bitmap('assets/sky/sky3.png');
  var background1 = new createjs.Bitmap('assets/background/background.png');
  var background2 = new createjs.Bitmap('assets/background/background3.png');
  cloud1 = new createjs.Bitmap('assets/clouds/clouds1.png');
  cloud2 = new createjs.Bitmap('assets/clouds/clouds2.png');
  cloud3 = new createjs.Bitmap('assets/clouds/clouds3.png');
  eggUnhatched = new createjs.Bitmap('assets/egg/egg1.png');
  eggMedHatched = new createjs.Bitmap('assets/egg/egg2.png');
  eggOpen = new createjs.Bitmap('assets/egg/egg3.png');

  sun.x = 300;
  sun.y = 450;
  sun.regX =300;
  sun.regY = 300;

  cloud2.x = 150;
  cloud2.y = 150;

  cloud3.x = 400;
  cloud3.y = 75;

  eggUnhatched.x = centerX - 150;
  eggUnhatched.y = 400;
  eggUnhatched.alpha = 0;
  eggMedHatched.addEventListener("click", function(e){
    eggMedhatched.alpha = 0;
    eggOpen.alpha = 1;
  });

  eggMedHatched.x = centerX - 150;
  eggMedHatched.y = 400;
  eggMedHatched.alpha = 1;

  eggOpen.x = centerX - 150;
  eggOpen.y = 400;
  eggOpen.alpha = 0;

  moon.x = 300;
  moon.y = 550;
  moon.regX = -300;
  moon.regY = -300;
  stage.addChild(sky1);
  stage.addChild(sky2);
  stage.addChild(sun);
  stage.addChild(moon);
  stage.addChild(cloud1);
  stage.addChild(cloud2);
  stage.addChild(cloud3);
  stage.addChild(background1);
  stage.addChild(background2);
  stage.addChild(eggUnhatched);
  stage.addChild(eggMedHatched);
  stage.addChild(eggOpen);

  createjs.Ticker.setInterval(25);
  createjs.Ticker.addListener(function(){
    var rotation = 0.5;
    var speedOfRotation = 50 / rotation;
    sun.rotation += rotation;
    moon.rotation += rotation;
    cloud1.x += rotation * 2;
    cloud2.x -= rotation / 2;
    cloud3.x += rotation;
    if (cloud1.x > width) {
      cloud1.x = -700;
    }
    if (cloud2.x < -150){
      cloud2.x = 700;
    }
    if (cloud3.x > width){
      cloud3.x = -400;
    }
    if ((sun.rotation % 360 >= 100) && (sun.rotation % 360 <= 280) ){
      if (background2.alpha < 1){
      background2.alpha += 1/speedOfRotation;
      sky2.alpha += 1/speedOfRotation;
      }
    } else {
      if (background2.alpha > 0){
      background2.alpha -= 1/speedOfRotation;
      sky2.alpha  -= 1/speedOfRotation;}
    }
    stage.update();
  });


}

function drawRain(){
  for (var i = 0; i < 150; i++){
    rain = new createjs.Bitmap('assets/extras/raindrop.png');
    rain.scaleX = 0.1;
    rain.scaleY = 0.1;
    rain.alpha = (Math.random() / 2) + 0.5;
    cloudchoice(rain);
    raindrops.push(rain);
    stage.addChild(rain);
  }
}

function rainfall(){
  for (var i = 0; i < raindrops.length; i++){
    raindrops[i].y += Math.random() * 5;
    if (raindrops[i].y > 600){
      cloudchoice(raindrops[i]);
    }
  }
}

function cloudchoice(rain){
  cloudChoice = Math.floor(Math.random()*3);
  if (cloudChoice === 0){
    rain.x = cloud1.x + 25 + Math.random() * 150;
    rain.y = cloud1.y + 70;
  } else if (cloudChoice === 1){
      rain.x = cloud2.x + 25 + Math.random() * 150;
      rain.y = cloud2.y + 70;
  } else {
      rain.x = cloud3.x + 25 + Math.random() * 150;
      rain.y = cloud3.y + 70;
  }
}

function randomNumber(){
  number = Math.floor(Math.random()*2);
}

function start(){
  $('#start').click(function(){
    createjs.Ticker.setPaused(false);
  });
}

function stop(){
  $('#stop').click(function(){
    createjs.Ticker.setPaused(true);
  });
}


