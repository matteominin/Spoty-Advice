import { PlaylistItemInterface } from '../interfaces/playlist.interface'
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
            <div className="show_more">
                <div className="arrow-right"></div>
            </div>
        </div>
    )
}

export default Playlist