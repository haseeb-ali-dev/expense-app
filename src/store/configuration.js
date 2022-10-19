import { configureStore } from '@reduxjs/toolkit'

import refReducer from 'store/ref'
import personReducer from 'store/person'
import personListReducer from 'store/personList'
import menuReducer from 'store/menu'
import orderReducer from 'store/order'

export default () => configureStore({
  reducer: {
    menu: menuReducer,
    ref: refReducer,
    person: personReducer,
    personList: personListReducer,
    order: orderReducer,
  },
})
