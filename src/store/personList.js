/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'personList',
  initialState: [],
  reducers: {
    ADD_PERSON: (personList, action) => {
      personList.push(action.payload.person)
      personList.sort((a, b) => a.name.localeCompare(b.name))
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
        const remaining = person.paid - person.total
        person.balance = parseFloat(remaining.toFixed(2))
        person.tempBalance = parseFloat(remaining.toFixed(2))
        return person
      })
    },
    SPLIT: (personList) => {
      personList.map(p1 => {
        if (p1.tempBalance > 0) {
          personList.map(p2 => {
            if (p2.name !== p1.name && p2.tempBalance < 0) {
              const temp = p1.tempBalance + p2.tempBalance
              if (temp < 0) {
                if (p1.tempBalance !== 0) {
                  p2.to.push({ amount: Math.abs(p1.tempBalance.toFixed(2)), name: p1.name })
                  p1.from.push({ amount: Math.abs(p1.tempBalance.toFixed(2)), name: p2.name })
                }
                p2.tempBalance = temp
                p1.tempBalance = 0
              } else {
                if (p2.tempBalance !== 0) {
                  p2.to.push({ amount: Math.abs(p2.tempBalance.toFixed(2)), name: p1.name })
                  p1.from.push({ amount: Math.abs(p2.tempBalance.toFixed(2)), name: p2.name })
                }
                p1.tempBalance = temp
                p2.tempBalance = 0
              }
            }
            return p2
          })
        }
        return p1
      })
      return personList
    },
    ADD_PERSON_ITEM: (personList, action) => {
      const { personIdx, item } = action.payload
      personList[personIdx].total += parseFloat(item.price)
      personList[personIdx].items.push(item)
      personList[personIdx].items.sort((a, b) => a.name.localeCompare(b.name))
    },
    REMOVE_PERSON_ITEM: (personList, action) => {
      const { personIdx, itemIdx } = action.payload
      personList[personIdx].total -= personList[personIdx].items[itemIdx].price
      personList[personIdx].items.splice(itemIdx, 1)
      if (personList[personIdx].items.length === 0) personList.splice(personIdx, 1)
    },
    REMOVE_PERSON: (personList, action) => {
      personList.splice(action.payload.personIdx, 1)
    },
    RESET_PERSON_LIST: (personList) => {
      personList = []
      return personList
    },
  },
})

export const {
  ADD_PERSON, APPLY_DEDUCTIONS, PAY_AMOUNTS, RESET_PERSON_LIST, ADD_PERSON_ITEM, REMOVE_PERSON_ITEM, SPLIT, REMOVE_PERSON,
} = slice.actions
export default slice.reducer
