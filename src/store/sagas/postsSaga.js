import { call, put, takeLatest } from 'redux-saga/effects'
import api from '../../api/config'
import { 
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
  unlikePostFailure
} from '../slices/postsSlice'

function* fetchPosts({ payload: filters }) {
  try {
    const response = yield call(api.get, '/posts', { params: filters })
    if (response.success) {
      yield put(fetchPostsSuccess(response.data))
    } else {
      yield put(fetchPostsFailure(response.message))
    }
  } catch (error) {
    yield put(fetchPostsFailure(error.message || 'Failed to fetch posts'))
  }
}

function* createPost({ payload: postData }) {
  try {
    const response = yield call(api.post, '/posts', postData)
    if (response.success) {
      yield put(createPostSuccess(response.data))
    } else {
      yield put(createPostFailure(response.message))
    }
  } catch (error) {
    yield put(createPostFailure(error.message || 'Failed to create post'))
  }
}

function* updatePost({ payload: { postId, postData } }) {
  try {
    const response = yield call(api.put, `/posts/${postId}`, postData)
    if (response.success) {
      yield put(updatePostSuccess(response.data))
    } else {
      yield put(updatePostFailure(response.message))
    }
  } catch (error) {
    yield put(updatePostFailure(error.message || 'Failed to update post'))
  }
}

function* deletePost({ payload: postId }) {
  try {
    const response = yield call(api.delete, `/posts/${postId}`)
    if (response.success) {
      yield put(deletePostSuccess(postId))
    } else {
      yield put(deletePostFailure(response.message))
    }
  } catch (error) {
    yield put(deletePostFailure(error.message || 'Failed to delete post'))
  }
}

function* likePost({ payload: postId }) {
  try {
    const response = yield call(api.post, `/posts/${postId}/like`)
    if (response.success) {
      yield put(likePostSuccess({ postId, ...response.data }))
    } else {
      yield put(likePostFailure(response.message))
    }
  } catch (error) {
    yield put(likePostFailure(error.message || 'Failed to like post'))
  }
}

function* unlikePost({ payload: postId }) {
  try {
    const response = yield call(api.delete, `/posts/${postId}/like`)
    if (response.success) {
      yield put(unlikePostSuccess({ postId, ...response.data }))
    } else {
      yield put(unlikePostFailure(response.message))
    }
  } catch (error) {
    yield put(unlikePostFailure(error.message || 'Failed to unlike post'))
  }
}

export function* postsSaga() {
  yield takeLatest(fetchPostsStart.type, fetchPosts)
  yield takeLatest(createPostStart.type, createPost)
  yield takeLatest(updatePostStart.type, updatePost)
  yield takeLatest(deletePostStart.type, deletePost)
  yield takeLatest(likePostStart.type, likePost)
  yield takeLatest(unlikePostStart.type, unlikePost)
} 