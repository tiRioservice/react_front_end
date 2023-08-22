import {useState, useEffect} from "react";
import CargoConfigCrud from "./components/CargoConfigCrud";
import PropTypes from "prop-types";
const cargoConfigCrud = CargoConfigCrud();
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function DashboardContent({user, host, setPage}){
    const userCargo = user["cargo_id"]
    const [userCargoConfig, setUserCargoConfig] = useState(undefined)

    useEffect(() => {
        if(userCargo != null){
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"
            options['body'] = JSON.stringify({"cargo_id": userCargo})
            cargoConfigCrud.getCargoConfigList(setUserCargoConfig, options)}
    }, [userCargo, host, user])

    return (
        <>
            <div className="mensagem">
                <h2>Olá, {user["colab_nome"]}!</h2>
                <p>Esta é a sua dashboard, aqui poderá realizar algumas operações. Selecione uma área abaixo ou comece pelo menu acima a direita!</p>
            </div>
            <ul className="buttonList">
                {(userCargoConfig !== undefined && userCargoConfig.data[0]["perm_id"] === 1 && userCargoConfig.data[0]["nvl_acesso"] === true) 
                ? (
                    <li className="buttonListItem">
                    <button onClick={() => setPage("Bases")}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32"><path className="btn-icon" d="M7 4h11.75c.69 0 1.25.56 1.25 1.25V14a1 1 0 0 0 1 1h3.75c.69 0 1.25.56 1.25 1.25V28h-3v-3.5a1.5 1.5 0 0 0-1.5-1.5h-11A1.5 1.5 0 0 0 9 24.5V28H6V5a1 1 0 0 1 1-1Zm14 24h-4v-3h4v3Zm-6 0h-4v-3h4v3Zm12 2a1 1 0 0 0 1-1V16.25A3.25 3.25 0 0 0 24.75 13H22V5.25A3.25 3.25 0 0 0 18.75 2H7a3 3 0 0 0-3 3v24a1 1 0 0 0 1 1h22ZM10.5 10a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm0 5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm1.5 3.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm3.5-8.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm1.5 3.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM15.5 20a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6.5-1.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Z"/></svg>
                    Bases
                    </button>
                </li>
                ) : (<></>)}

                {(userCargoConfig !== undefined && userCargoConfig.data[1]["perm_id"] === 2 && userCargoConfig.data[1]["nvl_acesso"] === true)
                ? (<li className="buttonListItem">
                    <button onClick={() => setPage("Colaboradores")}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 35 35"><g id="clarityEmployeeGroupLine0"><path className="btn-icon" d="M18.42 16.31a5.7 5.7 0 1 1 5.76-5.7a5.74 5.74 0 0 1-5.76 5.7Zm0-9.4a3.7 3.7 0 1 0 3.76 3.7a3.74 3.74 0 0 0-3.76-3.7Z"/><path className="btn-icon" d="M18.42 16.31a5.7 5.7 0 1 1 5.76-5.7a5.74 5.74 0 0 1-5.76 5.7Zm0-9.4a3.7 3.7 0 1 0 3.76 3.7a3.74 3.74 0 0 0-3.76-3.7Zm3.49 10.74a20.6 20.6 0 0 0-13 2a1.77 1.77 0 0 0-.91 1.6v3.56a1 1 0 0 0 2 0v-3.43a18.92 18.92 0 0 1 12-1.68Z"/><path className="btn-icon" d="M33 22h-6.7v-1.48a1 1 0 0 0-2 0V22H17a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V23a1 1 0 0 0-1-1Zm-1 10H18v-8h6.3v.41a1 1 0 0 0 2 0V24H32Z"/><path className="btn-icon" d="M21.81 27.42h5.96v1.4h-5.96zM10.84 12.24a18 18 0 0 0-7.95 2A1.67 1.67 0 0 0 2 15.71v3.1a1 1 0 0 0 2 0v-2.9a16 16 0 0 1 7.58-1.67a7.28 7.28 0 0 1-.74-2Zm22.27 1.99a17.8 17.8 0 0 0-7.12-2a7.46 7.46 0 0 1-.73 2A15.89 15.89 0 0 1 32 15.91v2.9a1 1 0 1 0 2 0v-3.1a1.67 1.67 0 0 0-.89-1.48Zm-22.45-3.62v-.67a3.07 3.07 0 0 1 .54-6.11a3.15 3.15 0 0 1 2.2.89a8.16 8.16 0 0 1 1.7-1.08a5.13 5.13 0 0 0-9 3.27a5.1 5.1 0 0 0 4.7 5a7.42 7.42 0 0 1-.14-1.3Zm14.11-8.78a5.17 5.17 0 0 0-3.69 1.55a7.87 7.87 0 0 1 1.9 1a3.14 3.14 0 0 1 4.93 2.52a3.09 3.09 0 0 1-1.79 2.77a7.14 7.14 0 0 1 .06.93a7.88 7.88 0 0 1-.1 1.2a5.1 5.1 0 0 0 3.83-4.9a5.12 5.12 0 0 0-5.14-5.07Z"/></g></svg>
                    Colaboradores
                    </button>
                </li>
                ) : (<></>)}

                {(userCargoConfig !== undefined && userCargoConfig.data[2]["perm_id"] === 3 && userCargoConfig.data[2]["nvl_acesso"] === true)
                ? (<li className="buttonListItem">
                    <button onClick={() => setPage("Cargos")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path className="btn-icon" d="M16 22a4 4 0 1 0-4-4a4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2zM14 6h4v2h-4z"/><path className="btn-icon" d="M24 2H8a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2h16a2.003 2.003 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2Zm-4 26h-8v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1Zm2 0v-2a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3v2H8V4h16v24Z"/></svg>
                    Cargos
                    </button>
                </li>
                ) : (<></>)}

                {(userCargoConfig !== undefined && userCargoConfig.data[1]["perm_id"] === 2 && userCargoConfig.data[1]["nvl_acesso"] === true)
                ? (<li className="buttonListItem">
                    <button onClick={() => setPage("Fornecedores")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path className="btn-icon" d="M2 3v-.75a.75.75 0 0 0-.75.75H2Zm11 0h.75a.75.75 0 0 0-.75-.75V3Zm0 6v-.75a.75.75 0 0 0-.75.75H13ZM2 3.75h11v-1.5H2v1.5ZM12.25 3v16h1.5V3h-1.5Zm-9.5 14V3h-1.5v14h1.5ZM13 9.75h5v-1.5h-5v1.5ZM21.25 13v4h1.5v-4h-1.5Zm-7.5 6V9h-1.5v10h1.5Zm5.134.884a1.25 1.25 0 0 1-1.768 0l-1.06 1.06a2.75 2.75 0 0 0 3.889 0l-1.061-1.06Zm-1.768-1.768a1.25 1.25 0 0 1 1.768 0l1.06-1.06a2.75 2.75 0 0 0-3.889 0l1.061 1.06ZM6.884 19.884a1.25 1.25 0 0 1-1.768 0l-1.06 1.06a2.75 2.75 0 0 0 3.889 0l-1.061-1.06Zm-1.768-1.768a1.25 1.25 0 0 1 1.768 0l1.06-1.06a2.75 2.75 0 0 0-3.889 0l1.061 1.06Zm13.768 0c.244.244.366.563.366.884h1.5c0-.703-.269-1.408-.805-1.945l-1.061 1.061Zm.366.884c0 .321-.122.64-.366.884l1.06 1.06A2.743 2.743 0 0 0 20.75 19h-1.5ZM16 18.25h-3v1.5h3v-1.5Zm1.116 1.634A1.244 1.244 0 0 1 16.75 19h-1.5c0 .703.269 1.408.805 1.945l1.061-1.061ZM16.75 19c0-.321.122-.64.366-.884l-1.06-1.06A2.743 2.743 0 0 0 15.25 19h1.5Zm-11.634.884A1.244 1.244 0 0 1 4.75 19h-1.5c0 .703.269 1.408.805 1.945l1.061-1.061ZM4.75 19c0-.321.122-.64.366-.884l-1.06-1.06A2.744 2.744 0 0 0 3.25 19h1.5Zm8.25-.75H8v1.5h5v-1.5Zm-6.116-.134c.244.244.366.563.366.884h1.5c0-.703-.269-1.408-.805-1.945l-1.061 1.061ZM7.25 19c0 .321-.122.64-.366.884l1.06 1.06A2.744 2.744 0 0 0 8.75 19h-1.5Zm14-2c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 22.75 17h-1.5ZM18 9.75A3.25 3.25 0 0 1 21.25 13h1.5A4.75 4.75 0 0 0 18 8.25v1.5ZM1.25 17A2.75 2.75 0 0 0 4 19.75v-1.5c-.69 0-1.25-.56-1.25-1.25h-1.5Z"/></svg>
                    Fornecedores
                    </button>
                </li>
                ) : (<></>)}

            </ul>
        </>
    )
}

DashboardContent.propTypes = {
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    setPage: PropTypes.func.isRequired
}

export default DashboardContent;