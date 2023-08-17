const snippetExample_1 = {
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

const snippetExample_2 = {
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



const initialState = {
  presets: [
    {
      name: 'slider-btn', id: "testid01",
      html: snippetExample_1.html,
      css: snippetExample_1.css,
      js: snippetExample_1.js
    },
    {
      name: 'tic-tac-toe', id: "testid02",
      html: snippetExample_2.html,
      css: snippetExample_2.css,
      js: snippetExample_2.js
    }]
}

const PresetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRESETS':
      return { presets: action.presets }
    default:
      return state
  }
}

export default PresetReducer
