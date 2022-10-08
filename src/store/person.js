/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const personInitialState = {
  name: '',
  total: 0,
  paid: 0,
  items: [],
  payable: 0,
  receivable: 0,
}

const slice = createSlice({
  name: 'person',
  initialState: personInitialState,
  reducers: {
    ADD_PERSON_NAME: (person, action) => {
      person.name = action.payload.name
      return person
    },
    ADD_PERSON_ITEM: (person, action) => {
      person.items.push(action.payload.item)
    },
    ADD_PERSON: (person, action) => {
      person.name = action.payload.name
      person.total = action.payload.total
      person.paid = action.payload.paid
      person.items = action.payload.items
      return person
    },
  },
})

export const { ADD_PERSON, ADD_PERSON_NAME, ADD_PERSON_ITEM } = slice.actions
export default slice.reducer
