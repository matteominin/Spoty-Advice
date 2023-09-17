import { useState } from "react"
import NavBar from "./NavBar"
import Playlists from "./Playlists"
import SearchBar from "./SearchBar"
import { SongItemInterface } from "../interfaces/playlist.interface"
import { SelectedSongsContext } from "../utils/context"
import SelectedSongs from "./SelectedSongs"
import '../css/home.css'
import Background from "./Background"
import IsAuthenticated from "../auth/IsAuthenticated"

const Home = () => {
    const [selectedSongs, setSelectedSongs] = useState<Array<SongItemInterface>>([])

    return (
        <IsAuthenticated>
            <Background />
            <NavBar />
            <div className="page-container">
                <SelectedSongsContext.Provider value={{ selectedSongs, setSelectedSongs }}>
                    <div className="left">
                        <h1 className="title">Get new Music</h1>
                        <h2 className="subtitle">Search, Select and Discover the Music</h2>
                        <SearchBar />
                        <SelectedSongs className="mobile" />
                        <Playlists />
                    </div>
                    <div className="right">
                        <SelectedSongs className="desktop" />
                    </div>
                </SelectedSongsContext.Provider>
            </div>
        </IsAuthenticated>
    )
}

export default Home