import { configureStore } from '@reduxjs/toolkit'

import {
  menu, modal, order, orderList,
  person, personList, user,
} from 'store'

export default () => configureStore({
  reducer: {
    menu, modal, order, orderList, person, personList, user,
  },
})
