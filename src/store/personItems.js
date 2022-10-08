import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'personItems',
  initialState: [],
  reducers: {
    ADD_PERSON_ITEM: (personItems, action) => {
      personItems.push(action.payload.item)
    },
  },
})

export const { ADD_PERSON_ITEM } = slice.actions
export default slice.reducer
