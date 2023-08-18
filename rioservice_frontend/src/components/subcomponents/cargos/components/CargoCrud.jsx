export async function InsertCargo(setFeedbackMessage, cargo_inserted, cargo_id, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/cargos/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.action)
        cargo_inserted.current = data.cargo_inserted,
        cargo_id.current = data.new_cargo_id
    })
}

export async function GetCargoList(setAllCargos, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/cargos/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllCargos(data)
    })
}

export async function UpdateCargo(setStatusMessage, options){
    await fetch(`http://${options.headers["Host"]}/app/v2/cargos/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export async function RemoveCargo(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/cargos/remover`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export default function CargoCrud() {
    return {
        insertCargo: InsertCargo,
        getCargoList: GetCargoList,
        updateCargo: UpdateCargo,
        removeCargo: RemoveCargo
    }
}