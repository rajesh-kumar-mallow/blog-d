import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    currentPost: null,
    isLoading: false,
    error: null,
    filters: {
      mine: false,
      author: null,
      sort: 'created_at',
      order: 'desc'
    }
  },
  reducers: {
    // Fetch posts
    fetchPostsStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchPostsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    fetchPostsFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // Create post
    createPostStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    createPostSuccess: (state, action) => {
      state.isLoading = false
      state.items.unshift(action.payload)
    },
    createPostFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // Update post
    updatePostStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    updatePostSuccess: (state, action) => {
      state.isLoading = false
      const index = state.items.findIndex((post) => post.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    updatePostFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // Delete post
    deletePostStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    deletePostSuccess: (state, action) => {
      state.isLoading = false
      state.items = state.items.filter((post) => post.id !== action.payload)
    },
    deletePostFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // Like post
    likePostStart: (state) => {
      state.error = null
    },
    likePostSuccess: (state, action) => {
      const post = state.items.find((p) => p.id === action.payload.postId)
      if (post) {
        post.likes_count = action.payload.likes_count
        post.is_liked = true
      }
    },
    likePostFailure: (state, action) => {
      state.error = action.payload
    },
    // Unlike post
    unlikePostStart: (state) => {
      state.error = null
    },
    unlikePostSuccess: (state, action) => {
      const post = state.items.find((p) => p.id === action.payload.postId)
      if (post) {
        post.likes_count = action.payload.likes_count
        post.is_liked = false
      }
    },
    unlikePostFailure: (state, action) => {
      state.error = action.payload
    },
    // Other actions
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        mine: false,
        author: null,
        sort: 'created_at',
        order: 'desc'
      }
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
  likePostStart,
  likePostSuccess,
  likePostFailure,
  unlikePostStart,
  unlikePostSuccess,
  unlikePostFailure,
  setFilters,
  clearFilters,
  clearError
} = postsSlice.actions

export default postsSlice.reducer 