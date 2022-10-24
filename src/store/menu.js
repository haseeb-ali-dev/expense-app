/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const menuInitialState = {
  resturant: '',
  items: [],
  ableToSave: false,
}

const slice = createSlice({
  name: 'menu',
  initialState: menuInitialState,
  reducers: {
    ADD_RESTURANT: (menu, action) => {
      menu.resturant = action.payload.name
      return menu
    },
    ADD_ITEM: (menu, action) => {
      menu.items.push(action.payload.item)
    },
    REMOVE_ITEM: (menu, action) => {
      const { name, price } = action.payload
      const filteredItems = menu.items.filter(el => el.name !== name && el.price !== price)
      menu.items = filteredItems
      return menu
    },
    UPDATE_ABLE_TO_SAVE: (menu) => {
      menu.ableToSave = true
      return menu
    },
  },
})

export const {
  ADD_RESTURANT, ADD_ITEM, REMOVE_ITEM, UPDATE_ABLE_TO_SAVE,
} = slice.actions
export default slice.reducer
