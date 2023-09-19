import NotAuthenticated from "../components/NotAuthenticated"
import { refreshAccessToken } from "../utils/auth"

const IsAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const accessToken = localStorage.getItem('access_token')
    const expiresIn = localStorage.getItem('expires_in')

    if (!accessToken || !expiresIn) return <NotAuthenticated />

    const expiresInDate = new Date(parseInt(expiresIn))
    const now = new Date()

    if (expiresInDate < now) {
        const refreshToken = localStorage.getItem('refresh_token')
        localStorage.clear()

        if (!refreshToken) return <NotAuthenticated />

        console.log("refreshing token")

        refreshAccessToken(refreshToken)
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('expires_in', String(new Date().getTime() + data.expires_in * 1000));
                localStorage.setItem('refresh_token', data.refresh_token);
            });
    }

    return <>{children}</>
}

export default IsAuthenticated