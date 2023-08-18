import PropTypes from 'prop-types';

function CommandPanel({setInsert, setSearch, allCargos}){
    return (
        <>
            <div id="command-panel">
                <div className='panel'>
                    {(allCargos.data) 
                    ? (<button onClick={() => setSearch(true)}>Buscar cargo</button>) 
                    : (<></>)}
                    <button onClick={() => setInsert(true)}>Inserir cargo</button>
                </div>
            </div>
        </>
    )
}

CommandPanel.propTypes = {
    setInsert: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
    allCargos: PropTypes.object.isRequired,
}

export default CommandPanel;