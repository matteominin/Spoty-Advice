import { PlaylistItemInterface } from '../interfaces/playlist.interface'
import arrowIcon from '../assets/arrow.png'
import '../css/playlist.css'

interface PlaylistProps {
    playlist: PlaylistItemInterface,
    selected: boolean,
    selectPlaylist: (playlist: PlaylistItemInterface) => void
}

const Playlist = ({ playlist, selected, selectPlaylist }: PlaylistProps) => {
    return (
        <div className={selected ? "playlist selected" : "playlist"} onClick={() => selectPlaylist(playlist)}>
            <img src={playlist.images[1].url} alt={playlist.name} />
            <p className='name'>{playlist.name}</p>
            <img className='arrow' src={arrowIcon} alt="arrow icon" />
        </div>
    )
}

export default Playlist