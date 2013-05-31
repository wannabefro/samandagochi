
function init(){
  var canvas = document.getElementById('canvas');
  stage = new createjs.Stage(canvas);
  centerX = canvas.width/2;
  centerY = canvas.height/2;
  width = canvas.width;
  height = canvas.height;
  raindrops = [];
  day_number = 1;
  current_day = day_number;

  var day = new createjs.Text('Day ' + day_number, "bold 24px Helvetica", "#604d55");
  var sun = new createjs.Bitmap('assets/sun_moon/sun_moon-01.svg');
  var moon = new createjs.Bitmap('assets/sun_moon/sun_moon-02.svg');
  var sky1 = new createjs.Bitmap('assets/sky/sky.png');
  var sky2 = new createjs.Bitmap('assets/sky/sky3.png');
  var background1 = new createjs.Bitmap('assets/background/background.png');
  var background2 = new createjs.Bitmap('assets/background/background3.png');
  cloud1 = new createjs.Bitmap('assets/clouds/clouds1.png');
  cloud2 = new createjs.Bitmap('assets/clouds/clouds2.png');
  cloud3 = new createjs.Bitmap('assets/clouds/clouds3.png');
  eggUnHatched = new createjs.Bitmap('assets/egg/egg1.png');
  eggGetHatched = new createjs.Bitmap('assets/egg/egg1pt5.png');
  eggMedHatched = new createjs.Bitmap('assets/egg/egg2.png');
  eggOpen = new createjs.Bitmap('assets/egg/egg3.png');
  eggClick = 0;
  hatched = false;
  howManyWobbles = 0;
  wobble = false;
  currentEgg = '';

  day.x = 480;
  day.y = 20;

  sun.x = 300;
  sun.y = 450;
  sun.regX =300;
  sun.regY = 300;

  cloud2.x = 150;
  cloud2.y = 150;

  cloud3.x = 400;
  cloud3.y = 75;

  eggUnHatched.x = centerX - 150;
  eggUnHatched.y = 350;
  eggUnHatched.alpha = 1;

  eggUnHatched.addEventListener("click", function(e){
    eggClick += 1;
    eggUnHatched.alpha = 0;
    eggGetHatched.alpha = 1;
  });

  eggGetHatched.x = centerX - 150;
  eggGetHatched.y = 350;
  eggGetHatched.alpha = 0;

  eggGetHatched.addEventListener("click", function(e){
    eggClick += 1;
    if (eggClick === 4){
    eggGetHatched.alpha = 0;
    eggMedHatched.alpha = 1;
  } else {
    wobbleEgg(eggGetHatched);
  }
  });

  eggMedHatched.addEventListener("click", function(e){
    eggClick += 1;
    if (eggClick === 7){
    eggMedHatched.alpha = 0;
    eggOpen.alpha = 1;
    hatched = true;
  } else {
    wobbleEgg(eggMedHatched);
  }
  });

  eggMedHatched.x = centerX - 150;
  eggMedHatched.y = 350;
  eggMedHatched.alpha = 0;

  eggOpen.x = centerX - 150;
  eggOpen.y = 350;
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
  stage.addChild(eggUnHatched);
  stage.addChild(eggGetHatched);
  stage.addChild(eggMedHatched);
  stage.addChild(eggOpen);
  stage.addChild(day);

  createjs.Ticker.setInterval(25);
  createjs.Ticker.addListener(function(){
    if (current_day != day_number){
      stage.removeChild(day);
      day = new createjs.Text('Day ' + day_number, "bold 24px Helvetica", "#604d55");
      day.x = 480;
      day.y = 20;
      stage.addChild(day);
      current_day = day_number;

    }
    var rotation = 5;
    var speedOfRotation = 50 / rotation;
    sun.rotation += rotation;
    moon.rotation += rotation;
    cloud1.x += rotation * 2;
    cloud2.x -= rotation / 2;
    cloud3.x += rotation;
    if (howManyWobbles === 16){
      wobble = false;
      currentEgg.rotation = 0;
    }
    else if ((howManyWobbles % 4 === 0) && (wobble === true)){
      currentEgg.rotation += 5;
      howManyWobbles ++;
    } else if ((howManyWobbles % 4 === 2) && (wobble === true)) {
      currentEgg.rotation -= 5;
      howManyWobbles ++;
    } else {
      howManyWobbles ++;
    }
    if (hatched === true){
      eggOpen.alpha -= 0.01;
    }
    if (cloud1.x > width) {
      cloud1.x = -700;
    }
    if (cloud2.x < -150){
      cloud2.x = 700;
    }
    if (cloud3.x > width){
      cloud3.x = -400;
    }
    if (sun.rotation % 360 === 0){
      day_number++;
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

  function wobbleEgg(egg){
    howManyWobbles = 0;
    wobble = true;
    currentEgg = egg;
  }


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
