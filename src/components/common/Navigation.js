import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  HomeOutlined,
  UserOutlined,
  PlusOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { logoutStart } from '../../store/slices/authSlice'
import styles from './Navigation.module.scss'

const { Header } = Layout

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutStart())
  }

  const privateItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>
    },
    {
      key: 'create',
      icon: <PlusOutlined />,
      label: <Link to="/create">Create Post</Link>
    },
    {
      key: 'authors',
      icon: <UserOutlined />,
      label: <Link to="/authors">Authors</Link>
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
      style: { marginLeft: 'auto' }
    }
  ]

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>Blog App</div>
      {isAuthenticated && (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={privateItems}
          className={styles.menu}
        />
      )}
    </Header>
  )
}

export default Navigation 