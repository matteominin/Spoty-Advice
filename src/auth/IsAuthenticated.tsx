import NotAuthenticated from "../components/NotAuthenticated"

const IsAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const accessToken = localStorage.getItem('access_token')

    return (accessToken ? <>{children}</> : <NotAuthenticated />)
}

export default IsAuthenticated