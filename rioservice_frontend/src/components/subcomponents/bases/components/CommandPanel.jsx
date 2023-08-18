import PropTypes from 'prop-types';

function CommandPanel({setInsert, setSearch, allBases}){
    return (
        <>
            <div id="command-panel">
                <div className='panel'>
                    {(allBases.data) 
                    ? (<button onClick={() => setSearch(true)}>Buscar base</button>) 
                    : (<></>)}
                    <button onClick={() => setInsert(true)}>Inserir base</button>
                </div>
            </div>
        </>
    )
}

CommandPanel.propTypes = {
    setInsert: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
    allBases: PropTypes.object.isRequired,
}

export default CommandPanel;