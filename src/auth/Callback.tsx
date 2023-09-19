import { useEffect } from "react"

const Callback = () => {
    const redirect_uri = import.meta.env.MODE === "development" ? 'http://localhost:5173/callback' : "https://music-test-db56e.web.app/callback"
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code') || ''
    const codeVerifier = localStorage.getItem('code_verifier') || ''
    const client_id = '623812b29774477499af58e7558d5351'

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
        client_id,
        code_verifier: codeVerifier
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
                localStorage.setItem('expires_in', String(new Date().getTime() + data.expires_in * 1000));
                localStorage.setItem('refresh_token', data.refresh_token);
                localStorage.removeItem('code_verifier');
                window.location.href = '/'
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])

    return null
}

export default Callback