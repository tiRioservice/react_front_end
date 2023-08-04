import {useCallback, useEffect, useState} from 'react';
import AreaAlert from '../../common/AreaAlert';
import PropTypes from 'prop-types';

function BaseList({allBases, setHideDetails, setCurrentBase, searchTerm, searchConfig}){
    const [fetched, setFetched] = useState(false)
    const [allBasesFetched, setAllBasesFetched] = useState(undefined)
    const [bases, setBases] = useState(undefined)

    const fetchBases = useCallback(() => {
        setAllBasesFetched(allBases)

        if(allBasesFetched !== undefined) {
            setFetched(true)
        }
    }, [allBases, allBasesFetched])

    const getBase = useCallback((base) => {
        setCurrentBase(base)
        setHideDetails(false)
    }, [setCurrentBase, setHideDetails])

    const mapBases = useCallback(() => {
        setBases(allBases.data.map( base => {
            return (
                <tr className={`base base-${base.base_id}`} key={base.base_id} onClick={() => {getBase(base)}}>
                    <td>
                        {base.base_id} {/* TROCA : name / nome */}
                    </td>
                    <td>
                        {base.base_nome} {/* TROCA : name / nome */}
                    </td>
                    <td>
                        {base.base_desc}
                    </td>
                </tr>
            )
        }))
    }, [allBases, getBase])

    const filterBases = useCallback(() => {
        if(searchTerm !== undefined){
            if(searchTerm !== ""){
                if(searchConfig != "nome"){
                    setBases(allBases.data.filter(base => {
                        return base.base_id.toString().includes(searchTerm.toString());
                    }).map( base => {
                        return (
                            <tr className={`base base-${base.base_id}`} key={base.base_id} onClick={() => {getBase(base)}}>
                                <td>
                                    {base.base_id}
                                </td>
                                <td>
                                    {base.base_nome}
                                </td>
                                <td>
                                    {base.base_desc}
                                </td>
                            </tr>
                        )
                    }))
                } else {
                    setBases(allBases.data.filter(base => {
                        return base[`base_nome`].toLowerCase().includes(searchTerm.toLowerCase())
                    }).map( base => {
                        return (
                            <tr className={`base base-${base.base_id}`} key={base.base_id} onClick={() => {getBase(base)}}>
                                <td>
                                    {base.base_id}
                                </td>
                                <td>
                                    {base.base_matricula == 0 ? 'N/A' : base.base_matricula}
                                </td>
                                <td>
                                    {base.base_nome}
                                </td>
                                <td>
                                    {base.base_cpf}
                                </td>
                            </tr>
                        )
                    }))
                }
            } else {
                mapBases()
            }
        }
    }, [allBases, getBase, mapBases, searchConfig, searchTerm])

    useEffect(() => {
        if(allBases) {
            if(!fetched){
                if(!allBases.msg){
                    allBasesFetched === undefined && fetchBases();
                    filterBases();
                }
            }
        }

    }, [allBases, allBasesFetched, fetchBases, fetched, filterBases])

    return (
        <>
            {(bases !== undefined) ?
            (<div id="base-list">
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>nome</td>
                            <td>desc</td>
                        </tr>
                    </thead>
                    <tbody>
                        {bases}
                    </tbody>
                </table>
            </div>)
            : (<AreaAlert frase="Não há bases registradas! Experimente inserir uma para que o sistema possa indexá-la!" />)
            }
        </>
    )
}

BaseList.propTypes = {
    allBases: PropTypes.object,
    setHideDetails: PropTypes.func,
    setCurrentBase: PropTypes.func,
    searchTerm: PropTypes.string,
    searchConfig: PropTypes.string
}

export default BaseList;