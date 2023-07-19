export async function InsertColab(colab_data, setFeedbackMessage, jwt, host, setColab_inserted) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + jwt
        },
        body: JSON.stringify(colab_data)
    }

    await fetch(`http://${host}/app/auth/signup`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.msg)
        setColab_inserted(data.colab_inserted)
    })
}

export async function GetColabList(jwt, setAllColabs, host) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
        },
    }

    await fetch(`http://${host}/app/v2/colaboradores/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllColabs(data)
    })
}

export async function UpdateColab(jwt, data, setStatusMessage, host){
    console.log("Enviando requisicao para o servidor")
    console.log("jwt: " + jwt)
    console.log("data: " + data)

    const colab_data = {
        "colab_id": data.colab_id,
        "colab_matricula": data.colab_matricula,
        "colab_nome": data.colab_nome,
        "colab_cpf": data.colab_cpf,
        "colab_login": data.colab_login
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify(colab_data)
    }

    await fetch(`http://${host}/app/v2/colaboradores/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setStatusMessage(data.msg)
    })
}

export default function ColabCrud() {
    return {
        insertColab: InsertColab,
        getColabList: GetColabList,
        updateColab: UpdateColab,
    }
}