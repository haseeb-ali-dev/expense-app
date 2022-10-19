/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'personList',
  initialState: [],
  reducers: {
    ADD_PERSON: (personList, action) => {
      personList.push(action.payload.person)
    },
    APPLY_DEDUCTIONS: (personList, action) => {
      const { tip, delivery, tax } = action.payload
      personList.map(person => {
        const taxCalc = person.total * (tax / 100)
        person.total = parseFloat((person.total + taxCalc + tip + delivery).toFixed(2))
        return person
      })
    },
    PAY_AMOUNTS: (personList, action) => {
      const { paidAmounts } = action.payload
      personList.map(person => {
        person.paid = parseFloat(paidAmounts[person.name].toFixed(2))
        const remaining = person.total - person.paid
        if (remaining > 0) {
          person.receivable = 0
          person.payable = Math.abs(remaining)
        }
        if (remaining < 0) {
          person.payable = 0
          person.receivable = Math.abs(remaining)
        }
        if (remaining === 0) {
          person.payable = 0
          person.receivable = 0
        }
        return person
      })
    },
  },
})

export const { ADD_PERSON, APPLY_DEDUCTIONS, PAY_AMOUNTS } = slice.actions
export default slice.reducer
