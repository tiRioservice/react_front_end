export default function Menu({menuOpen, setMenuOpen, setPage, logOut, user}) {
    return (
        <>
            <div id="menu" className={!menuOpen ? "menu-fechado" : "menu-aberto"}>
                <ul>
                    <p>Usuario logado: {user.colab_nome}</p>
                    <li>
                        <button onClick={() => {
                            setMenuOpen(false)
                            setPage("Dashboard")
                        }}>
                            Dashboard
                        </button>
                    </li>

                    <li>
                        <button onClick={() => {
                            setMenuOpen(false)
                            setPage("Colaboradores")
                        }}>
                            Colaboradores
                        </button>
                    </li>

                    <li>
                        <button onClick={() => {
                            setMenuOpen(false)
                            setPage("Bases")
                        }}>
                            Bases
                        </button>
                    </li>

                    <li>
                        <button onClick={() => setMenuOpen(false)}>Fechar menu</button>
                    </li>

                    <li>
                        <button onClick={() => logOut()}>
                            Deslogar
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}