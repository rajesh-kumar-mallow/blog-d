import { all } from 'redux-saga/effects'
import { postsSaga } from './postsSaga'
import { authSaga } from './authSaga'
import { authorsSaga } from './authorsSaga'

export default function* rootSaga() {
  yield all([
    postsSaga(),
    authSaga(),
    authorsSaga()
  ])
} 