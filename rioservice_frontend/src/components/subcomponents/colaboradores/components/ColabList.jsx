import React, {useEffect, useState} from 'react';

export default function ColabList({allColabs}){
    const [fetched, setFetched] = useState(false)
    const [allColabsFetched, setAllColabsFetched] = useState(undefined)
    const [colabs, setColabs] = useState(undefined)

    const fetchColabs = () => {
        setAllColabsFetched(allColabs)
    }

    const mapColabs = () => {
        setColabs(allColabs.data.map( colab => {
            return (
                <tr className={`colab colab-${colab.colab_id}`} key={colab.colab_id}>
                    <td>
                        {colab.colab_matricula}
                    </td>
                    <td>
                        {colab.colab_nome}
                    </td>
                    <td>
                        {colab.colab_cpf}
                    </td>
                    <td>
                        ico
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
                            <td>Mat</td>
                            <td>nome</td>
                            <td>CPF</td>
                            <td>Ver</td>
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