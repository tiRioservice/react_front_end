import PropTypes from 'prop-types';

function CategSearch({setSearchTerm, setSearchConfig, searchConfig}){
    
    const startSearchConfig = (e) => {
        const newSearchConfig = e.target.id.split('-')[3]
        setSearchConfig(newSearchConfig)
    }

    const triggerSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <div id="categ-search">
                <fieldset>
                    <legend>Configurar busca</legend>
                    <div className="setOrganizer">
                        <div className="option">
                            <label htmlFor="categ-search-config-nome">Nome</label>
                            <input type="radio" className='categ-search-config' name="categ-search-config" id="categ-search-config-nome" onChange={startSearchConfig}/>
                        </div>
                        <div className="option">
                            <label htmlFor="categ-search-config-cpf">ID</label>
                            <input type="radio" className='categ-search-config' name="categ-search-config" id="categ-search-config-categ_id" onChange={startSearchConfig}/>
                        </div>
                    </div>
                </fieldset>

                <input type="search" name="categ-search" id="categ-search" placeholder={`Buscar base por ${searchConfig}`} onInput={triggerSearch}/>
            </div>
        </>
    )
}

CategSearch.propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
    setSearchConfig: PropTypes.func.isRequired,
    searchConfig: PropTypes.string.isRequired
}

export default CategSearch;