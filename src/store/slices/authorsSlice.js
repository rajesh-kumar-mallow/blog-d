import { createSlice } from '@reduxjs/toolkit'

const authorsSlice = createSlice({
  name: 'authors',
  initialState: {
    items: [],
    currentAuthor: null,
    isLoading: false,
  },
  reducers: {
    // Fetch authors list
    fetchAuthorsStart: (state) => {
      state.isLoading = true
    },
    fetchAuthorsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    fetchAuthorsFailure: (state) => {
      state.isLoading = false
    },
    // Fetch single author
    fetchAuthorStart: (state) => {
      state.isLoading = true
    },
    fetchAuthorSuccess: (state, action) => {
      state.isLoading = false
      state.currentAuthor = action.payload
    },
    fetchAuthorFailure: (state) => {
      state.isLoading = false
    },
    // Update author
    updateAuthorStart: (state) => {
      state.isLoading = true
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
    updateAuthorFailure: (state) => {
      state.isLoading = false
    },
    // Delete author
    deleteAuthorStart: (state) => {
      state.isLoading = true
    },
    deleteAuthorSuccess: (state, action) => {
      state.isLoading = false
      state.items = state.items.filter(author => author.id !== action.payload)
      if (state.currentAuthor?.id === action.payload) {
        state.currentAuthor = null
      }
    },
    deleteAuthorFailure: (state) => {
      state.isLoading = false
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