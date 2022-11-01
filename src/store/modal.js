/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const modalInitialState = {
  showItem: false,
  showPerson: false,
  showOrder: false,
  modalItem: {},
  modalOrder: {},
  modalPerson: { personIdx: 0, items: [] },
}

const slice = createSlice({
  name: 'modal',
  initialState: modalInitialState,
  reducers: {
    HIDE_MODAL: (modal) => {
      modal = modalInitialState
      return modal
    },
    SET_MODAL_ITEM: (modal, action) => {
      modal.modalItem = action.payload.item
      modal.showItem = true
    },
    SET_MODAL_ORDER: (modal, action) => {
      modal.modalOrder = action.payload.order
    },
    SET_MODAL_PERSON: (modal, action) => {
      modal.modalPerson.items = action.payload.items
      modal.modalPerson.personIdx = action.payload.personIdx
      modal.showPerson = true
    },
  },
})

export const {
  HIDE_MODAL, SET_MODAL_ITEM, SET_MODAL_ORDER, SET_MODAL_PERSON,
} = slice.actions
export default slice.reducer
