import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
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

const { Content } = Layout

const App = () => {
  return (
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
  )
}

export default App
