import {useCallback, useEffect, useState } from 'react';
import AreaAlert from '../../common/AreaAlert';
import PropTypes from 'prop-types';

function CotacaoList({allCotacoes, setHideDetails, setCurrentCotacao, searchTerm, searchConfig}){
    const [fetched, setFetched] = useState(false)
    const [allCotacoesFetched, setAllCotacoesFetched] = useState(undefined)
    const [cotacoes, setCotacoes] = useState(undefined)

    const getCotacao = useCallback((cotacao) => {
        setCurrentCotacao(cotacao)
        setHideDetails(false)

    }, [setCurrentCotacao, setHideDetails])

    const fetchCotacoes = useCallback(() => {
        setAllCotacoesFetched(allCotacoes)

        if(allCotacoesFetched !== undefined) {
            setFetched(true)
        }
    }, [allCotacoes, allCotacoesFetched])

    const mapCotacoes = useCallback(() => {
        setCotacoes(allCotacoes.data.map( cotacao => {
            return (
                <tr className={`cotacao cotacao-${cotacao.cot_id}`} key={cotacao.cot_id} onClick={() => {getCotacao(cotacao)}}>
                    <td>
                        {cotacao.cot_id} {/* TROCA : name / nome */}
                    </td>
                    <td>
                        {cotacao.colab_id} {/* TROCA : name / nome */}
                    </td>
                    <td>
                        {cotacao.cot_status} {/* TROCA : name / nome */}
                    </td>
                </tr>
            )
        }))
    }, [allCotacoes, getCotacao, setCotacoes])

    const filterCotacoes = useCallback(() => {
        if(searchTerm !== undefined){
            if(searchTerm !== ""){
                if(searchConfig != "nome"){
                    setCotacoes(allCotacoes.data.filter(cotacao => {
                        return cotacao.cot_id.toString().includes(searchTerm.toString());
                    }).map( cotacao => {
                        return (
                            <tr className={`cotacao cotacao-${cotacao.cot_id}`} key={cotacao.cot_id} onClick={() => {getCotacao(cotacao)}}>
                                <td>
                                    {cotacao.cot_id}
                                </td>
                            </tr>
                        )
                    }))
                } else {
                    setCotacoes(allCotacoes.data.filter(cotacao => {
                        return cotacao['cotacao_nome'].split(' ').join().includes(searchTerm);
                    }).map( cotacao => {
                        return (
                            <tr className={`cotacao cotacao-${cotacao.cot_id}`} key={cotacao.cot_id} onClick={() => {getCotacao(cotacao)}}>
                                <td>
                                    {cotacao.cot_id}
                                </td>
                            </tr>
                        )
                    }))
                }
            } else {
                mapCotacoes();
            }
        }
    }, [allCotacoes, getCotacao, mapCotacoes, searchTerm, searchConfig])

    useEffect(() => {
        if(allCotacoes) {
            if(!fetched){
                if(allCotacoes.data){
                    fetchCotacoes();
                    filterCotacoes();
                }
            }
        }

    }, [allCotacoes, allCotacoesFetched, fetchCotacoes, fetched, filterCotacoes])

    return (
        <>
            {(cotacoes !== undefined) ?
                (<div id="cargo-list">
                    <table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>colab</td>
                                <td>status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cotacoes}
                        </tbody>
                    </table>
                </div>)
            : (<AreaAlert frase="Não há cotações registradas! Experimente inserir uma para que o sistema possa indexá-la!"/>)
            }
        </>
    )
}

CotacaoList.propTypes = {
    host: PropTypes.string,
    user: PropTypes.object,
    allCotacoes: PropTypes.object,
    setHideDetails: PropTypes.func,
    setCurrentCotacao: PropTypes.func,
    searchTerm: PropTypes.string,
    searchConfig: PropTypes.string
}

export default CotacaoList;