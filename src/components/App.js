import { getCurrentUserStart } from './store/slices/authSlice'

const App = () => {
  // ... other code

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getCurrentUserStart())
    }
  }, [dispatch, isAuthenticated, user])

  // ... rest of the component
} 