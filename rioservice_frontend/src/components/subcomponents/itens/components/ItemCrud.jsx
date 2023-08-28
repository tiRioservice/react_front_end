export async function InsertItem(setFeedbackMessage, item_inserted, item_id, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/estoque/itens/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.action)
        item_inserted.current = data.item_inserted,
        item_id.current = data.new_item_id
    })
}

export async function GetItemList(setAllItems, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/estoque/itens/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllItems(data)
    })
}

export async function GetItemData(setItem, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/estoque/itens/buscar`, options)
    .then(res => res.json())
    .then(data => {
        setItem(data)
    })
}

export async function UpdateItem(setStatusMessage, options){
    await fetch(`http://${options.headers["Host"]}/app/v2/estoque/itens/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export async function RemoveItem(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/estoque/itens/remover`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export default function ItemCrud() {
    return {
        insertItem: InsertItem,
        getItemList: GetItemList,
        getItemData: GetItemData,
        updateItem: UpdateItem,
        removeItem: RemoveItem
    }
}