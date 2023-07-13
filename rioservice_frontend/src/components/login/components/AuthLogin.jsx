export default function authLogin(e, login, password, setLoggedIn, setUser, host) {
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

    fetch(`http://${host}/app/auth/login`, options)
    .then(res => res.json())
    .then(data => {
        const status = data.user_logged_in
        const user = {
            "colab_id": data["colab_id"],
            "colab_matricula": data["colab_matricula"],
            "colab_nome": data["colab_nome"],
            "colab_nascimento": data["colab_nascimento"],
            "colab_cpf": data["colab_cpf"],
            "colab_rg": data["colab_rg"],
            "colab_est_civil": data["colab_est_civil"],
            "colab_naturalidade": data["colab_naturalidade"],
            "colab_fone": data["colab_fone"],
            "colab_celular": data["colab_celular"],
            "colab_escolaridade": data["colab_escolaridade"],
            "colab_admissao": data["colab_admissao"],
            "colab_email": data["colab_email"],
            "end_id": data["end_id"],
            "cargo_id": data["cargo_id"],
            "base_id": data["base_id"],
            "x-JWT": data["x-JWT"],
        }

        setUser(user)
        setLoggedIn(status)
    })
}