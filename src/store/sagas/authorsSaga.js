import { call, put, takeLatest } from 'redux-saga/effects'
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

function* fetchAuthors() {
  try {
    const response = yield call(api.get, '/authors')
    if (response.success) {
      yield put(fetchAuthorsSuccess(response.data))
    } else {
      yield put(fetchAuthorsFailure(response.message))
    }
  } catch (error) {
    yield put(fetchAuthorsFailure(error.message || 'Failed to fetch authors'))
  }
}

function* fetchAuthor({ payload: authorId }) {
  try {
    const response = yield call(api.get, `/authors/${authorId}`)
    if (response.success) {
      yield put(fetchAuthorSuccess(response.data))
    } else {
      yield put(fetchAuthorFailure(response.message))
    }
  } catch (error) {
    yield put(fetchAuthorFailure(error.message || 'Failed to fetch author'))
  }
}

function* updateAuthor({ payload: { authorId, authorData } }) {
  try {
    const response = yield call(api.put, `/authors/${authorId}`, authorData)
    if (response.success) {
      yield put(updateAuthorSuccess(response.data))
    } else {
      yield put(updateAuthorFailure(response.message))
    }
  } catch (error) {
    yield put(updateAuthorFailure(error.message || 'Failed to update author'))
  }
}

function* deleteAuthor({ payload: authorId }) {
  try {
    const response = yield call(api.delete, `/authors/${authorId}`)
    if (response.success) {
      yield put(deleteAuthorSuccess(authorId))
    } else {
      yield put(deleteAuthorFailure(response.message))
    }
  } catch (error) {
    yield put(deleteAuthorFailure(error.message || 'Failed to delete author'))
  }
}

export function* authorsSaga() {
  yield takeLatest(fetchAuthorsStart.type, fetchAuthors)
  yield takeLatest(fetchAuthorStart.type, fetchAuthor)
  yield takeLatest(updateAuthorStart.type, updateAuthor)
  yield takeLatest(deleteAuthorStart.type, deleteAuthor)
} 