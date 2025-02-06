const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

// Mock data
const mockData = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com', bio: 'Software Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', bio: 'UI Designer' }
  ],
  posts: [
    { 
      id: 1, 
      title: 'First Post', 
      content: 'This is my first post content',
      user_id: 1,
      likes_count: 5,
      is_liked: false,
      created_at: '2024-01-20T10:00:00Z',
      user: { 
        id: 1, 
        name: 'John Doe',
        email: 'john@example.com'
      }
    },
    { 
      id: 2, 
      title: 'Design Trends', 
      content: 'Latest design trends in 2024',
      user_id: 2,
      likes_count: 3,
      is_liked: true,
      created_at: '2024-01-21T15:30:00Z',
      user: { 
        id: 2, 
        name: 'Jane Smith',
        email: 'jane@example.com'
      }
    }
  ],
  tokens: {},
  authors: [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      bio: 'Software Developer',
      postsCount: 1,
      totalLikes: 5
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      bio: 'UI Designer',
      postsCount: 1,
      totalLikes: 3
    }
  ]
}

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }
  if (!mockData.tokens[token]) {
    return res.status(401).json({ success: false, message: 'Invalid token' })
  }
  req.user = mockData.tokens[token]
  next()
}

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  const user = mockData.users.find(u => u.email === email)
  
  if (user && password === 'password') { // For testing, any password will work
    const token = `mock-token-${user.id}`
    mockData.tokens[token] = user
    return res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio
        }
      },
      message: 'Login successful'
    })
  }
  
  res.status(401).json({ 
    success: false, 
    message: 'Invalid credentials',
    errors: {
      email: ['Invalid email or password']
    }
  })
})

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body
  
  if (mockData.users.some(u => u.email === email)) {
    return res.status(422).json({ 
      success: false, 
      message: 'Email already exists' 
    })
  }

  const newUser = {
    id: mockData.users.length + 1,
    name,
    email,
    bio: ''
  }
  
  mockData.users.push(newUser)
  const token = `mock-token-${newUser.id}`
  mockData.tokens[token] = newUser

  res.json({
    success: true,
    data: {
      token,
      user: newUser
    }
  })
})

app.post('/api/auth/logout', authMiddleware, (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  delete mockData.tokens[token]
  res.json({ success: true })
})

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: req.user
  })
})

// Posts routes
app.get('/api/posts/:id', authMiddleware, (req, res) => {
  const post = mockData.posts.find(p => p.id === parseInt(req.params.id))
  
  if (!post) {
    return res.status(404).json({ 
      success: false, 
      message: 'Post not found' 
    })
  }

  // Add is_liked status based on current user
  const postWithLikeStatus = {
    ...post,
    is_liked: false // You can implement actual like status logic here
  }

  res.json({
    success: true,
    data: postWithLikeStatus
  })
})

app.get('/api/posts', authMiddleware, (req, res) => {
  const { mine, author } = req.query
  let filteredPosts = [...mockData.posts]
  
  if (mine === 'true') {
    filteredPosts = filteredPosts.filter(p => p.user_id === req.user.id)
  }
  
  if (author) {
    filteredPosts = filteredPosts.filter(p => p.user_id === parseInt(author))
  }

  res.json({
    success: true,
    data: filteredPosts
  })
})

app.post('/api/posts', authMiddleware, (req, res) => {
  const { title, content } = req.body
  const newPost = {
    id: mockData.posts.length + 1,
    title,
    content,
    user_id: req.user.id,
    likes_count: 0,
    is_liked: false,
    created_at: new Date().toISOString(),
    user: { id: req.user.id, name: req.user.name }
  }
  
  mockData.posts.unshift(newPost)
  res.json({
    success: true,
    data: newPost
  })
})

app.put('/api/posts/:id', authMiddleware, (req, res) => {
  const post = mockData.posts.find(p => p.id === parseInt(req.params.id))
  
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' })
  }
  
  if (post.user_id !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Unauthorized' })
  }
  
  Object.assign(post, req.body)
  res.json({
    success: true,
    data: post
  })
})

app.delete('/api/posts/:id', authMiddleware, (req, res) => {
  const postIndex = mockData.posts.findIndex(p => p.id === parseInt(req.params.id))
  
  if (postIndex === -1) {
    return res.status(404).json({ success: false, message: 'Post not found' })
  }
  
  if (mockData.posts[postIndex].user_id !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Unauthorized' })
  }
  
  mockData.posts.splice(postIndex, 1)
  res.json({ success: true })
})

// Like/Unlike routes
app.post('/api/posts/:id/like', authMiddleware, (req, res) => {
  const post = mockData.posts.find(p => p.id === parseInt(req.params.id))
  
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' })
  }
  
  post.likes_count++
  post.is_liked = true
  
  res.json({
    success: true,
    data: {
      likes_count: post.likes_count,
      is_liked: true
    }
  })
})

app.delete('/api/posts/:id/like', authMiddleware, (req, res) => {
  const post = mockData.posts.find(p => p.id === parseInt(req.params.id))
  
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' })
  }
  
  post.likes_count--
  post.is_liked = false
  
  res.json({
    success: true,
    data: {
      likes_count: post.likes_count,
      is_liked: false
    }
  })
})

// Add Authors routes
app.get('/api/authors', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: mockData.authors
  })
})

app.get('/api/authors/:id', authMiddleware, (req, res) => {
  const author = mockData.authors.find(a => a.id === parseInt(req.params.id))
  
  if (!author) {
    return res.status(404).json({ success: false, message: 'Author not found' })
  }

  res.json({
    success: true,
    data: author
  })
})

app.put('/api/authors/:id', authMiddleware, (req, res) => {
  const author = mockData.authors.find(a => a.id === parseInt(req.params.id))
  
  if (!author) {
    return res.status(404).json({ success: false, message: 'Author not found' })
  }
  
  if (author.id !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Unauthorized' })
  }
  
  const { name, email, bio } = req.body
  Object.assign(author, { name, email, bio })
  
  // Update corresponding user data
  const user = mockData.users.find(u => u.id === author.id)
  if (user) {
    Object.assign(user, { name, email, bio })
  }

  res.json({
    success: true,
    data: author
  })
})

app.delete('/api/authors/:id', authMiddleware, (req, res) => {
  const authorIndex = mockData.authors.findIndex(a => a.id === parseInt(req.params.id))
  
  if (authorIndex === -1) {
    return res.status(404).json({ success: false, message: 'Author not found' })
  }
  
  if (mockData.authors[authorIndex].id !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Unauthorized' })
  }
  
  // Remove author's posts
  mockData.posts = mockData.posts.filter(p => p.user_id !== req.user.id)
  
  // Remove author
  mockData.authors.splice(authorIndex, 1)
  
  // Remove corresponding user
  const userIndex = mockData.users.findIndex(u => u.id === req.user.id)
  if (userIndex !== -1) {
    mockData.users.splice(userIndex, 1)
  }

  res.json({ success: true })
})

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`)
}) 