/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const menuInitialState = {
  resturant: '',
  items: [],

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
  },
})

export const { ADD_RESTURANT, ADD_ITEM } = slice.actions
export default slice.reducer
