if(module.hot){
  module.hot.accept()
}

import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './src/components/app'
import rootReducer from './src/reducers/rootReducer'

// FONTS: ----------------------------------------------
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import solidIcons from '@fortawesome/fontawesome-free-solid'
import { fab } from '@fortawesome/free-brands-svg-icons'

// ======================================================

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const routes = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

fontawesome.library.add(fab, solidIcons)

hydrate(routes,
  document.getElementById('app')
)//<Provider store={store}><App /></Provider>
//<App game='Quiz' />, document.getElementById('app')
