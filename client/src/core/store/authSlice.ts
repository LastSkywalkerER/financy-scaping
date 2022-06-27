import { createSlice } from '@reduxjs/toolkit'

import { StorageNames } from '@/core/constants'
import { addToStorage, removeFromStorage } from '@/core/utilities/storageManager'

const name = 'auth'

export const userSlice = createSlice({
  name,
  initialState: {
    data: {
      name: 'Test',
      email: '',
      userId: '',
      token: '',
      loading: true,
    },
  },
  reducers: {
    setUserName: (state, { payload }) => {
      state.data.name = payload
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerRequest: (state, { payload }) => {
      state.data.loading = true
    },
    authFail: (state) => {
      state.data.loading = false
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginRequest: (state, { payload }) => {
      state.data.loading = true
    },
    loginResponse: (state, { payload }) => {
      const { token } = payload

      addToStorage(StorageNames.TOKEN, token)

      state.data = { ...state.data, ...payload, loading: false }
    },
    statusRequest: (state) => {
      state.data.loading = true
    },
    logout: (state) => {
      state.data.userId = ''
      state.data.token = ''

      removeFromStorage(StorageNames.TOKEN)
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setUserName,
  registerRequest,
  authFail,
  loginRequest,
  loginResponse,
  statusRequest,
  logout,
} = userSlice.actions

export default userSlice.reducer
