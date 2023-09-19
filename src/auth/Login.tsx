import { generateRandomString, generateCodeChallenge } from "../utils/auth"

const Login = () => {
    const client_id = '623812b29774477499af58e7558d5351'
    const redirect_uri = import.meta.env.MODE === "development" ? 'http://localhost:5173/callback' : "https://music-test-db56e.web.app/callback"
    const codeVerifier = generateRandomString(128)

    const login = () => {
        generateCodeChallenge(codeVerifier)
            .then(codeChallenge => {
                let state = generateRandomString(16)
                let scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-modify'

                localStorage.setItem('code_verifier', codeVerifier)

                let args = new URLSearchParams({
                    response_type: 'code',
                    client_id,
                    scope,
                    redirect_uri,
                    state,
                    code_challenge_method: 'S256',
                    code_challenge: codeChallenge
                })
                console.log(`https://accounts.spotify.com/authorize?${args}`)
                window.location.href = `https://accounts.spotify.com/authorize?${args}`
            })
    }

    return <button className="login green" onClick={login}>Login</button>
}

export default Login