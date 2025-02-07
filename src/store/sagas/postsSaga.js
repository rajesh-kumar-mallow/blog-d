import { call, put, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
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
    // let res = [
    //   {
    //     "id": 1,
    //     "title": "Test Title1",
    //     "content": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //     "likes_count": 0,
    //     "created_at": "2025-02-04T10:58:13.170Z",
    //     "user": {
    //       "id": 1,
    //       "email": "logesh.mohanasundaram@mallow-tech.com",
    //       "name": "Logesh Mohanasundaram",
    //       "posts_count": 2
    //     }
    //   },
    //   {
    //     "id": 2,
    //     "title": "Test Title2",
    //     "content": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose",
    //     "likes_count": 0,
    //     "created_at": "2025-02-04T11:01:08.349Z",
    //     "user": {
    //       "id": 1,
    //       "email": "logesh.mohanasundaram@mallow-tech.com",
    //       "name": "Logesh Mohanasundaram",
    //       "posts_count": 2
    //     }
    //   }
    // ]
    yield put(fetchPostsSuccess(response))
  } catch (error) {
    const errorMsg = error.message || 'Failed to fetch posts'
    yield put(fetchPostsFailure(errorMsg))
    message.error(errorMsg)
  }
}

function* createPost({ payload: postData }) {
  try {
    const response = yield call(api.post, '/posts', postData)
    // let res = {
    //   "id": 1,
    //   "title": "Test Title1",
    //   "content": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //   "likes_count": 0,
    //   "created_at": "2025-02-04T10:58:13.170Z",
    //   "user": {
    //     "id": 1,
    //     "email": "logesh.mohanasundaram@mallow-tech.com",
    //     "name": "Logesh Mohanasundaram",
    //     "posts_count": 1
    //   }
    // }
    yield put(createPostSuccess(response))
    message.success('Post created successfully')
  } catch (error) {
    const errorMsg = error.message || 'Failed to create post'
    yield put(createPostFailure(errorMsg))
    message.error(errorMsg)
  }
}

function* updatePost({ payload: { postId, postData } }) {
  try {
    const response = yield call(api.put, `/posts/${postId}`, postData)
    // let res = {
    //   "id": 1,
    //   "title": "Test Title1",
    //   "content": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //   "likes_count": 0,
    //   "created_at": "2025-02-04T10:58:13.170Z",
    //   "user": {
    //     "id": 1,
    //     "email": "logesh.mohanasundaram@mallow-tech.com",
    //     "name": "Logesh Mohanasundaram",
    //     "posts_count": 2
    //   }
    // }
    yield put(updatePostSuccess(response))
    message.success('Post updated successfully')
  } catch (error) {
    const errorMsg = error.message || 'Failed to update post'
    yield put(updatePostFailure(errorMsg))
    message.error(errorMsg)
  }
}

function* deletePost({ payload: postId }) {
  try {
    yield call(api.delete, `/posts/${postId}`)
    yield put(deletePostSuccess(postId))
    message.success('Post deleted successfully')
  } catch (error) {
    const errorMsg = error.message || 'Failed to delete post'
    yield put(deletePostFailure(errorMsg))
    message.error(errorMsg)
  }
}

function* likePost({ payload: postId }) {
  try {
    const response = yield call(api.post, `/posts/${postId}/like`)
    // let res = {
    //   "id": 2,
    //   "user_id": 3,
    //   "post_id": 3,
    //   "created_at": "2025-02-04T11:32:50.956Z",
    //   "updated_at": "2025-02-04T11:32:50.956Z"
    // }
    yield put(likePostSuccess({ postId, ...response }))
    message.success('Post liked successfully')
  } catch (error) {
    const errorMsg = error.message || 'Failed to like post'
    yield put(likePostFailure(errorMsg))
    message.error(errorMsg)
  }
}

function* unlikePost({ payload: postId }) {
  try {
    yield call(api.delete, `/posts/${postId}/like`)
    yield put(unlikePostSuccess({ postId }))
    message.success('Post unliked successfully')
  } catch (error) {
    const errorMsg = error.message || 'Failed to unlike post'
    yield put(unlikePostFailure(errorMsg))
    message.error(errorMsg)
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