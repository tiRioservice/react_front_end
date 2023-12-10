import PropTypes from 'prop-types';

function CargoSearch({setSearchTerm, setSearchConfig, searchConfig}){
    
    const startSearchConfig = (e) => {
        const newSearchConfig = e.target.id.split('-')[3]
        setSearchConfig(newSearchConfig)
    }

    const triggerSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <div id="cargo-search">
                <fieldset>
                    <legend>Configurar busca</legend>
                    <div className="setOrganizer">
                        <div className="option">
                            <label htmlFor="cargo-search-config-nome">Nome</label>
                            <input type="radio" className='cargo-search-config' name="cargo-search-config" id="cargo-search-config-nome" onChange={startSearchConfig}/>
                        </div>
                        <div className="option">
                            <label htmlFor="cargo-search-config-cpf">ID</label>
                            <input type="radio" className='cargo-search-config' name="cargo-search-config" id="cargo-search-config-cargo_id" onChange={startSearchConfig}/>
                        </div>
                    </div>
                </fieldset>

                <input type="search" name="cargo-search" id="cargo-search" placeholder={`Buscar base por ${searchConfig}`} onInput={triggerSearch}/>
            </div>
        </>
    )
}

CargoSearch.propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
    setSearchConfig: PropTypes.func.isRequired,
    searchConfig: PropTypes.string.isRequired
}

export default CargoSearch;