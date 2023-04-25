import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    userData: []
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
    },
  }
})

export const { setUserData } = counterSlice.actions

export default counterSlice.reducer