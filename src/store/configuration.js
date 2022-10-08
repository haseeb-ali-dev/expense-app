import { configureStore } from '@reduxjs/toolkit'

import itemsReducer from 'store/items'
import resturantReducer from 'store/resturant'
import refReducer from 'store/ref'
import personItemsReducer from 'store/personItems'
import personReducer from 'store/person'
import personListReducer from 'store/personList'
import menuReducer from 'store/menu'

export default () => configureStore({
  reducer: {
    menu: menuReducer,
    items: itemsReducer,
    resturant: resturantReducer,
    ref: refReducer,
    personItems: personItemsReducer,
    person: personReducer,
    personList: personListReducer,
  },
})
