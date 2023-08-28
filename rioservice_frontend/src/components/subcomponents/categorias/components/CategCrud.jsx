export async function InsertCateg(setFeedbackMessage, categ_inserted, categ_id, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/estoque/categorias/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.action)
        categ_inserted.current = data.categ_inserted,
        categ_id.current = data.new_categ_id
    })
}

export async function GetCategList(setAllCategs, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/estoque/categorias/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllCategs(data)
    })
}

export async function GetCategData(setCateg, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/estoque/categorias/buscar`, options)
    .then(res => res.json())
    .then(data => {
        setCateg(data)
    })
}

export async function UpdateCateg(setStatusMessage, options){
    await fetch(`http://${options.headers["Host"]}/app/v2/estoque/categorias/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export async function RemoveCateg(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/estoque/categorias/remover`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export default function CategCrud() {
    return {
        insertCateg: InsertCateg,
        getCategList: GetCategList,
        getCategData: GetCategData,
        updateCateg: UpdateCateg,
        removeCateg: RemoveCateg
    }
}