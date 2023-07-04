export default function CommandPanel({setInsert}){
    return (
        <>
            <div id="command-panel">
                <div className='panel'>
                    <button onClick={() => setInsert(true)}>Inserir colaborador</button>
                </div>
            </div>
        </>
    )
}