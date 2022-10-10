import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'personList',
  initialState: [],
  reducers: {
    ADD_PERSON: (personList, action) => {
      personList.push(action.payload.person)
    },
  },
})

export const { ADD_PERSON } = slice.actions
export default slice.reducer
