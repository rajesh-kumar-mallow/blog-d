import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, Button, Space, message, Spin, Popconfirm } from 'antd'
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
      <Card
        title={post.title}
        extra={
          <Space>
            <Button
              icon={post.is_liked ? <LikeFilled /> : <LikeOutlined />}
              onClick={handleLikeToggle}
              disabled={isAuthor}
              type={post.is_liked ? 'primary' : 'default'}
            >
              {post.likes_count}
            </Button>
            {isAuthor && (
              <>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/posts/${post.id}/edit`)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure you want to delete this post?"
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon={<DeleteOutlined />} danger>
                    Delete
                  </Button>
                </Popconfirm>
              </>
            )}
          </Space>
        }
      >
        <div className={styles.postContent}>
          <p>{post.content}</p>
        </div>
        <div className={styles.postMeta}>
          By <Link to={`/authors/${post.user.id}`}>{post.user.name}</Link>
          <span className={styles.postDate}>
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
      </Card>
    </div>
  )
}

export default PostDetail 