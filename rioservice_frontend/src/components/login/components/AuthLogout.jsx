export default function authLogout(jwt, setLoggedIn, setUser, host) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + jwt
        }
    }

    fetch(`http://${host}/app/auth/logout`, options)
    .then(res => res.json())
    .then(data => {
        setLoggedIn(false)
        setUser(undefined)
    })
}