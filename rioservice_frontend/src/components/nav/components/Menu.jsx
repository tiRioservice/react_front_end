export default function Menu({menuOpen, setMenuOpen, setPage, logOut, setProfileOpen}) {
    return (
        <>
            <div id="menu" className={!menuOpen ? "menu-fechado" : "menu-aberto"}>
                <ul>
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
                            setPage("Cargos")
                        }}>
                            Cargos
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
                    --- x ---
                    <li>
                        <button className="profile" onClick={() => {
                            setProfileOpen(true)
                        }}>
                            Perfil
                        </button>
                    </li>
                    <li>
                        <button
                        className="logout" onClick={() => logOut()}>
                            Deslogar
                        </button>
                    </li>

                </ul>
                <button className="quitBtn" onClick={() => setMenuOpen(false)}>X</button>
            </div>
        </>
    )
}