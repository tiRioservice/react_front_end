import './scss/style.scss';

export default function Nav({user, logOut, setPage}) {

    return (
        <>
            <nav id="navigation">
                <ul>
                    <li><button onClick={() => {setPage("Dashboard")}}>Dashboard</button></li>
                    <li><button onClick={() => {setPage("Colaboradores")}}>Colaboradores</button></li>
                    <li><button onClick={() => {setPage("Cargos")}}>Cargos</button></li>
                    <li><button onClick={logOut}>Sair</button></li>
                </ul>
            </nav>
        </>
    )
}