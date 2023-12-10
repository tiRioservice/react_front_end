import PropTypes from 'prop-types';

function CommandPanel({setInsert, setSearch, allCotacoes}){
    return (
        <>
            <div id="command-panel">
                <div className='panel'>
                    {(allCotacoes.data) 
                    ? (<button onClick={() => setSearch(true)}>Buscar cotacao</button>) 
                    : (<></>)}
                    <button onClick={() => setInsert(true)}>Inserir cotacao</button>
                </div>
            </div>
        </>
    )
}

CommandPanel.propTypes = {
    setInsert: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
    allCotacoes: PropTypes.object.isRequired,
}

export default CommandPanel;