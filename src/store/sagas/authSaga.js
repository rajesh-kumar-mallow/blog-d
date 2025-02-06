import { call, put, takeLatest } from 'redux-saga/effects'
import api from '../../api/config'
import {
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
  getCurrentUserFailure
} from '../slices/authSlice'

function* login({ payload: credentials }) {
  try {
    const response = yield call(api.post, '/auth/login', credentials)
    if (response.success) {
      localStorage.setItem('token', response.data.token)
      yield put(loginSuccess(response.data))
      yield put(getCurrentUserStart())
    } else {
      yield put(loginFailure(response.message))
    }
  } catch (error) {
    yield put(loginFailure(error.message || 'Login failed'))
  }
}

function* signup({ payload: userData }) {
  try {
    const response = yield call(api.post, '/auth/register', userData)
    if (response.success) {
      localStorage.setItem('token', response.data.token)
      yield put(signupSuccess(response.data))
      yield put(getCurrentUserStart())
    } else {
      yield put(signupFailure(response.message))
    }
  } catch (error) {
    yield put(signupFailure(error.message || 'Registration failed'))
  }
}

function* logout() {
  try {
    const response = yield call(api.post, '/auth/logout')
    if (response.success) {
      localStorage.removeItem('token')
      yield put(logoutSuccess())
    } else {
      yield put(logoutFailure(response.message))
    }
  } catch (error) {
    yield put(logoutFailure(error.message || 'Logout failed'))
  }
}

function* getCurrentUser() {
  try {
    const response = yield call(api.get, '/auth/me')
    if (response.success) {
      yield put(getCurrentUserSuccess(response.data))
    } else {
      yield put(getCurrentUserFailure(response.message))
    }
  } catch (error) {
    yield put(getCurrentUserFailure(error.message || 'Failed to get user data'))
  }
}

export function* authSaga() {
  yield takeLatest(loginStart.type, login)
  yield takeLatest(signupStart.type, signup)
  yield takeLatest(logoutStart.type, logout)
  yield takeLatest(getCurrentUserStart.type, getCurrentUser)
} 