var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["43a6df9b-2c78-4fb5-a5ef-38e000431268","6b2c87bd-a7d8-4bfc-9d1d-680ac129af4e","80217028-277f-46d5-8dcb-4f8ec86d17d2"],"propsByKey":{"43a6df9b-2c78-4fb5-a5ef-38e000431268":{"name":"soccer_bw_1","sourceUrl":"assets/api/v1/animation-library/gamelab/KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG/category_sports/soccer_bw.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG/category_sports/soccer_bw.png"},"6b2c87bd-a7d8-4bfc-9d1d-680ac129af4e":{"name":"animation_1","sourceUrl":null,"frameSize":{"x":70,"y":27},"frameCount":1,"looping":true,"frameDelay":12,"version":"5dGn4L4B_6j._v3vGsUpFEKi0uGbRLu_","loadedFromSource":true,"saved":true,"sourceSize":{"x":70,"y":27},"rootRelativePath":"assets/6b2c87bd-a7d8-4bfc-9d1d-680ac129af4e.png"},"80217028-277f-46d5-8dcb-4f8ec86d17d2":{"name":"animation_2","sourceUrl":null,"frameSize":{"x":70,"y":27},"frameCount":1,"looping":true,"frameDelay":12,"version":"vWjsrzSO3i799MH238yZiiOkdSfuEtMZ","loadedFromSource":true,"saved":true,"sourceSize":{"x":70,"y":27},"rootRelativePath":"assets/80217028-277f-46d5-8dcb-4f8ec86d17d2.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerMallet;
var goal1=createSprite(200,30,65,10);
goal1.setAnimation("animation_1");
var goal2=createSprite(200,380,100,10);
goal2.setAnimation("animation_2");
var gameState="serve";

// hacer la cancha
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";

// crear objetos y asignarles colores
var striker = createSprite(200,200,10,10);
striker.setAnimation("soccer_bw_1");
striker.scale=0.05;

var playerMallet = createSprite(200,60,50,10);
playerMallet.shapeColor = "black";

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";

// variables de puntuación
var playerScore=0;
var compScore=0;


function draw() {

// despejar la pantalla
  background("green");
 
//GameState serve
if (gameState=="serve") {
   //Agregar el texto "Presiona espacio para golpear"
  textSize(22);
  fill("maroon");
  text("Presiona espacio para golpear", 60, 140); 
   //servir al delantero cuando se presiona la barra espaciadora
  if (keyDown("space")) {
  //cambiar el estado de juego 
  gameState="play";
  }
}

//GameState play
if (gameState=="play") {
  if (keyDown("space")) {
  striker.velocityX=+5;
  striker.velocityY=+6;
  striker.rotationSpeed=10;
  }
  //make the player paddle move with the Arrow keys
  paddleMovement();
  if (playerScore==5 || compScore==5) {
  gameState="end"; 
 }
 
}




// mostrar las variables compScore  y playerScore
  textSize(18);
  fill("maroon");
  text(compScore,25,225);
  text(playerScore,25,185);

//Sonido al golpear
if (striker.isTouching(playerMallet) ||striker.isTouching(computerMallet) ) {
 playSound("assets/category_hits/vibrant_game_smash_hit_open_1.mp3", false);
   
}

  
// puntuación
if(striker.isTouching(goal1)){
  // incrementar la puntuación del jugador
    compScore = compScore+1 ;
  //mostrar la cuadrícula para identificar el valor de x e y para mover al delantero al centro
    striker.x=200;
    striker.y=200;
    striker.velocityX=0;
    striker.velocityY=0;
    striker.rotationSpeed=0;
    playSound( "assets/category_achievements/vibrant_game_slot_machine_win_5.mp3", false);
        
}
      
      if(striker.isTouching(goal2))
      {
        playerScore = playerScore + 1;
      // Reiniciar al delantero al agregar el valor central de x e y 
        striker.x=200;
        striker.y=200;
        striker.velocityX=0;
        striker.velocityY=0;
        playSound( "assets/category_achievements/vibrant_game_slot_machine_win_5.mp3", false);
      } 
   
     //agregar la condición para comprobar si la puntuación de un jugador llega a 5
      if (playerScore=== 5) {
       
        //agregar el texto de fin del juego
        stroke("maroon");
        fill("maroon");
        textSize(20);
        text("¡Fin del juego!",140,160); 
       }
    if (compScore=== 5) {
        
        //agregar el texto de fin del juego
        stroke("maroon");
        fill("maroon");
        textSize(20);
        text("¡Fin del juego!",140,160);
       }
    
    
    
       
      
       
      
 
 
  
  
  
  
  //IA para la paleta de la computadora
  //hacer que se mueva con la posición y del delantero
  computerMallet.x = striker.x;

  
  //dibujar la línea al centro
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  //crear límites de bordes
  //hacer que el delantero rebote con el borde superior e inferior
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);
  
 
  drawSprites();
}



























function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
