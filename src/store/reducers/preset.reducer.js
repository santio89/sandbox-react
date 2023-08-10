const exampleHtml1 = `<div>hey!</div>
`;
const exampleCss1 = `*{
  margin: 0;
  padding: 0;
  box-sizing: border-box
}

body{
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(20,20,20)
}

div{
  background-color: magenta;
  border-radius: 2em;
  padding: 1rem;
  display: inline-block;
  cursor: pointer;
  transition: translate 400ms ease-in-out, box-shadow 400ms ease-in-out, opacity 400ms ease-in-out, transform 200ms ease-in-out;
  -ms-user-select: none; 
  user-select: none; 
  color: white;
  font-family: helvetica;
  font-weight: 700;
  font-size: 2rem;
  box-shadow: 30px 0px 0 0 pink;
}

div:hover, div:focus-visible{
  translate: 30px 0;
  opacity: 1;
  box-shadow: 0 0 0 pink;
}

div:active{
  transform: scale(.8);
}

.bg-magenta{
  background-color: magenta;
}
`

const exampleJs1 = `var spot = document.querySelector("div");

spot.addEventListener("click", ()=>{
  document.body.classList.toggle("bg-magenta")
})
`

const initialState = {
  presets: [{ name: 'example-1', id: "testid01", html: exampleHtml1, css: exampleCss1, js: exampleJs1 }]
}

const PresetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRESETS':
      return { presets: action.presets }
    default:
      return { ...state }
  }
}

export default PresetReducer
