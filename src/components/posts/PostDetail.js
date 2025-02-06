import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, Button, Space, message, Spin } from 'antd'
import { LikeOutlined, LikeFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api/config'
import { 
  deletePostStart, 
  likePostStart, 
  unlikePostStart 
} from '../../store/slices/postsSlice'
import styles from './PostDetail.module.scss'

const PostDetail = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${postId}`)
        setPost(response.data)
      } catch (error) {
        message.error(error.message || 'Failed to fetch post')
        navigate('/posts')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [postId, navigate])

  const handleDelete = async () => {
    try {
      await dispatch(deletePostStart(postId))
      message.success('Post deleted successfully')
      navigate('/posts')
    } catch (error) {
      message.error(error || 'Failed to delete post')
    }
  }

  const handleLikeToggle = () => {
    if (post.is_liked) {
      dispatch(unlikePostStart(postId))
    } else {
      dispatch(likePostStart(postId))
    }
  }

  if (isLoading) {
    return <Spin size="large" className={styles.spinner} />
  }

  if (!post) {
    return null
  }

  const isAuthor = post.user.id === user.id

  return (
    <div className={styles.postDetailContainer}>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spin size="large" />
        </div>
      ) : post && (
        <Card
          title={post.title}
          className={styles.postCard}
          actions={[
            <Button
              key="like"
              icon={post.is_liked ? <LikeFilled /> : <LikeOutlined />}
              onClick={handleLikeToggle}
              disabled={isAuthor}
            >
              {post.likes_count}
            </Button>,
            isAuthor && (
              <Button
                key="edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => navigate(`/posts/${post.id}/edit`)}
              >
                Edit
              </Button>
            ),
            isAuthor && (
              <Button
                key="delete"
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            )
          ].filter(Boolean)}
        >
          <div className={styles.postContent}>
            {post.content}
          </div>
          <div className={styles.postMeta}>
            By <Link to={`/authors/${post.user.id}`}>{post.user.name}</Link>
            <span className={styles.postDate}>
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
        </Card>
      )}
    </div>
  )
}

export default PostDetail 