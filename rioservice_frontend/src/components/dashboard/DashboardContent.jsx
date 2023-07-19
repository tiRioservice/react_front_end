

export default function DashboardContent({user, setPage}){
    return (
        <>
            <div className="mensagem">
                <h2>Olá, {user["colab_nome"]}!</h2>
                <p>Esta é a sua dashboard, aqui poderá realizar algumas operações. Selecione uma área abaixo ou comece pelo menu acima a direita!</p>
            </div>
            <ul className="buttonList">
                <li className="buttonListItem">
                    <button onClick={() => setPage("Bases")}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32"><path className="btn-icon" d="M7 4h11.75c.69 0 1.25.56 1.25 1.25V14a1 1 0 0 0 1 1h3.75c.69 0 1.25.56 1.25 1.25V28h-3v-3.5a1.5 1.5 0 0 0-1.5-1.5h-11A1.5 1.5 0 0 0 9 24.5V28H6V5a1 1 0 0 1 1-1Zm14 24h-4v-3h4v3Zm-6 0h-4v-3h4v3Zm12 2a1 1 0 0 0 1-1V16.25A3.25 3.25 0 0 0 24.75 13H22V5.25A3.25 3.25 0 0 0 18.75 2H7a3 3 0 0 0-3 3v24a1 1 0 0 0 1 1h22ZM10.5 10a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm0 5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm1.5 3.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm3.5-8.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm1.5 3.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM15.5 20a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6.5-1.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Z"/></svg>
                    Bases
                    </button>
                </li>
                <li className="buttonListItem">
                    <button onClick={() => setPage("Colaboradores")}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 35 35"><g id="clarityEmployeeGroupLine0"><path className="btn-icon" d="M18.42 16.31a5.7 5.7 0 1 1 5.76-5.7a5.74 5.74 0 0 1-5.76 5.7Zm0-9.4a3.7 3.7 0 1 0 3.76 3.7a3.74 3.74 0 0 0-3.76-3.7Z"/><path className="btn-icon" d="M18.42 16.31a5.7 5.7 0 1 1 5.76-5.7a5.74 5.74 0 0 1-5.76 5.7Zm0-9.4a3.7 3.7 0 1 0 3.76 3.7a3.74 3.74 0 0 0-3.76-3.7Zm3.49 10.74a20.6 20.6 0 0 0-13 2a1.77 1.77 0 0 0-.91 1.6v3.56a1 1 0 0 0 2 0v-3.43a18.92 18.92 0 0 1 12-1.68Z"/><path className="btn-icon" d="M33 22h-6.7v-1.48a1 1 0 0 0-2 0V22H17a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V23a1 1 0 0 0-1-1Zm-1 10H18v-8h6.3v.41a1 1 0 0 0 2 0V24H32Z"/><path className="btn-icon" d="M21.81 27.42h5.96v1.4h-5.96zM10.84 12.24a18 18 0 0 0-7.95 2A1.67 1.67 0 0 0 2 15.71v3.1a1 1 0 0 0 2 0v-2.9a16 16 0 0 1 7.58-1.67a7.28 7.28 0 0 1-.74-2Zm22.27 1.99a17.8 17.8 0 0 0-7.12-2a7.46 7.46 0 0 1-.73 2A15.89 15.89 0 0 1 32 15.91v2.9a1 1 0 1 0 2 0v-3.1a1.67 1.67 0 0 0-.89-1.48Zm-22.45-3.62v-.67a3.07 3.07 0 0 1 .54-6.11a3.15 3.15 0 0 1 2.2.89a8.16 8.16 0 0 1 1.7-1.08a5.13 5.13 0 0 0-9 3.27a5.1 5.1 0 0 0 4.7 5a7.42 7.42 0 0 1-.14-1.3Zm14.11-8.78a5.17 5.17 0 0 0-3.69 1.55a7.87 7.87 0 0 1 1.9 1a3.14 3.14 0 0 1 4.93 2.52a3.09 3.09 0 0 1-1.79 2.77a7.14 7.14 0 0 1 .06.93a7.88 7.88 0 0 1-.1 1.2a5.1 5.1 0 0 0 3.83-4.9a5.12 5.12 0 0 0-5.14-5.07Z"/></g></svg>
                    Colaboradores
                    </button>
                </li>
                <li className="buttonListItem">
                    <button onClick={() => setPage("Cargos")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path className="btn-icon" d="M16 22a4 4 0 1 0-4-4a4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2zM14 6h4v2h-4z"/><path className="btn-icon" d="M24 2H8a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2h16a2.003 2.003 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2Zm-4 26h-8v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1Zm2 0v-2a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3v2H8V4h16v24Z"/></svg>
                    Cargos
                    </button>
                </li>
            </ul>
        </>
    )
}