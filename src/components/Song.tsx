import { useContext } from 'react'
import { SongItemInterface } from '../interfaces/playlist.interface'
import { AudioPlayerContext, SelectedSongsContext } from '../utils/context'
import addIcon from '../assets/add.png'
import playIcon from '../assets/play.png'
import pauseIcon from '../assets/pause.png'
import '../css/song.css'

interface PropsInterface {
    track: {
        id: string,
        album: { name: string, images: Array<{ url: string }> },
        name: string,
        artists: Array<{ name: string }>,
        explictit: boolean,
        preview_url: string | null
    },
    songLimit?: boolean,
    index: number
}

const Song = ({ track, index, songLimit = true }: PropsInterface) => {
    const { selectedSongs, setSelectedSongs } = useContext(SelectedSongsContext)
    const { playingSong, setPlayingSong } = useContext(AudioPlayerContext)

    const getArtistsList = (artists: any) => {
        let artistsArray: Array<any> = []
        artists.forEach((artist: any) => {
            artistsArray = [...artistsArray, artist.name]
        })
        return artistsArray.join(', ')
    }

    const selectSong = (track: SongItemInterface) => {
        if (songLimit &&
            (selectedSongs.length >= 5 || selectedSongs.find(song => song.track.id === track.track.id))) return;  // TODO: add error message
        setSelectedSongs([...selectedSongs, track])
    }

    const removeSong = (id: string) => {
        setSelectedSongs(selectedSongs.filter(song => song.track.id !== id))
    }

    const isSelected = (id: string) => {
        return selectedSongs.find(song => song.track.id === id)
    }

    const playSong = () => {
        if (!track.preview_url) return

        if (playingSong.preview_url === track.preview_url) {
            playingSong.audio.pause()
            setPlayingSong({ audio: new Audio(), preview_url: "" })
            return
        }

        if (playingSong.preview_url) {
            playingSong.audio.pause()
        }

        const audio = new Audio(track.preview_url)

        audio.addEventListener("ended", function () {
            setPlayingSong({ audio: new Audio(), preview_url: "" })
        });

        audio.play()

        setPlayingSong({ audio, preview_url: track.preview_url })
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
            {isSelected(track.id) ?
                <button className='remove red' onClick={() => removeSong(track.id)}>Remove</button> :
                <button className='green' onClick={() => selectSong({ track })}>Add</button>
            }
            {playingSong.preview_url === track.preview_url ?
                <img className={track.preview_url ? 'player' : 'player disabled'} src={pauseIcon} onClick={playSong} alt="pause icon" />
                :
                <img className={track.preview_url ? 'player' : 'player disabled'} src={playIcon} onClick={playSong} alt="play icon" />
            }

            <img
                className="add"
                src={addIcon}
                alt="add icon"
                onClick={() => selectSong({ track })}
            />
        </li>
    )
}

export default Song