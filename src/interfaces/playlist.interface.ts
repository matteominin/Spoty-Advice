export interface PlaylistInterface {
    next: string,
    items: Array<PlaylistItemInterface>
}

export interface PlaylistItemInterface {
    id: string,
    name: string,
    images: Array<{ url: string }>,
    owner: { display_name: string },
    tracks: { total: number }
}

export interface SongInterface {
    next: string,
    items: Array<SongItemInterface>
}

export interface SongItemInterface {
    track: {
        id: string,
        album: { name: string, images: Array<{ url: string }> },
        name: string,
        artists: Array<{ name: string }>,
        explictit: boolean
    }
}

export interface SearchItemInterface {
    id: string,
    album: { name: string, images: Array<{ url: string }> },
    name: string,
    artists: Array<{ name: string }>,
    explictit: boolean
}

export interface SearchInterface {
    tracks: {
        items: Array<SearchItemInterface>
    }
}