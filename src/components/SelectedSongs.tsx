import { useContext, useState } from "react"
import { SelectedSongsContext } from "../utils/context"
import '../css/selectedSongs.css'
import { Link } from "react-router-dom"
import { selectedSongsInterface } from "../interfaces/playlist.interface"
import { moods } from "../utils/moods"


const SelectedSongs = ({ className }: { className: string }) => {
    const { selectedSongs, setSelectedSongs } = useContext(SelectedSongsContext)
    const [advancedSettings, setAdvancedSettings] = useState(false)

    const getArtistsList = (artists: any) => {
        let artistsArray: Array<any> = []
        artists.forEach((artist: any) => {
            artistsArray = [...artistsArray, artist.name]
        })
        return artistsArray.join(', ')
    }

    const removeSong = (id: string) => {
        const newSelectedSongs = selectedSongs.tracks.filter(song => song.track.id !== id)
        setSelectedSongs({ ...selectedSongs, tracks: newSelectedSongs })
    }

    const handleSettings = (e: any) => {
        setSelectedSongs({ ...selectedSongs, settings: { ...selectedSongs.settings, [e.target.name]: e.target.value } })
    }
    const handleMood = (moodIndex: number) => {
        setSelectedSongs({ ...selectedSongs, settings: { ...selectedSongs.settings, ...moods[moodIndex].parameters } })
    }

    function objectToQueryString(obj: any) {
        const keyValuePairs = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            }
        }
        return keyValuePairs.join('&');
    }


    const generateUrl = (selectedSongs: selectedSongsInterface) => {
        const { tracks, settings } = selectedSongs
        const ids = tracks.map(song => song.track.id)

        const params = new URLSearchParams({
            trackList: ids.join(','),
            settings: objectToQueryString(settings)
        })
        const url = `/recommendation?` + params
        return url
    }

    return (
        <div className={"selectedSongs " + className}>
            <h2>Selected Songs</h2>
            <ul className="selectedSongs__list">
                {selectedSongs.tracks.map(song => (
                    <li className="item" key={song.track.id}>
                        <div className="image-container">
                            <img src={song.track.album.images[2].url} alt={song.track.name} />
                        </div>

                        <div className="text">
                            <p className='name'>{song.track.name}</p>
                            <p className='artist'>{getArtistsList(song.track.artists)}</p>
                        </div>

                        {/* <p className='album'>{song.track.album.name}</p> */}
                        <button
                            className="red"
                            onClick={() => removeSong(song.track.id)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
                {selectedSongs.tracks.length <= 0 &&
                    <li className="no-selected">You didn't select any song<br />The songs you select will appare here</li>
                }
            </ul>
            {selectedSongs.tracks.length >= 5 && <p className="error">You can select only up to 5 songs</p>}

            {advancedSettings &&
                <div className="advancedSettings">
                    <h3>Advanced Settings</h3>
                    <div className="advancedSettings__moods">
                        {moods.map((mood, i) => <button key={mood.name} className="transparent" onClick={() => handleMood(i)}>{mood.name}</button>)}
                    </div>
                    <label>
                        <p>Popularity</p>
                        <input type="range" name="target_popularity" min={0} max={100} step={1} onChange={handleSettings} />
                    </label>

                    <label>
                        <p>Danceability</p>
                        <input type="range" name="target_danceability" min={0} max={1} step={0.1} onChange={handleSettings} />
                    </label>

                    <label>
                        <p>Energy</p>
                        <input type="range" name="target_energy" min={0} max={1} step={0.1} onChange={handleSettings} />
                    </label>
                </div>
            }

            <button
                className="transparent advancedSettings__button"
                onClick={() => setAdvancedSettings(!advancedSettings)}
            >
                {advancedSettings ? "Close" : "Advanced Settings"}
            </button>


            <Link
                to={generateUrl(selectedSongs)}
                className={"submit blue" + (selectedSongs.tracks.length > 0 ? "" : " disabled")}
                style={selectedSongs.tracks.length > 0 ? { pointerEvents: "all" } : { pointerEvents: "none" }}
            >
                Get suggestions
            </Link>
        </div >
    )
}

export default SelectedSongs