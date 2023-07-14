export default function BaseCrud() {
    return {
        insertBase,
        getBaseList,
        updateBase
    }
}

export async function insertBase(base_data, setFeedbackMessage, jwt, host, setBase_inserted) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify(base_data)
    }

    await fetch(`http://${host}/app/v2/bases/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.msg)
        setBase_inserted(data.base_inserted)
    })
}

export async function getBaseList(jwt, setAllBases, host) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
        },
    }

    await fetch(`http://${host}/app/v2/bases/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllBases(data)
    })
}

export async function updateBase(jwt, data, setStatusMessage, host){
    const base_data = {
        "base_id": data.base_id,
        "base_nome": data.base_nome,
        "base_desc": data.base_desc
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify(base_data)
    }

    await fetch(`http://${host}/app/v2/bases/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.msg)
    })
}