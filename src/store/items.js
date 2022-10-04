import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    ADD_ALL_ITEMS: (items, action) => {
      // eslint-disable-next-line no-param-reassign
      items.splice(0, items.length)
      items.push(...action.payload.items)
    },
    ADD_NEW_ITEM: (items, action) => {
      items.push(...action.payload.item)
    },
  },
})

export const { ADD_ALL_ITEMS, ADD_NEW_ITEM } = slice.actions
export default slice.reducer
