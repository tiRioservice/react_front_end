import PropTypes from 'prop-types';

function CommandPanel({setInsert, setSearch, allItems}){
    return (
        <>
            <div id="command-panel">
                <div className='panel'>
                    {(allItems.item_list) 
                    ? (<button onClick={() => setSearch(true)}>Buscar item</button>) 
                    : (<></>)}
                    <button onClick={() => setInsert(true)}>Inserir item</button>
                </div>
            </div>
        </>
    )
}

CommandPanel.propTypes = {
    setInsert: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
    allItems: PropTypes.object.isRequired,
}

export default CommandPanel;