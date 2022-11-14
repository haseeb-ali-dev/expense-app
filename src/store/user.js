import { createSlice } from '@reduxjs/toolkit'

const userInitialState = {
  isLogged: false,
  name: '',
  avatar: '',
  id: '',
  provider: null,
}

const slice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    SET_GLOBAL_USER: (user, action) => {
      user.isLogged = true
      user.name = action.payload.name
      user.avatar = action.payload.avatar
      user.id = action.payload.id
      user.provider = action.payload.provider ?? null
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
