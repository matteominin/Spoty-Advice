export const CLIENT_ID = "623812b29774477499af58e7558d5351"

export const generateRandomString = (length: number) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export const generateCodeChallenge = async (codeVerifier: string) => {
    function base64encode(string: ArrayBuffer) {
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(string)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
}

export const refreshAccessToken = async (refreshToken: string) => {
    try {
        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                client_id: CLIENT_ID,
                refresh_token: refreshToken,
            })
        })

        if (!res.ok) {
            throw new Error('Failed to refresh access token')
        }

        const data = await res.json()

        await localStorage.setItem('access_token', data.access_token);
        await localStorage.setItem('expires_in', String(new Date().getTime() + data.expires_in * 1000));
        await localStorage.setItem('refresh_token', data.refresh_token);
        return true;
    } catch (error) {
        localStorage.clear()
        return false;
    }
}

export const isExpired = () => {
    const expiresIn = localStorage.getItem('expires_in')
    if (!expiresIn) return true
    const now = new Date()
    const expirationDate = new Date(parseInt(expiresIn))

    return now > expirationDate
}