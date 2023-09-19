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
                client_id: "623812b29774477499af58e7558d5351",
                refresh_token: refreshToken,
            })
        })

        if (!res.ok) {
            throw new Error('Failed to refresh access token')
        }

        return res.json()
    } catch (error) {
        throw new Error("Unexpected error")
    }
}