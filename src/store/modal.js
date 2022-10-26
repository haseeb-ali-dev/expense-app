/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const modalInitialState = {
  show: false,
  showList: false,
  modalItem: {},
  modalOrder: {},
  modalItemList: [],
}

const slice = createSlice({
  name: 'modal',
  initialState: modalInitialState,
  reducers: {
    SHOW_MODAL: (modal) => {
      modal.show = true
      return modal
    },
    HIDE_MODAL: (modal) => {
      modal = modalInitialState
      return modal
    },
    SET_MODAL_ITEM: (modal, action) => {
      modal.modalItem = action.payload.item
      return modal
    },
    SET_MODAL_ORDER: (modal, action) => {
      modal.modalOrder = action.payload.order
      return modal
    },
    SET_MODAL_ITEM_LIST: (modal, action) => {
      modal.showList = true
      modal.modalItemList = action.payload.items
      return modal
    },
  },
})

export const {
  SHOW_MODAL, HIDE_MODAL, SET_MODAL_ITEM, SET_MODAL_ORDER, SET_MODAL_PERSON, SET_MODAL_ITEM_LIST,
} = slice.actions
export default slice.reducer
