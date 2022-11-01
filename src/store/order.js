/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const orderInitialState = {
  resturant: '',
  grand: 0,
  tip: 0,
  tax: 0,
  delivery: 0,
  persons: [],
  users: [],
  settleUp: false,
}

const slice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {
    ADD_DEDUCTION: (order, action) => {
      switch (action.payload.key) {
        case 'tax':
          order.tax = action.payload.value
          break
        case 'tip':
          order.tip = action.payload.value
          break
        case 'delivery':
          order.delivery = action.payload.value
          break
        default:
          break
      }
      return order
    },
    UPDATE_GRAND: (order, action) => {
      order.grand = action.payload.personList.reduce((accumulator, { total }) => accumulator + total, 0)
      return order
    },
    UPDATE_PERSONS: (order, action) => {
      order.persons = [...action.payload.persons]
      order.users = [...action.payload.users]
      return order
    },
    ADD_RESTURANT: (order, action) => {
      order.resturant = action.payload.name
      return order
    },
    RESET_ORDER: (order) => {
      order = orderInitialState
      return order
    },
  },
})

export const {
  ADD_DEDUCTION, UPDATE_GRAND, UPDATE_RECEIVERS, UPDATE_PERSONS, ADD_RESTURANT, RESET_ORDER,
} = slice.actions
export default slice.reducer
