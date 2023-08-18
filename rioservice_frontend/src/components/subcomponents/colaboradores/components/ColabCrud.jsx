export async function InsertColab(setFeedbackMessage, colab_inserted, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/colaboradores/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.action)
        colab_inserted.current = data.colab_inserted
    })
}

export async function GetColabList(setAllColabs, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/colaboradores/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllColabs(data)
    })
}

export async function GetColabData(setColab, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/colaboradores/buscar`, options)
    .then(res => res.json())
    .then(data => {
        setColab(data)
    })
}

export async function UpdateColab(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/colaboradores/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export async function RemoveColab(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/colaboradores/remover`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export default function ColabCrud() {
    return {
        insertColab: InsertColab,
        getColabList: GetColabList,
        getColabData: GetColabData,
        updateColab: UpdateColab,
        removeColab: RemoveColab
    }
}