export async function Insert(modelName, options, inputData=null) {
        const url = `http://${options.headers['Host']}/app/v2/${modelName.toLowerCase()}/inserir`
        await fetch(url, options)
        .then(res => res.json())
        .then(data => {
            if(inputData != null){
                inputData(data)
            }
        })
}

export async function GetList(modelName, options, inputData=null) {
    const url = `http://${options.headers['Host']}/app/v2/${modelName.toLowerCase()}/listar`
    await fetch(url, options)
    .then(res => res.json())
    .then(data => {
        if(inputData != null){
            inputData(data)
        }
    })
}

export async function GetCotacaoData(setCotacao, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/cotacoes/buscar`, options)
    .then(res => res.json())
    .then(data => {
        setCotacao(data)
    })
}

export async function UpdateCotacao(setStatusMessage, options){
    await fetch(`http://${options.headers["Host"]}/app/v2/cotacoes/atualizar`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

export async function RemoveCotacao(setStatusMessage, options){
    await fetch(`http://${options.headers['Host']}/app/v2/cotacoes/remover`, options)
    .then(res => res.json())
    .then(data => {
        setStatusMessage(data.action)
    })
}

const CrudProtoCon = () => {
        return {
            insert: eval(`Insert`),
            getList: eval("GetList"),
            getData: "GetData",
            update: "Update",
            remove: "Remove"
        }
    }

export default CrudProtoCon;