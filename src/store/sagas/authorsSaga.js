import { call, put, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
import api from '../../api/config'
import {
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
} from '../slices/authorsSlice'
import { fetchPostsSuccess } from '../slices/postsSlice'

function* fetchAuthors() {
  try {
    const response = yield call(api.get, '/users')
    // let res = [
    //   {
    //     "id": 1,
    //     "email": "logesh.mohanasundaram@mallow-tech.com",
    //     "name": "Logesh Mohanasundaram",
    //     "posts_count": 1,
    //     "posts": [
    //       {
    //         "id": 1,
    //         "title": "Test Title1",
    //         "content": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //         "likes_count": 0,
    //         "created_at": "2025-02-04T10:58:13.170Z"
    //       }
    //     ]
    //   }
    // ]
    yield put(fetchAuthorsSuccess(response))
  } catch (error) {
    const errorMsg = error.message || 'Failed to fetch authors'
    yield put(fetchAuthorsFailure(errorMsg))
    message.error(errorMsg)
  }
}

function* fetchAuthor({ payload: authorId }) {
  try {
    const response = yield call(api.get, `/users/${authorId}`)
    // let res = {
    //   "id": 1,
    //   "email": "logesh.mohanasundaram@mallow-tech.com",
    //   "name": "Logesh Mohanasundaram",
    //   "posts_count": 1,
    //   "posts": [
    //     {
    //       "id": 1,
    //       "title": "Test Title1",
    //       "content": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //       "likes_count": 0,
    //       "created_at": "2025-02-04T10:58:13.170Z"
    //     }
    //   ]
    // }
    yield put(fetchAuthorSuccess(response))
    yield put(fetchPostsSuccess(response))
  } catch (error) {
    const errorMsg = error.message || 'Failed to fetch author'
    yield put(fetchAuthorFailure(errorMsg))
    message.error(errorMsg)
  }
}

function* updateAuthor({ payload: { authorId, authorData } }) {
  try {
    const response = yield call(api.put, `/users/${authorId}`, authorData)
    // let res = {
    //   "id": 1,
    //   "email": "logesh.mohanasundaram@mallow-tech.com",
    //   "name": "Logesh Mohanasundaram",
    //   "posts_count": 1,
    //   "posts": [
    //     {
    //       "id": 1,
    //       "title": "Test Title1",
    //       "content": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //       "likes_count": 0,
    //       "created_at": "2025-02-04T10:58:13.170Z"
    //     }
    //   ]
    // }
    yield put(updateAuthorSuccess(response))
    message.success('Profile updated successfully')
  } catch (error) {
    const errorMsg = error.message || 'Failed to update author'
    yield put(updateAuthorFailure(errorMsg))
    message.error(errorMsg)
  }
}

function* deleteAuthor({ payload: authorId }) {
  try {
    yield call(api.delete, `/users/${authorId}`)
    yield put(deleteAuthorSuccess(authorId))
    message.success('Profile deleted successfully')
  } catch (error) {
    const errorMsg = error.message || 'Failed to delete author'
    yield put(deleteAuthorFailure(errorMsg))
    message.error(errorMsg)
  }
}

export function* authorsSaga() {
  yield takeLatest(fetchAuthorsStart.type, fetchAuthors)
  yield takeLatest(fetchAuthorStart.type, fetchAuthor)
  yield takeLatest(updateAuthorStart.type, updateAuthor)
  yield takeLatest(deleteAuthorStart.type, deleteAuthor)
} 