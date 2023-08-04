import PropTypes from "prop-types";

function CommandPanel({setInsert, setSearch}){
    return (
        <>
            <div id="command-panel">
                <div className='panel'>
                    <button onClick={() => setSearch(true)}>Buscar colaborador</button>
                    <button onClick={() => setInsert(true)}>Inserir colaborador</button>
                </div>
            </div>
        </>
    )
}

CommandPanel.propTypes = {
    setInsert: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired
}

export default CommandPanel;