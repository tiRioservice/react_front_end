import {useCallback, useEffect, useState} from 'react';
import AreaAlert from '../../common/AreaAlert';
import PropTypes from 'prop-types';

function BaseList({allBases, setHideDetails, setCurrentBase}){
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
        console.log(base)
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


    useEffect(() => {
        if(allBases) {
            if(!fetched){
                if(!allBases.msg){
                    allBasesFetched === undefined && fetchBases();
                    mapBases();
                }
            }
        }

    }, [allBases, allBasesFetched, fetchBases, fetched, mapBases])

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
    setCurrentBase: PropTypes.func
}

export default BaseList;