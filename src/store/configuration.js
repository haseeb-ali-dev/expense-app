import { configureStore } from '@reduxjs/toolkit'

import itemsReducer from 'store/items'

export default () => configureStore({
  reducer: {
    items: itemsReducer,
  },
})
