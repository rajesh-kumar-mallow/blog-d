import { createSlice } from '@reduxjs/toolkit'

const authorsSlice = createSlice({
  name: 'authors',
  initialState: {
    items: [],
    currentAuthor: null,
    isLoading: false,
    error: null
  },
  reducers: {
    // Fetch authors list
    fetchAuthorsStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchAuthorsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    fetchAuthorsFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // Fetch single author
    fetchAuthorStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchAuthorSuccess: (state, action) => {
      state.isLoading = false
      state.currentAuthor = action.payload
    },
    fetchAuthorFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // Update author
    updateAuthorStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    updateAuthorSuccess: (state, action) => {
      state.isLoading = false
      const index = state.items.findIndex(author => author.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
      if (state.currentAuthor?.id === action.payload.id) {
        state.currentAuthor = action.payload
      }
    },
    updateAuthorFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // Delete author
    deleteAuthorStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    deleteAuthorSuccess: (state, action) => {
      state.isLoading = false
      state.items = state.items.filter(author => author.id !== action.payload)
      if (state.currentAuthor?.id === action.payload) {
        state.currentAuthor = null
      }
    },
    deleteAuthorFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const {
  fetchAuthorsStart,
  fetchAuthorsSuccess,
  fetchAuthorsFailure,
  fetchAuthorStart,
  fetchAuthorSuccess,
  fetchAuthorFailure,
  updateAuthorStart,
  updateAuthorSuccess,
  updateAuthorFailure,
  deleteAuthorStart,
  deleteAuthorSuccess,
  deleteAuthorFailure
} = authorsSlice.actions

export default authorsSlice.reducer 