import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import '../css/NavBar.css'

const NavBar = () => {
    const accessToken = localStorage.getItem('access_token')

    return (
        <nav className='navBar'>
            <div className="left">
                <Link to='/' className="logo">
                    <img src={logo} alt="Spoty Advice Logo" />
                </Link>
                <h1>Music Advice</h1>
            </div>

            {!accessToken && <Link className="green" to="/login">LogIn</Link>}
            {accessToken &&
                <button
                    className="transparent"
                    onClick={() => { localStorage.clear(); window.location.href = '/' }}
                >
                    LogOut
                </button>}
        </nav>
    )
}

export default NavBar