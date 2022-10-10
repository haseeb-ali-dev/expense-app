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
    ADD_PERSON_TOTAL: (person, action) => {
      person.total = action.payload.total
      return person
    },
    RESET_PERSON: (person) => {
      person = personInitialState
      return person
    },
  },
})

export const {
  ADD_PERSON_TOTAL, ADD_PERSON_NAME, ADD_PERSON_ITEM, RESET_PERSON,
} = slice.actions
export default slice.reducer
