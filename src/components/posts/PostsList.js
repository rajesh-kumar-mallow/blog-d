import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, Card, Button, Space, Select, message, Modal } from 'antd'
import { LikeOutlined, LikeFilled, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { 
  fetchPostsStart,
  deletePostStart,
  likePostStart,
  unlikePostStart,
  setFilters
} from '../../store/slices/postsSlice'
import { getCurrentUserStart } from '../../store/slices/authSlice'
import PostForm from './PostForm'
import styles from './PostsList.module.scss'

const { Option } = Select

const PostsList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: posts, isLoading, filters } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingPost, setEditingPost] = useState(null)

  useEffect(() => {
    if (!user && localStorage.getItem('token')) {
      dispatch(getCurrentUserStart())
    }
    dispatch(fetchPostsStart(filters))
  }, [dispatch, filters, user])

  const isPostOwner = (post) => {
    return user?.id === post.user.id
  }

  const handleDelete = async (postId) => {
    try {
      await dispatch(deletePostStart(postId)).unwrap()
      message.success('Post deleted successfully')
    } catch (error) {
      message.error(error || 'Failed to delete post')
    }
  }

  const handleLikeToggle = async (post) => {
    try {
      if (post.is_liked) {
        dispatch(unlikePostStart(post.id))
        message.success('Post unliked')
      } else {
        dispatch(likePostStart(post.id))
        message.success('Post liked')
      }
    } catch (error) {
      message.error(error || 'Failed to toggle like')
    }
  }

  const handleSortChange = (value) => {
    dispatch(setFilters({ sort: value }))
  }

  const handleFilterChange = (value) => {
    dispatch(setFilters({ mine: value === 'mine' }))
  }

  const handleCreateClick = () => {
    setEditingPost(null)
    setModalVisible(true)
  }

  const handleEditClick = (post) => {
    setEditingPost(post)
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setEditingPost(null)
  }

  return (
    <div className={styles.postsContainer}>
      <div className={styles.header}>
        <div className={styles.filters}>
          <Select
            defaultValue="all"
            className={styles.filterSelect}
            onChange={handleFilterChange}
          >
            <Option value="all">All Posts</Option>
            <Option value="mine">My Posts</Option>
          </Select>
          <Select
            defaultValue="latest"
            className={styles.sortSelect}
            onChange={handleSortChange}
          >
            <Option value="latest">Latest</Option>
            <Option value="popular">Most Popular</Option>
          </Select>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateClick}
        >
          Create Post
        </Button>
      </div>

      <List
        dataSource={posts}
        loading={isLoading}
        renderItem={(post) => (
          <List.Item>
            <Card
              className={styles.postCard}
              actions={[
                <Button
                  key="like"
                  icon={post.is_liked ? <LikeFilled /> : <LikeOutlined />}
                  onClick={() => handleLikeToggle(post)}
                >
                  {post.likes_count}
                </Button>,
                isPostOwner(post) && (
                  <Button
                    key="edit"
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEditClick(post)}
                  >
                    Edit
                  </Button>
                ),
                isPostOwner(post) && (
                  <Button
                    key="delete"
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                )
              ].filter(Boolean)}
            >
              <Card.Meta
                title={
                  <Link to={`/posts/${post.id}`} className={styles.postTitle}>
                    {post.title}
                  </Link>
                }
                description={
                  <div>
                    <p className={styles.postContent}>{post.content}</p>
                    <p className={styles.postMeta}>
                      By <Link to={`/authors/${post.user.id}`}>{post.user.name}</Link>
                      <span className={styles.postDate}>
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title={editingPost ? 'Edit Post' : 'Create Post'}
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        <PostForm
          initialValues={editingPost}
          onSuccess={handleModalClose}
        />
      </Modal>
    </div>
  )
}

export default PostsList 