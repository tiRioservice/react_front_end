export async function InsertCotacao(setFeedbackMessage, cotacao_inserted, cotacao_id, options) {
    await fetch(`http://${options.headers['Host']}/app/v2/cotacoes/inserir`, options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.action)
        cotacao_inserted.current = data.cotacao_inserted,
        cotacao_id.current = data.new_cotacao_id
    })
}

export async function GetCotacaoList(setAllCotacoes, options) {
    await fetch(`http://${options.headers["Host"]}/app/v2/cotacoes/listar`, options)
    .then(res => res.json())
    .then(data => {
        setAllCotacoes(data)
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

export default function CotacaoCrud() {
    return {
        insertCotacao: InsertCotacao,
        getCotacaoList: GetCotacaoList,
        getCotacaoData: GetCotacaoData,
        updateCotacao: UpdateCotacao,
        removeCotacao: RemoveCotacao
    }
}