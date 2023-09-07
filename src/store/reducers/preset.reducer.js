import { snippetExample_1, snippetExample_2, snippetExample_3, snippetExample_4, snippetExample_5, snippetExample_6 } from "../../data/featPresets"

const initialState = {
  presets: [],
  defaultPresets: [
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
    },
    {
      name: 'blobs', id: "testid03",
      html: snippetExample_3.html,
      css: snippetExample_3.css,
      js: snippetExample_3.js
    },
    {
      name: 'invaders', id: "testid04",
      html: snippetExample_4.html,
      css: snippetExample_4.css,
      js: snippetExample_4.js
    },
    {
      name: 'heart-svg', id: "testid05",
      html: snippetExample_5.html,
      css: snippetExample_5.css,
      js: snippetExample_5.js
    },
    {
      name: 'mario-mouse', id: "testid06",
      html: snippetExample_6.html,
      css: snippetExample_6.css,
      js: snippetExample_6.js
    }
  ]
}

const PresetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRESETS':
      return { ...state, presets: action.presets }
    case 'SET_DEFAULT_PRESETS':
      return { ...state, defaultPresets: action.defaultPresets }
    default:
      return state
  }
}

export default PresetReducer
