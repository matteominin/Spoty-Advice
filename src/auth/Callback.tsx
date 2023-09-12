import { useEffect } from "react"

const Callback = () => {
    const redirect_uri = 'http://localhost:5173/callback'
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code') || ''
    const codeVerifier = localStorage.getItem('code_verifier') || ''
    const client_id = '623812b29774477499af58e7558d5351'
    const client_secret = 'd5e3c3e10d8f4d9daa5ea27b4794937c'

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
        client_id,
        code_verifier: codeVerifier,
        client_secret
    })

    useEffect(() => {
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP status ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                window.location.href = '/'
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])

    return (
        <div className="callback">
        </div>
    )
}

export default Callback