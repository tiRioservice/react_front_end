import PropTypes from 'prop-types';

function CommandPanel({setInsert, setSearch, allCategs}){
    return (
        <>
            <div id="command-panel">
                <div className='panel'>
                    {(allCategs.data) 
                    ? (<button onClick={() => setSearch(true)}>Buscar categoria</button>) 
                    : (<></>)}
                    <button onClick={() => setInsert(true)}>Inserir categoria</button>
                </div>
            </div>
        </>
    )
}

CommandPanel.propTypes = {
    setInsert: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
    allCategs: PropTypes.object.isRequired,
}

export default CommandPanel;