import { useContext, useState } from "react"
import { SongItemInterface } from "../interfaces/playlist.interface"
import { SelectedSongsContext } from '../utils/context'
import checkIcon from '../assets/check.png'
import deleteicon from '../assets/delete.png'
import '../css/searchItem.css'

const SearchItem = ({ track }: SongItemInterface) => {
    const { selectedSongs, setSelectedSongs } = useContext(SelectedSongsContext)
    const [deleteEffect, setDeleteEffect] = useState<boolean>(false)
    const selected = selectedSongs.find((song) => song.track.id === track.id) ? true : false

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
    const removeSong = (id: string) => {
        setSelectedSongs(selectedSongs.filter(song => song.track.id !== id))
        setDeleteEffect(false)
    }

    const searchItemClassName = () => {
        let className = "searchItem"
        if (selected) className += " selected"
        if (deleteEffect) className += " canDelete"
        return className
    }

    return (
        <div
            className={searchItemClassName()}
            onClick={() => selected ? removeSong(track.id) : selectSong({ track })}
            onMouseLeave={() => { if (selected) setDeleteEffect(true); console.log(deleteEffect) }}
        >
            <img className="image" src={track.album.images[2].url} alt={track.album.name} />

            <div className="text">
                <p className="name">{track.name}</p>
                <p className="artists">{getArtistsList(track.artists)}</p>
            </div>
            {selected && <img className="check" src={checkIcon} alt="check" />}
            {selected && <img className="delete" src={deleteicon} alt="delete" />}
        </div>
    )
}

export default SearchItem