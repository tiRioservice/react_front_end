import PropTypes from 'prop-types';

function ColabSearch({setSearchTerm, setSearchConfig, searchConfig}){
    
    const startSearchConfig = (e) => {
        const newSearchConfig = e.target.id.split('-')[3]
        setSearchConfig(newSearchConfig)
    }

    const triggerSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <div id="colab-search">
                <fieldset>
                    <legend>Configurar busca</legend>
                    <div className="setOrganizer">
                        <div className="option">
                            <label htmlFor="colab-search-config-matricula">Matrícula</label>
                            <input type="radio" className='colab-search-config' name="colab-search-config" id="colab-search-config-matricula" onChange={startSearchConfig}/>
                        </div>
                        <div className="option">
                            <label htmlFor="colab-search-config-nome">Nome</label>
                            <input type="radio" className='colab-search-config' name="colab-search-config" id="colab-search-config-nome" onChange={startSearchConfig}/>
                        </div>
                        <div className="option">
                            <label htmlFor="colab-search-config-cpf">CPF</label>
                            <input type="radio" className='colab-search-config' name="colab-search-config" id="colab-search-config-cpf" onChange={startSearchConfig}/>
                        </div>
                    </div>
                </fieldset>

                <input type="search" name="colab-search" id="colab-search" placeholder={`Buscar colaborador por ${searchConfig}`} onInput={triggerSearch}/>
            </div>
        </>
    )
}

ColabSearch.propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
    setSearchConfig: PropTypes.func.isRequired,
    searchConfig: PropTypes.string.isRequired
}

export default ColabSearch;