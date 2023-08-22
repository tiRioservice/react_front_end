import { useCallback } from 'react';
import { PropTypes } from 'prop-types';
import './scss/style.scss';

function Estoque({setPage}){
    const abrirCategorias = useCallback(() => {
        setPage("Categorias")
    }, [setPage])

    const abrirProdutos = useCallback(() => {
        setPage("Produtos")
    }, [setPage])

    return (
        <>
            <section id="estoque">
                <div className="estoqueMenu">
                    <button onClick={abrirCategorias}>Categorias</button>
                    <button onClick={abrirProdutos}>Produtos</button>
                </div>
            </section>
        </>
    )
}

Estoque.propTypes = {
    setPage: PropTypes.func.isRequired
}

export default Estoque;