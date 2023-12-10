export async function InsertEstoque(setAll_ok, estoque_inserted, estoque_id, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/estoque/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setAll_ok(data.stock_inserted),
        estoque_inserted.current = data.stock_inserted,
        estoque_id.current = data.new_stock_id
    })
}

export async function GetEstoqueList(setAllEstoques, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/estoque/listar`, options)
    .then(res => res.json())
    .then(data => {
        if(typeof setAllEstoques != "function"){
            setAllEstoques.current = data
        } else {
            setAllEstoques(data)
        }
    })
}

export async function GetEstoqueData(setEstoque, estoque_id, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/estoque/buscar/${estoque_id}`, options)
    .then(res => res.json())
    .then(data => {
        setEstoque(data)
    })
}

export async function UpdateEstoque(options){
    await fetch(`http://${options.headers["Host"]}/app/v2/estoque/atualizar`, options)
    .then(res => res.json())
}

export async function RemoveEstoque(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/estoque/remover`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export default function EstoqueCrud() {
    return {
        insertEstoque: InsertEstoque,
        getEstoqueList: GetEstoqueList,
        getEstoqueData: GetEstoqueData,
        updateEstoque: UpdateEstoque,
        removeEstoque: RemoveEstoque
    }
}