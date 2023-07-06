import React, {useEffect, useState} from 'react';

export default function ColabList({allColabs, setHideDetails, setCurrentColab}){
    const [fetched, setFetched] = useState(false)
    const [allColabsFetched, setAllColabsFetched] = useState(undefined)
    const [colabs, setColabs] = useState(undefined)

    const fetchColabs = () => {
        setAllColabsFetched(allColabs)
    }

    const getColab = (colab) => {
        setCurrentColab(colab)
        setHideDetails(false)
    }

    const mapColabs = () => {
        setColabs(allColabs.data.map( colab => {
            return (
                <tr className={`colab colab-${colab.colab_id}`} key={colab.colab_id} onClick={() => {getColab(colab)}}>
                    <td>
                        {colab.colab_matricula}
                    </td>
                    <td>
                        {colab.colab_nome}
                    </td>
                    <td>
                        {colab.colab_cpf}
                    </td>
                </tr>
            )
        }))
    }


    useEffect(() => {
        if(!fetched){
            allColabsFetched == undefined && fetchColabs();
        } else {
            mapColabs();
        }

        allColabsFetched != undefined && setFetched(true);

    }, [allColabs, allColabsFetched])

    return (
        <>
            <div id="colab-list">
                <table>
                    <thead>
                        <tr>
                            <td>Matr.</td>
                            <td>nome</td>
                            <td>CPF</td>
                        </tr>
                    </thead>
                    <tbody>
                        {colabs}
                    </tbody>
                </table>
            </div>
        </>
    )
}