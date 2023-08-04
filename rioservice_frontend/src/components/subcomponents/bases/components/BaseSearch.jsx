import PropTypes from 'prop-types';

function BaseSearch({setSearchTerm, setSearchConfig, searchConfig}){
    
    const startSearchConfig = (e) => {
        const newSearchConfig = e.target.id.split('-')[3]
        setSearchConfig(newSearchConfig)
    }

    const triggerSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <div id="base-search">
                <fieldset>
                    <legend>Configurar busca</legend>
                    <div className="setOrganizer">
                        <div className="option">
                            <label htmlFor="base-search-config-nome">Nome</label>
                            <input type="radio" className='base-search-config' name="base-search-config" id="base-search-config-nome" onChange={startSearchConfig}/>
                        </div>
                        <div className="option">
                            <label htmlFor="base-search-config-cpf">ID</label>
                            <input type="radio" className='base-search-config' name="base-search-config" id="base-search-config-base_id" onChange={startSearchConfig}/>
                        </div>
                    </div>
                </fieldset>

                <input type="search" name="base-search" id="base-search" placeholder={`Buscar base por ${searchConfig}`} onInput={triggerSearch}/>
            </div>
        </>
    )
}

BaseSearch.propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
    setSearchConfig: PropTypes.func.isRequired,
    searchConfig: PropTypes.string.isRequired
}

export default BaseSearch;