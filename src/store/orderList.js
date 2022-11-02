/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'orderList',
  initialState: [],
  reducers: {
    ADD_ORDER_LIST: (orderList, action) => {
      orderList = action.payload.list
      orderList.sort((a, b) => a.resturant.localeCompare(b.resturant))
      return orderList
    },
    ADD_ORDER: (orderList, action) => {
      orderList.push(action.payload.order)
    },
    UPDATE_ORDER_PERSONS: (orderList, action) => {
      const { orderId, persons, all } = action.payload
      const orderIndex = orderList.findIndex(el => el.id === orderId)
      orderList[orderIndex].persons = persons
      orderList[orderIndex].receivers = []
      orderList[orderIndex].settleUp = all
      return orderList
    },
    REMOVE_ORDER: (orderList, action) => {
      orderList.splice(action.payload.orderIdx, 1)
    },
    RESET_ORDER_LIST: (orderList) => {
      orderList = []
      return orderList
    },
  },
})

export const {
  ADD_ORDER_LIST, RESET_ORDER_LIST, UPDATE_ORDER_PERSONS, REMOVE_ORDER, ADD_ORDER,
} = slice.actions
export default slice.reducer
