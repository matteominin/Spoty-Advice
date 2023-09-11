import { useState, useEffect } from "react"
import Playlist from "./Playlist"
import PlaylistSongs from "./PlaylistSongs"
import { PlaylistItemInterface, SongItemInterface } from "../interfaces/playlist.interface"
import '../css/playlists.css'
import SelectedSongs from "./SelectedSongs"
import { SelectedSongsContext } from "../utils/context"

const Playlists = () => {
    const [userData, setUserData] = useState<any>(null)
    const [selectedSongs, setSelectedSongs] = useState<Array<SongItemInterface>>([])
    const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistItemInterface>()
    const [error, setError] = useState<string | null>(null)

    const accessToken = localStorage.getItem('access_token')

    useEffect(() => {
        fetch('https://api.spotify.com/v1/me/playlists?' + new URLSearchParams({ limit: "3" }), {
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
                if (e.message === 'Unauthorized') {
                    window.location.href = '/login'
                    return;
                }
                setError(e.message || 'Unexpected error')
            })
    }, [])

    const loadAll = async () => {
        let next: string = userData.next
        let allItems = [...userData.items]

        while (next) {
            const res = await fetch(next, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            if (!res.ok) {
                throw new Error('Error, can\'t load more')
            }
            const data = await res.json()
            next = data.next
            allItems = [...allItems, ...data.items]
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
            if (err.message === 'Unauthorized') {
                window.location.href = '/login'
                return;
            }

            setError(err.message || 'Unexpected error')
        }
    }

    const handleSelectPlaylist = (playlist: PlaylistItemInterface) => {
        if (selectedPlaylist && selectedPlaylist.id == playlist.id) return;
        setSelectedPlaylist(playlist)
    }

    return (
        <div className="playlistsContainer">
            <h2>Your Playlists</h2>
            <div className="playlistsContainer__items">
                {userData && userData.items.map((item: any) => (
                    <Playlist playlist={item} selectPlaylist={handleSelectPlaylist} key={item.id} />
                ))}
            </div>

            <div className="playlistsContainer__buttons">
                {userData && userData.next &&
                    <button className="green" onClick={loadMore}>Load more</button>
                }

                {userData && userData.next &&
                    <button className="transparent" onClick={loadAll}>Load all</button>
                }
                {error && <p className="error">{error}</p>}
            </div>
            {selectedPlaylist && <div className="selectSongs">
                <SelectedSongsContext.Provider value={{ selectedSongs, setSelectedSongs }}>
                    <PlaylistSongs {...selectedPlaylist} />
                    <SelectedSongs />
                </SelectedSongsContext.Provider>
            </div>}
        </div>
    )
}

export default Playlists