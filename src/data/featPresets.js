export const snippetExample_1 = {
    html: `<button class="btnSlider">
    <span class="btnSlider-inner">hey!</span>
  </button>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }
  
  html {
    --btn-shadow-length: 30px;
    --btn-shadow-color: pink;
    --btn-color: magenta
  }
  
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(20, 20, 20);
    min-height: 100vh;
  }
  
  .btnSlider {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding-right: var(--btn-shadow-length);
  }
  
  .btnSlider span {
    background-color: var(--btn-color);
    border-radius: 2em;
    padding: 1rem;
    display: inline-block;
    transition: translate 400ms ease-in-out, box-shadow 400ms ease-in-out, opacity 400ms ease-in-out, transform 200ms ease-in-out;
    -ms-user-select: none;
    user-select: none;
    color: white;
    font-family: helvetica;
    font-weight: 700;
    font-size: 2rem;
    box-shadow: var(--btn-shadow-length) 0px 0 0 var(--btn-shadow-color);
  }
  
  .btnSlider:hover span,
  .btnSlider:focus-visible span {
    translate: var(--btn-shadow-length) 0;
    opacity: 1;
    box-shadow: 0 0 0 var(--btn-shadow-color);
  }
  
  .btnSlider:active span {
    translate: var(--btn-shadow-length) 0;
    opacity: 1;
    box-shadow: 0 0 0 var(--btn-shadow-color);
    transform: scale(.8);
  }
  
  .bg-magenta {
    background-color: var(--btn-color);
  }`,
    js: `const btn = document.querySelector(".btnSlider");
  btn.addEventListener("click", () => {
    document.body.classList.toggle("bg-magenta")
  })`
}

export const snippetExample_2 = {
    html: `<main class="ui">
    <div class="1" data-number="1"></div>
    <div class="2" data-number="2"></div>
    <div class="3" data-number="3"></div>
    <div class="4" data-number="4"></div>
    <div class="5" data-number="5"></div>
    <div class="6" data-number="6"></div>
    <div class="7" data-number="7"></div>
    <div class="8" data-number="8"></div>
    <div class="9" data-number="9"></div>
  </main>
  
  <section class="background"></section>
  
  <section class="message">
    <p class="text"></p>
    <button class="reset">Reset</button>
  </section>`,
    css: `* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: rgb(30, 30, 30);
    font-family: Helvetica;
    font-weight: bolder;
  }
  
  .ui {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
    gap: .5rem;
    background: #294C60;
    padding: 2rem;
    border-radius: 1rem;
  }
  
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    font-size: 29px;
    cursor: pointer;
    transition: all ease 0.4s;
    background-color: #ADB6C4;
    border-radius: .5rem
  }
  
  div:hover {
    background-color: rgba(221, 198, 206, 0.801);
  }
  
  .red {
    color: rgb(197, 52, 52);
    font-size: 50px;
  }
  
  .blue {
    font-size: 50px;
    color: rgb(44, 93, 185);
  }
  
  .message {
    width: 100vw;
    height: 100vh;
    position: absolute;
    width: 100%;
    background-color: rgba(56, 56, 56, 0.904);
    color: white;
    text-transform: uppercase;
    text-align: center;
    padding-top: 24px;
    display: none;
    flex-direction: column;
    z-index: 1;
  }
  
  .text {
    font-size: 40px;
  }
  
  .background {
    display: none;
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgba(49, 49, 49, 0.959);
    transition: all ease 0.5s;
  }
  
  .reset {
    border: none;
    height: 35px;
    width: 120px;
    display: block;
    position: relative;
    top: 10px;
    text-transform: uppercase;
    font-weight: bold;
    justify-self: center;
    align-self: center;
    cursor: pointer;
    background-color: rgb(30, 30, 30);
    color: white;
    letter-spacing: 2px;
    font-size: 20px;
    outline: none;
  }
  
  .display {
    display: flex;
    align-content: center;
    justify-content: center;
    padding: 20px;
  }
  
  .redWins {
    background-color: rgba(221, 74, 74, 0.897);
  }
  
  .blueWins {
    background-color: rgba(73, 73, 247, 0.726);
  }`,
    js: `const blocks = document.querySelectorAll('div');
  const results = document.querySelector('.message');
  const reset = document.querySelector('.reset');
  const text = document.querySelector('.text');
  
  const movement = [{
      answer: [1, 2, 3]
    },
    {
      answer: [1, 4, 7]
    },
    {
      answer: [2, 5, 8]
    },
    {
      answer: [3, 6, 9]
    },
    {
      answer: [4, 5, 6]
    },
    {
      answer: [7, 8, 9]
    },
    {
      answer: [7, 5, 3]
    },
    {
      answer: [1, 5, 9]
    },
  ]
  
  let counter = 0;
  let playerOneState = [];
  let playerTwoState = [];
  let playerOneWin = false;
  let playerTwoWin = false;
  let draw = false;
  
  
  const playerOne = (a) => {
    a.currentTarget.innerText = 'X'
    a.currentTarget.classList.add('red')
    counter++
    playerOneState.push(Number(box.dataset.number));
  
    function check() {
      for (let i = 0; i < movement.length; i++) {
        let checker = () => movement[i].answer.every(v => playerOneState.includes(v));
        if (checker()) {
          playerOneWin = true;
          results.classList.add('display');
          text.innerText = 'red player wins!';
          results.classList.add('redWins');
        }
      }
    }
  
    check();
  }
  
  const playerTwo = (a) => {
    a.currentTarget.innerText = 'O';
    a.currentTarget.classList.add('blue')
    counter++
    playerTwoState.push(Number(box.dataset.number));
  
    function check() {
      for (let i = 0; i < movement.length; i++) {
        let checker = () => movement[i].answer.every(v => playerTwoState.includes(v));
        if (checker()) {
          playerTwoWin = true;
          results.classList.add('display');
          text.innerText = 'blue player wins!'
          results.classList.add('blueWins');
        }
      }
    }
    check();
  }
  
  blocks.forEach(e => {
    e.addEventListener('click', function(a) {
      box = a.currentTarget;
      if (box.innerText == '' && counter % 2 == 0) {
        playerOne(a);
      } else if (box.innerText == '') {
        playerTwo(a);
      }
      if (counter == 9 && playerOneWin == false && playerTwoWin == false) {
        draw = true;
        console.log('draw');
        results.classList.add('display');
        text.innerText = 'Draw'
      }
  
  
    })
  });
  
  
  reset.addEventListener('click', () => {
    playerOneState = [];
    playerTwoState = [];
    counter = 0;
    playerOneWin = false;
    playerTwoWin = false;
    draw = false;
    blocks.forEach(e => {
      e.innerText = '';
    })
    results.classList.remove('display');
    results.classList.remove('redWins');
    results.classList.remove('blueWins');
    blocks.forEach(e => {
      e.classList.remove('red');
      e.classList.remove('blue');
    })
  })`
}

export const snippetExample_3 = {
    html: `<div class="container">
      <div class="shape-blob"></div>
      <div class="shape-blob one"></div>
      <div class="shape-blob two"></div>
  </div>`,
    css: `html {
      --main-color: hotpink;
      --sec-color: navy
  }
  
  body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  
  .alt-theme {
      --main-color: aqua;
      --sec-color: black
  }
  
  .container {
      background: lightblue;
      background: linear-gradient(45deg, var(--main-color), var(--sec-color));
      min-height: 100vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
  }
  
  .shape-blob {
      background: linear-gradient(45deg, var(--main-color), var(--sec-color));
      height: 200px;
      width: 200px;
      border-radius: 30% 50% 20% 40%;
      animation:
          transform 20s ease-in-out infinite both alternate,
          movement_one 40s ease-in-out infinite both;
      opacity: .7;
      position: absolute;
      left: 70%;
      top: 50%;
      opacity: .4
  }
  
  .shape-blob.one {
      height: 500px;
      width: 500px;
      left: -200px;
      top: -150px;
      transform: rotate(-180deg);
      animation: transform 30s ease-in-out infinite both alternate, movement_two 60s ease-in-out infinite both;
  }
  
  .shape-blob.two {
      height: 350px;
      width: 350px;
      left: 500px;
      top: -150px;
      transform: rotate(-180deg);
      animation: transform 30s ease-in-out infinite both alternate, movement_two 60s ease-in-out infinite both;
  }
  
  @keyframes transform {
  
      0%,
      100% {
          border-radius: 33% 67% 70% 30% / 30% 30% 70% 70%;
      }
  
      20% {
          border-radius: 37% 63% 51% 49% / 37% 65% 35% 63%;
      }
  
      40% {
          border-radius: 36% 64% 64% 36% / 64% 48% 52% 36%;
      }
  
      60% {
          border-radius: 37% 63% 51% 49% / 30% 30% 70% 70%;
      }
  
      80% {
          border-radius: 40% 60% 42% 58% / 41% 51% 49% 59%;
      }
  }
  
  
  @keyframes movement_one {
  
      0%,
      100% {
          transform: none;
      }
  
      50% {
          transform: translate(50%, 20%) rotateY(10deg) scale(1.2);
      }
  }
  
  @keyframes movement_two {
  
      0%,
      500% {
          transform: none;
      }
  
      50% {
          transform: translate(50%, 20%) rotate(-200deg) scale(1.2);
      }
  }
  
  h1 {
      font-family: 'Playfair Display', serif;
      font-size: 5em;
      letter-spacing: 2px;
      font-weight: 900;
      color: white;
      line-height: .9em;
      position: relative;
      z-index: 4;
      text-shadow: 2px 3px 15px rgba(0, 0, 0, .15);
  }`,
    js: `document.body.addEventListener("click", () => {
      document.body.classList.toggle("alt-theme")
  })`
}

export const snippetExample_4 = {
    html: `<link href='https://fonts.googleapis.com/css?family=Play:400,700' rel='stylesheet' type='text/css'>
    <canvas id="game-canvas" width="640" height="640"></canvas>`,
    css: `body,
    html {
      background-color: #222;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: black;
      background-image: url("https://images.crazygames.com/games/space-invaders/cover-1591955301711.png?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&w=1200&h=630&fit=crop");
      background-size: 80%;
      background-repeat: repeat;
      background-position: center;
    }
    
    canvas {
      display: block;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    
      image-rendering: optimizeSpeed;
      image-rendering: -moz-crisp-edges;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: optimize-contrast;
    }`,
    js: `(function() {
       var initializing = false,
           fnTest = /xyz/.test(function() {
               xyz;
           }) ? /\\b_super\\b/ : /.*/;
   
       // The base Class implementation (does nothing)
       this.Class = function() {};
   
       // Create a new Class that inherits from this class
       Class.extend = function(prop) {
           var _super = this.prototype;
   
           // Instantiate a base class (but only create the instance,
           // don't run the init constructor)
           initializing = true;
           var prototype = new this();
           initializing = false;
   
           // Copy the properties over onto the new prototype
           for (var name in prop) {
               // Check if we're overwriting an existing function
               prototype[name] = typeof prop[name] == "function" &&
                   typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                   (function(name, fn) {
                       return function() {
                           var tmp = this._super;
   
                           // Add a new ._super() method that is the same method
                           // but on the super-class
                           this._super = _super[name];
   
                           // The method only need to be bound temporarily, so we
                           // remove it when we're done executing
                           var ret = fn.apply(this, arguments);
                           this._super = tmp;
   
                           return ret;
                       };
                   })(name, prop[name]) :
                   prop[name];
           }
   
           // The dummy class constructor
           function Class() {
               // All construction is actually done in the init method
               if (!initializing && this.init)
                   this.init.apply(this, arguments);
           }
   
           // Populate our constructed prototype object
           Class.prototype = prototype;
   
           // Enforce the constructor to be what we expect
           Class.prototype.constructor = Class;
   
           // And make this class extendable
           Class.extend = arguments.callee;
   
           return Class;
       };
   })();
   
   
   // ###################################################################
   // shims
   //
   // ###################################################################
   (function() {
       var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
       window.requestAnimationFrame = requestAnimationFrame;
   })();
   
   (function() {
       if (!window.performance.now) {
           window.performance.now = (!Date.now) ? function() {
                   return new Date().getTime();
               } :
               function() {
                   return Date.now();
               }
       }
   })();
   
   // ###################################################################
   // Constants
   //
   // ###################################################################
   var IS_CHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
   var CANVAS_WIDTH = 640;
   var CANVAS_HEIGHT = 640;
   var SPRITE_SHEET_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAEACAYAAAADRnAGAAACGUlEQVR42u3aSQ7CMBAEQIsn8P+/hiviAAK8zFIt5QbELiTHmfEYE3L9mZE9AAAAqAVwBQ8AAAD6THY5CgAAAKbfbPX3AQAAYBEEAADAuZrC6UUyfMEEAIBiAN8OePXnAQAAsLcmmKFPAQAAgHMbm+gbr3Sdo/LtcAAAANR6GywPAgBAM4D2JXAAABoBzBjA7AmlOx8AAEAzAOcDAADovTc4vQim6wUCABAYQG8QAADd4dPd2fRVYQAAANQG0B4HAABAawDnAwAA6AXgfAAAALpA2uMAAABwPgAAgPoAM9Ci/R4AAAD2dmqcEQIAIC/AiQGuAAYAAECcRS/a/cJXkUf2AAAAoBaA3iAAALrD+gIAAADY9baX/nwAAADNADwFAADo9YK0e5FMX/UFACA5QPSNEAAAAHKtCekmDAAAAADvBljtfgAAAGgMMGOrunvCy2uCAAAACFU6BwAAwF6AGQPa/XsAAADYB+B8AAAAtU+ItD4OAwAAAFVhAACaA0T7B44/BQAAANALwGMQAAAAADYO8If2+P31AgAAQN0SWbhFDwCAZlXgaO1xAAAA1FngnA8AACAeQPSNEAAAAM4CnC64AAAA4GzN4N9NSfgKEAAAAACszO26X8/X6BYAAAD0Anid8KcLAAAAAAAAAJBnwNEvAAAA9Jns1ygAAAAAAAAAAAAAAAAAAABAQ4COCENERERERERERBrnAa1sJuUVr3rsAAAAAElFTkSuQmCC';
   var LEFT_KEY = 37;
   var RIGHT_KEY = 39;
   var SHOOT_KEY = 88;
   var TEXT_BLINK_FREQ = 500;
   var PLAYER_CLIP_RECT = {
       x: 0,
       y: 204,
       w: 62,
       h: 32
   };
   var ALIEN_BOTTOM_ROW = [{
       x: 0,
       y: 0,
       w: 51,
       h: 34
   }, {
       x: 0,
       y: 102,
       w: 51,
       h: 34
   }];
   var ALIEN_MIDDLE_ROW = [{
       x: 0,
       y: 137,
       w: 50,
       h: 33
   }, {
       x: 0,
       y: 170,
       w: 50,
       h: 34
   }];
   var ALIEN_TOP_ROW = [{
       x: 0,
       y: 68,
       w: 50,
       h: 32
   }, {
       x: 0,
       y: 34,
       w: 50,
       h: 32
   }];
   var ALIEN_X_MARGIN = 40;
   var ALIEN_SQUAD_WIDTH = 11 * ALIEN_X_MARGIN;
   
   
   
   // ###################################################################
   // Utility functions & classes
   //
   // ###################################################################
   function getRandomArbitrary(min, max) {
       return Math.random() * (max - min) + min;
   }
   
   function getRandomInt(min, max) {
       return Math.floor(Math.random() * (max - min + 1)) + min;
   }
   
   function clamp(num, min, max) {
       return Math.min(Math.max(num, min), max);
   }
   
   function valueInRange(value, min, max) {
       return (value <= max) && (value >= min);
   }
   
   function checkRectCollision(A, B) {
       var xOverlap = valueInRange(A.x, B.x, B.x + B.w) ||
           valueInRange(B.x, A.x, A.x + A.w);
   
       var yOverlap = valueInRange(A.y, B.y, B.y + B.h) ||
           valueInRange(B.y, A.y, A.y + A.h);
       return xOverlap && yOverlap;
   }
   
   var Point2D = Class.extend({
       init: function(x, y) {
           this.x = (typeof x === 'undefined') ? 0 : x;
           this.y = (typeof y === 'undefined') ? 0 : y;
       },
   
       set: function(x, y) {
           this.x = x;
           this.y = y;
       }
   });
   
   var Rect = Class.extend({
       init: function(x, y, w, h) {
           this.x = (typeof x === 'undefined') ? 0 : x;
           this.y = (typeof y === 'undefined') ? 0 : y;
           this.w = (typeof w === 'undefined') ? 0 : w;
           this.h = (typeof h === 'undefined') ? 0 : h;
       },
   
       set: function(x, y, w, h) {
           this.x = x;
           this.y = y;
           this.w = w;
           this.h = h;
       }
   });
   
   
   
   // ###################################################################
   // Globals
   //
   // ###################################################################
   var canvas = null;
   var ctx = null;
   var spriteSheetImg = null;
   var bulletImg = null;
   var keyStates = null;
   var prevKeyStates = null;
   var lastTime = 0;
   var player = null;
   var aliens = [];
   var particleManager = null;
   var updateAlienLogic = false;
   var alienDirection = -1;
   var alienYDown = 0;
   var alienCount = 0;
   var wave = 1;
   var hasGameStarted = false;
   
   
   
   // ###################################################################
   // Entities
   //
   // ###################################################################
   var BaseSprite = Class.extend({
       init: function(img, x, y) {
           this.img = img;
           this.position = new Point2D(x, y);
           this.scale = new Point2D(1, 1);
           this.bounds = new Rect(x, y, this.img.width, this.img.height);
           this.doLogic = true;
       },
   
       update: function(dt) {},
   
       _updateBounds: function() {
           this.bounds.set(this.position.x, this.position.y, ~~(0.5 + this.img.width * this.scale.x), ~~(0.5 + this.img.height * this.scale.y));
       },
   
       _drawImage: function() {
           ctx.drawImage(this.img, this.position.x, this.position.y);
       },
   
       draw: function(resized) {
           this._updateBounds();
   
           this._drawImage();
       }
   });
   
   var SheetSprite = BaseSprite.extend({
       init: function(sheetImg, clipRect, x, y) {
           this._super(sheetImg, x, y);
           this.clipRect = clipRect;
           this.bounds.set(x, y, this.clipRect.w, this.clipRect.h);
       },
   
       update: function(dt) {},
   
       _updateBounds: function() {
           var w = ~~(0.5 + this.clipRect.w * this.scale.x);
           var h = ~~(0.5 + this.clipRect.h * this.scale.y);
           this.bounds.set(this.position.x - w / 2, this.position.y - h / 2, w, h);
       },
   
       _drawImage: function() {
           ctx.save();
           ctx.transform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
           ctx.drawImage(this.img, this.clipRect.x, this.clipRect.y, this.clipRect.w, this.clipRect.h, ~~(0.5 + -this.clipRect.w * 0.5), ~~(0.5 + -this.clipRect.h * 0.5), this.clipRect.w, this.clipRect.h);
           ctx.restore();
   
       },
   
       draw: function(resized) {
           this._super(resized);
       }
   });
   
   var Player = SheetSprite.extend({
       init: function() {
           this._super(spriteSheetImg, PLAYER_CLIP_RECT, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 70);
           this.scale.set(0.85, 0.85);
           this.lives = 3;
           this.xVel = 0;
           this.bullets = [];
           this.bulletDelayAccumulator = 0;
           this.score = 0;
       },
   
       reset: function() {
           this.lives = 3;
           this.score = 0;
           this.position.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 70);
       },
   
       shoot: function() {
           var bullet = new Bullet(this.position.x, this.position.y - this.bounds.h / 2, 1, 1000);
           this.bullets.push(bullet);
       },
   
       handleInput: function() {
           if (isKeyDown(LEFT_KEY)) {
               this.xVel = -175;
           } else if (isKeyDown(RIGHT_KEY)) {
               this.xVel = 175;
           } else this.xVel = 0;
   
           if (wasKeyPressed(SHOOT_KEY)) {
               if (this.bulletDelayAccumulator > 0.5) {
                   this.shoot();
                   this.bulletDelayAccumulator = 0;
               }
           }
       },
   
       updateBullets: function(dt) {
           for (var i = this.bullets.length - 1; i >= 0; i--) {
               var bullet = this.bullets[i];
               if (bullet.alive) {
                   bullet.update(dt);
               } else {
                   this.bullets.splice(i, 1);
                   bullet = null;
               }
           }
       },
   
       update: function(dt) {
           // update time passed between shots
           this.bulletDelayAccumulator += dt;
   
           // apply x vel
           this.position.x += this.xVel * dt;
   
           // cap player position in screen bounds
           this.position.x = clamp(this.position.x, this.bounds.w / 2, CANVAS_WIDTH - this.bounds.w / 2);
           this.updateBullets(dt);
       },
   
       draw: function(resized) {
           this._super(resized);
   
           // draw bullets
           for (var i = 0, len = this.bullets.length; i < len; i++) {
               var bullet = this.bullets[i];
               if (bullet.alive) {
                   bullet.draw(resized);
               }
           }
       }
   });
   
   var Bullet = BaseSprite.extend({
       init: function(x, y, direction, speed) {
           this._super(bulletImg, x, y);
           this.direction = direction;
           this.speed = speed;
           this.alive = true;
       },
   
       update: function(dt) {
           this.position.y -= (this.speed * this.direction) * dt;
   
           if (this.position.y < 0) {
               this.alive = false;
           }
       },
   
       draw: function(resized) {
           this._super(resized);
       }
   });
   
   var Enemy = SheetSprite.extend({
       init: function(clipRects, x, y) {
           this._super(spriteSheetImg, clipRects[0], x, y);
           this.clipRects = clipRects;
           this.scale.set(0.5, 0.5);
           this.alive = true;
           this.onFirstState = true;
           this.stepDelay = 1; // try 2 secs to start with...
           this.stepAccumulator = 0;
           this.doShoot - false;
           this.bullet = null;
       },
   
       toggleFrame: function() {
           this.onFirstState = !this.onFirstState;
           this.clipRect = (this.onFirstState) ? this.clipRects[0] : this.clipRects[1];
       },
   
       shoot: function() {
           this.bullet = new Bullet(this.position.x, this.position.y + this.bounds.w / 2, -1, 500);
       },
   
       update: function(dt) {
           this.stepAccumulator += dt;
   
           if (this.stepAccumulator >= this.stepDelay) {
               if (this.position.x < this.bounds.w / 2 + 20 && alienDirection < 0) {
                   updateAlienLogic = true;
               }
               if (alienDirection === 1 && this.position.x > CANVAS_WIDTH - this.bounds.w / 2 - 20) {
                   updateAlienLogic = true;
               }
               if (this.position.y > CANVAS_WIDTH - 50) {
                   reset();
               }
   
               var fireTest = Math.floor(Math.random() * (this.stepDelay + 1));
               if (getRandomArbitrary(0, 1000) <= 5 * (this.stepDelay + 1)) {
                   this.doShoot = true;
               }
               this.position.x += 10 * alienDirection;
               this.toggleFrame();
               this.stepAccumulator = 0;
           }
           this.position.y += alienYDown;
   
           if (this.bullet !== null && this.bullet.alive) {
               this.bullet.update(dt);
           } else {
               this.bullet = null;
           }
       },
   
       draw: function(resized) {
           this._super(resized);
           if (this.bullet !== null && this.bullet.alive) {
               this.bullet.draw(resized);
           }
       }
   });
   
   var ParticleExplosion = Class.extend({
       init: function() {
           this.particlePool = [];
           this.particles = [];
       },
   
       draw: function() {
           for (var i = this.particles.length - 1; i >= 0; i--) {
               var particle = this.particles[i];
               particle.moves++;
               particle.x += particle.xunits;
               particle.y += particle.yunits + (particle.gravity * particle.moves);
               particle.life--;
   
               if (particle.life <= 0) {
                   if (this.particlePool.length < 100) {
                       this.particlePool.push(this.particles.splice(i, 1));
                   } else {
                       this.particles.splice(i, 1);
                   }
               } else {
                   ctx.globalAlpha = (particle.life) / (particle.maxLife);
                   ctx.fillStyle = particle.color;
                   ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
                   ctx.globalAlpha = 1;
               }
           }
       },
   
       createExplosion: function(x, y, color, number, width, height, spd, grav, lif) {
           for (var i = 0; i < number; i++) {
               var angle = Math.floor(Math.random() * 360);
               var speed = Math.floor(Math.random() * spd / 2) + spd;
               var life = Math.floor(Math.random() * lif) + lif / 2;
               var radians = angle * Math.PI / 180;
               var xunits = Math.cos(radians) * speed;
               var yunits = Math.sin(radians) * speed;
   
               if (this.particlePool.length > 0) {
                   var tempParticle = this.particlePool.pop();
                   tempParticle.x = x;
                   tempParticle.y = y;
                   tempParticle.xunits = xunits;
                   tempParticle.yunits = yunits;
                   tempParticle.life = life;
                   tempParticle.color = color;
                   tempParticle.width = width;
                   tempParticle.height = height;
                   tempParticle.gravity = grav;
                   tempParticle.moves = 0;
                   tempParticle.alpha = 1;
                   tempParticle.maxLife = life;
                   this.particles.push(tempParticle);
               } else {
                   this.particles.push({
                       x: x,
                       y: y,
                       xunits: xunits,
                       yunits: yunits,
                       life: life,
                       color: color,
                       width: width,
                       height: height,
                       gravity: grav,
                       moves: 0,
                       alpha: 1,
                       maxLife: life
                   });
               }
   
           }
       }
   });
   
   
   
   // ###################################################################
   // Initialization functions
   //
   // ###################################################################
   function initCanvas() {
       // create our canvas and context
       canvas = document.getElementById('game-canvas');
       ctx = canvas.getContext('2d');
   
       // turn off image smoothing
       setImageSmoothing(false);
   
       // create our main sprite sheet img
       spriteSheetImg = new Image();
       spriteSheetImg.src = SPRITE_SHEET_SRC;
       preDrawImages();
   
       // add event listeners and initially resize
       window.addEventListener('resize', resize);
       document.addEventListener('keydown', onKeyDown);
       document.addEventListener('keyup', onKeyUp);
   }
   
   function preDrawImages() {
       var canvas = drawIntoCanvas(2, 8, function(ctx) {
           ctx.fillStyle = 'white';
           ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
       });
       bulletImg = new Image();
       bulletImg.src = canvas.toDataURL();
   }
   
   function setImageSmoothing(value) {
       this.ctx['imageSmoothingEnabled'] = value;
       this.ctx['mozImageSmoothingEnabled'] = value;
       this.ctx['oImageSmoothingEnabled'] = value;
       this.ctx['webkitImageSmoothingEnabled'] = value;
       this.ctx['msImageSmoothingEnabled'] = value;
   }
   
   function initGame() {
       dirtyRects = [];
       aliens = [];
       player = new Player();
       particleManager = new ParticleExplosion();
       setupAlienFormation();
       drawBottomHud();
   }
   
   function setupAlienFormation() {
       alienCount = 0;
       for (var i = 0, len = 5 * 11; i < len; i++) {
           var gridX = (i % 11);
           var gridY = Math.floor(i / 11);
           var clipRects;
           switch (gridY) {
               case 0:
               case 1:
                   clipRects = ALIEN_BOTTOM_ROW;
                   break;
               case 2:
               case 3:
                   clipRects = ALIEN_MIDDLE_ROW;
                   break;
               case 4:
                   clipRects = ALIEN_TOP_ROW;
                   break;
           }
           aliens.push(new Enemy(clipRects, (CANVAS_WIDTH / 2 - ALIEN_SQUAD_WIDTH / 2) + ALIEN_X_MARGIN / 2 + gridX * ALIEN_X_MARGIN, CANVAS_HEIGHT / 3.25 - gridY * 40));
           alienCount++;
       }
   }
   
   function reset() {
       aliens = [];
       setupAlienFormation();
       player.reset();
   }
   
   function init() {
       initCanvas();
       keyStates = [];
       prevKeyStates = [];
       resize();
   }
   
   
   
   // ###################################################################
   // Helpful input functions
   //
   // ###################################################################
   function isKeyDown(key) {
       return keyStates[key];
   }
   
   function wasKeyPressed(key) {
       return !prevKeyStates[key] && keyStates[key];
   }
   
   
   // ###################################################################
   // Drawing & Update functions
   //
   // ###################################################################
   function updateAliens(dt) {
       if (updateAlienLogic) {
           updateAlienLogic = false;
           alienDirection = -alienDirection;
           alienYDown = 25;
       }
   
       for (var i = aliens.length - 1; i >= 0; i--) {
           var alien = aliens[i];
           if (!alien.alive) {
               aliens.splice(i, 1);
               alien = null;
               alienCount--;
               if (alienCount < 1) {
                   wave++;
                   setupAlienFormation();
               }
               return;
           }
   
           alien.stepDelay = ((alienCount * 20) - (wave * 10)) / 1000;
           if (alien.stepDelay <= 0.05) {
               alien.stepDelay = 0.05;
           }
           alien.update(dt);
   
           if (alien.doShoot) {
               alien.doShoot = false;
               alien.shoot();
           }
       }
       alienYDown = 0;
   }
   
   function resolveBulletEnemyCollisions() {
       var bullets = player.bullets;
   
       for (var i = 0, len = bullets.length; i < len; i++) {
           var bullet = bullets[i];
           for (var j = 0, alen = aliens.length; j < alen; j++) {
               var alien = aliens[j];
               if (checkRectCollision(bullet.bounds, alien.bounds)) {
                   alien.alive = bullet.alive = false;
                   particleManager.createExplosion(alien.position.x, alien.position.y, 'white', 70, 5, 5, 3, .15, 50);
                   player.score += 25;
               }
           }
       }
   }
   
   function resolveBulletPlayerCollisions() {
       for (var i = 0, len = aliens.length; i < len; i++) {
           var alien = aliens[i];
           if (alien.bullet !== null && checkRectCollision(alien.bullet.bounds, player.bounds)) {
               if (player.lives === 0) {
                   hasGameStarted = false;
               } else {
                   alien.bullet.alive = false;
                   particleManager.createExplosion(player.position.x, player.position.y, 'green', 100, 8, 8, 6, 0.001, 40);
                   player.position.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 70);
                   player.lives--;
                   break;
               }
   
           }
       }
   }
   
   function resolveCollisions() {
       resolveBulletEnemyCollisions();
       resolveBulletPlayerCollisions();
   }
   
   function updateGame(dt) {
       player.handleInput();
       prevKeyStates = keyStates.slice();
       player.update(dt);
       updateAliens(dt);
       resolveCollisions();
   }
   
   function drawIntoCanvas(width, height, drawFunc) {
       var canvas = document.createElement('canvas');
       canvas.width = width;
       canvas.height = height;
       var ctx = canvas.getContext('2d');
       drawFunc(ctx);
       return canvas;
   }
   
   function fillText(text, x, y, color, fontSize) {
       if (typeof color !== 'undefined') ctx.fillStyle = color;
       if (typeof fontSize !== 'undefined') ctx.font = fontSize + 'px Play';
       ctx.fillText(text, x, y);
   }
   
   function fillCenteredText(text, x, y, color, fontSize) {
       var metrics = ctx.measureText(text);
       fillText(text, x - metrics.width / 2, y, color, fontSize);
   }
   
   function fillBlinkingText(text, x, y, blinkFreq, color, fontSize) {
       if (~~(0.5 + Date.now() / blinkFreq) % 2) {
           fillCenteredText(text, x, y, color, fontSize);
       }
   }
   
   function drawBottomHud() {
       ctx.fillStyle = '#02ff12';
       ctx.fillRect(0, CANVAS_HEIGHT - 30, CANVAS_WIDTH, 2);
       fillText(player.lives + ' x ', 10, CANVAS_HEIGHT - 7.5, 'white', 20);
       ctx.drawImage(spriteSheetImg, player.clipRect.x, player.clipRect.y, player.clipRect.w,
           player.clipRect.h, 45, CANVAS_HEIGHT - 23, player.clipRect.w * 0.5,
           player.clipRect.h * 0.5);
       fillText('CREDIT: ', CANVAS_WIDTH - 115, CANVAS_HEIGHT - 7.5);
       fillCenteredText('SCORE: ' + player.score, CANVAS_WIDTH / 2, 20);
       fillBlinkingText('00', CANVAS_WIDTH - 25, CANVAS_HEIGHT - 7.5, TEXT_BLINK_FREQ);
   }
   
   function drawAliens(resized) {
       for (var i = 0; i < aliens.length; i++) {
           var alien = aliens[i];
           alien.draw(resized);
       }
   }
   
   function drawGame(resized) {
       player.draw(resized);
       drawAliens(resized);
       particleManager.draw();
       drawBottomHud();
   }
   
   function drawStartScreen() {
       fillCenteredText("Space Invaders", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2.75, '#FFFFFF', 36);
       fillBlinkingText("Press enter to play! (X to shoot)", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 500, '#FFFFFF', 36);
   }
   
   function animate() {
       var now = window.performance.now();
       var dt = now - lastTime;
       if (dt > 100) dt = 100;
       if (wasKeyPressed(13) && !hasGameStarted) {
           initGame();
           hasGameStarted = true;
       }
   
       if (hasGameStarted) {
           updateGame(dt / 1000);
       }
   
   
       ctx.fillStyle = 'rgb(2,2,10)';
       ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
       if (hasGameStarted) {
           drawGame(false);
       } else {
           drawStartScreen();
       }
       lastTime = now;
       requestAnimationFrame(animate);
   }
   
   
   
   // ###################################################################
   // Event Listener functions
   //
   // ###################################################################
   function resize() {
       var w = window.innerWidth;
       var h = window.innerHeight;
   
       // calculate the scale factor to keep a correct aspect ratio
       var scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);
   
       if (IS_CHROME) {
           canvas.width = CANVAS_WIDTH * scaleFactor;
           canvas.height = CANVAS_HEIGHT * scaleFactor;
           setImageSmoothing(false);
           ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);
       } else {
           // resize the canvas css properties
           canvas.style.width = CANVAS_WIDTH * scaleFactor + 'px';
           canvas.style.height = CANVAS_HEIGHT * scaleFactor + 'px';
       }
   }
   
   function onKeyDown(e) {
       e.preventDefault();
       keyStates[e.keyCode] = true;
   }
   
   function onKeyUp(e) {
       e.preventDefault();
       keyStates[e.keyCode] = false;
   }
   
   
   // ###################################################################
   // Start game!
   //
   // ###################################################################
   window.onload = function() {
       init();
       animate();
   };`
}