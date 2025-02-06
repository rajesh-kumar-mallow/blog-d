import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout, ConfigProvider, theme } from 'antd'
import themeConfig from './theme/themeConfig'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PostsList from './components/posts/PostsList'
import PostDetail from './components/posts/PostDetail'
import AuthorsList from './components/authors/AuthorsList'
import AuthorDetail from './components/authors/AuthorDetail'
import AuthorEditForm from './components/authors/AuthorEditForm'
import Navigation from './components/common/Navigation'
import styles from './App.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserStart } from './store/slices/authSlice'

const { Content } = Layout

const App = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getCurrentUserStart())
    }
  }, [dispatch, isAuthenticated, user])

  return (
    <ConfigProvider
      theme={{
        ...themeConfig,
        algorithm: theme.darkAlgorithm, // Using dark algorithm as base
      }}
    >
      <Router>
        <Layout className={styles.layout}>
          <Navigation />
          <Content className={styles.content}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              {/* Posts Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <PostsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/posts"
                element={
                  <ProtectedRoute>
                    <PostsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/posts/:postId"
                element={
                  <ProtectedRoute>
                    <PostDetail />
                  </ProtectedRoute>
                }
              />

              {/* Authors Routes */}
              <Route
                path="/authors"
                element={
                  <ProtectedRoute>
                    <AuthorsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/authors/:authorId"
                element={
                  <ProtectedRoute>
                    <AuthorDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/authors/:authorId/edit"
                element={
                  <ProtectedRoute>
                    <AuthorEditForm />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </ConfigProvider>
  )
}

export default App
