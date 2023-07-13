import React, {useEffect, useState} from 'react';
import AreaAlert from '../../common/AreaAlert';

export default function BaseList({allBases, setHideDetails, setCurrentBase}){
    const [fetched, setFetched] = useState(false)
    const [allBasesFetched, setAllBasesFetched] = useState(undefined)
    const [bases, setBases] = useState(undefined)

    const fetchBases = () => {
        setAllBasesFetched(allBases)

        if(allBasesFetched !== undefined) {
            setFetched(true)
        }
    }

    const getBase = (base) => {
        setCurrentBase(base)
        setHideDetails(false)
    }

    const mapBases = () => {
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
    }


    useEffect(() => {
        if(allBases) {
            if(!fetched){
                if(!allBases.msg){
                    allBasesFetched === undefined && fetchBases();
                    mapBases();
                }
            }
        }

    }, [allBases, allBasesFetched])

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