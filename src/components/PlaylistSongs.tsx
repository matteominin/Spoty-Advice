import React, { useEffect, useState } from 'react'
import '../css/playlistSongs.css'
import { SongInterface, SongItemInterface } from '../interfaces/playlist.interface'
import Song from './Song'

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
    const accessToken: string = localStorage.getItem("access_token") || ""
    const gradientColorArray = ["pink", "green", "blue"]

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=20`, {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })
            .then(res => {
                if (res.status === 401) throw new Error("Unauthorized")
                if (!res.ok) throw new Error("Error, can't load this playlist")

                return res.json()
            })
            .then(data => {
                setSongs(data)
            })
            .catch(e => {
                if (e.message === "Unauthorized") {
                    window.location.href = "/login"
                    return
                }
                setError(e.message || "Unexpected error")
            });
        setGradientColor(gradientColorArray[Math.floor(Math.random() * gradientColorArray.length)])
    }, [id])

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
            </ul>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default PlaylistSongs