import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/css/styles.css'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import {store, persistor} from './store/index.redux.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
