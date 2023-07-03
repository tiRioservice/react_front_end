export default function authLogin(e, login, password, setLoggedIn, setUser) {
    e.preventDefault()

    const data = {
        "data":{
            "colab_login": login,
            "colab_password": password
        }
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    }

    fetch("http://18.228.46.50/app/auth/login", options)
    .then(res => res.json())
    .then(data => {
        const status = data.user_logged_in
        const user = {
            "colab_nome": data.colab_nome,
        }

        setUser(user)
        setLoggedIn(status)
    })
}