import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token')
  },
  reducers: {
    // Login
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // Signup
    signupStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    signupSuccess: (state, action) => {
      state.isLoading = false
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    signupFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
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
    logoutFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // Get Current User
    getCurrentUserStart: (state) => {
      state.isLoading = true
    },
    getCurrentUserSuccess: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    getCurrentUserFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
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
  getCurrentUserStart,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  clearError
} = authSlice.actions

export default authSlice.reducer 