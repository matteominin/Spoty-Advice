import { createContext } from "react";
import { SongItemInterface } from "../interfaces/playlist.interface";

interface SelectedSongsContextInterface {
    selectedSongs: Array<SongItemInterface>,
    setSelectedSongs: React.Dispatch<React.SetStateAction<any>>
}

export const SelectedSongsContext = createContext<SelectedSongsContextInterface>({ selectedSongs: [] as Array<SongItemInterface>, setSelectedSongs: () => { } })

interface AudioPlayerContextInterface {
    playingSong: { audio: HTMLAudioElement, preview_url: string },
    setPlayingSong: any
}

export const AudioPlayerContext = createContext<AudioPlayerContextInterface>(
    { playingSong: { audio: new Audio(), preview_url: "" }, setPlayingSong: () => { } }
)