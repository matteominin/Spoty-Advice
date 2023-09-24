import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Callback from './auth/Callback'
import './App.css'
import Recommendation from './components/Recommendation'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/callback",
      element: <Callback />
    },
    {
      path: "/recommendation",
      element: <Recommendation />
    }
  ])
  return <RouterProvider router={router} />
}

export default App
