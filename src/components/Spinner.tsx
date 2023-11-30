import { useContext } from 'react'
import '../css/spinner.css'
import { loadingContext } from '../utils/context'

const Spinner = () => {
    const { isLoading, } = useContext(loadingContext)

    return isLoading ?
        <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
        :
        null
}

export default Spinner