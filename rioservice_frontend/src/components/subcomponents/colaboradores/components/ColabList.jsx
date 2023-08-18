import {useCallback, useEffect, useState} from 'react';
import AreaAlert from '../../common/AreaAlert';
import PropTypes from 'prop-types';

function ColabList({allColabs, setHideDetails, setCurrentColab, searchTerm, searchConfig}){
    const [fetched, setFetched] = useState(false)
    const [allColabsFetched, setAllColabsFetched] = useState(undefined)
    const [colabs, setColabs] = useState(undefined)

    const fetchColabs = useCallback(() => {
        setAllColabsFetched(allColabs)

        if (allColabsFetched !== undefined) {
            setFetched(true)
        }
    }, [allColabs, allColabsFetched])

    const getColab = useCallback((colab) => {
        setCurrentColab(colab)
        setHideDetails(false)
    }, [setCurrentColab, setHideDetails])

    const mapColabs = useCallback(() => {
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
    }, [allColabs, getColab])

    const filterColabs = useCallback(() => {
        if(searchTerm !== undefined){
            if(searchTerm !== ""){
                if(searchConfig === "matricula"){
                    setColabs(allColabs.data.filter(colab => {
                        return colab.colab_matricula.toString().includes(searchTerm.toString());
                    }).map( colab => {
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
                } else {
                    setColabs(allColabs.data.filter(colab => {
                        return colab[`colab_${searchConfig}`].toLowerCase().includes(searchTerm.toLowerCase())
                    }).map( colab => {
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
            } else {
                mapColabs()
            }
        }
    }, [allColabs, searchTerm, getColab, mapColabs, searchConfig])


    useEffect(() => {
        if(allColabs){
            if(!fetched){
                if(!allColabs.msg){
                    allColabsFetched == undefined && fetchColabs();
                    filterColabs();
                }
            }
        }

    }, [allColabs, allColabsFetched, fetchColabs, fetched, filterColabs])

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

ColabList.propTypes = {
    allColabs: PropTypes.object,
    setHideDetails: PropTypes.func,
    setCurrentColab: PropTypes.func,
    searchTerm: PropTypes.string,
    searchConfig: PropTypes.string
}

export default ColabList;