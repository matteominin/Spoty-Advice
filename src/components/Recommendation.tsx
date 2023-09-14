import { useEffect, useState } from 'react'
import '../css/recommendation.css'
import { SearchItemInterface, SongItemInterface } from '../interfaces/playlist.interface'
import Background from './Background'
import Song from './Song'
import NavBar from './NavBar'
import { AudioPlayerContext, SelectedSongsContext } from '../utils/context'
import { addTracksToPlaylist, createPlaylist, isPlaylistNameDuplicate, addToFavorite } from '../interfaces/recommendation'

const Recommendation = () => {
    const [recommendation, setRecommendation] = useState<Array<SearchItemInterface>>([])
    const [playingSong, setPlayingSong] = useState<{ audio: HTMLAudioElement, preview_url: string }>({ audio: new Audio(), preview_url: "" })
    const [playlistName, setPlaylistName] = useState<string>("")
    const [message, setMessage] = useState<{ type: string, message: string }>({ type: "", message: "" })
    const [selectedSongs, setSelectedSongs] = useState<Array<SongItemInterface>>([])

    const [status, setStatus] = useState<any>({
        createPlaylist: false,
        addToPlaylist: false,
        select: false
    })

    const params = new URLSearchParams(window.location.search).get('trackList')

    useEffect(() => {
        fetch("https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=" + params, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token")
            }
        })
            .then(res => {
                if (res.status === 401) throw new Error("Unauthorized")
                if (!res.ok) throw new Error("Error in fetching data")
                return res.json()
            })
            .then(data => {
                setRecommendation(data.tracks)
            })
            .catch(err => {
                setMessage({ type: "error", message: err.message })
            })
    }, [])

    useEffect(() => {
        return () => {
            playingSong.audio.pause()

        }
    }, [playingSong.audio])

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const addToPlaylist: boolean = await isPlaylistNameDuplicate(playlistName)
            setStatus({ ...status, addToPlaylist: !addToPlaylist })
        }, 300)

        return () => clearInterval(timeout)
    }, [playlistName])

    const statusMessage = () => {
        switch (message.type) {
            case "success":
                return <p className="message success">{message.message}</p>
            case "error":
                return <p className="message error">Error: {message.message}</p>
        }
    }

    const handleCreatePlaylist = (playlistName: string) => {
        (async () => {
            setMessage({ type: "", message: "" })
            try {
                const playlist_id = await createPlaylist(playlistName)
                const added = await addTracksToPlaylist(playlist_id, recommendation.map(song => `spotify:track:${song.id}`))
                if (added) setMessage({ type: "success", message: "Songs added!" })
            } catch (error: any) {
                setStatus({
                    createPlaylist: false, addToPlaylist: false, select: false
                })
                setMessage({ type: "error", message: error.message })
            }
        })()
    }

    /* const handleAddToPlaylist = (playlist_id: string) => {
        (async () => {
            setMessage({ type: "", message: "" })
            try {
                const added = await addTracksToPlaylist(playlist_id, recommendation.map(song => `spotify:track:${song.id}`))
                if (added) setMessage({ type: "success", message: "Songs added!" })
            } catch (error: any) {
                setStatus({
                    createPlaylist: false, addToPlaylist: false, select: false
                })
                setMessage({ type: "error", message: error.message })
            }
        })()
    } */

    const handleMainAction = (e: any) => {
        setPlaylistName("")
        setMessage({ type: "", message: "" })
        setStatus({ createPlaylist: false, addToPlaylist: false, select: false, [e.target.name]: !status[e.target.name] })
    }

    const handleAddToFavorite = () => {
        (async () => {
            const trackList = selectedSongs.map(song => song.track.id)

            try {
                await addToFavorite(trackList)
                setMessage({ type: "success", message: "Songs added to Favorite!" })
            } catch (error: any) {
                setMessage({ type: "error", message: error.message })
            }
            setStatus({
                createPlaylist: false, addToPlaylist: false, select: false
            })
            setSelectedSongs([])
        })()
    }

    return (
        <>
            <Background />
            <NavBar />
            <div className='recommendation'>
                <h1 className='title'>We <span>selected</span> for you these <span>songs!</span></h1>

                <div className="actions">

                    {/* Main Actions */}
                    <div className="actions__main">
                        <button
                            className={status.createPlaylist && !message.type ? "selected" : ""}
                            name="createPlaylist"
                            onClick={handleMainAction}
                        >
                            Add to playlist
                        </button>

                        <button
                            className={status.select && !message.type ? "selected" : ""}
                            name="select"
                            onClick={handleMainAction}
                        >
                            Select
                        </button>
                    </div>

                    {/* Create Playlist */}
                    <div className={(status.createPlaylist && !message.type) ? "actions__createPlaylist active" : "actions__createPlaylist"}>
                        <input type="text" placeholder="Playlist name" value={playlistName} onChange={e => {
                            setStatus({ ...status, addToPlaylist: false })
                            setPlaylistName(e.target.value)
                        }} />

                        <button
                            disabled={!status.addToPlaylist}
                            onClick={() => { handleCreatePlaylist(playlistName) }}
                        >
                            Create Playlist
                        </button>
                    </div>

                    {/* Select */}
                    <div className={(status.select && !message.type) ? "actions__select active" : "actions__select"}>
                        <button
                            className={selectedSongs.length > 0 ? "add active" : "add"}
                            onClick={handleAddToFavorite}
                        >
                            Add {selectedSongs.length} songs to Favorite
                        </button>
                        <p style={selectedSongs.length > 0 ? { display: "none" } : { display: "block" }}>
                            Select songs from the list below
                        </p>
                    </div>

                    {statusMessage()}
                </div>

                <AudioPlayerContext.Provider value={{ playingSong, setPlayingSong }}>
                    <SelectedSongsContext.Provider value={{ selectedSongs, setSelectedSongs }}>
                        <div className={status.select ? "songs-container selecting" : "songs-container"}>
                            {recommendation?.map((song, i) => <Song key={song.id} track={song} index={i} songLimit={false} />)}
                        </div>
                    </SelectedSongsContext.Provider>
                </AudioPlayerContext.Provider>
            </div >
        </>
    )
}

export default Recommendation