import { useEffect, useState } from 'react'
import '../css/recommendation.css'
import { SearchItemInterface } from '../interfaces/playlist.interface'
import Background from './Background'
import Song from './Song'
import NavBar from './NavBar'
import { AudioPlayerContext } from '../utils/context'

const Recommendation = () => {
    const [recommendation, setRecommendation] = useState<Array<SearchItemInterface>>([])
    const [playingSong, setPlayingSong] = useState<{ audio: HTMLAudioElement, preview_url: string }>({ audio: new Audio(), preview_url: "" })
    const [error, setError] = useState<string>("")
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
                setError(err.message || "Unexpected error")
            })
    }, [])

    return (
        <>
            <Background />
            <NavBar />
            <div className='recommendation'>
                <h1 className='title'>We <span>selected</span> for you these <span>songs!</span></h1>
                <AudioPlayerContext.Provider value={{ playingSong, setPlayingSong }}>
                    <div className="songs-container">
                        {recommendation?.map((song, i) => <Song key={song.id} track={song} index={i} />)}
                    </div>
                </AudioPlayerContext.Provider>

                {error && <p className="error">{error}</p>}
            </div>
        </>
    )
}

export default Recommendation