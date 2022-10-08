import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'ref',
  initialState: null,
  reducers: {
    ADD_ORDER_REF: (ref, action) => {
      // eslint-disable-next-line no-param-reassign
      ref = action.payload.id
      return ref
    },
  },
})

export const { ADD_ORDER_REF } = slice.actions
export default slice.reducer
