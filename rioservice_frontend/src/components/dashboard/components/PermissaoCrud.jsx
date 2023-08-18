export async function InsertPermissao(setFeedbackMessage, permissao_inserted, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/permissoes/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.action)
        permissao_inserted.current = data.permissao_inserted
    })
}

export async function GetPermissaoList(setAllPermissoes, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/permissoes/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllPermissoes(data)
    })
}

export async function GetPermissaoData(setPermData, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/permissoes/buscar`, options)
    .then(res => res.json())
    .then(data => {
        setPermData(data)
    })
}

export async function UpdatePermissao(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/permissoes/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export async function RemovePermissao(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/permissoes/remover`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export default function PermissaoCrud() {
    return {
        insertPermissao: InsertPermissao,
        getPermissaoList: GetPermissaoList,
        getPermissaoData: GetPermissaoData,
        updatePermissao: UpdatePermissao,
        removePermissao: RemovePermissao
    }
}