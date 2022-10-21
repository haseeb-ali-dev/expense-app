import React from 'react'
import ReactDOM from 'react-dom/client'

import App from 'App'

import { Provider } from 'react-redux'
import configureStore from 'store/configuration'
import 'index.css'
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min'

const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
