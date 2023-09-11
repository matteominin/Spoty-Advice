import { useContext } from 'react'
import { SongItemInterface } from '../interfaces/playlist.interface'
import { SelectedSongsContext } from '../utils/context'
import '../css/song.css'

interface PropsInterface {
    track: {
        id: string,
        album: { name: string, images: Array<{ url: string }> },
        name: string,
        artists: Array<{ name: string }>,
        explictit: boolean
    },
    index: number
}

const Song = ({ track, index }: PropsInterface) => {
    const { selectedSongs, setSelectedSongs } = useContext(SelectedSongsContext)
    const getArtistsList = (artists: any) => {
        let artistsArray: Array<any> = []
        artists.forEach((artist: any) => {
            artistsArray = [...artistsArray, artist.name]
        })
        return artistsArray.join(', ')
    }

    const selectSong = (track: SongItemInterface) => {
        if (selectedSongs.length >= 5 || selectedSongs.find(song => song.track.id === track.track.id)) return;  // TODO: add error message
        setSelectedSongs([...selectedSongs, track])
    }

    return (
        <li className="song">
            <p className="index">{index + 1}</p>
            <div className="image-container">
                <img src={track.album.images[2].url} alt={track.name} />
            </div>

            <div className="text">
                <p className='name'>{track.name}</p>
                <p className='artist'>{getArtistsList(track.artists)}</p>
            </div>

            <p className='album'>{track.album.name}</p>
            <button
                className='green'
                onClick={() => selectSong({ track })}
            >
                Add
            </button>
        </li>
    )
}

export default Song