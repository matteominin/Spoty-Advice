import { useState } from "react"
import NavBar from "./NavBar"
import Playlists from "./Playlists"
import SearchBar from "./SearchBar"
import { SongItemInterface } from "../interfaces/playlist.interface"
import { SelectedSongsContext } from "../utils/context"

const Home = () => {
    const [selectedSongs, setSelectedSongs] = useState<Array<SongItemInterface>>([])
    const accessToken: string = localStorage.getItem('access_token') || ''

    return (
        <div className="Home">
            <NavBar />
            <SelectedSongsContext.Provider value={{ selectedSongs, setSelectedSongs }}>
                <SearchBar />
                {accessToken ? <Playlists /> : <h1>Home</h1>}
            </SelectedSongsContext.Provider>
        </div>
    )
}

export default Home