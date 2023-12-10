import { useEffect, useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import CommandPanel from './components/CommandPanel';
import InsertForm from './components/InsertForm';
import CotacaoList from './components/CotacaoList';
import CotacaoCrud from './components/CotacaoCrud';
import CotacaoDetails from './components/CotacaoDetails';
import CotacaoSearch from './components/CotacaoSearch';
import './scss/style.scss';

const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function Cotacoes({user, host}){
    const [insert, setInsert] = useState(false)
    const [search, setSearch] = useState(false)
    const [allCotacoes, setAllCotacoes] = useState(undefined)
    const [hideDetails, setHideDetails] = useState(true)
    const [currentCotacao, setCurrentCotacao] = useState(undefined)
    const [cotacaoInserted, setCotacaoInserted] = useState(undefined)
    const [cotacaoRemoved, setCotacaoRemoved] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchConfig, setSearchConfig] = useState("nome")

    const fetchList = useCallback(() => {
        const cotacaoCrud = new CotacaoCrud();
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        cotacaoCrud.getCotacaoList(setAllCotacoes, options)
    },[user, host])

    useEffect(() => {
        setCotacaoInserted({"cotacao_inserted":false})
        setCotacaoRemoved({"cotacao_removed":false})
        fetchList()
    }, [fetchList])

    useEffect(() => {
        if(cotacaoInserted !== undefined && "cotacao_inserted" in cotacaoInserted) {
            if(cotacaoInserted.cotacao_inserted == true){
                setCotacaoInserted({"cotacao_inserted":false})
                fetchList()
            }
        }
    }, [cotacaoInserted, host, user, fetchList])

    useEffect(() => {
        if(cotacaoRemoved != undefined && "cotacao_removed" in cotacaoRemoved) {
            if(cotacaoRemoved.Cotacao_removed == true){
                setCotacaoRemoved({"cotacao_removed":false})
                fetchList()
            }
        }
    }, [cotacaoRemoved, fetchList])

    return (
        <section id="cotacoes">
            {(!insert) ? ((!search) ? (<CommandPanel setInsert={setInsert} setSearch={setSearch} allCotacoes={(allCotacoes != undefined)?(allCotacoes):({})}/>):(<></>)) : (<></>)}

            {(insert) ? (<InsertForm host={host} user={user} setInsert={setInsert} setCotacaoInserted={setCotacaoInserted} cotacaoInserted={cotacaoInserted} fetchList={fetchList}/>) : (<></>)}

            {(search) ? (<CotacaoSearch setSearchTerm={setSearchTerm} setSearchConfig={setSearchConfig} searchConfig={searchConfig}/>) : (<></>)}

            <CotacaoList host={host} user={user} allCotacoes={allCotacoes} setHideDetails={setHideDetails} setCurrentCotacao={setCurrentCotacao} searchTerm={searchTerm} searchConfig={searchConfig}/>

            <CotacaoDetails host={host} hideDetails={hideDetails} setHideDetails={setHideDetails} currentCotacao={currentCotacao} user={user} setCotacaoRemoved={setCotacaoRemoved} fetchList={fetchList}/>
        </section>
    )
}

Cotacoes.propTypes = {
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired
}

export default Cotacoes;