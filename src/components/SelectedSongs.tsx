import { useContext } from "react"
import { SelectedSongsContext } from "../utils/context"
import '../css/selectedSongs.css'

const SelectedSongs = () => {
    const { selectedSongs, setSelectedSongs } = useContext(SelectedSongsContext)

    const getArtistsList = (artists: any) => {
        let artistsArray: Array<any> = []
        artists.forEach((artist: any) => {
            artistsArray = [...artistsArray, artist.name]
        })
        return artistsArray.join(', ')
    }

    const removeSong = (id: string) => {
        const newSelectedSongs = selectedSongs.filter(song => song.track.id !== id)
        setSelectedSongs(newSelectedSongs)
    }

    return (
        <div className="selectedSongs">
            <h2>Selected Songs</h2>
            <ul className="selectedSongs__list">
                {selectedSongs.map(song => (
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
                {selectedSongs.length <= 0 &&
                    <li className="no-selected">You didn't select any song<br />The songs you select will appare here</li>
                }
            </ul>
            {selectedSongs.length >= 5 && <p className="error">You can select only up to 5 songs</p>}

            <button
                className="green submit"
                disabled={selectedSongs.length <= 0}
            >
                Get suggestions
            </button>
        </div >
    )
}

export default SelectedSongs