import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Avatar, Button, message } from 'antd'
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { 
  fetchAuthorStart, 
  deleteAuthorStart 
} from '../../store/slices/authorsSlice'
import { fetchPostsStart } from '../../store/slices/postsSlice'
import PostsList from '../posts/PostsList'
import styles from './AuthorDetail.module.scss'

const AuthorDetail = () => {
  const { authorId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentAuthor, isLoading } = useSelector((state) => state.authors)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchAuthorStart(authorId))
    dispatch(fetchPostsStart({ authorId }))
  }, [dispatch, authorId])

  const handleDelete = async () => {
    try {
      await dispatch(deleteAuthorStart(authorId))
      message.success('Profile deleted successfully')
      navigate('/')
    } catch (error) {
      message.error('Failed to delete profile')
    }
  }

  const isOwnProfile = user?.id === parseInt(authorId)

  if (!currentAuthor) return null

  return (
    <div className={styles.authorDetailContainer}>
      <Card className={styles.authorCard}>
        <div className={styles.authorHeader}>
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={currentAuthor.avatar}
            className={styles.avatar}
          />
          <div className={styles.authorInfo}>
            <h1>{currentAuthor.name}</h1>
            <p className={styles.email}>{currentAuthor.email}</p>
            <p className={styles.bio}>{currentAuthor.bio || 'No bio available'}</p>
            <div className={styles.stats}>
              <span>Total Posts: {currentAuthor.postsCount}</span>
              <span>Total Likes: {currentAuthor.totalLikes}</span>
            </div>
          </div>
          {isOwnProfile && (
            <div className={styles.actions}>
              <Button
                icon={<EditOutlined />}
                onClick={() => navigate(`/authors/${authorId}/edit`)}
              >
                Edit Profile
              </Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              >
                Delete Profile
              </Button>
            </div>
          )}
        </div>
      </Card>

      <div className={styles.authorPosts}>
        <h2>Posts by {currentAuthor.name}</h2>
        <PostsList authorId={authorId} />
      </div>
    </div>
  )
}

export default AuthorDetail 