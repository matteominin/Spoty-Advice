import NavBar from "./NavBar"
import Playlists from "./Playlists"
import SearchBar from "./SearchBar"

const Home = () => {
    const accessToken: string = localStorage.getItem('access_token') || ''

    return (
        <div className="Home">
            <NavBar />
            <SearchBar />
            {accessToken ? <Playlists /> : <h1>Home</h1>}
        </div>
    )
}

export default Home