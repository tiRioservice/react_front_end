export async function InsertCargoConfig(setFeedbackMessage, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/cargo_config/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.action)
    })
}

export async function GetCargoConfigList(setUserCargoConfig, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/cargo_config/listar`, options)
    .then(res => res.json())
    .then(data => {
        setUserCargoConfig(data)
    })
}

export async function GetCargoConfigData(setCargoConfig, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/cargo_config/buscar`, options)
    .then(res => res.json())
    .then(data => {
        setCargoConfig(data)
    })
}

export async function UpdateCargoConfig(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/cargo_config/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export async function RemoveCargoConfig(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/cargo_config/remover`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export default function CargoConfigCrud() {
    return {
        insertCargoConfig: InsertCargoConfig,
        getCargoConfigList: GetCargoConfigList,
        getCargoConfigData: GetCargoConfigData,
        updateCargoConfig: UpdateCargoConfig,
        removeCargoConfig: RemoveCargoConfig
    }
}