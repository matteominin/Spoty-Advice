import { useState, useEffect } from "react"
import Playlist from "./Playlist"
import PlaylistSongs from "./PlaylistSongs"
import { PlaylistItemInterface } from "../interfaces/playlist.interface"
import '../css/playlists.css'

const Playlists = () => {
    const [userData, setUserData] = useState<any>(null)
    const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistItemInterface>()
    const [error, setError] = useState<string | null>(null)

    const accessToken = localStorage.getItem('access_token')

    useEffect(() => {
        fetch('https://api.spotify.com/v1/me/playlists?' + new URLSearchParams({ limit: "6" }), {   // TODO: remove limit
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
            .then(res => {
                if (res.status === 401) throw new Error('Unauthorized')
                if (!res.ok) throw new Error('HTTP status ' + res.status)

                return res.json();
            })
            .then(data => {
                setUserData(data)
            })
            .catch(e => {
                setError(e.message || 'Unexpected error')
            })
    }, [])

    const loadAll = async () => {
        let next: string = userData.next
        let allItems = [...userData.items]

        while (next) {
            try {
                const res = await fetch(next, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                })

                if (res.status === 401) throw new Error('Unauthorized')
                if (!res.ok) throw new Error('Error, can\'t load more')

                const data = await res.json()
                next = data.next
                allItems = [...allItems, ...data.items]
            } catch (error: any) {
                setError(error.message || 'Unexpected error')
            }
        }
        setUserData({ ...userData, items: allItems, next: null })
    }

    const loadMore = async () => {
        try {
            const res = await fetch(userData.next, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })

            if (res.status === 401) {
                throw new Error('Unauthorized')
            }

            if (!res.ok) {
                throw new Error('Error, can\'t load more')
            }

            const data = await res.json()
            setUserData({ ...data, items: [...userData.items, ...data.items] })
        } catch (err: any) {
            setError(err.message || 'Unexpected error')
        }
    }

    const handleSelectPlaylist = (playlist: PlaylistItemInterface) => {
        if (selectedPlaylist?.id == playlist.id) {
            setSelectedPlaylist(undefined)
            return;
        }
        setSelectedPlaylist(playlist)

        const selectSongs = document.querySelector('.selectSongs')
        selectSongs?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <div className="playlistsContainer">
            <h2>Your Playlists</h2>
            <div className="playlistsContainer__items">
                {userData && userData.items.map((item: any) => (
                    <Playlist selected={selectedPlaylist?.id === item.id} playlist={item} selectPlaylist={handleSelectPlaylist} key={item.id} />
                ))}
            </div>

            <div className="playlistsContainer__buttons">
                {userData && userData.next &&
                    <button className="blue" onClick={loadMore}>Load more</button>
                }

                {userData && userData.next &&
                    <button className="transparent" onClick={loadAll}>Load all</button>
                }
                {error && <p className="error">{error}</p>}
            </div>

            {selectedPlaylist && <div className="selectSongs">
                <PlaylistSongs {...selectedPlaylist} />
            </div>}
        </div>
    )
}

export default Playlists