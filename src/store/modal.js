/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const modalInitialState = {
  show: false,
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
  },
})

export const { SHOW_MODAL, HIDE_MODAL } = slice.actions
export default slice.reducer
