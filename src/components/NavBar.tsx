import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import '../css/navBar.css'
import Login from '../auth/Login'

const NavBar = () => {
    const accessToken = localStorage.getItem('access_token')

    return (
        <nav className='navBar'>
            <div className="left">
                <Link to='/' className="logo">
                    <img src={logo} alt="Spoty Advice Logo" />
                </Link>
            </div>
            {accessToken ?
                <button
                    className="transparent logout"
                    onClick={() => { localStorage.clear(); window.location.href = '/' }}
                >
                    LogOut
                </button>
                :
                <Login />
            }
        </nav>
    )
}

export default NavBar