import { configureStore } from '@reduxjs/toolkit'

import {
  refReducer, personReducer, personListReducer, menuReducer,
  orderReducer, userReducer, modalReducer, orderListReducer,
} from 'store'

export default () => configureStore({
  reducer: {
    menu: menuReducer,
    ref: refReducer,
    person: personReducer,
    personList: personListReducer,
    order: orderReducer,
    user: userReducer,
    modal: modalReducer,
    orderList: orderListReducer,
  },
})
