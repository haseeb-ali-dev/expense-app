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
  },
})

export const { ADD_ALL_ITEMS } = slice.actions
export default slice.reducer
