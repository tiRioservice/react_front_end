import PropTypes from "prop-types";


function Menu({userCargoConfig, menuOpen, setMenuOpen, setPage, logOut, setProfileOpen, setTrocarSenhaOpen}) {

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
                
                {(userCargoConfig != undefined && userCargoConfig.data[0]["perm_id"] == 1 && userCargoConfig.data[0]["nvl_acesso"] == true) 
                ? (
                    <li>
                        <button onClick={() => {
                            setMenuOpen(false)
                            setPage("Bases")
                        }}>
                            Bases
                        </button>
                    </li>
                    ) : (<></>)}

                {(userCargoConfig !== undefined && userCargoConfig.data[1]["perm_id"] === 2 && userCargoConfig.data[1]["nvl_acesso"] === true) 
                ? (
                    <li>
                        <button onClick={() => {
                            setMenuOpen(false)
                            setPage("Colaboradores")
                        }}>
                            Colaboradores
                        </button>
                    </li>
                    ) : (<></>)}

                {(userCargoConfig !== undefined && userCargoConfig.data[2]["perm_id"] === 3 && userCargoConfig.data[2]["nvl_acesso"] === true) 
                ? (
                    <li>
                        <button onClick={() => {
                            setMenuOpen(false)
                            setPage("Cargos")
                        }}>
                            Cargos
                        </button>
                    </li>
                    ) : (<></>)}

                {(userCargoConfig !== undefined && userCargoConfig.data[3]["perm_id"] === 4 && userCargoConfig.data[3]["nvl_acesso"] === true) 
                ? (
                    <li>
                        <button onClick={() => {
                            setMenuOpen(false)
                            setPage("Fornecedores")
                        }}>
                            Fornecedores
                        </button>
                    </li>
                    ) : (<></>)}

                {(userCargoConfig !== undefined && userCargoConfig.data[4]["perm_id"] === 5 && userCargoConfig.data[4]["nvl_acesso"] === true) 
                ? (
                    <li>
                        <button onClick={() => {
                            setMenuOpen(false)
                            setPage("Estoque")
                        }}>
                            Estoque
                        </button>
                    </li>
                    ) : (<></>)}

                

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
                <button className="quitBtn" onClick={() => {
                    setMenuOpen(false)
                    setProfileOpen(false)
                    setTrocarSenhaOpen(false)
                    }}>X</button>
            </div>
        </>
    )
}

Menu.propTypes = {
    userCargoConfig: PropTypes.object,
    menuOpen: PropTypes.bool.isRequired,
    setMenuOpen: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    setProfileOpen: PropTypes.func.isRequired,
    setTrocarSenhaOpen: PropTypes.func.isRequired
}

export default Menu