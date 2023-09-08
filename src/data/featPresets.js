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
    --btn-shadow-color: white;
    --btn-color: crimson
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
    css: `* {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    html {
        --main-color: hotpink;
        --sec-color: navy
    }
    
    .container {
        background: lightblue;
        background: var(--main-color);
        min-height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        transition: 500ms;
        cursor: pointer;
    }
    
    .shape-blob {
        background: var(--sec-color);
        height: 200px;
        width: 200px;
        border-radius: 30% 50% 20% 40%;
        animation:
            transform 20s ease-in-out infinite both alternate,
            movement_one 40s ease-in-out infinite both;
        position: absolute;
        left: 70%;
        top: 50%;
        opacity: .5;
        transition: 500ms;
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
    }`,
    js: `document.documentElement.style.setProperty("--main-color", "rgb(" + genRandom() + ", " + genRandom() + ", " + genRandom() + ")")
        document.documentElement.style.setProperty("--sec-color", "rgb(" + genRandom() + ", " + genRandom() + ", " + genRandom() + ")")
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

export const snippetExample_5 = {
    html: `<section>
    
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 1194.13477 1200" style="enable-background:new 0 0 1194.13477 1200;" xml:space="preserve">
 
 <defs>
     <filter id="polycleaner" color-interpolation-filters="sRGB">
       <feComponentTransfer>
         <feFuncA type="table" tableValues="0 0.5 1 1" />
       </feComponentTransfer>
     </filter>
   </defs>
   
 <g id="low-poly" class='low-poly' stroke-width="0" stroke-linejoin="round" filter="url(#polycleaner)">
     <g filter="url(#polycleaner)">
               <polygon class="st347" points="725.3847,693.75 787.8847,706.25 737.8847,631.25 		"/>
 
       
       <polygon class="st146" points="669.1347,675 706.6347,587.5 650.3847,600 		"/>
       <!-- Blacks-->
       <polygon class="st28" points="700.3847,543.75 700.3847,512.5 700.3847,506.25 706.6347,487.5 712.64435,475.48077 
             700.3847,487.5 687.8847,518.75 687.8847,555.97827 688.1347,556.25 687.8847,555.97827 687.8847,556.25 706.6347,587.5 
             719.1347,593.75 706.6347,568.75 		"/>
       <polygon class="st30" points="737.8847,631.25 750.3847,625 737.8847,612.5 719.46362,594.07892 725.3847,618.75 		"/>
       <polygon class="st68" points="581.6347,381.25 587.8656,393.71179 588.1347,393.75 587.8847,394.12128 587.8847,406.25 
             587.8847,412.5 594.1347,400 594.1347,381.25 588.1347,368.75 587.81702,368.88538 		"/>
       <polygon class="st138" points="790.5163,468.42108 788.73035,467.23047 788.14758,468.71716 		"/>
       <polygon class="st156" points="806.8822,637.62378 806.6347,637.5 800.3847,637.5 787.8847,637.5 775.3847,637.5 806.6347,650 		
             "/>
       <polygon class="st204" points="812.8847,493.75 813.25598,494.12128 813.36676,493.80182 813.1347,493.75 831.6347,487.5 
             800.3847,475 		"/>
       <polygon class="st227" points="456.88455,243.77081 456.80618,243.76428 456.60971,243.79999 450.38474,256.25 444.13474,268.75 
             456.63474,268.75 		"/>
       <polygon class="st278" points="362.87363,599.8446 362.88474,600 362.90622,599.86395 		"/>
       <polygon class="st301" points="444.13474,381.25 450.38474,393.75 450.38474,312.5 456.63474,268.75 444.13474,268.75 
             444.13474,281.25 444.13474,300 444.13474,331.25 444.13474,343.75 437.88474,350 444.13474,356.25 		"/>
       <polygon class="st354" points="337.88474,637.5 375.38474,606.25 425.38474,556.25 444.13474,543.75 487.88474,500 
         494.13474,487.5 494.13474,475 481.63474,487.5 475.43436,499.90082 469.13474,506.25 456.63474,512.5 450.38474,518.75 
         437.83511,525.04962 362.90622,599.86395 	"/>
       <!-- Blacks-->
       
       
       
         
       
       <!-- top left -->
        <polygon class="st219" points="375.38474,393.75 350.63474,393.75 437.88474,350 356.63474,362.5 350.38474,393.75 
             331.63474,406.25 387.88474,393.75 		"/>
       <!-- top left -->
 
 
         <polygon class="st24" points="769.1347,506.25 800.3847,475 787.8847,468.75 		"/>
       
       
         <polygon class="st25" points="719.46362,594.07892 737.8847,612.5 750.3847,625 812.8847,581.25 719.3847,593.75 		"/>
         <polygon class="st26" points="762.8847,631.25 775.3847,637.5 812.8847,581.25 750.3847,625 		"/>
         <polygon class="st27" points="719.3847,593.75 812.8847,581.25 762.8847,537.5 		"/>
         
         <polygon class="st29" points="800.3847,531.25 769.1347,506.25 775.3847,518.75 762.8847,537.5 812.8847,581.25 775.6347,518.75 
             812.8847,581.25 831.6347,518.75 		"/>
         
         <polygon class="st31" points="831.6347,556.25 831.6347,537.5 831.6347,518.75 812.8847,581.25 831.69659,568.87378 
             831.6347,568.75 		"/>
         <polygon class="st32" points="725.3847,618.75 719.46362,594.07892 719.1347,593.75 725.3847,631.25 725.3847,662.5 
             725.3847,693.75 737.8847,631.25 		"/>
         
         <polygon class="st34" points="700.3847,487.5 706.77362,426.06836 706.6347,425 619.1347,481.25 687.8847,518.75 		"/>
         
         <polygon class="st35" points="800.3847,475 792.8847,470 787.8847,468.75 		"/>
         <polygon class="st36" points="806.6347,437.5 800.3847,437.5 837.8847,462.5 831.6347,450 831.6347,437.5 837.80249,418.9967 
             812.8847,437.5 		"/>
         <polygon class="st37" points="788.14758,468.71716 788.1347,468.75 788.14758,468.71716 787.8847,468.75 792.8847,470 
             790.5163,468.42108 		"/>
         
         <polygon class="st39" points="792.8847,470 837.8847,481.25 837.8847,475 837.8847,462.5 790.5163,468.42108 		"/>
         <polygon class="st35" points="788.73035,467.23047 790.5163,468.42108 837.8847,462.5 800.3847,437.5 		"/>
         <polygon class="st40" points="719.3847,593.75 762.8847,537.5 750.3847,543.75 700.3847,543.75 706.6347,568.75 719.1347,593.75 
             719.46362,594.07892 		"/>
         <polygon class="st41" points="831.6347,518.75 869.1347,506.25 813.36676,493.80182 813.25598,494.12128 825.3847,506.25 		"/>
         <polygon class="st37" points="800.3847,531.25 813.25598,494.12128 812.8847,493.75 800.3847,475 769.1347,506.25 		"/>
         
         <polygon class="st43" points="831.6347,518.75 825.3847,506.25 813.25598,494.12128 800.3847,531.25 		"/>
         
         <polygon class="st8" points="544.98944,187.63501 544.8847,187.5 544.86212,187.60657 		"/>
         <polygon class="st3" points="544.86212,187.60657 544.8847,187.5 544.755,187.58264 		"/>
         <polygon class="st45" points="481.88474,175 519.1347,175 512.92609,143.95697 481.63474,175 		"/>
         <polygon class="st46" points="512.92609,143.95697 512.8847,143.75 388.49423,199.83789 481.60257,175.07507 481.63474,175 		"/>
         <polygon class="st47" points="544.8847,187.5 544.61804,187.55206 544.755,187.58264 		"/>
         <polygon class="st47" points="545.34473,187.71429 544.8847,187.5 544.98944,187.63501 		"/>
         <polygon class="st48" points="619.1347,143.75 587.8847,143.75 600.3847,162.5 		"/>
         <polygon class="st49" points="587.8847,143.75 600.3847,200 600.3847,162.5 		"/>
         <polygon class="st50" points="619.1347,187.5 612.8847,175 600.3847,162.5 600.3847,200 619.1347,193.75 		"/>
         <polygon class="st51" points="569.1347,218.75 625.30682,224.96375 545.34473,187.71429 544.98944,187.63501 		"/>
         <polygon class="st52" points="625.36481,224.97015 612.8847,206.25 600.6347,200 612.8847,206.25 619.1347,193.75 600.3847,200 
             545.34473,187.71429 625.30682,224.96375 		"/>
         <polygon class="st8" points="456.88474,243.75 456.88455,243.77081 531.6347,250 544.86212,187.60657 544.755,187.58264 
             456.63474,243.75 456.80618,243.76428 		"/>
         <polygon class="st53" points="494.13474,200 512.8847,193.75 481.71152,175.04608 481.60257,175.07507 462.88474,218.75 
             481.63474,206.25 		"/>
         <polygon class="st54" points="388.49423,199.83789 388.13474,200 388.49423,199.83789 387.88474,200 462.88474,218.75 
             481.60257,175.07507 		"/>
         <polygon class="st55" points="544.61804,187.55206 512.8847,193.75 494.13474,200 481.63474,206.25 462.88474,218.75 
             456.63474,243.75 544.755,187.58264 		"/>
         <polygon class="st56" points="481.60257,175.07507 481.71152,175.04608 481.63474,175 		"/>
         <polygon class="st57" points="512.8847,143.75 519.1347,112.5 387.88474,200 388.49423,199.83789 		"/>
         <polygon class="st58" points="612.8847,175 619.1347,156.25 619.1347,143.75 600.3847,162.5 		"/>
         <polygon class="st59" points="481.63474,175 481.71152,175.04608 481.88474,175 		"/>
         <polygon class="st60" points="481.88474,175 481.71152,175.04608 512.8847,193.75 519.1347,175 		"/>
         <polygon class="st61" points="512.8847,193.75 525.3847,181.25 531.6347,181.25 519.1347,175 		"/>
         <polygon class="st62" points="512.8847,193.75 544.61804,187.55206 544.3847,187.5 544.15704,187.38837 544.1347,187.5 
             544.09979,187.36035 531.6347,181.25 525.3847,181.25 		"/>
         <polygon class="st63" points="512.92609,143.95697 513.1347,143.75 512.92609,143.95697 519.1347,175 531.6347,181.25 
             531.6347,175 531.6347,150 531.6347,137.5 525.3847,118.75 519.1347,112.5 512.8847,143.75 		"/>
         <polygon class="st64" points="581.6347,381.25 587.81702,368.88538 544.1347,387.5 587.8656,393.71179 		"/>
         <polygon class="st65" points="600.3847,400 587.8847,412.5 575.3847,425 687.8847,393.75 594.1347,400 		"/>
         <polygon class="st66" points="687.8847,393.75 594.1347,381.25 594.1347,400 		"/>
         <polygon class="st67" points="619.1347,187.5 619.1347,156.25 612.8847,175 		"/>
         <polygon class="st68" points="581.6347,381.25 587.8656,393.71179 588.1347,393.75 587.8847,394.12128 587.8847,406.25 
             587.8847,412.5 594.1347,400 594.1347,381.25 588.1347,368.75 587.81702,368.88538 		"/>
         <polygon class="st69" points="587.81702,368.88538 588.1347,368.75 587.8847,368.58551 587.8847,368.75 		"/>
         <polygon class="st16" points="587.8847,393.75 587.8656,393.71179 544.1347,387.5 562.8847,431.25 587.8847,394.12128 		"/>
         <polygon class="st70" points="512.8847,400 562.8847,431.25 544.1347,387.5 		"/>
         <polygon class="st71" points="587.8847,406.25 587.8847,394.12128 562.8847,431.25 575.3847,425 587.8847,412.5 		"/>
         <polygon class="st72" points="481.63474,431.25 494.32669,375.25598 494.19528,375.08075 450.38474,393.75 462.88474,412.5 
             481.52878,437.35876 481.88474,437.5 562.8847,431.25 512.8847,400 		"/>
         <polygon class="st73" points="587.8847,394.12128 588.1347,393.75 587.8656,393.71179 587.8847,393.75 		"/>
         <polygon class="st69" points="587.81702,368.88538 587.8847,368.75 587.8847,368.58551 569.1347,356.25 544.1347,387.5 		"/>
         <polygon class="st74" points="594.1347,400 587.8847,412.5 600.3847,400 		"/>
         <polygon class="st75" points="619.1347,193.75 612.8847,206.25 625.36481,224.97015 625.37903,224.97174 		"/>
         <polygon class="st76" points="625.30682,224.96375 625.3847,225 625.36481,224.97015 		"/>
         <polygon class="st76" points="625.36481,224.97015 625.3847,225 625.37903,224.97174 		"/>
         <polygon class="st76" points="625.3847,225 625.39142,224.97308 625.37903,224.97174 		"/>
         <polygon class="st77" points="619.1347,193.75 625.37903,224.97174 625.39142,224.97308 637.8847,175 619.42572,156.29156 
             619.1347,156.25 619.1347,187.5 		"/>
         <polygon class="st78" points="494.32706,331.15387 494.13474,331.25 544.1347,387.5 569.1347,356.25 494.38474,331.25 		"/>
         <polygon class="st79" points="506.63474,300 494.23471,331 494.32706,331.15387 581.6347,287.5 531.6347,250 		"/>
         <polygon class="st80" points="494.38474,331.25 569.1347,356.25 581.6347,287.5 494.32706,331.15387 		"/>
         <polygon class="st3" points="544.98944,187.63501 544.86212,187.60657 531.6347,250 569.1347,218.75 		"/>
         <polygon class="st81" points="581.6347,287.5 625.3847,225 531.6347,250 		"/>
         <polygon class="st82" points="569.1347,218.75 531.6347,250 625.3847,225 625.30682,224.96375 		"/>
         <polygon class="st83" points="462.88474,100 462.88474,87.5 431.63474,87.5 456.42776,112.29303 456.68088,112.40765 		"/>
         <polygon class="st84" points="456.67014,918.21881 456.63474,918.75 456.83786,918.63391 		"/>
         <polygon class="st84" points="456.83786,918.63391 500.38474,893.75 487.88474,875 475.38474,850 462.88474,825 
             456.67014,918.21881 		"/>
         <polygon class="st85" points="375.38474,793.75 369.13474,812.5 462.88474,825 		"/>
         <polygon class="st86" points="431.63474,856.25 369.13474,812.5 381.63474,825 387.88474,831.25 406.63474,856.25 
             425.38474,881.25 444.13474,906.25 456.63474,918.75 456.67014,918.21881 		"/>
         <polygon class="st87" points="462.88474,825 369.13474,812.5 431.63474,856.25 		"/>
         <polygon class="st88" points="456.67014,918.21881 462.88474,825 431.63474,856.25 		"/>
         <polygon class="st89" points="450.38474,787.5 437.93185,750.14142 375.38474,793.75 462.88474,825 		"/>
         <polygon class="st90" points="425.63474,725 424.68246,723.94666 425.38474,725 		"/>
         <polygon class="st91" points="424.68246,723.94666 369.13474,662.5 369.13474,675 362.88474,725 425.38474,725 		"/>
         <polygon class="st92" points="437.88474,750 425.4863,725.20312 375.38474,793.75 437.93185,750.14142 		"/>
         <polygon class="st93" points="425.38474,725 362.88474,725 369.13474,756.25 375.38474,787.5 375.38474,793.75 
             425.4863,725.20312 		"/>
         <polygon class="st94" points="363.13474,600 363.43039,599.45435 362.978,599.90674 		"/>
         <polygon class="st95" points="456.63474,243.75 456.60971,243.79999 456.80618,243.76428 		"/>
         <polygon class="st96" points="463.13474,931.25 500.38474,893.75 456.83786,918.63391 456.88474,918.75 456.83786,918.63391 
             456.63474,918.75 462.88474,931.25 475.38474,943.75 500.38474,893.75 		"/>
         <polygon class="st97" points="456.42776,112.29303 456.63474,112.5 456.68088,112.40765 		"/>
         <polygon class="st98" points="494.13474,112.5 519.1347,112.5 500.38474,75 469.13474,112.5 481.63474,112.5 		"/>
         <polygon class="st99" points="706.8847,425 706.6347,425 706.77362,426.06836 		"/>
         <polygon class="st100" points="350.63474,393.75 375.38474,393.75 387.88474,393.75 437.88474,350 		"/>
         <polygon class="st101" points="425.4863,725.20312 425.63474,725 425.38474,725 		"/>
         <polygon class="st102" points="281.63474,575 288.05765,661.46246 306.63474,550 		"/>
         <polygon class="st103" points="494.13474,475 494.13474,468.75 494.13474,462.5 481.63474,487.5 		"/>
         <polygon class="st104" points="256.88474,550 281.63474,575 306.63474,550 		"/>
         <polygon class="st105" points="300.38474,662.5 306.63474,656.25 288.13474,662.5 		"/>
         <polygon class="st106" points="319.13474,787.5 331.63474,806.25 350.38474,812.5 369.13474,812.5 319.45572,787.53564 		"/>
         <polygon class="st107" points="787.8681,1075.13257 787.8847,1075 750.3847,1018.75 737.8847,1100 		"/>
         <polygon class="st108" points="787.94788,1075.09302 787.8847,1075 787.8681,1075.13257 		"/>
         <polygon class="st109" points="737.8847,1100 750.3847,1018.75 625.3847,1118.75 		"/>
         <polygon class="st110" points="562.8847,1068.75 600.3847,1100 625.3847,1118.75 525.3847,1037.5 		"/>
         <polygon class="st111" points="331.63474,818.75 325.38474,818.75 331.63474,843.75 337.88474,862.5 362.88474,825 		"/>
         <polygon class="st112" points="831.6347,643.75 837.8847,637.5 844.1347,625 819.1347,643.75 		"/>
         <polygon class="st113" points="337.88474,862.5 350.38474,887.5 362.88474,912.5 362.88474,825 		"/>
         <polygon class="st114" points="581.6347,93.75 569.1347,93.75 562.8847,106.25 556.6347,125 625.3847,106.25 		"/>
         <polygon class="st115" points="433.32584,31.20184 414.66769,25.71417 406.63474,18.75 400.38474,37.5 387.88474,81.25 
             455.27658,36.68958 		"/>
         <polygon class="st116" points="412.88474,706.25 406.63474,693.75 400.38474,681.25 394.13474,668.75 375.63474,656.25 
             375.38474,656.25 369.13474,662.5 424.68246,723.94666 		"/>
         <polygon class="st117" points="694.1347,331.25 700.3847,325 706.6347,312.5 706.6347,293.75 700.52826,269.3241 687.8847,337.5 
                     "/>
         <polygon class="st118" points="669.1347,143.75 675.3847,137.5 675.3847,131.25 662.8847,125 662.8847,162.5 		"/>
         <polygon class="st119" points="456.63474,931.25 400.38474,962.5 475.38474,943.75 		"/>
         <polygon class="st120" points="319.45572,787.53564 369.13474,812.5 375.38474,793.75 		"/>
         <polygon class="st121" points="556.92896,125.02673 587.8847,143.75 625.3847,131.25 		"/>
         <polygon class="st122" points="394.13474,662.5 387.88474,656.25 375.63474,656.25 394.13474,668.75 		"/>
         <polygon class="st123" points="356.63474,681.25 362.88474,650 369.13474,631.25 362.88474,643.75 344.13474,668.75 
             331.63474,693.75 325.38474,712.5 356.63474,725 356.63474,700 		"/>
         <polygon class="st124" points="400.38474,900 369.13474,931.25 456.63474,931.25 		"/>
         <polygon class="st125" points="369.13474,931.25 381.63474,943.75 400.38474,962.5 456.63474,931.25 		"/>
         <polygon class="st126" points="363.13474,912.5 400.38474,900 375.38474,831.25 362.88474,912.5 369.13474,931.25 400.38474,900 
                     "/>
         <polygon class="st127" points="456.63474,931.25 425.38474,893.75 400.38474,862.5 375.38474,831.25 400.38474,900 		"/>
         <polygon class="st128" points="362.88474,825 362.88474,912.5 375.38474,831.25 		"/>
         <polygon class="st129" points="494.13474,112.5 481.63474,112.5 469.13474,112.5 456.63474,118.75 387.88474,200 519.1347,112.5 
                     "/>
         <polygon class="st130" points="737.8847,500 750.57129,462.68658 750.50909,462.62439 713.1347,475 		"/>
         <polygon class="st131" points="750.50909,462.62439 750.3847,462.5 737.8847,462.5 725.3847,468.75 713.28308,474.80078 
             713.1347,475 		"/>
         <polygon class="st132" points="713.11945,474.88263 706.77362,426.06836 700.3847,487.5 712.64435,475.48077 712.8847,475 		"/>
         <polygon class="st133" points="756.6347,468.75 750.57129,462.68658 737.8847,500 		"/>
         <polygon class="st134" points="713.28308,474.80078 713.11945,474.88263 713.1347,475 		"/>
         <polygon class="st135" points="750.60297,462.59326 750.50909,462.62439 750.57129,462.68658 		"/>
         <polygon class="st136" points="650.3847,600 706.6347,587.5 687.8847,556.25 		"/>
         <polygon class="st137" points="800.3847,437.5 781.6347,462.5 788.73035,467.23047 		"/>
         
         <polygon class="st139" points="750.6347,462.5 750.60297,462.59326 750.8847,462.5 		"/>
         <polygon class="st134" points="713.11945,474.88263 712.8847,475 712.64435,475.48077 713.1347,475 		"/>
         <polygon class="st140" points="756.6347,500 769.1347,506.25 787.8847,468.75 738.1347,500 		"/>
         <polygon class="st141" points="750.8847,462.5 781.6347,462.5 750.3847,450 		"/>
         <polygon class="st138" points="750.60297,462.59326 750.57129,462.68658 756.6347,468.75 762.8847,468.75 775.3847,468.75 
             787.8847,468.75 788.14758,468.71716 788.73035,467.23047 781.6347,462.5 750.8847,462.5 		"/>
         <polygon class="st142" points="781.6347,462.5 750.3847,425 750.3847,450 		"/>
         <polygon class="st99" points="713.11945,474.88263 713.28308,474.80078 750.3847,425 706.8847,425 706.77362,426.06836 		"/>
         <polygon class="st143" points="725.3847,468.75 737.8847,462.5 750.3847,462.5 750.50909,462.62439 750.60297,462.59326 
             750.6347,462.5 750.8847,462.5 750.3847,450 750.3847,425 713.28308,474.80078 		"/>
         <polygon class="st135" points="762.8847,468.75 756.6347,468.75 737.8847,500 738.1347,500 787.8847,468.75 775.3847,468.75 		"/>
         <polygon class="st144" points="737.8847,500 700.3847,506.25 725.3847,518.75 		"/>
         <polygon class="st145" points="700.3847,506.25 700.3847,512.5 700.3847,543.75 725.3847,518.75 		"/>
         
         <polygon class="st134" points="713.1347,475 712.64435,475.48077 706.6347,487.5 700.3847,506.25 737.8847,500 		"/>
         <polygon class="st147" points="731.6347,531.25 725.3847,518.75 700.3847,543.75 750.3847,543.75 737.8847,537.5 		"/>
         <polygon class="st148" points="625.42999,224.97736 625.39142,224.97308 625.3847,225 		"/>
         <polygon class="st149" points="812.8847,712.5 831.6347,712.5 838.02118,700.21832 837.90271,700.02887 787.8847,706.25 		"/>
         <polygon class="st150" points="837.90271,700.02887 837.8847,700 812.8847,662.5 806.6347,650 787.8847,706.25 		"/>
         <polygon class="st151" points="838.1347,700 837.90271,700.02887 838.02118,700.21832 		"/>
         <polygon class="st152" points="537.8847,837.5 562.8847,825 594.1347,806.25 525.3847,775 		"/>
         
         <polygon class="st154" points="737.8847,706.25 775.3847,731.25 825.3847,756.25 856.6347,775 787.8847,706.25 725.3847,693.75 		
             "/>
         <polygon class="st148" points="625.71997,225.22351 625.6347,225 625.3847,225 		"/>
         <polygon class="st155" points="625.6347,225 625.42999,224.97736 625.3847,225 		"/>
         
         <polygon class="st157" points="837.8847,581.25 831.69659,568.87378 812.8847,581.25 		"/>
         <polygon class="st158" points="625.3847,131.25 587.8847,143.75 619.1347,143.75 		"/>
         <polygon class="st159" points="631.6347,743.75 662.8847,712.5 687.8847,687.5 712.82629,668.79382 669.1347,675 		"/>
         <polygon class="st160" points="444.38474,743.75 525.3847,775 535.80139,743.75 		"/>
         <polygon class="st161" points="525.3847,775 631.5813,743.83905 631.6347,743.75 535.80139,743.75 		"/>
         <polygon class="st162" points="535.80139,743.75 631.6347,743.75 550.3847,700 		"/>
         <polygon class="st163" points="712.82629,668.79382 712.8847,668.75 706.6347,587.5 669.1347,675 		"/>
         <polygon class="st164" points="594.1347,806.25 631.5813,743.83905 525.3847,775 		"/>
         <polygon class="st165" points="550.3847,700 631.6347,743.75 556.85364,631.57843 		"/>
         <polygon class="st166" points="669.1347,675 650.3847,600 600.3847,625 637.8847,656.25 		"/>
         <polygon class="st167" points="556.8847,631.25 556.87585,631.34375 669.1347,675 637.8847,656.25 600.3847,625 556.6347,631.25 
             556.87585,631.34375 		"/>
         <polygon class="st168" points="556.85364,631.57843 556.6347,631.25 444.55905,743.57526 550.3847,700 		"/>
         <polygon class="st169" points="550.3847,700 444.55905,743.57526 444.38474,743.75 535.80139,743.75 		"/>
         <polygon class="st170" points="444.13474,356.25 437.88474,350 387.88474,393.75 444.13474,381.25 		"/>
         <polygon class="st171" points="594.3385,343.5462 606.6347,331.25 581.6347,287.5 		"/>
         <polygon class="st172" points="625.71997,225.22351 625.3847,225 606.6347,331.25 656.6347,306.25 		"/>
         <polygon class="st173" points="606.6347,331.25 612.8847,337.5 637.8847,343.75 650.3847,343.75 662.8847,343.75 687.8847,337.5 
             656.6347,306.25 		"/>
         <polygon class="st174" points="569.1347,356.25 587.8847,368.58551 587.8847,356.25 594.1347,343.75 594.3385,343.5462 
             581.6347,287.5 		"/>
         <polygon class="st1" points="656.6347,306.25 687.8847,337.5 700.52826,269.3241 700.42859,268.92566 		"/>
         <polygon class="st175" points="594.1347,381.25 650.3847,362.5 588.1347,368.75 		"/>
         <polygon class="st176" points="588.1347,368.75 650.3847,362.5 587.8847,356.25 587.8847,368.58551 		"/>
         <polygon class="st177" points="805.0722,404.6875 837.8847,418.75 844.1347,412.5 850.3847,412.5 850.18628,412.40082 
             802.16028,401.77557 		"/>
         <polygon class="st178" points="787.8847,406.25 650.3847,362.5 687.8847,393.75 		"/>
         <polygon class="st179" points="625.71997,225.22351 656.6347,306.25 700.42859,268.92566 700.3847,268.75 700.22144,268.52142 
             644.1347,237.5 		"/>
         <polygon class="st180" points="687.8847,393.75 650.3847,362.5 594.1347,381.25 		"/>
         <polygon class="st181" points="794.1347,400 800.3847,400 802.16028,401.77557 850.18628,412.40082 837.8847,406.25 
             794.1347,393.75 725.3847,381.25 650.3847,362.5 787.8847,406.25 		"/>
         <polygon class="st182" points="662.8847,162.5 662.8847,125 625.3847,131.25 		"/>
         <polygon class="st148" points="625.71997,225.22351 644.1347,237.5 700.22144,268.52142 669.1347,225 625.6347,225 		"/>
         <polygon class="st183" points="619.1347,143.75 619.1347,156.25 619.42572,156.29156 619.3847,156.25 619.42572,156.29156 
             662.8847,162.5 619.3847,143.75 662.8847,162.5 625.3847,131.25 		"/>
         <polygon class="st184" points="556.8847,125 556.92896,125.02673 625.3847,131.25 625.3847,118.75 625.3847,106.25 556.6347,125 
             556.92896,125.02673 		"/>
         <polygon class="st185" points="587.8847,143.75 556.92896,125.02673 556.6347,125 550.3847,156.25 544.35211,186.41302 
             544.6347,187.5 		"/>
         <polygon class="st186" points="662.8847,125 631.6347,118.75 625.3847,118.75 625.3847,131.25 		"/>
         <polygon class="st155" points="625.6347,225 669.1347,225 662.8847,206.25 625.42999,224.97736 		"/>
         <polygon class="st76" points="625.39142,224.97308 625.42999,224.97736 662.8847,206.25 637.8847,175 		"/>
         <polygon class="st187" points="662.8847,206.25 662.8847,193.75 662.8847,181.25 662.8847,162.62378 637.8847,175 		"/>
         <polygon class="st188" points="637.8847,175 662.8847,162.62378 662.8847,162.5 619.42572,156.29156 		"/>
         <polygon class="st2" points="837.8847,418.75 837.80249,418.9967 838.1347,418.75 837.80249,418.9967 831.6347,437.5 
             831.6347,450 837.8847,462.5 837.8847,475 837.8847,481.25 844.1347,487.5 850.3847,475 850.3847,450 856.6347,425 
             850.3847,412.5 844.1347,412.5 		"/>
         <polygon class="st189" points="812.8847,581.25 844.1347,625 844.1347,618.75 844.1347,612.5 837.8847,600 837.8847,593.75 
             838.12982,593.50488 837.8847,581.25 		"/>
         <polygon class="st190" points="775.3847,637.5 844.1347,625 812.8847,581.25 		"/>
         <polygon class="st191" points="787.8847,637.5 800.3847,637.5 806.6347,637.5 806.8822,637.62378 806.8847,637.5 844.1347,625 
             775.3847,637.5 		"/>
         
         <polygon class="st47" points="544.3847,187.5 544.61804,187.55206 544.8847,187.5 545.34473,187.71429 600.3847,200 
             587.8847,143.75 544.6347,187.5 544.35211,186.41302 544.15704,187.38837 		"/>
         
         <polygon class="st194" points="869.1347,812.86768 856.6347,831.25 844.1347,856.25 800.3847,906.25 881.60394,843.96533 
             881.6347,843.75 869.1347,825 		"/>
         <polygon class="st195" points="831.6347,712.5 812.8847,712.5 787.8847,706.25 856.6347,775 869.1347,800 875.3847,818.75 
             881.6347,843.75 875.3847,775 869.1347,750 838.02118,700.21832 		"/>
         
         <polygon class="st197" points="806.8822,637.62378 819.1347,643.75 844.1347,625 806.8847,637.5 		"/>
         <polygon class="st198" points="869.1347,550.37128 844.1347,587.5 869.1347,587.5 869.38269,587.25201 869.1347,556.25 		"/>
         <polygon class="st199" points="875.3847,500 844.1347,493.75 869.1347,506.25 		"/>
         <polygon class="st200" points="813.36676,493.80182 813.3847,493.75 813.36676,493.80182 869.1347,506.25 844.1347,493.75 
             831.6347,487.5 813.1347,493.75 		"/>
         <polygon class="st201" points="869.1347,550.37128 869.3847,550 869.1347,550.37128 869.1347,556.25 869.38269,587.25201 
             875.3847,581.25 875.3847,575 881.6347,550 875.3847,543.75 869.1347,550 		"/>
         <polygon class="st202" points="792.8847,470 800.3847,475 831.6347,487.5 844.1347,487.5 837.8847,481.25 		"/>
         <polygon class="st203" points="869.1347,518.75 869.38141,537.2533 875.3847,531.25 881.6347,518.75 881.6347,506.25 
             875.3847,500 869.1347,506.25 		"/>
         
         
         <polygon class="st206" points="875.3847,543.75 862.8847,537.5 869.1347,550 		"/>
         
         <polygon class="st208" points="869.1347,506.25 862.8847,537.5 869.1347,537.5 869.38141,537.2533 869.1347,518.75 		"/>
         <polygon class="st209" points="275.38474,487.5 262.88474,518.75 306.63474,550 		"/>
         <polygon class="st210" points="369.13474,775 362.88474,750 356.63474,725 319.13474,743.75 375.38474,793.75 		"/>
         <polygon class="st211" points="325.38474,712.5 331.63474,693.75 344.13474,668.75 362.88474,643.75 369.13474,631.25 
             362.88474,650 356.63474,681.25 356.63474,700 356.63474,725 362.88474,750 369.13474,775 375.38474,793.75 375.38474,787.5 
             369.13474,756.25 362.88474,725 369.13474,675 369.13474,662.5 375.38474,656.25 375.63474,656.25 387.88474,656.25 
             394.13474,662.5 394.13474,668.75 400.38474,681.25 406.63474,693.75 412.88474,706.25 424.68246,723.94666 425.63474,725 
             425.4863,725.20312 437.88474,750 437.93185,750.14142 438.13474,750 437.93185,750.14142 450.38474,787.5 462.88474,825 
             475.38474,850 487.88474,875 500.38474,893.75 500.38474,887.5 494.13474,875 481.63474,850 469.13474,818.75 450.38474,768.75 
             444.13474,743.75 431.63474,718.75 412.88474,687.5 400.38474,656.25 400.38474,650 381.63474,650 375.38474,650 
             381.63474,631.25 394.13474,606.25 412.88474,581.25 444.13474,556.25 469.13474,531.25 481.63474,525 494.38474,518.75 
             531.6347,575 544.1347,500 494.63474,518.75 544.1347,500 531.6347,462.5 519.1347,481.25 500.38474,512.5 494.13474,518.75 
             487.88474,500 444.13474,543.75 425.38474,556.25 406.63474,575 375.38474,606.25 356.63474,631.25 331.63474,662.5 
             319.13474,687.5 313.13474,712.5 319.13474,687.5 331.63474,662.5 356.63474,631.25 375.38474,606.25 406.63474,575 
             425.38474,556.25 444.13474,543.75 487.88474,500 494.13474,487.5 494.38474,475 494.13474,487.5 487.88474,500 494.13474,518.75 
             500.38474,512.5 519.1347,481.25 531.6347,462.5 494.13474,462.5 494.13474,468.75 494.13474,475 481.63474,487.5 
             475.43436,499.90082 475.63474,500 475.43436,499.90082 475.38474,500 469.13474,506.25 456.63474,512.5 450.38474,518.75 
             437.88474,525 437.83511,525.04962 438.13474,525 437.83511,525.04962 431.63474,531.25 425.38474,537.5 419.13474,543.75 
             400.38474,562.5 387.88474,575 375.38474,587.5 363.43039,599.45435 363.13474,600 362.978,599.90674 362.88474,600 
             350.38474,618.75 337.88474,637.5 319.13474,650 306.63474,656.25 300.38474,662.5 288.13474,662.5 287.88474,662.5 
             269.38474,643.75 287.88474,662.5 287.978,661.94031 256.63474,550 256.63474,568.75 262.88474,618.75 269.13474,643.75 
             287.88474,675 306.63474,706.25 312.88474,712.5 312.88474,725 312.88474,737.5 319.13474,743.75 319.13474,725 		"/>
         <polygon class="st212" points="325.38474,712.5 319.13474,725 319.13474,743.75 356.63474,725 		"/>
         <polygon class="st213" points="600.3847,1106.25 562.8847,1081.25 525.3847,1050 512.8847,1037.5 487.88474,1025 
             456.63474,1006.25 425.38474,993.75 406.63474,975 375.38474,950 375.63474,962.5 375.38474,950 406.63474,975 425.38474,993.75 
             456.63474,1006.25 487.88474,1025 512.8847,1037.5 525.3847,1050 562.8847,1081.25 600.3847,1106.25 625.3847,1118.75 
             600.3847,1100 562.8847,1068.75 525.3847,1037.5 494.13474,1018.75 475.38474,1006.25 444.13474,993.75 425.38474,981.25 
             400.38474,962.5 381.63474,943.75 369.13474,931.25 362.88474,912.5 350.38474,887.5 337.88474,862.5 331.63474,843.75 
             325.38474,818.75 319.13474,806.25 312.88474,800 319.13474,837.5 325.38474,850 331.63474,875 344.13474,906.25 
             362.88474,943.75 375.38474,962.5 387.88474,981.25 412.88474,1012.5 425.38474,1025 425.38474,1031.25 437.88474,1037.5 
             462.88474,1056.25 494.13474,1081.25 531.6347,1100 569.1347,1118.75 600.3847,1137.5 612.8847,1137.5 625.3847,1118.75 		"/>
         <polygon class="st214" points="319.13474,743.75 312.88474,750 312.88474,775 312.88474,800 319.13474,787.5 		"/>
         <polygon class="st215" points="288.05765,661.46246 281.63474,575 256.88474,550 256.63474,550 287.978,661.94031 		"/>
         <polygon class="st216" points="306.88474,431.25 362.88486,405.32404 387.88474,393.75 331.63474,406.25 306.63474,431.25 
             287.88474,462.5 312.88474,462.5 		"/>
         <polygon class="st217" points="287.88474,462.5 275.38474,487.5 306.63474,550 		"/>
         <polygon class="st218" points="612.8847,1137.5 625.3847,1143.75 637.8847,1150 650.3847,1156.25 675.3847,1162.5 
             625.3847,1118.75 		"/>
         
         <polygon class="st220" points="856.6347,831.25 762.8847,818.75 775.3847,856.25 787.8847,881.25 800.3847,906.25 
             844.1347,856.25 		"/>
         <polygon class="st221" points="306.63474,550 262.88474,518.75 256.63474,550 256.88474,550 		"/>
         <polygon class="st222" points="750.3847,1018.75 856.6347,962.5 750.3847,1000 		"/>
         <polygon class="st223" points="787.94788,1075.09302 788.1347,1075 787.94788,1075.09302 800.46692,1093.5033 806.6347,1075 
             812.8847,1056.25 831.6347,1018.75 844.1347,987.5 856.6347,962.5 787.8847,1075 		"/>
         <polygon class="st224" points="787.8847,1075 856.6347,962.5 750.3847,1018.75 		"/>
         <polygon class="st225" points="625.3847,1118.75 675.3847,1162.5 737.8847,1100 		"/>
         <polygon class="st226" points="800.3847,906.25 875.3847,887.5 881.60394,843.96533 		"/>
         
         <polygon class="st228" points="712.8847,1162.5 731.6347,1156.25 744.1347,1150 756.6347,1143.75 762.8847,1137.5 781.6347,1125 
             737.8847,1100 		"/>
         <polygon class="st229" points="675.3847,1162.5 687.8847,1162.5 712.8847,1162.5 737.8847,1100 		"/>
         <polygon class="st230" points="737.8847,1100 781.6347,1125 787.8681,1075.13257 		"/>
         <polygon class="st231" points="787.8681,1075.13257 781.6347,1125 800.3847,1093.75 800.46692,1093.5033 787.94788,1075.09302 		
             "/>
         <polygon class="st232" points="462.88474,87.5 469.13474,75 475.38474,62.5 481.06876,49.31128 419.13474,68.75 		"/>
         <polygon class="st233" points="481.06876,49.31128 471.19089,42.17725 455.27658,36.68958 419.13474,68.75 		"/>
         <polygon class="st234" points="531.6347,150 531.6347,175 531.6347,181.25 544.09979,187.36035 537.8847,162.5 
             537.8847,161.53845 531.6347,137.5 		"/>
         <polygon class="st235" points="469.13474,75 462.88474,87.5 462.88474,100 456.68088,112.40765 456.88474,112.5 
             456.68088,112.40765 456.63474,112.5 456.63474,118.75 469.13474,112.5 481.06876,49.31128 475.38474,62.5 		"/>
         <polygon class="st236" points="462.88474,87.5 419.13474,68.75 387.88474,81.25 431.63474,87.5 		"/>
         <polygon class="st237" points="456.42776,112.29303 387.88474,81.25 381.63474,118.75 456.63474,112.5 		"/>
         <polygon class="st238" points="431.63474,87.5 387.88474,81.25 456.42776,112.29303 		"/>
         <polygon class="st239" points="525.3847,118.75 531.6347,137.5 537.8847,161.53845 537.8847,125 537.92969,124.86511 
             519.1347,112.5 		"/>
         <polygon class="st240" points="537.92969,124.86511 550.3847,87.5 556.6347,75 519.1347,112.5 		"/>
         <polygon class="st241" points="556.6347,75 544.1347,62.5 531.6347,56.25 506.63474,50 500.63474,75 		"/>
         <polygon class="st242" points="500.63474,75 506.63474,50 494.13474,50 481.06876,49.31128 500.38474,75 		"/>
         <polygon class="st243" points="356.63474,300 356.63474,362.5 437.88474,350 		"/>
         <polygon class="st244" points="456.63474,112.5 381.63474,118.75 456.63474,118.75 		"/>
         <polygon class="st245" points="387.88474,256.25 350.38474,287.5 444.13474,268.75 		"/>
         <polygon class="st246" points="350.38474,287.5 356.63474,300 444.13474,268.75 		"/>
         <polygon class="st247" points="444.13474,331.25 444.13474,300 444.13474,281.25 444.13474,268.75 356.63474,300 
             444.13474,343.75 		"/>
         <polygon class="st248" points="444.13474,343.75 356.63474,300 437.88474,350 		"/>
         <polygon class="st249" points="350.63474,262.5 387.88474,256.25 356.63474,250 350.38474,262.5 350.38474,287.5 
             387.88474,256.25 		"/>
         <polygon class="st95" points="444.13474,268.75 450.38474,256.25 456.60971,243.79999 388.13474,256.25 456.60971,243.79999 
             456.63474,243.75 462.88474,218.75 356.63474,250 387.88474,256.25 		"/>
         <polygon class="st250" points="381.63474,118.75 369.13474,162.5 362.88474,200 356.63474,225 387.88474,200 		"/>
         <polygon class="st251" points="456.63474,118.75 381.63474,118.75 387.88474,200 		"/>
         <polygon class="st252" points="387.88474,200 356.63474,225 356.63474,250 462.88474,218.75 		"/>
         <polygon class="st253" points="856.6347,962.5 862.8847,937.5 869.1347,912.5 875.3847,887.5 800.3847,906.25 		"/>
         <polygon class="st254" points="287.88474,662.5 288.13474,662.5 288.02219,662.09814 		"/>
         <polygon class="st255" points="556.6347,631.25 544.1347,606.25 531.6347,575 519.1347,587.5 		"/>
         
         <polygon class="st257" points="356.63474,512.5 369.13474,425 288.09012,661.8996 288.13474,662.5 331.63474,581.25 		"/>
         <polygon class="st254" points="287.978,661.94031 287.88474,662.5 288.02219,662.09814 		"/>
         <polygon class="st258" points="650.3847,600 531.6347,575 600.3847,625 		"/>
         <polygon class="st259" points="544.1347,500 531.6347,575 650.3847,600 		"/>
         <polygon class="st260" points="437.88474,600 494.38474,518.75 419.13474,600 		"/>
         <polygon class="st261" points="556.6347,631.25 600.3847,625 531.6347,575 544.1347,606.25 		"/>
         <polygon class="st254" points="288.02219,662.09814 288.13474,662.5 288.09012,661.8996 		"/>
         <polygon class="st262" points="469.13474,818.75 481.63474,850 494.13474,875 500.38474,887.5 525.3847,775 		"/>
         <polygon class="st263" points="444.55905,743.57526 444.13474,743.75 444.38474,743.75 		"/>
         <polygon class="st264" points="475.38474,618.75 431.90598,643.59497 431.88474,643.75 444.13474,743.75 519.1347,587.5 		"/>
         <polygon class="st263" points="556.6347,631.25 519.1347,587.5 444.13474,743.75 444.55905,743.57526 		"/>
         <polygon class="st265" points="444.38474,743.75 469.13474,818.75 525.3847,775 		"/>
         <polygon class="st266" points="444.13474,743.75 450.38474,768.75 469.13474,818.75 444.38474,743.75 		"/>
         <polygon class="st267" points="375.38474,650 381.63474,650 400.38474,650 419.13474,600 		"/>
         <polygon class="st268" points="494.38474,518.75 481.63474,525 469.13474,531.25 444.13474,556.25 412.88474,581.25 
             394.13474,606.25 381.63474,631.25 375.38474,650 419.13474,600 		"/>
         <polygon class="st269" points="419.13474,600 400.38474,650 437.88474,600 		"/>
         <polygon class="st90" points="431.90598,643.59497 431.63474,643.75 400.38474,650 400.38474,656.25 412.88474,687.5 
             431.63474,718.75 444.13474,743.75 431.88474,643.75 		"/>
         <polygon class="st270" points="431.90598,643.59497 437.88474,600 400.38474,650 431.63474,643.75 		"/>
         <polygon class="st271" points="531.6347,575 494.38474,518.75 437.88474,600 		"/>
         <polygon class="st272" points="381.63474,481.25 437.88474,525 412.88474,443.75 		"/>
         <polygon class="st273" points="481.63474,487.5 494.13474,462.5 462.88474,462.5 		"/>
         <polygon class="st274" points="456.63474,512.5 469.13474,506.25 475.38474,500 475.43436,499.90082 450.38474,487.5 		"/>
         <polygon class="st275" points="431.63474,456.25 412.88474,443.75 450.38474,487.5 481.63474,487.5 456.63474,475 		"/>
         <polygon class="st276" points="475.43436,499.90082 481.63474,487.5 450.38474,487.5 		"/>
         <polygon class="st277" points="412.88474,443.75 437.88474,525 450.38474,518.75 456.63474,512.5 450.38474,487.5 		"/>
         <polygon class="st254" points="288.13474,662.5 306.63474,656.25 319.13474,650 337.88474,637.5 331.63474,581.25 		"/>
         
         <polygon class="st279" points="400.38474,531.25 437.83511,525.04962 437.88474,525 381.63474,481.25 		"/>
         <polygon class="st280" points="363.43039,599.45435 375.38474,587.5 387.88474,575 400.38474,562.5 419.13474,543.75 
             425.38474,537.5 431.63474,531.25 437.83511,525.04962 400.38474,531.25 		"/>
 
 
      
 
 
 
         <polygon class="st94" points="381.63474,481.25 362.90622,599.86395 362.978,599.90674 363.43039,599.45435 400.38474,531.25 		
             "/>
         <polygon class="st281" points="331.63474,581.25 337.88474,637.5 350.38474,618.75 362.88474,600 362.87363,599.8446 		"/>
         <polygon class="st282" points="575.3847,425 544.1347,500 619.1347,481.25 		"/>
         <polygon class="st283" points="687.8847,555.97827 619.1347,481.25 544.1347,500 687.8847,556.25 		"/>
         <polygon class="st284" points="562.8847,431.25 544.1347,500 575.3847,425 		"/>
         <polygon class="st285" points="481.63474,450 475.53354,443.8988 462.88474,462.5 494.13474,462.5 487.88474,456.25 		"/>
         <polygon class="st284" points="531.6347,462.5 544.1347,500 562.8847,431.25 		"/>
         <polygon class="st286" points="481.52878,437.35876 450.38474,425 438.13474,418.75 450.38474,425 444.13474,381.25 
             387.88474,393.75 400.38474,400 412.88474,406.25 425.38474,412.5 437.88474,418.75 444.13474,425 456.63474,431.25 
             462.88474,437.5 475.38474,443.75 475.53354,443.8988 475.63474,443.75 475.53354,443.8988 481.63474,450 487.88474,456.25 
             494.13474,462.5 481.63474,437.5 		"/>
         <polygon class="st287" points="481.88474,437.5 481.52878,437.35876 481.63474,437.5 494.13474,462.5 562.8847,431.25 		"/>
         <polygon class="st288" points="494.13474,462.5 531.6347,462.5 562.8847,431.25 		"/>
         <polygon class="st289" points="762.97089,837.71552 762.8847,837.5 712.8847,862.5 744.1347,862.5 		"/>
         <polygon class="st290" points="412.88474,443.75 381.63474,431.25 369.13474,425 381.63474,481.25 		"/>
         <polygon class="st291" points="362.88474,406.25 381.63474,412.5 412.88474,431.25 462.88474,462.5 444.13474,425 
             363.13474,406.25 444.13474,425 437.88474,418.75 425.38474,412.5 412.88474,406.25 400.38474,400 387.88474,393.75 
             362.88486,405.32404 306.88474,431.25 369.13474,425 		"/>
         <polygon class="st292" points="306.88474,431.25 312.88474,462.5 369.13474,425 		"/>
         <polygon class="st293" points="475.53354,443.8988 475.38474,443.75 462.88474,437.5 456.63474,431.25 462.88474,462.5 		"/>
         <polygon class="st294" points="731.6347,787.5 725.3847,818.75 712.8847,862.5 762.8847,837.5 		"/>
         <polygon class="st295" points="456.63474,431.25 444.13474,425 462.88474,462.5 		"/>
         <polygon class="st296" points="744.1347,975 750.3847,1000 800.3847,906.25 737.8847,950 		"/>
         <polygon class="st297" points="737.8847,725 725.3847,706.25 731.6347,731.25 731.6347,787.5 750.3847,756.25 		"/>
         <polygon class="st298" points="756.6347,812.5 750.3847,775 750.3847,756.25 731.6347,787.5 762.8847,837.5 		"/>
         <polygon class="st299" points="331.63474,581.25 362.87363,599.8446 356.63474,512.5 		"/>
         <polygon class="st300" points="719.1347,893.75 725.3847,912.5 737.8847,950 800.3847,906.25 719.1347,881.25 		"/>
         
         <polygon class="st302" points="856.6347,793.75 837.8847,775 819.1347,762.5 800.3847,756.25 868.8371,812.05359 		"/>
         <polygon class="st303" points="362.88474,600 362.978,599.90674 362.90622,599.86395 		"/>
         <polygon class="st304" points="762.8847,762.5 762.8847,781.25 762.8847,818.75 800.3847,756.25 		"/>
         <polygon class="st305" points="869.1347,812.86768 869.1347,812.5 868.8371,812.05359 800.3847,756.25 856.6347,831.25 		"/>
         <polygon class="st306" points="781.6347,743.75 744.1347,725 750.3847,731.25 756.6347,750 762.8847,762.5 800.3847,756.25 		"/>
         <polygon class="st307" points="712.8847,862.5 719.1347,881.25 744.1347,862.5 		"/>
         <polygon class="st308" points="719.1347,881.25 800.3847,906.25 744.1347,862.5 		"/>
         <polygon class="st309" points="775.3847,868.75 762.97089,837.71552 744.1347,862.5 800.3847,906.25 787.8847,887.5 		"/>
         <polygon class="st310" points="644.1347,881.25 556.6347,956.25 706.6347,881.25 		"/>
         <polygon class="st311" points="538.1347,837.5 562.8847,906.25 600.3847,806.25 569.1347,825 537.8847,837.5 500.38474,893.75 
             550.3847,950 		"/>
         <polygon class="st312" points="369.13474,425 312.88474,462.5 306.63474,550 331.63474,493.75 		"/>
         <polygon class="st313" points="550.3847,950 556.6347,925 562.8847,906.25 538.1347,837.5 		"/>
         <polygon class="st314" points="500.38474,893.75 475.38474,943.75 550.3847,950 		"/>
         <polygon class="st315" points="288.09012,661.8996 288.05765,661.46246 287.978,661.94031 288.02219,662.09814 		"/>
         <polygon class="st316" points="637.8847,768.75 656.6347,725 637.8847,750 600.3847,806.25 631.6347,800 		"/>
         <polygon class="st317" points="475.38474,943.75 400.38474,962.5 425.38474,981.25 444.13474,993.75 475.38474,1006.25 
             494.13474,1018.75 525.3847,1037.5 550.3847,950 		"/>
         <polygon class="st318" points="575.3847,887.5 612.8847,837.5 631.6347,800 562.8847,906.25 		"/>
         <polygon class="st319" points="369.13474,425 331.63474,493.75 306.63474,550 288.05765,661.46246 288.09012,661.8996 		"/>
         <polygon class="st320" points="731.6347,956.25 712.8847,900 706.6347,881.25 556.6347,956.25 750.3847,1018.75 744.1347,1006.25 
                     "/>
         <polygon class="st321" points="569.3847,912.5 644.1347,881.25 706.6347,881.25 662.8847,731.25 644.1347,787.5 619.1347,837.5 
             594.1347,875 569.1347,912.5 556.6347,956.25 644.1347,881.25 		"/>
         <polygon class="st322" points="706.6347,868.75 706.6347,856.25 707.5686,852.51434 713.1347,681.25 712.8847,681.25 
             687.8847,700 662.8847,731.25 706.6347,881.25 		"/>
         <polygon class="st323" points="525.3847,775 500.38474,887.5 500.38474,893.75 537.8847,837.5 		"/>
         <polygon class="st324" points="712.8847,831.25 719.1347,793.75 719.1347,756.25 719.1347,712.5 719.1347,681.25 713.1347,681.25 
             707.5686,852.51434 		"/>
         <polygon class="st110" points="550.3847,950 525.3847,1037.5 625.3847,1118.75 556.6347,956.25 		"/>
         <polygon class="st325" points="381.63474,481.25 369.13474,425 356.63474,512.5 		"/>
         <polygon class="st326" points="625.3847,1118.75 750.3847,1018.75 556.6347,956.25 		"/>
         <polygon class="st327" points="362.87363,599.8446 362.90622,599.86395 381.63474,481.25 356.63474,512.5 		"/>
         
         <polygon class="st329" points="706.6347,868.75 706.6347,881.25 707.5686,852.51434 706.6347,856.25 		"/>
         
         <polygon class="st330" points="869.1347,812.86768 869.3847,812.5 868.8371,812.05359 869.1347,812.5 		"/>
         <polygon class="st331" points="412.88474,431.25 381.63474,412.5 362.88474,406.25 369.13474,425 381.63474,431.25 
             412.88474,443.75 431.63474,456.25 456.63474,475 481.63474,487.5 462.88474,462.5 		"/>
         <polygon class="st332" points="800.3847,437.5 806.6347,437.5 812.8847,437.5 812.8847,431.25 812.8847,418.75 806.6347,406.25 
             805.0722,404.6875 794.1347,400 787.8847,406.25 794.1347,425 		"/>
         <polygon class="st333" points="802.16028,401.77557 794.1347,400 805.0722,404.6875 		"/>
         <polygon class="st334" points="800.3847,400 794.1347,400 802.16028,401.77557 		"/>
         <polygon class="st335" points="312.88474,462.5 287.88474,462.5 306.63474,550 		"/>
         <polygon class="st336" points="455.27658,36.68958 387.88474,81.25 419.13474,68.75 		"/>
         <polygon class="st337" points="500.38474,75 481.06876,49.31128 469.13474,112.5 		"/>
         <polygon class="st338" points="500.38474,75 519.1347,112.5 556.6347,75 500.63474,75 		"/>
         <polygon class="st339" points="581.6347,287.5 606.6347,331.25 625.3847,225 		"/>
         <polygon class="st340" points="738.1347,500 737.8847,500 738.17273,500.05762 		"/>
         <polygon class="st341" points="725.3847,518.75 750.3847,543.75 737.8847,500 		"/>
         <polygon class="st342" points="731.6347,531.25 737.8847,537.5 750.3847,543.75 725.3847,518.75 		"/>
         <polygon class="st343" points="762.8847,537.5 769.1347,506.25 738.17273,500.05762 		"/>
         <polygon class="st344" points="737.8847,500 750.3847,543.75 762.8847,537.5 738.17273,500.05762 		"/>
         <polygon class="st345" points="775.3847,518.75 769.1347,506.25 762.8847,537.5 		"/>
         <polygon class="st340" points="738.1347,500 738.17273,500.05762 769.1347,506.25 756.6347,500 		"/>
         <polygon class="st346" points="687.8847,556.25 544.1347,500 650.3847,600 		"/>
         <polygon class="st348" points="556.87585,631.34375 556.6347,631.25 556.85364,631.57843 		"/>
         <polygon class="st349" points="556.87585,631.34375 556.85364,631.57843 631.6347,743.75 669.1347,675 		"/>
         <polygon class="st350" points="631.6347,800 600.3847,806.25 562.8847,906.25 		"/>
         <polygon class="st351" points="319.45572,787.53564 319.38474,787.5 319.45572,787.53564 375.38474,793.75 319.13474,743.75 
             319.13474,787.5 		"/>
         <polygon class="st352" points="800.3847,756.25 762.8847,818.75 856.6347,831.25 		"/>
         <polygon class="st353" points="750.3847,1000 856.6347,962.5 800.3847,906.25 		"/>
 
         <polygon class="st328" points="325.38474,818.75 331.63474,818.75 362.88474,825 375.38474,831.25 400.38474,862.5 
             425.38474,893.75 456.63474,931.25 475.38474,943.75 462.88474,931.25 456.63474,918.75 444.13474,906.25 425.38474,881.25 
             406.63474,856.25 387.88474,831.25 381.63474,825 369.13474,812.5 350.38474,812.5 331.63474,806.25 319.13474,787.5 
             312.88474,800 319.13474,806.25 		"/>
 
         <polygon class="st328" points="869.1347,800 856.6347,775 825.3847,756.25 775.3847,731.25 737.8847,706.25 725.3847,693.75 
             725.3847,662.5 725.3847,631.25 719.1347,593.75 706.6347,587.5 712.8847,668.75 712.82629,668.79382 713.1347,668.75 
             712.82629,668.79382 687.8847,687.5 662.8847,712.5 631.6347,743.75 631.5813,743.83905 631.8847,743.75 631.5813,743.83905 
             594.1347,806.25 562.8847,825 537.8847,837.5 569.1347,825 600.3847,806.25 637.8847,750 656.6347,725 637.8847,768.75 
             631.6347,800 612.8847,837.5 575.3847,887.5 562.8847,906.25 556.6347,925 550.3847,950 556.6347,956.25 569.1347,912.5 
             594.1347,875 619.1347,837.5 644.1347,787.5 662.8847,731.25 687.8847,700 712.8847,681.25 713.1347,681.25 719.1347,681.25 
             719.1347,712.5 719.1347,756.25 719.1347,793.75 712.8847,831.25 707.5686,852.51434 706.6347,881.25 712.8847,900 
             731.6347,956.25 744.1347,1006.25 750.3847,1018.75 750.3847,1000 744.1347,975 737.8847,950 725.3847,912.5 719.1347,893.75 
             719.1347,881.25 712.8847,862.5 725.3847,818.75 731.6347,787.5 731.6347,731.25 725.3847,706.25 737.8847,725 750.3847,756.25 
             750.3847,775 756.6347,812.5 762.8847,837.5 762.97089,837.71552 763.1347,837.5 762.97089,837.71552 775.3847,868.75 
             787.8847,887.5 800.3847,906.25 787.8847,881.25 775.3847,856.25 762.8847,818.75 762.8847,781.25 762.8847,762.5 756.6347,750 
             750.3847,731.25 744.1347,725 781.6347,743.75 800.3847,756.25 819.1347,762.5 837.8847,775 856.6347,793.75 868.8371,812.05359 
             869.3847,812.5 869.1347,812.86768 869.1347,825 881.6347,843.75 875.3847,818.75 		"/>
 
 <polygon class="st1" points="700.42859,268.92566 700.6347,268.75 700.22144,268.52142 700.3847,268.75 		"/>
         <polygon class="st2" points="850.6347,412.5 850.18628,412.40082 850.3847,412.5 		"/>
         <polygon class="st3" points="544.15704,187.38837 544.09979,187.36035 544.1347,187.5 		"/>
         <polygon class="st4" points="700.52826,269.3241 700.6347,268.75 700.42859,268.92566 		"/>
         <polygon class="st5" points="544.09979,187.36035 544.15704,187.38837 544.35211,186.41302 537.8847,161.53845 537.8847,162.5 		
             "/>
         <polygon class="st6" points="494.32706,331.15387 494.23471,331 494.13474,331.25 		"/>
         <polygon class="st7" points="619.1347,481.25 687.8847,393.75 575.3847,425 		"/>
         <polygon class="st8" points="456.80618,243.76428 456.88455,243.77081 456.88474,243.75 		"/>
         <polygon class="st9" points="706.6347,425 687.8847,393.75 619.1347,481.25 		"/>
         <polygon class="st10" points="619.1347,481.25 687.8847,555.97827 687.8847,518.75 		"/>
         <polygon class="st11" points="800.3847,437.5 794.1347,425 787.8847,406.25 781.6347,462.5 		"/>
         <polygon class="st12" points="812.8847,418.75 837.8847,418.75 805.0722,404.6875 806.6347,406.25 		"/>
         <polygon class="st13" points="787.8847,406.25 687.8847,393.75 750.3847,425 		"/>
         <polygon class="st14" points="781.6347,462.5 787.8847,406.25 750.3847,425 		"/>
         <polygon class="st15" points="706.8847,425 750.3847,425 687.8847,393.75 706.6347,425 		"/>
         <polygon class="st16" points="494.19528,375.08075 494.32669,375.25598 494.38474,375 		"/>
         <polygon class="st17" points="494.13474,374.29169 494.13474,331.25 494.23471,331 456.88474,268.75 		"/>
         <polygon class="st18" points="494.13474,375 494.13474,374.29169 456.88474,268.75 456.63474,268.75 450.38474,312.5 
             450.38474,393.75 494.19528,375.08075 		"/>
         <polygon class="st6" points="494.23471,331 506.63474,300 531.6347,250 456.88455,243.77081 456.63474,268.75 456.88474,268.75 		
             "/>
         <polygon class="st19" points="450.38474,393.75 444.13474,381.25 450.38474,425 450.38474,412.5 		"/>
         <polygon class="st20" points="481.63474,431.25 512.8847,400 494.32669,375.25598 		"/>
         <polygon class="st19" points="450.38474,393.75 450.38474,412.5 450.38474,425 481.52878,437.35876 462.88474,412.5 		"/>
         <polygon class="st21" points="494.38474,375 544.1347,387.5 494.13474,331.25 494.13474,374.29169 		"/>
         <polygon class="st22" points="812.8847,431.25 812.8847,437.5 837.80249,418.9967 837.8847,418.75 812.8847,418.75 		"/>
         <polygon class="st23" points="494.13474,374.29169 494.13474,375 494.19528,375.08075 494.38474,375 		"/>
         <polygon class="st23" points="494.32669,375.25598 512.8847,400 544.1347,387.5 494.38474,375 		"/>
       <polygon class="st74" points="594.1347,400 587.8847,412.5 600.3847,400 		"/>
       
       
 
 <polygon class="st32" points="750.3847,625 762.8847,650 775.3847,637.5 762.8847,631.25 		"/>
       <polygon class="st33" points="787.8847,706.25 775.3847,637.5 762.8847,650 		"/>
       <polygon class="st38" points="831.6347,537.5 831.6347,556.25 831.6347,568.75 831.69659,568.87378 831.8847,568.75 
             837.8847,556.25 831.6347,518.75 		"/>
       <polygon class="st42" points="837.8847,556.25 869.1347,506.25 831.6347,518.75 		"/>
       <polygon class="st44" points="750.3847,625 737.8847,631.25 787.8847,706.25 762.8847,650 		"/>
       <polygon class="st153" points="806.6347,650 775.3847,637.5 787.8847,706.25 		"/>
       <polygon class="st192" points="838.12982,593.50488 844.1347,587.5 837.8847,581.25 		"/>
       <polygon class="st193" points="869.1347,550 831.8847,568.75 831.69659,568.87378 837.8847,581.25 844.1347,587.5 
             869.1347,550.37128 		"/>
       <polygon class="st205" points="837.8847,556.25 831.8847,568.75 869.1347,550 862.8847,537.5 850.3847,543.75 		"/>
       <polygon class="st207" points="837.8847,556.25 850.3847,543.75 862.8847,537.5 869.1347,506.25 		"/>
       <polygon class="st196" points="806.6347,650 812.8847,662.5 837.8847,700 837.90271,700.02887 838.1347,700 838.02118,700.21832 
             869.1347,750 856.6347,718.75 844.1347,693.75 825.3847,662.5 819.1347,650 819.1347,643.75 806.8822,637.62378 		"/>
       
       <!-- top right -->
 
 <polygon class="st256" points="431.90598,643.59497 475.38474,618.75 519.1347,587.5 531.6347,575 437.88474,600 		"/>
     </g>
     
     <path class="st355" d="M363.13474,943.75"/>
     <path class="st355" d="M362.88474,943.75"/>
     <path class="st131" d="M750.3847,462.5L750.3847,462.5L750.3847,462.5z"/>
     <polyline class="st133" points="749.00262,464.39771 749.79279,461.56708 752.13806,463.33813 	"/>
 </g>
 </svg>
 </section>`,
    css: `body {
        height: 100%;
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        
        background-color: #371B1B;
      }
      
      section {
        width: 100%;
        height: 100%; 
      }
      
      
      
      svg {
        position: fixed;
        z-index: 900;
        height: 90%;
        width: 100%;
        left: 0;
        top: 5%;
      }
      
      
      .st0{display:none;}
          .st1{fill:#D16B59;}
          .st2{fill:#7C5565;}
          .st3{fill:#FFA88E;}
          .st4{fill:#AD373E;}
          .st5{fill:#C16A66;}
          .st6{fill:#FF7265;}
          .st7{fill:#FE857F;}
          .st8{fill:#E68C79;}
          .st9{fill:#FFA38F;}
          .st10{fill:#FF6D5B;}
          .st11{fill:#8A3941;}
          .st12{fill:#D46A60;}
          .st13{fill:#FF887D;}
          .st14{fill:#A24D5D;}
          .st15{fill:#F08F78;}
          .st16{fill:#C74D44;}
          .st17{fill:#FF9383;}
          .st18{fill:#FF8973;}
          .st19{fill:transparent;}
          .st20{fill:#FB827C;}
          .st21{fill:#FBAB97;}
          .st22{fill:#BE4349;}
          .st23{fill:#FFAA97;}
          .st24{fill:#8B2C1F;}
          .st25{fill:#962E28;}
          .st26{fill:#952C21;}
          .st27{fill:#97211B;}
          .st28{fill:#590F1a;}
          .st29{fill:#981A11;}
          .st30{fill:#590F1a;}
          .st31{fill:#981D0B;}
          .st32{fill:#CE3F41;}
          .st33{fill:#FE6D68;}
          .st34{fill:#DB574C;}
          .st35{fill:#8D333A;}
          .st36{fill:#AF434D;}
          .st37{fill:#9D3733;}
          .st38{fill:#80262C;}
          .st39{fill:#872B33;}
          .st40{fill:#942C24;}
          .st41{fill:#B9424A;}
          .st42{fill:#AB404C;}
          .st43{fill:#9F3F36;}
          .st44{fill:#FF6B60;}
          .st45{fill:#95343A;}
          .st46{fill:#FF6C69;}
          .st47{fill:#FF545A;}
          .st48{fill:#DD5051;}
          .st49{fill:#FF6666;}
          .st50{fill:#FF5D57;}
          .st51{fill:#FF9781;}
          .st52{fill:#FB806E;}
          .st53{fill:#C85B54;}
          .st54{fill:#C5353E;}
          .st55{fill:#87363D;}
          .st56{fill:#AA3F3F;}
          .st57{fill:#DE645B;}
          .st58{fill:#FF6158;}
          .st59{fill:#C54947;}
          .st60{fill:#9A4546;}
          .st61{fill:#7D3238;}
          .st62{fill:#A0564B;}
          .st63{fill:#9E363D;}
          .st64{fill:#C14A41;}
          .st65{fill:#FA9A84;}
          .st66{fill:#C07160;}
          .st67{fill:#7D3337;}
          .st68{fill:transparent;}
          .st69{fill:#FF7E6E;}
          .st70{fill:#FD6D62;}
          .st71{fill:#79231F;}
          .st72{fill:#E46864;}
          .st73{fill:#AD3F34;}
          .st74{fill:#371B1B;}
          .st75{fill:#C55449;}
          .st76{fill:#FF6B5A;}
          .st77{fill:#D65257;}
          .st78{fill:#FCB6A4;}
          .st79{fill:#EF7A63;}
          .st80{fill:#FF9D93;}
          .st81{fill:#E78366;}
          .st82{fill:#FF796D;}
          .st83{fill:#922B36;}
          .st84{fill:#7F020F;}
          .st85{fill:#84030D;}
          .st86{fill:#8D0C1C;}
          .st87{fill:#A20D13;}
          .st88{fill:#84010D;}
          .st89{fill:#970013;}
          .st90{fill:#951310;}
          .st91{fill:#8A070F;}
          .st92{fill:#9D0005;}
          .st93{fill:#950205;}
          .st94{fill:#8B1C1D;}
          .st95{fill:#F2493B;}
          .st96{fill:#7B0512;}
          .st97{fill:#7B242E;}
          .st98{fill:#D04D55;}
          .st99{fill:#E78973;}
          .st100{fill:#F55B57;}
          .st101{fill:#A30114;}
          .st102{fill:#7F1F20;}
          .st103{fill:#60151D;}
          .st104{fill:#761D1F;}
          .st105{fill:#5E1C1C;}
          .st106{fill:#810C10;}
          .st107{fill:#7B0206;}
          .st108{fill:#790005;}
          .st109{fill:#860003;}
          .st110{fill:#760514;}
          .st111{fill:#6D0305;}
          .st112{fill:#883934;}
          .st113{fill:#7F0007;}
          .st114{fill:#7C5565;}
          .st115{fill:#7C5565;}
          .st116{fill:#931218;}
          .st117{fill:#AC5446;}
          .st118{fill:#8A383A;}
          .st119{fill:#690103;}
          .st120{fill:#8F090C;}
          .st121{fill:#7C5565;}
          .st122{fill:#973130;}
          .st123{fill:#FF8474;}
          .st124{fill:#78020F;}
          .st125{fill:#71060A;}
          .st126{fill:#6B020B;}
          .st127{fill:#7D000E;}
          .st128{fill:#790002;}
          .st129{fill:#FF9685;}
          .st130{fill:#AB4B42;}
          .st131{fill:#863B3C;}
          .st132{fill:#FF8C72;}
          .st133{fill:#A7413C;}
          .st134{fill:#912922;}
          .st135{fill:#8B302A;}
          .st136{fill:#FE574F;}
          .st137{fill:#632229;}
          .st138{fill:#590F1a;}
          .st139{display: none; fill:none;stroke:transparent;stroke-width:2;stroke-miterlimit:10;}
          .st140{fill:#9A2920;}
          .st141{fill:#5C2328;}
          .st142{fill:#AC4A5A;}
          .st143{fill:#783438;}
          .st144{fill:#902A1F;}
          .st145{fill:#9E2E27;}
          .st146{fill:#FF6057;}
          .st147{fill:#A14037;}
          .st148{fill:#E26360;}
          .st149{fill:#FF5953;}
          .st150{fill:#FE5B4E;}
          .st151{fill:#FF826E;}
          .st152{fill:#9B1121;}
          .st153{fill:#CE464A;}
          .st154{fill:#C02935;}
          .st155{fill:#FF8376;}
          .st156{fill:#590F1a;}
          .st157{fill:#AB3A2F;}
          .st158{fill:#CC4E4D;}
          .st159{fill:#C62334;}
          .st160{fill:#9E283C;}
          .st161{fill:#BE0E30;}
          .st162{fill:#B21128;}
          .st163{fill:#C92130;}
          .st164{fill:#A40C19;}
          .st165{fill:#AC1B2D;}
          .st166{fill:#FF464E;}
          .st167{fill:#D1363D;}
          .st168{fill:#C12238;}
          .st169{fill:#B01C2A;}
          .st170{fill:#D53840;}
          .st171{fill:#BA6B5A;}
          .st172{fill:#E8857E;}
          .st173{fill:#703E34;}
          .st174{fill:#B96353;}
          .st175{fill:#B35F59;}
          .st176{fill:#8A4841;}
          .st177{fill:#B44A4E;}
          .st178{fill:#DD6A56;}
          .st179{fill:#FF8778;}
          .st180{fill:#D27264;}
          .st181{fill:#E68271;}
          .st182{fill:#AE3D4C;}
          .st183{fill:#C64048;}
          .st184{fill:#7C5565;}
          .st185{fill:#E85954;}
          .st186{fill:#7C5565;}
          .st187{fill:#F26C5F;}
          .st188{fill:#CF4B4D;}
          .st189{fill:#B1271C;}
          .st190{fill:#962E28;}
          .st191{fill:#96332D;}
          .st192{fill:transparent;}
          .st193{fill:#92353D;}
          .st194{fill:#99000A;}
          .st195{fill:#9C0E10;}
          .st196{fill:#601E26;}
          .st197{fill:#863127;}
          .st198{fill:#A93B46;}
          .st199{fill:#A14B49;}
          .st200{fill:#853435;}
          .st201{fill:#7C5565;}
          .st202{fill:#5D1D22;}
          .st203{fill:#80535C;}
          .st204{fill:#590F1a;}
          .st205{fill:#79292E;}
          .st206{fill:#8B4044;}
          .st207{fill:#742326;}
          .st208{fill:#74252A;}
          .st209{fill:#892523;}
          .st210{fill:#9C1817;}
          .st211{fill:#4B1016;}
          .st212{fill:#D45A4F;}
          .st213{fill:#4D141C;}
          .st214{fill:#7B181C;}
          .st215{fill:#852A20;}
          .st216{fill:#C43538;}
          .st217{fill:#922725;}
          .st218{fill:#890A13;}
          .st219{fill:#E7433E;}
          .st220{fill:#AE3240;}
          .st221{fill:#771A1E;}
          .st222{fill:#8B0210;}
          .st223{fill:#6F090A;}
          .st224{fill:#7E0007;}
          .st225{fill:#680703;}
          .st226{fill:#821113;}
          .st227{fill:transparent;}
          .st228{fill:#700800;}
          .st229{fill:#760708;}
          .st230{fill:#73060B;}
          .st231{fill:#590904;}
          .st232{fill:#7C5565;}
          .st233{fill:#7C5565;}
          .st234{fill:#C74D50;}
          .st235{fill:#6F282A;}
          .st236{fill:#7C5565;}
          .st237{fill:#EB4B49;}
          .st238{fill:#A0303C;}
          .st239{fill:#F65350;}
          .st240{fill:#E15853;}
          .st241{fill:#7C5565;}
          .st242{fill:#6B4957;}
          .st243{fill:#E94945;}
          .st244{fill:#C13E43;}
          .st245{fill:#FA5443;}
          .st246{fill:#D63937;}
          .st247{fill:#FD6D5F;}
          .st248{fill:#D15A49;}
          .st249{fill:#C03937;}
          .st250{fill:#C15050;}
          .st251{fill:#FF8F7F;}
          .st252{fill:#DC4434;}
          .st253{fill:#87000A;}
          .st254{fill:#760D18;}
          .st255{fill:#C62D29;}
          .st256{fill:#F65146;}
          .st257{fill:#84151A;}
          .st258{fill:#FF4B51;}
          .st259{fill:#FF6B5F;}
          .st260{fill:#FF7373;}
          .st261{fill:#DD4145;}
          .st262{fill:#AC162C;}
          .st263{fill:#BC232B;}
          .st264{fill:#B80013;}
          .st265{fill:#8F0A1B;}
          .st266{fill:#B71E2B;}
          .st267{fill:#E75B4D;}
          .st268{fill:#C96459;}
          .st269{fill:#FF7A74;}
          .st270{fill:#EF5E54;}
          .st271{fill:#FF5348;}
          .st272{fill:#921F21;}
          .st273{fill:#8E2329;}
          .st274{fill:#691D24;}
          .st275{fill:#8F1520;}
          .st276{fill:#7E222B;}
          .st277{fill:#871C23;}
          .st278{fill:transparent;}
          .st279{fill:#AB2F37;}
          .st280{fill:#82242E;}
          .st281{fill:#670F1A;}
          .st282{fill:#FE796B;}
          .st283{fill:#FF8273;}
          .st284{fill:#FE7971;}
          .st285{fill:#841E21;}
          .st286{fill:#994A53;}
          .st287{fill:#7E3334;}
          .st288{fill:#B0433D;}
          .st289{fill:#BA5568;}
          .st290{fill:#901411;}
          .st291{fill:#9B1C21;}
          .st292{fill:#C43437;}
          .st293{fill:#942223;}
          .st294{fill:#A22635;}
          .st295{fill:#932729;}
          .st296{fill:#941325;}
          .st297{fill:#C03D49;}
          .st298{fill:#B33D50;}
          .st299{fill:#72101B;}
          .st300{fill:#9C1221;}
          .st301{fill:#371B1B;}
          .st302{fill:#AB1D29;}
          .st303{fill:#541017;}
          .st304{fill:#D73340;}
          .st305{fill:#B71E2E;}
          .st306{fill:#C53943;}
          .st307{fill:#AC2745;}
          .st308{fill:#A63B49;}
          .st309{fill:#BF2B3B;}
          .st310{fill:#B50325;}
          .st311{fill:#93090F;}
          .st312{fill:#AA1E20;}
          .st313{fill:#8D000D;}
          .st314{fill:#7C000A;}
          .st315{fill:#893530;}
          .st316{fill:#87091E;}
          .st317{fill:#77000F;}
          .st318{fill:#A31119;}
          .st319{fill:#7F161C;}
          .st320{fill:#A1122B;}
          .st321{fill:#AA1226;}
          .st322{fill:#FA5055;}
          .st323{fill:#9C1528;}
          .st324{fill:#FE6466;}
          .st325{fill:#860B12;}
          .st326{fill:#810515;}
          .st327{fill:#88211B;}
          .st328{fill:#590F1a;} /*vein*/
          .st329{fill:#951528;}
          .st330{fill:#3A181E;}
          .st331{fill:#932923;}
          .st332{fill:#7C5565;}
          .st333{fill:#9D4640;}
          .st334{fill:#9C4445;}
          .st335{fill:#A3252C;}
          .st336{fill:#7C5565;}
          .st337{fill:#A33238;}
          .st338{fill:#B74145;}
          .st339{fill:#FF9E95;}
          .st340{fill:#8C352D;}
          .st341{fill:#A97155;}
          .st342{fill:#933F35;}
          .st343{fill:#C57464;}
          .st344{fill:#E09E88;}
          .st345{fill:#904430;}
          .st346{fill:#FB6F67;}
          .st347{fill:#FF5049;}
          .st348{fill:#CF2D39;}
          .st349{fill:#BE2D3A;}
          .st350{fill:#A5151D;}
          .st351{fill:#931F15;}
          .st352{fill:#C3323F;}
          .st353{fill:#7C0D1F;}
          .st354{fill:#371B1B;}
          .st355{fill:none;}
      
      
       .low-poly {
        z-index: 200;
        -webkit-transform-origin: center;
                transform-origin: center;
      -webkit-animation: pulse-grow-main 0s ease-in-out 4s infinite alternate;
                animation: pulse-grow-main 0s ease-in-out 4s infinite alternate; /* 0.8*/
        opacity: 1;
       }
      
      
      .low-poly * {
       -webkit-animation: fill-ani 2s ease-in 3s backwards, pulse-grow-main 2.5s ease-out 4s infinite alternate;
               animation: fill-ani 2s ease-in 3s backwards, pulse-grow-main 0s ease-out 0s infinite alternate;
         stroke:transparent;
        stroke-width:1px;
        fill-opacity:1;
        stroke-dasharray: 2000;
        stroke-dashoffset: 0 ;
        transform-origin: 50%;
        
      }
      
      @-webkit-keyframes fill-ani {
        from {
          fill-opacity:0;
          stroke:#931F15;
          stroke-width:1px;
          stroke-dashoffset: 2000;
          }
      }
      
      @keyframes fill-ani {
        from {
          fill-opacity:0;
          stroke:#931F15;
          stroke-width:1px;
          stroke-dashoffset: 2000;
          }
      }
      
      /* TOP RIGHT */
      .st24, .st25, .st26, .st27, .st29, .st31, .st37, .st40, .st43, .st112, .st130, .st133, .st134, .st135, .st140, .st144, .st145, .st147, .st157, .st189, .st190, .st191, .st197, .st340, .st341, .st342, .st343, .st344, .st345 {
         -webkit-transform-origin: center;
                 transform-origin: center;
        
                -webkit-animation: fill-ani 2s ease-in 2.5s backwards, pulse-grow-top .5s ease-in-out 3.5s infinite alternate;
        
                        animation: fill-ani 2s ease-in 2.5s backwards, pulse-grow-top .5s ease-in-out 3.5s infinite alternate;
        display: block;
        
      }
      
      .st190 {
         
        -webkit-animation: fill-ani 2s ease-in 2.5s backwards, pulse-grow-top-192 .5s ease-in-out 3.5s infinite alternate;
         
                animation: fill-ani 2s ease-in 2.5s backwards, pulse-grow-top-192 .5s ease-in-out 3.5s infinite alternate;
      }
      /* TOP RIGHT */
      
      
      /* TOP LEFT */
      .st94, .st102, .st104, .st209, .st215, .st216, .st217, .st221, .st254, .st257, .st272, .st273, .st274, .st275, .st276, .st277, .st279, .st280, .st281, .st285, .st290, .st291, .st292, .st293, .st295, .st299, .st312, .st319, .st325, .st327, .st331, .st335 {
        
        -webkit-transform-origin: center;
                transform-origin: center;
        
                -webkit-animation: fill-ani 2s ease-in 2s backwards, pulse-grow-top .5s ease-in-out 3s infinite alternate;
        
                        animation: fill-ani 2s ease-in 2s backwards, pulse-grow-top .5s ease-in-out 3s infinite alternate;
        display: block;
      }
      /* TOP LEFT */
      
      
      /* BOTTOM */
      .st84, .st85, .st86, .st87, .st88, .st89, .st90, .st91, .st92, .st93, .st96, .st106, .st107, .st108, .st109, .st110, .st111, .st113, .st116, .st119, .st120, .st122, .st124, .st125, .st126, .st127, .st128, .st152, .st154, .st159, .st160, .st161, .st162, .st163, .st164, .st165, .st168, .st169, .st194, .st195, .st210, .st212, .st214, .st218, .st220, .st222, .st223, .st224, .st225, .st226, .st228, .st229, .st230, .st231, .st253, .st262, .st263, .st264, .st265, .st266, .st289, .st294, .st296, .st297, .st298, .st300, .st302, .st304, .st305, .st306, .st307, .st308, .st309, .st310, .st311, .st313, .st314, .st316, .st317, .st318, .st320, .st321, .st322, .st323, .st326, .st329, .st349, .st350, .st351, .st352, .st353 {
         -webkit-transform-origin: center;
                transform-origin: center;
        
                 -webkit-animation: fill-ani 2s ease-in 3s backwards, pulse-grow-bottom .5s ease-in-out 3s infinite alternate;
        
                       animation: fill-ani 2s ease-in 3s backwards, pulse-grow-bottom .5s ease-in-out 3s infinite alternate;
        display: block;
      }
      /* BOTTOM */
      
      
      
      /* Pulse Grow */
      
      
      
      @-webkit-keyframes pulse-grow-main {
        to {
         -webkit-transform: scale(.996);
                 transform: scale(.996);
          
        }
      }
      
      
      
      @keyframes pulse-grow-main {
        to {
        
         -webkit-transform: scale(.996);
                 transform: scale(.996);
          
        }
      }
      
      
      @-webkit-keyframes pulse-grow-top-192 {
        to {
         -webkit-transform: scale(1.04);
                 transform: scale(1.04);
          
        }
      }
      
      @keyframes pulse-grow-top-192 {
        to {
         -webkit-transform: scale(1.04);
                 transform: scale(1.04);
          
        }
      }
      
      
      
      
      @-webkit-keyframes pulse-grow-top {
        to {
                 -webkit-transform: scale(1.09);
                         transform: scale(1.09);
          
        }
      }
      
      
      
      
      @keyframes pulse-grow-top {
        to {
                 -webkit-transform: scale(1.09);
                         transform: scale(1.09);
          
        }
      }
      
      @-webkit-keyframes pulse-grow-bottom {
        to {
                 -webkit-transform: scale(1.09);
                         transform: scale(1.09);
          
        }
      }
      
      @keyframes pulse-grow-bottom {
        to {
                 -webkit-transform: scale(1.09);
                         transform: scale(1.09);
          
        }
      }
      
      
      @-webkit-keyframes opacity {
        from {
          stroke:transparent;
        stroke-width:1px;
        fill-opacity:0;
        stroke-dasharray: 2000;
        stroke-dashoffset: 0 ;
        }
      }
      
      
      @keyframes opacity {
        from {
          stroke:transparent;
        stroke-width:1px;
        fill-opacity:0;
        stroke-dasharray: 2000;
        stroke-dashoffset: 0 ;
        }
      }
      
      .st211 {
         stroke:transparent;
        stroke-width:1px;
        fill-opacity:1;
        stroke-dasharray: 2000;
        stroke-dashoffset: 0 ;
        -webkit-animation: opacity 2s ease-in 3s backwards;
                animation: opacity 2s ease-in 3s backwards;
        
      }
      
      .st328 {
         stroke:transparent;
        stroke-width:1px;
        fill-opacity:1;
        stroke-dasharray: 2000;
        stroke-dashoffset: 0 ;
        -webkit-animation: opacity 2s ease-in 3s backwards;
                animation: opacity 2s ease-in 3s backwards;
      }
      
      .st146, .st167 {
        
        -webkit-transform: scale(1.1);
        
                transform: scale(1.1);
        -webkit-transform-origin: center;
                transform-origin: center;
        -webkit-animation: fill-ani 2s ease-in 3s backwards;
                animation: fill-ani 2s ease-in 3s backwards;
        
      }
      
      .st256 {
        -webkit-transform-origin: center;
                transform-origin: center;
        -webkit-transform: scale(1.1);
                transform: scale(1.1);
        -webkit-animation: fill-ani 2s ease-in 3s backwards;
                animation: fill-ani 2s ease-in 3s backwards;
      }
      
      .st149 {
        -webkit-transform-origin: bottom;
                transform-origin: bottom;
        -webkit-transform: scale(1.3);
                transform: scale(1.3);
        -webkit-animation: fill-ani 2s ease-in 3s backwards;
                animation: fill-ani 2s ease-in 3s backwards;
      }
      
      .st347 {
        -webkit-transform-origin: center;
                transform-origin: center;
        -webkit-transform: scale(1.1);
                transform: scale(1.1);
        -webkit-animation: fill-ani 2s ease-in 3s backwards;
                animation: fill-ani 2s ease-in 3s backwards;
      }`,
    js: ``
}
export const snippetExample_6 = {
    html: `<div class="scene">
	<div class="floor"></div>
	<div class="cube">
		<div class="front"></div>
		<div class="back"></div>
		<div class="left"></div>
		<div class="right"></div>
		<div class="top">
			<div class="ballshadow"></div>
		</div>
		<div class="bottom"></div>
	</div>
	<div class="ball"></div>
    </div>

</div>`,
    css: `*{
        margin: 0;
        padding: 0;
        box-sizing: border-box
        }
        
        :root {
            --boxColor: #0ff7;
            --rotatespeed: 30s;
            --bounceSpeed: 2s
        }
        
        body {
            background-color: #000;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 75px;
            perspective: 10em;
            perspective-origin: 50% calc(50% - 2em);
        }
        
        .scene {
            position: relative;
            transform-style: preserve-3d;
            animation: sceneRotate var(--rotatespeed) infinite linear;
        }
        
        @keyframes sceneRotate {
            to {
                transform: rotateY(360deg);
            }
        }
        
        .ball {
            width: 1em;
            height: 1em;
            border-radius: 50%;
            background: lightblue;
        
            position: absolute;
            left: -.5em;
            bottom: 1em;
            background-image: radial-gradient(circle at top, lightblue, #000);
            animation:
                ballbounch var(--bounceSpeed) infinite ease-out,
                sceneRotate var(--rotatespeed) infinite linear reverse;
        }
        
        @keyframes ballbounch {
        
            0%,
            100% {
                bottom: 0.5em;
            }
        
            50% {
                bottom: 3em;
                animation-timing-function: ease-in;
            }
        }
        
        
        
        .ballshadow {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: radial-gradient(#0007, #0000 50%);
            animation: ballshadow var(--bounceSpeed) infinite ease-in
        }
        
        @keyframes ballshadow {
        
            0%,
            100% {
                transform: scale(1);
                opacity: 1;
            }
        
            50% {
                transform: scale(2);
                opacity: 0.5;
                animation-timing-function: ease-in;
            }
        }
        
        
        
        .cube {
            width: 2em;
            height: 2em;
            transform-style: preserve-3d;
        
            position: absolute;
            bottom: -1em;
            left: -1em;
            animation: cubeheight var(--bounceSpeed) infinite ease-in
        }
        
        @keyframes cubeheight {
        
            0%,
            8%,
            93%,
            100% {
        
                height: 1.5em;
            }
        
            8%,
            93% {
                height: 2em;
            }
        }
        
        
        
        
        
        .left,
        .right,
        .front,
        .back {
            position: absolute;
            width: 100%;
            height: 100%;
            background: var(--boxColor);
            box-shadow: 0 0 0.5em #000a inset;
        
        }
        
        .front {
            transform: translateZ(1em);
        }
        
        .right {
            transform: rotateY(90deg) translateZ(1em);
        }
        
        .back {
            transform: rotateY(180deg) translateZ(1em);
        }
        
        .left {
            transform: rotateY(270deg) translateZ(1em);
        }
        
        .top {
            position: absolute;
            width: 2em;
            height: 2em;
            background: var(--boxColor);
            transform: translateY(-50%) rotateX(90deg);
            box-shadow: 0 0 0.5em #000a inset;
        
        }
        
        .bottom {
            position: absolute;
            width: 2em;
            height: 2em;
            background: var(--boxColor);
            transform: translateY(-50%) rotateX(90deg);
        }
        
        
        
        .floor {
            position: absolute;
            top: 1em;
            transform: translate(-50%, -50%) rotateX(90deg);
            width: 15em;
            height: 15em;
            background-image:
                radial-gradient(#0000, #000 75%),
                repeating-conic-gradient(from 45deg,
                    #111 0deg 90deg,
                    #222 90deg 180deg);
            background-size: 1em 1em;
            background-size: 100%, 1em 1em;
        }`,
    js: ``
}