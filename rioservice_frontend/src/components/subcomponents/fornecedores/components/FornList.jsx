import {useCallback, useEffect, useState} from 'react';
import AreaAlert from '../../common/AreaAlert';
import PropTypes from 'prop-types';

function FornList({allForns, setHideDetails, setCurrentForn, searchTerm, searchConfig}){
    const [fetched, setFetched] = useState(false)
    const [allFornsFetched, setAllFornsFetched] = useState(undefined)
    const [forns, setForns] = useState(undefined)

    const fetchForn = useCallback(() => {
        setAllFornsFetched(allForns)

        if (allFornsFetched !== undefined) {
            setFetched(true)
        }
    }, [allForns, allFornsFetched])

    const getForn = useCallback((forn) => {
        setCurrentForn(forn)
        setHideDetails(false)
    }, [setCurrentForn, setHideDetails])

    const mapForn = useCallback(() => {
        setForns(allForns.data.map( forn => {
            return (
                <tr className={`forn forn-${forn.forn_id}`} key={forn.forn_id} onClick={() => {getForn(forn)}}>
                    <td>
                        {forn.forn_id}
                    </td>
                    <td>
                        {forn.forn_cnpj == 0 ? 'N/A' : forn.forn_cnpj}
                    </td>
                    <td>
                        {forn.forn_nome_fantasia}
                    </td>
                </tr>
            )
        }))
    }, [allForns, getForn])

    const filterForn = useCallback(() => {
        if(searchTerm !== undefined){
            if(searchTerm !== ""){
                if(searchConfig === "id" || searchConfig === "cnpj"){
                    setForns(allForns.data.filter(forn => {
                        switch(searchConfig){
                            case "id":
                                return forn.forn_id.toString().includes(searchTerm.toString());
                            case "cnpj":
                                return forn.forn_cnpj.toString().includes(searchTerm.toString());
                        }
                    }).map( forn => {
                        return (
                            <tr className={`forn forn-${forn.forn_id}`} key={forn.forn_id} onClick={() => {getForn(forn)}}>
                                <td>
                                    {forn.forn_id}
                                </td>
                                <td>
                                    {forn.forn_cnpj == 0 ? 'N/A' : forn.forn_cnpj}
                                </td>
                                <td>
                                    {forn.forn_nome_fantasia}
                                </td>
                            </tr>
                        )
                    }))
                } else {
                    setForns(allForns.data.filter(forn => {
                        return forn[`forn_${searchConfig}`].toLowerCase().includes(searchTerm.toLowerCase())
                    }).map( forn => {
                        return (
                            <tr className={`forn forn-${forn.forn_id}`} key={forn.forn_id} onClick={() => {getForn(forn)}}>
                                <td>
                                    {forn.forn_id}
                                </td>
                                <td>
                                    {forn.forn_cnpj == 0 ? 'N/A' : forn.forn_cnpj}
                                </td>
                                <td>
                                    {forn.forn_nome_fantasia}
                                </td>
                            </tr>
                        )
                    }))
                }
            } else {
                mapForn()
            }
        }
    }, [allForns, searchTerm, getForn, mapForn, searchConfig])


    useEffect(() => {
        if(allForns){
            if(!fetched){
                if(!allForns.msg){
                    allFornsFetched == undefined && fetchForn();
                    filterForn();
                }
            }
        }

    }, [allForns, allFornsFetched, fetchForn, fetched, filterForn])

    return (
        <>
            {(forns !== undefined) ?
            (<div id="forn-list">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>CNPJ</td>
                            <td>Nome</td>
                        </tr>
                    </thead>
                    <tbody>
                        {forns}
                    </tbody>
                </table>
            </div>)
            : (<AreaAlert frase="Não há fornecedores registrados! Experimente inserir um para que o sistema possa indexá-lo!"/>)}
        </>
    )
}

FornList.propTypes = {
    allForns: PropTypes.object,
    setHideDetails: PropTypes.func,
    setCurrentForn: PropTypes.func,
    searchTerm: PropTypes.string,
    searchConfig: PropTypes.string
}

export default FornList;