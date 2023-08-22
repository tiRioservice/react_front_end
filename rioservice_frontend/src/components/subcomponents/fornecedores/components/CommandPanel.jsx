import PropTypes from "prop-types";

function CommandPanel({setInsert, setSearch, allForns}){
    return (
        <>
            <div id="command-panel">
                <div className='panel'>
                    {(allForns.data)
                    ? (<button onClick={() => setSearch(true)}>Buscar fornecedor</button>)
                    : (<></>)}
                    <button onClick={() => setInsert(true)}>Inserir fornecedor</button>
                </div>
            </div>
        </>
    )
}

CommandPanel.propTypes = {
    setInsert: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
    allForns: PropTypes.object.isRequired,
}

export default CommandPanel;