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
    },
    ADD_PERSON_ITEM: (person, action) => {
      person.items.push(action.payload.item)
      person.total += action.payload.item.price
    },
    REMOVE_PERSON_ITEM: (person, action) => {
      const { name, price } = action.payload
      const filteredItems = person.items.filter(el => el.name !== name && el.price !== price)
      person.items = filteredItems
      return person
    },
    RESET_PERSON: (person) => {
      person = personInitialState
      return person
    },
  },
})

export const {
  ADD_PERSON_NAME, ADD_PERSON_ITEM, RESET_PERSON, REMOVE_PERSON_ITEM,
} = slice.actions
export default slice.reducer
