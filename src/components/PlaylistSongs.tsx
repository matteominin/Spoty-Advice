import { useEffect, useState, useContext } from 'react'
import '../css/playlistSongs.css'
import { SongInterface } from '../interfaces/playlist.interface'
import Song from './Song'
import { refreshAccessToken } from '../utils/auth'
import { refreshPageContext } from '../utils/context'

interface PropsInterface {
    id: string,
    name: string,
    images: Array<{ url: string }>,
    owner: { display_name: string },
    tracks: { total: number },
}

const PlaylistSongs = ({ id, name, images, owner, tracks }: PropsInterface) => {
    const [songs, setSongs] = useState<SongInterface>()
    const [gradientColor, setGradientColor] = useState<string>()
    const [error, setError] = useState<string>("")
    const { refresh, setRefresh } = useContext(refreshPageContext)
    const accessToken: string = localStorage.getItem("access_token") || ""
    const gradientColorArray = ["pink", "green", "blue"]

    useEffect(() => {
        setError("")

        fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=20`, {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })
            .then(res => {
                if (res.status === 401) {
                    // Unauthorized
                    refreshAccessToken(localStorage.getItem('refresh_token') as string)
                    setRefresh(!refresh)
                    return;
                }
                if (!res.ok) throw new Error("Error, can't load this playlist")

                return res.json()
            })
            .then(data => {
                setSongs(data)
            })
            .catch(e => {
                setError(e.message || "Unexpected error")
            });
        setGradientColor(gradientColorArray[Math.floor(Math.random() * gradientColorArray.length)])
    }, [id, refresh])

    const loadMore = async () => {

        if (!songs?.next) return;
        try {
            const res = await fetch(songs.next, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            })
            if (res.status === 401) {
                // Unauthorized
                refreshAccessToken(localStorage.getItem('refresh_token') as string)
                setRefresh(!refresh)
                return;
            }
            if (!res.ok) {
                throw new Error("Error, can't load more")
            }
            const data = await res.json()
            setSongs({ ...data, items: [...songs.items, ...data.items] })
        } catch (error: any) {
            setError(error.message || "Unexpected error")
        }

    }

    return (
        <div className='playlistSongs'>
            <div className={`backgroundGradient ${gradientColor}`}></div>
            <div className="playlistSongs__description">
                <img src={images[1].url} alt={name} />
                <div className="playlistSongs__description__text">
                    <p>Playlist</p>
                    <h2 className='name'>{name}</h2>
                    <p className='owner'>By <span>{owner.display_name}</span> • {tracks?.total} songs</p>
                </div>
            </div>
            <ul className="playlistSongs__songs">
                {songs && songs.items.map(({ track }, i) => <Song
                    track={track}
                    index={i}
                    key={track.id}
                />
                )}
                {songs?.next ?
                    <li
                        className='more transparent'
                        onClick={loadMore}
                    >
                        <span>Load More</span>
                    </li> :
                    <li className='more'><span>End of playlist</span></li>
                }
            </ul>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default PlaylistSongs