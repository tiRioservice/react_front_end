import PropTypes from 'prop-types';

function ItemSearch({setSearchTerm, setSearchConfig, searchConfig}){
    
    const startSearchConfig = (e) => {
        const newSearchConfig = e.target.id.split('-')[3]
        setSearchConfig(newSearchConfig)
    }

    const triggerSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <div id="item-search">
                <fieldset>
                    <legend>Configurar busca</legend>
                    <div className="setOrganizer">
                        <div className="option">
                            <label htmlFor="item-search-config-nome">Nome</label>
                            <input type="radio" className='item-search-config' name="item-search-config" id="item-search-config-nome" onChange={startSearchConfig}/>
                        </div>
                        <div className="option">
                            <label htmlFor="item-search-config-cpf">ID</label>
                            <input type="radio" className='item-search-config' name="item-search-config" id="item-search-config-item_id" onChange={startSearchConfig}/>
                        </div>
                    </div>
                </fieldset>

                <input type="search" name="item-search" id="item-search" placeholder={`Buscar item por ${searchConfig}`} onInput={triggerSearch}/>
            </div>
        </>
    )
}

ItemSearch.propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
    setSearchConfig: PropTypes.func.isRequired,
    searchConfig: PropTypes.string.isRequired
}

export default ItemSearch;