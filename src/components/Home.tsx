import NavBar from "./NavBar"
import Playlists from "./Playlists"

const Home = () => {
    const accessToken: string = localStorage.getItem('access_token') || ''
    return (
        <div className="Home">
            <NavBar />
            {accessToken ? <Playlists /> : <h1>Home</h1>}
        </div>
    )
}

export default Home