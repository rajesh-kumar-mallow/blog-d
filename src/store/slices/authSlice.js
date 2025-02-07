import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token'),
    isLoading: false,
    isAuthenticated: !!localStorage.getItem('token')
  },
  reducers: {
    // Login
    loginStart: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    loginFailure: (state) => {
      state.isLoading = false
      state.isAuthenticated = false
    },
    // Signup
    signupStart: (state) => {
      state.isLoading = true
    },
    signupSuccess: (state, action) => {
      state.isLoading = false
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    signupFailure: (state) => {
      state.isLoading = false
      state.isAuthenticated = false
    },
    // Logout
    logoutStart: (state) => {
      state.isLoading = true
    },
    logoutSuccess: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
    },
    logoutFailure: (state) => {
      state.isLoading = false
    }
  }
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions

export default authSlice.reducer 