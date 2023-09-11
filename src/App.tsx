import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './auth/Login'
import Callback from './auth/Callback'
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/callback",
      element: <Callback />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App