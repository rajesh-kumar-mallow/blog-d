const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

// Rich static content
const mockData = {
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      posts_count: 2,
      posts: [
        {
          id: 1,
          title: "Getting Started with React",
          content: "React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the fundamentals of React and how to get started with your first React application...",
          likes_count: 15,
          is_liked: false,
          created_at: "2024-02-10T08:00:00Z"
        },
        {
          id: 2,
          title: "State Management with Redux",
          content: "Redux is a predictable state container for JavaScript apps. Let's dive deep into how Redux works and when you should use it in your React applications...",
          likes_count: 10,
          is_liked: true,
          created_at: "2024-02-11T10:30:00Z"
        }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      posts_count: 3,
      posts: [
        {
          id: 3,
          title: "Modern CSS Techniques",
          content: "CSS has evolved significantly over the years. In this post, we'll look at modern CSS techniques like Grid, Flexbox, and CSS Variables that can improve your web development workflow...",
          likes_count: 8,
          is_liked: false,
          created_at: "2024-02-09T15:45:00Z"
        },
        {
          id: 4,
          title: "Responsive Design Best Practices",
          content: "Creating responsive websites is crucial in today's mobile-first world. Let's explore best practices and techniques for building responsive layouts...",
          likes_count: 12,
          is_liked: false,
          created_at: "2024-02-12T09:15:00Z"
        },
        {
          id: 5,
          title: "Web Accessibility Guidelines",
          content: "Making your website accessible to all users is not just good practice, it's essential. Learn about WCAG guidelines and how to implement them...",
          likes_count: 20,
          is_liked: true,
          created_at: "2024-02-13T11:20:00Z"
        }
      ]
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      posts_count: 2,
      posts: [
        {
          id: 6,
          title: "Node.js Backend Development",
          content: "Node.js has revolutionized backend development. In this comprehensive guide, we'll cover everything from setting up a Node.js server to building RESTful APIs...",
          likes_count: 18,
          is_liked: false,
          created_at: "2024-02-14T14:00:00Z"
        },
        {
          id: 7,
          title: "Database Design Patterns",
          content: "Proper database design is crucial for application performance. Let's explore common database design patterns and when to use them...",
          likes_count: 14,
          is_liked: true,
          created_at: "2024-02-15T16:30:00Z"
        }
      ]
    }
  ]
}

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'No token provided' })
  }
  next()
}

// Auth routes
app.post('/api/v1/login', (req, res) => {
  const { email } = req.body
  const user = mockData.users.find(u => u.email === email)
  
  if (user) {
    res.json({
      token: 'mock-jwt-token',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        posts_count: user.posts_count
      }
    })
  } else {
    res.status(401).json({ status: 'error', message: 'Invalid credentials' })
  }
})

// Users/Authors routes
app.get('/api/v1/users', authMiddleware, (req, res) => {
  const usersWithoutPosts = mockData.users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    posts_count: user.posts_count
  }))
  res.json(usersWithoutPosts)
})

app.get('/api/v1/users/:id', authMiddleware, (req, res) => {
  const user = mockData.users.find(u => u.id === parseInt(req.params.id))
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ status: 'error', message: 'User not found' })
  }
})

// Posts routes
app.get('/api/v1/posts', authMiddleware, (req, res) => {
  let posts = mockData.users.flatMap(user => 
    user.posts.map(post => ({
      ...post,
      user: {
        id: user.id,
        name: user.name
      }
    }))
  )

  // Sort by date or likes
  if (req.query.sort === 'likes_count') {
    posts = posts.sort((a, b) => b.likes_count - a.likes_count)
  } else {
    posts = posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  }

  // Filter by author
  if (req.query.author) {
    posts = posts.filter(post => post.user.id === parseInt(req.query.author))
  }

  res.json(posts)
})

app.post('/api/v1/posts', authMiddleware, (req, res) => {
  const { title, content } = req.body
  const newPost = {
    id: Math.max(...mockData.users.flatMap(u => u.posts.map(p => p.id))) + 1,
    title,
    content,
    likes_count: 0,
    is_liked: false,
    created_at: new Date().toISOString()
  }
  res.json(newPost)
})

app.post('/api/v1/posts/:id/like', authMiddleware, (req, res) => {
  const postId = parseInt(req.params.id)
  let targetPost = null
  
  mockData.users.forEach(user => {
    const post = user.posts.find(p => p.id === postId)
    if (post) {
      post.likes_count += 1
      post.is_liked = true
      targetPost = post
    }
  })

  if (targetPost) {
    res.json({ likes_count: targetPost.likes_count, is_liked: true })
  } else {
    res.status(404).json({ status: 'error', message: 'Post not found' })
  }
})

app.delete('/api/v1/posts/:id/like', authMiddleware, (req, res) => {
  const postId = parseInt(req.params.id)
  let targetPost = null
  
  mockData.users.forEach(user => {
    const post = user.posts.find(p => p.id === postId)
    if (post) {
      post.likes_count = Math.max(0, post.likes_count - 1)
      post.is_liked = false
      targetPost = post
    }
  })

  if (targetPost) {
    res.json({ likes_count: targetPost.likes_count, is_liked: false })
  } else {
    res.status(404).json({ status: 'error', message: 'Post not found' })
  }
})

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`)
}) 