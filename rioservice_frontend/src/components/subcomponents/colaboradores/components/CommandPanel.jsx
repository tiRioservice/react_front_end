import PropTypes from "prop-types";

function CommandPanel({setInsert, setSearch, allColabs}){
    return (
        <>
            <div id="command-panel">
                <div className='panel'>
                    {(allColabs.data)
                    ? (<button onClick={() => setSearch(true)}>Buscar colaborador</button>)
                    : (<></>)}
                    <button onClick={() => setInsert(true)}>Inserir colaborador</button>
                </div>
            </div>
        </>
    )
}

CommandPanel.propTypes = {
    setInsert: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
    allColabs: PropTypes.object.isRequired,
}

export default CommandPanel;