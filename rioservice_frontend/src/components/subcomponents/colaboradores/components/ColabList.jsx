import React, {useEffect, useState} from 'react';
import AreaAlert from '../../common/AreaAlert';

export default function ColabList({allColabs, setHideDetails, setCurrentColab}){
    const [fetched, setFetched] = useState(false)
    const [allColabsFetched, setAllColabsFetched] = useState(undefined)
    const [colabs, setColabs] = useState(undefined)

    const fetchColabs = () => {
        setAllColabsFetched(allColabs)

        if (allColabsFetched !== undefined) {
            setFetched(true)
        }
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
                        {colab.colab_id}
                    </td>
                    <td>
                        {colab.colab_matricula == 0 ? 'N/A' : colab.colab_matricula}
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
        if(allColabs){
            if(!fetched){
                if(!allColabs.msg){
                    allColabsFetched == undefined && fetchColabs();
                    mapColabs();
                }
            }
        }

    }, [allColabs, allColabsFetched])

    return (
        <>
            {(colabs !== undefined) ?
            (<div id="colab-list">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Matr.</td>
                            <td>Nome</td>
                            <td>CPF</td>
                        </tr>
                    </thead>
                    <tbody>
                        {colabs}
                    </tbody>
                </table>
            </div>)
            : (<AreaAlert frase="Não há colaboradores registrados! Experimente inserir um para que o sistema possa indexá-lo!"/>)}
        </>
    )
}