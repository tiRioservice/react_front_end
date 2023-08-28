import {useCallback, useEffect, useState} from 'react';
import AreaAlert from '../../common/AreaAlert';
import PropTypes from 'prop-types';

function CategList({allCategs, setHideDetails, setCurrentCateg, searchTerm, searchConfig}){
    const [fetched, setFetched] = useState(false)
    const [allCategsFetched, setAllCategsFetched] = useState(undefined)
    const [categorias, setCategorias] = useState(undefined)

    const fetchCategs = useCallback(() => {
        setAllCategsFetched(allCategs)

        if(allCategsFetched !== undefined) {
            setFetched(true)
        }
    }, [allCategs, allCategsFetched])

    const getCateg = useCallback((categ) => {
        setCurrentCateg(categ)
        setHideDetails(false)
    }, [setCurrentCateg, setHideDetails])

    const mapCategs = useCallback(() => {
        setCategorias(allCategs.categ_list.map( categ => {
            return (
                <tr className={`categ categ-${categ.categ_id}`} key={categ.categ_id} onClick={() => {getCateg(categ)}}>
                    <td>
                        {categ.categ_id} {/* TROCA : name / nome */}
                    </td>
                    <td>
                        {categ.categ_nome} {/* TROCA : name / nome */}
                    </td>
                    <td>
                        {categ.categ_desc}
                    </td>
                </tr>
            )
        }))
    }, [allCategs, getCateg])

    const filterCategs = useCallback(() => {
        if(searchTerm !== undefined){
            if(searchTerm !== ""){
                if(searchConfig != "nome"){
                    setCategorias(allCategs.categ_list.filter( categ => {
                        return categ.categ_id.toString().includes(searchTerm.toString());
                    }).map( categ => {
                        return (
                            <tr className={`categ categ-${categ.categ_id}`} key={categ.categ_id} onClick={() => {getCateg(categ)}}>
                                <td>
                                    {categ.categ_id}
                                </td>
                                <td>
                                    {categ.categ_nome}
                                </td>
                                <td>
                                    {categ.categ_desc}
                                </td>
                            </tr>
                        )
                    }))
                } else {
                    setCategorias(allCategs.categ_list.filter(categ => {
                        return categ['categ_nome'].split(' ').join().includes(searchTerm);
                    }).map( categ => {
                        return (
                            <tr className={`categ categ-${categ.categ_id}`} key={categ.categ_id} onClick={() => {getCateg(categ)}}>
                                <td>
                                    {categ.categ_id}
                                </td>
                                <td>
                                    {categ.categ_nome}
                                </td>
                                <td>
                                    {categ.categ_desc}
                                </td>
                            </tr>
                        )
                    }))
                }
            } else {
                mapCategs();
            }
        }
    }, [allCategs, getCateg, mapCategs, searchTerm, searchConfig, setCategorias])

    useEffect(() => {
        if(allCategs) {
            if(fetched != undefined){
                fetchCategs();
                filterCategs();
            }

        }

    }, [allCategs, allCategsFetched, fetchCategs, fetched, filterCategs])

    return (
        <>
            {(categorias !== undefined) ?
                (<div id="categ-list">
                    <table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Nome</td>
                                <td>Desc</td>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias}
                        </tbody>
                    </table>
                </div>)
            : (<AreaAlert frase="Não há categoriass registradas! Experimente inserir uma para que o sistema possa indexá-la!"/>)
            }
        </>
    )
}

CategList.propTypes = {
    host: PropTypes.string,
    user: PropTypes.object,
    allCategs: PropTypes.object,
    setHideDetails: PropTypes.func,
    setCurrentCateg: PropTypes.func,
    searchTerm: PropTypes.string,
    searchConfig: PropTypes.string,
}

export default CategList;