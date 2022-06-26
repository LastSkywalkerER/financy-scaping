import { AlertColor } from '@mui/material'
import { createSlice } from '@reduxjs/toolkit'

const name = 'userMessage'

interface UserMessage {
  type: AlertColor
  message: string
}

export const errorSlice = createSlice({
  name,
  initialState: {
    list: [] as UserMessage[],
  },
  reducers: {
    messageOccurred: (state, action) => {
      state.list.push({
        message: action.payload.message,
        type: action.payload.type,
      })
    },
    shiftMessage: (state) => {
      state.list.shift()
    },
  },
})

// Action creators are generated for each case reducer function
export const { messageOccurred, shiftMessage } = errorSlice.actions

export default errorSlice.reducer
