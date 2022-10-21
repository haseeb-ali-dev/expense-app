/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import { onAuthStateChanged } from 'firebase/auth'

import { auth } from 'Database'

const userInitialState = {}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // const { uid } = user
    return user
  }

  return null
})

const slice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    SET_ISLOGGED: (user) => {
      user.isLogged = true
      return user
    },
    SET_NAME: (user, action) => {
      user.name = action.payload.name
      return user
    },
  },
})

export const { SET_ISLOGGED, SET_NAME } = slice.actions
export default slice.reducer
