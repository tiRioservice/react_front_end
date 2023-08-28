import { useCallback, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import './scss/style.scss';
import BaseCrud from '../bases/components/BaseCrud';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function Estoque({user, host, setPage, fetchCategs, setAllBases}){
    const fetchBases = useCallback(() => {
        const crud = new BaseCrud();
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }
        
        crud.getBaseList(setAllBases, options)
    }, [user, host, setAllBases])

    const abrirCategorias = useCallback(() => {
        setPage("Categorias")
    }, [setPage])

    const abrirProdutos = useCallback(() => {
        setPage("Itens")
    }, [setPage])

    useEffect(() => {
        fetchCategs()
        fetchBases()
    }, [fetchCategs, fetchBases])

    return (
        <>
            <section id="estoque">
                <div className="estoqueMenu">
                    <button onClick={abrirCategorias}>Categorias</button>
                    <button onClick={abrirProdutos}>Itens</button>
                </div>
            </section>
        </>
    )
}

Estoque.propTypes = {
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    setPage: PropTypes.func.isRequired,
    fetchCategs: PropTypes.func.isRequired,
    setAllBases: PropTypes.func.isRequired
}

export default Estoque;