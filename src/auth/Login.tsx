import { generateRandomString, generateCodeChallenge } from "../utils/auth"
import { useEffect } from "react"


const Login = () => {
    const client_id = '623812b29774477499af58e7558d5351'
    const redirect_uri = 'https://music-test-db56e.web.app/callback'        //https://music-test-db56e.web.app/callback
    const codeVerifier = generateRandomString(128)

    useEffect(() => {
        generateCodeChallenge(codeVerifier)
            .then(codeChallange => {
                let state = generateRandomString(16)
                let scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative'

                localStorage.setItem('code_verifier', codeVerifier)

                let args = new URLSearchParams({
                    response_type: 'code',
                    client_id,
                    scope,
                    redirect_uri,
                    state,
                    code_challange_method: 'S256',
                    code_challange: codeChallange
                })
                window.location.href = `https://accounts.spotify.com/authorize?${args}`
            })
    }, [])

    return (
        <div>Login</div>
    )
}

export default Login