export async function InsertForn(setFeedbackMessage, forn_inserted, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/fornecedores/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.action)
        forn_inserted.current = data.forn_inserted
    })
}

export async function GetFornList(setAllForns, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/fornecedores/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllForns(data)
    })
}

export async function GetFornData(setForn, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/fornecedores/buscar`, options)
    .then(res => res.json())
    .then(data => {
        setForn(data)
    })
}

export async function UpdateForn(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/fornecedores/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export async function RemoveForn(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/fornecedores/remover`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export default function FornCrud() {
    return {
        insertForn: InsertForn,
        getFornList: GetFornList,
        getFornData: GetFornData,
        updateForn: UpdateForn,
        removeForn: RemoveForn
    }
}