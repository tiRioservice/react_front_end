export async function InsertBase(setFeedbackMessage, base_inserted, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/bases/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.action)
        base_inserted.current = data.base_inserted
    })
}

export async function GetBaseList(setAllBases, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/bases/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllBases(data)
    })
}

export async function GetBaseData(setBase, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/bases/buscar`, options)
    .then(res => res.json())
    .then(data => {
        setBase(data)
    })
}

export async function UpdateBase(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/bases/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export async function RemoveBase(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/bases/remover`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export default function BaseCrud() {
    return {
        insertBase: InsertBase,
        getBaseList: GetBaseList,
        getBaseData: GetBaseData,
        updateBase: UpdateBase,
        removeBase: RemoveBase
    }
}