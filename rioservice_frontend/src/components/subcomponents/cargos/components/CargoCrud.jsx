export default function CargoCrud() {
    return {
        insertCargo,
        getCargoList,
        updateCargo
    }
}

export async function insertCargo(cargo_data, setFeedbackMessage, jwt, host) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify(cargo_data)
    }

    await fetch(`http://${host}/app/v2/cargos/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.msg)
    })
}

export async function getCargoList(jwt, setAllCargos, host) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
        },
    }

    await fetch(`http://${host}/app/v2/cargos/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllCargos(data)
    })
}

export async function updateCargo(jwt, data, setStatusMessage, host){

    const cargo_data = {
        "cargo_id": data.cargo_id,
        "cargo_nome": data.cargo_nome,
        "cargo_desc": data.cargo_desc
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify(cargo_data)
    }

    await fetch(`http://${host}/app/v2/cargos/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.msg)
    })
}