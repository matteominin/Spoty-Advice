import { createContext } from "react";
import { selectedSongsInterface } from "../interfaces/playlist.interface";

interface SelectedSongsContextInterface {
    selectedSongs: selectedSongsInterface,
    setSelectedSongs: React.Dispatch<React.SetStateAction<any>>
}

export const SelectedSongsContext = createContext<SelectedSongsContextInterface>({ selectedSongs: { tracks: [], settings: {} }, setSelectedSongs: () => { } })

interface AudioPlayerContextInterface {
    playingSong: { audio: HTMLAudioElement, preview_url: string },
    setPlayingSong: any
}

export const AudioPlayerContext = createContext<AudioPlayerContextInterface>(
    { playingSong: { audio: new Audio(), preview_url: "" }, setPlayingSong: () => { } }
)