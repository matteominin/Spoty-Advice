import { useEffect, useState } from "react"
import { SearchInterface } from "../interfaces/playlist.interface"
import SearchItem from "./SearchItem"
import searchIcon from '../assets/search.png'
import '../css/searchBar.css'

const SearchBar = () => {
    const [query, setQuery] = useState<string>('')
    const [results, setResults] = useState<SearchInterface>()
    const [error, setError] = useState<string>('')
    const accessToken: string = localStorage.getItem('access_token') as string

    useEffect(() => {
        if (!query) {
            setResults(undefined)
            return
        }
        const timeout = setTimeout(() => {
            search()
        }, 300)

        return () => clearInterval(timeout)
    }, [query])

    const hanldeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(encodeURIComponent(e.target.value))
    }

    const search = async () => {
        setError('')
        try {
            const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.status === 401) throw new Error('Unauthorized')
            if (!res.ok) throw new Error('Can\'t search data')

            const data = await res.json()
            setResults(data)
        } catch (error: any) {
            setResults(undefined)
            setError(error.message || "Unexpected error")
        }
    }
    return (
        <div className="searchBar">

            <div className="searchBox">
                <input
                    id="searchBox"
                    type="text"
                    name="query"
                    placeholder="Search for a song..."
                    onChange={hanldeQuery}
                />
                <label htmlFor="searchBox">
                    <img src={searchIcon} alt="search icon" />
                </label>
            </div>

            {error && <p className="error">{error}</p>}

            {<div className={results ? "results active" : "results"}>
                {results?.tracks?.items && results.tracks.items.map((track) => (<SearchItem key={track.id} track={track} />))}
            </div>}
            {results &&
                <button
                    className="close"
                    onClick={() => setResults(undefined)}
                >
                    Close
                </button>}
        </div>
    )
}

export default SearchBar