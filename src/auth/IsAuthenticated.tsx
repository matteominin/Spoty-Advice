import NotAuthenticated from "../components/NotAuthenticated"

const IsAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const accessToken = localStorage.getItem('access_token')
    const expiresIn = localStorage.getItem('expires_in')

    if (!accessToken || !expiresIn) return <NotAuthenticated />
    const expirationDate = new Date(parseInt(expiresIn))

    //return <>{children}</>
    return <><p style={{ color: "black", position: "fixed", marginLeft: "200px" }}>expiration: {expirationDate.toString()}</p>{children}</>
}

export default IsAuthenticated