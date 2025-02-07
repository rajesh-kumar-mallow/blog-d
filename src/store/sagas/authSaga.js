import { call, put, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
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
  logoutFailure
} from '../slices/authSlice'

function* login({ payload: credentials }) {
  try {
    const response = yield call(api.post, 'login', credentials)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', response.user)
      // let res = {
      //   "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MzkyNzA4NTd9.iiF52y-4LK0awvwi9-tdRPLISVrvhGyylD8eGB6eKZE",
      //   "user": {
      //     "id": 1,
      //     "email": "logesh.mohanasundaram@mallow-tech.com",
      //     "name": "Logesh Mohanasundaram",
      //     "posts_count": 0,
      //     "posts": []
      //   }
      // }
      yield put(loginSuccess(response))
      message.success('Logged in successfully')
  } catch (error) {
    yield put(loginFailure(error.message || 'Login failed'))
    message.error(error.message || 'Login failed')
  }
}

function* signup({ payload: userData }) {
  try {
    const response = yield call(api.post, 'users', userData)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', response.user)
      // let res = {
      //   "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MzkyNzExOTl9.4UxfBrJ0H2bfo3tbZACf9uqOopGLOvms3incCKI3SMo",
      //   "user": {
      //     "id": 1,
      //     "email": "logesh.mohanasundaram@mallow-tech.com",
      //     "name": "Logesh Mohanasundaram",
      //     "posts_count": 0,
      //     "posts": []
      //   }
      // }
      yield put(signupSuccess(response))
      message.success('Registration successful')
  } catch (error) {
    yield put(signupFailure(error.message || 'Registration failed'))
    message.error(error.message || 'Registration failed')
  }
}

function* logout() {
  try {
    // const response = yield call(api.post, '/api/v1/logout')
    // if (response.status === 'success') {
      localStorage.removeItem('token')
      yield put(logoutSuccess())
      message.success('Logged out successfully')
    // } else {
    //   yield put(logoutFailure(response.message))
    // }
  } catch (error) {
    yield put(logoutFailure(error.message || 'Logout failed'))
    message.error(error.message || 'Logout failed')
  }
}

export function* authSaga() {
  yield takeLatest(loginStart.type, login)
  yield takeLatest(signupStart.type, signup)
  yield takeLatest(logoutStart.type, logout)
} 