import PropTypes from 'prop-types';

function FornSearch({setSearchTerm, setSearchConfig, searchConfig}){
    
    const startSearchConfig = (e) => {
        const newSearchConfig = e.target.id.split('-')[3]
        setSearchConfig(newSearchConfig)
    }

    const triggerSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <div id="forn-search">
                <fieldset>
                    <legend>Configurar busca</legend>
                    <div className="setOrganizer">
                        <div className="option">
                            <label htmlFor="forn-search-config-id">ID</label>
                            <input type="radio" className='forn-search-config' name="forn-search-config" id="forn-search-config-id" onChange={startSearchConfig}/>
                        </div>
                        <div className="option">
                            <label htmlFor="forn-search-config-cnpj">CNPJ</label>
                            <input type="radio" className='forn-search-config' name="forn-search-config" id="forn-search-config-cnpj" onChange={startSearchConfig}/>
                        </div>
                        <div className="option">
                            <label htmlFor="forn-search-config-nome_fantasia">N. fantasia</label>
                            <input type="radio" className='forn-search-config' name="forn-search-config" id="forn-search-config-nome_fantasia" onChange={startSearchConfig}/>
                        </div>
                    </div>
                </fieldset>

                <input type="search" name="forn-search" id="forn-search" placeholder={`Buscar fornecedor por ${searchConfig}`} onInput={triggerSearch}/>
            </div>
        </>
    )
}

FornSearch.propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
    setSearchConfig: PropTypes.func.isRequired,
    searchConfig: PropTypes.string.isRequired
}

export default FornSearch;