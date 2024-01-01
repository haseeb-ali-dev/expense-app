import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from 'App'
import configureStore from 'store/configuration'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'index.css'

const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className='fixed-container'>
        <App />
      </div>
    </Provider>
  </React.StrictMode>,
)
