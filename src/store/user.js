import { createSlice } from '@reduxjs/toolkit'

const userInitialState = {
  isLogged: false,
  name: '',
}

const slice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    SET_GLOBAL_USER: (user, action) => {
      user.isLogged = true
      user.name = action.payload.name
      return user
    },
    RESET_USER: (user) => {
      user = userInitialState
      return user
    },
  },
})

export const { SET_GLOBAL_USER, RESET_USER } = slice.actions
export default slice.reducer
