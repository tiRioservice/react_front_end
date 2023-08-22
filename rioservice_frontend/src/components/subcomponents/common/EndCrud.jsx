export async function InsertEnd(setFeedbackMessage, end_id, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/enderecos/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.action)
        end_id.current = data.new_end
    })
}

export async function GetEndList(setAllEnds, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/enderecos/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllEnds(data)
    })
}

export async function GetEndData(setEnd, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/enderecos/buscar`, options)
    .then(res => res.json())
    .then(data => {
        setEnd(data)
    })
}

export async function GetEndBaseId(baseData, setBaseData, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/enderecos/buscar_id`, options)
    .then(res => res.json())
    .then(data => {
        setBaseData({...baseData, "end_id": data.end_id})
    })
}

export async function GetEndColabId(colabData, setColabData, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/enderecos/buscar_id`, options)
    .then(res => res.json())
    .then(data => {
        setColabData({...colabData, "end_id": data.end_id})
    })
}

export async function GetEndFornId(fornData, setFornData, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/enderecos/buscar_id`, options)
    .then(res => res.json())
    .then(data => {
        setFornData({...fornData, "end_id": data.end_id})
    })
}

export async function UpdateEnd(setStatusMessage, options) {
    await fetch(`http://${options['headers']['Host']}/app/v2/enderecos/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export async function RemoveEnd(options){
    await fetch(`http://${options.headers['Host']}/app/v2/enderecos/remover`, options)
}

export default function EndCrud() {
    return {
        insertEnd: InsertEnd,
        getEndList: GetEndList,
        getEndData: GetEndData,
        getEndBaseId: GetEndBaseId,
        getEndColabId: GetEndColabId,
        updateEnd: UpdateEnd,
        removeEnd: RemoveEnd,
    }
}