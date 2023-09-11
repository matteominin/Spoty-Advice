import { Link } from 'react-router-dom'
import '../css/NavBar.css'

const NavBar = () => {
    const accessToken = localStorage.getItem('access_token')

    return (
        <nav className='navBar'>
            <div className="logo">
                <Link to="/">LOGO</Link>
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