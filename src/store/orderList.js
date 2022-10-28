/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
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
    UPDATE_ORDER_PERSONS: (orderList, action) => {
      const { orderId, persons, all } = action.payload
      const orderIndex = orderList.findIndex(el => el.id === orderId)
      orderList[orderIndex].persons = persons
      orderList[orderIndex].receivers = []
      orderList[orderIndex].settleUp = all
      return orderList
    },
    RESET_ORDER_LIST: (orderList) => {
      orderList = []
      return orderList
    },
  },
})

export const {
  ADD_ORDER_LIST, RESET_ORDER_LIST, UPDATE_ORDER_PERSONS,
} = slice.actions
export default slice.reducer
