/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const personInitialState = {
  name: '',
  total: 0,
  paid: 0,
  items: [],
  balance: 0,
  tempBalance: 0,
  to: [],
  from: [],
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
    REMOVE_PERSON_ITEM: (person, action) => {
      const { name, price } = action.payload
      const filteredItems = person.items.filter(el => el.name !== name && el.price !== price)
      person.items = filteredItems
      return person
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
  ADD_PERSON_TOTAL, ADD_PERSON_NAME, ADD_PERSON_ITEM, RESET_PERSON, REMOVE_PERSON_ITEM,
} = slice.actions
export default slice.reducer
