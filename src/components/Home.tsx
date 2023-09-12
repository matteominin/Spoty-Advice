import { useState } from "react"
import NavBar from "./NavBar"
import Playlists from "./Playlists"
import SearchBar from "./SearchBar"
import { SongItemInterface } from "../interfaces/playlist.interface"
import { SelectedSongsContext } from "../utils/context"
import SelectedSongs from "./SelectedSongs"
import '../css/home.css'

const Home = () => {
    const [selectedSongs, setSelectedSongs] = useState<Array<SongItemInterface>>([])

    return (
        <>
            <NavBar />
            <div className="page-container">
                <SelectedSongsContext.Provider value={{ selectedSongs, setSelectedSongs }}>
                    <div className="left">
                        <h1>Get new Music</h1>
                        <h2>Search, Select and Discover the Music</h2>
                        <SearchBar />
                        <Playlists />
                    </div>
                    <div className="right">
                        <SelectedSongs />
                    </div>
                </SelectedSongsContext.Provider>
            </div>
        </>
    )
}

export default Home