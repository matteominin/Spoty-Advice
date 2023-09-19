import NotAuthenticated from "../components/NotAuthenticated"

const IsAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const accessToken = localStorage.getItem('access_token')
    const expiresIn = localStorage.getItem('expires_in')

    if (!accessToken || !expiresIn) return <NotAuthenticated />

    const expiresInDate = new Date(parseInt(expiresIn))
    const now = new Date()

    if (expiresInDate < now) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('code_verifier')

    }

    return <>{children}{accessToken}</>
}

export default IsAuthenticated