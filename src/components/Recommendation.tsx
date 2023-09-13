import { useEffect, useState } from 'react'
import '../css/recommendation.css'
import { SearchItemInterface } from '../interfaces/playlist.interface'

const Recommendation = () => {
    const [recommendation, setRecommendation] = useState<Array<SearchItemInterface>>([])
    const [error, setError] = useState<string>("")
    const params = new URLSearchParams(window.location.search).get('trackList')

    useEffect(() => {
        fetch("https://api.spotify.com/v1/recommendations?seed_tracks=" + params, {
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
        <div className='recommendation'>
            <h2>Recommendations</h2>

            {recommendation?.map(song => <p>{song.name}</p>)}

            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default Recommendation