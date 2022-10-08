import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'personList',
  initialState: [],
  reducers: {
    ADD_NEW_PERSON: (personList, action) => {
      personList.push(action.payload.person)
    },
  },
})

export const { ADD_NEW_PERSON } = slice.actions
export default slice.reducer
