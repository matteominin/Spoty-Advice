import Background from './Background'
import NavBar from './NavBar'
import "../css/notAuthenticated.css"
import { Navigate } from 'react-router-dom'

const NotAuthenticated = () => {
    Navigate({ to: "/" })
    localStorage.clear()
    return (
        <div className='notAuthenticated'>
            <Background />
            <NavBar />
            <h1 className="title">Get new Music</h1>
            <h2 className="subtitle">Search, Select and Discover the Music</h2>
        </div>
    )
}

export default NotAuthenticated