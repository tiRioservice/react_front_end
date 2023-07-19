export default function EndCrud() {
    return {
        insertEnd,
        getEndList,
        getEndData,
        getEndBaseId,
        getEndColabId,
        updateEnd
    }
}

export async function insertEnd(end_data, setFeedbackMessage, jwt, host, setEndereco_inserted) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify(end_data)
    }

    await fetch(`http://${host}/app/v2/enderecos/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.msg)
        setEndereco_inserted(data.endereco_inserted)
    })
}

export async function getEndList(jwt, setAllEnds, host) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
        },
    }

    await fetch(`http://${host}/app/v2/enderecos/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllEnds(data)
    })
}

export async function getEndData(body, jwt, host, setEnd) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify(body)
    }

    await fetch(`http://${host}/app/v2/enderecos/buscar`, options)
    .then(res => res.json())
    .then(data => {
        setEnd(data)
    })
}

export async function getEndBaseId(endRequiredData, jwt, host, baseData, setBaseData) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify(endRequiredData)
    }

    await fetch(`http://${host}/app/v2/enderecos/buscar_id`, options)
    .then(res => res.json())
    .then(data => {
        setBaseData({...baseData, "end_id": data.end_id})
    })
}

export async function getEndColabId(endRequiredData, jwt, host, colabData, setColabData) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify(endRequiredData)
    }

    await fetch(`http://${host}/app/v2/enderecos/buscar_id`, options)
    .then(res => res.json())
    .then(data => {
        setColabData({...colabData, "end_id": data.end_id})
    })
}

export async function updateEnd(jwt, data, setStatusMessage, host){

    const end_data = {
        "End_id": data.End_id,
        "End_nome": data.End_nome,
        "End_desc": data.End_desc
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify(end_data)
    }

    await fetch(`http://${host}/app/v2/enderecos/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.msg)
    })
}