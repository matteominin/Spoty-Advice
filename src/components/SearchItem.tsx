import { SongItemInterface } from "../interfaces/playlist.interface"
import '../css/searchItem.css'

const SearchItem = ({ track }: SongItemInterface) => {

    const getArtistsList = (artists: any) => {
        let artistsArray: Array<any> = []
        artists.forEach((artist: any) => {
            artistsArray = [...artistsArray, artist.name]
        })
        return artistsArray.join(', ')
    }

    return (
        <div className="searchItem">
            <img className="image" src={track.album.images[2].url} alt={track.album.name} />

            <div className="text">
                <p className="name">{track.name}</p>
                <p className="artists">{getArtistsList(track.artists)}</p>
            </div>
        </div>
    )
}

export default SearchItem