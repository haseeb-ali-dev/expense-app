import { configureStore } from '@reduxjs/toolkit'

import {
  ref, personReducer, personListReducer, menuReducer,
  orderReducer, userReducer, modalReducer, orderListReducer,
} from 'store'

export default () => configureStore({
  reducer: {
    menu: menuReducer,
    ref,
    person: personReducer,
    personList: personListReducer,
    order: orderReducer,
    user: userReducer,
    modal: modalReducer,
    orderList: orderListReducer,
  },
})
