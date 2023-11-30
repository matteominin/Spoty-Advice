import { useState } from "react"
import NavBar from "./NavBar"
import Playlists from "./Playlists"
import SearchBar from "./SearchBar"
import { selectedSongsInterface } from "../interfaces/playlist.interface"
import { SelectedSongsContext, refreshPageContext, loadingContext } from "../utils/context"
import SelectedSongs from "./SelectedSongs"
import '../css/home.css'
import Background from "./Background"
import IsAuthenticated from "../auth/IsAuthenticated"
import Spinner from "./Spinner"

const Home = () => {
    const [selectedSongs, setSelectedSongs] = useState<selectedSongsInterface>({ tracks: [], settings: {} })
    const [refresh, setRefresh] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <IsAuthenticated>
            <loadingContext.Provider value={{ isLoading, setIsLoading }}>
                <refreshPageContext.Provider value={{ refresh, setRefresh }}>
                    <Spinner />
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
                </refreshPageContext.Provider>
            </loadingContext.Provider>
        </IsAuthenticated>
    )
}

export default Home