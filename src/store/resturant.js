import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'resturant',
  initialState: '',
  reducers: {
    UPDATE_RESTURANT: (resturant, action) => {
      // eslint-disable-next-line no-param-reassign
      resturant = action.payload.name
      return resturant
    },
  },
})

export const { UPDATE_RESTURANT } = slice.actions
export default slice.reducer
