import { createContext } from "react";
import { SongItemInterface } from "../interfaces/playlist.interface";

interface SelectedSongsContextInterface {
    selectedSongs: Array<SongItemInterface>,
    setSelectedSongs: React.Dispatch<React.SetStateAction<any>>
}

export const SelectedSongsContext = createContext<SelectedSongsContextInterface>({ selectedSongs: [] as Array<SongItemInterface>, setSelectedSongs: () => { } })