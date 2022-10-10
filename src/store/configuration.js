import { configureStore } from '@reduxjs/toolkit'

import refReducer from 'store/ref'
import personReducer from 'store/person'
import personListReducer from 'store/personList'
import menuReducer from 'store/menu'

export default () => configureStore({
  reducer: {
    menu: menuReducer,
    ref: refReducer,
    person: personReducer,
    personList: personListReducer,
  },
})
