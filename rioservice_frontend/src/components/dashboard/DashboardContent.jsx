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

                {(userCargoConfig !== undefined && userCargoConfig.data[3]["perm_id"] === 4 && userCargoConfig.data[3]["nvl_acesso"] === true)
                ? (<li className="buttonListItem">
                    <button onClick={() => setPage("Fornecedores")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path className="btn-icon" d="M2 3v-.75a.75.75 0 0 0-.75.75H2Zm11 0h.75a.75.75 0 0 0-.75-.75V3Zm0 6v-.75a.75.75 0 0 0-.75.75H13ZM2 3.75h11v-1.5H2v1.5ZM12.25 3v16h1.5V3h-1.5Zm-9.5 14V3h-1.5v14h1.5ZM13 9.75h5v-1.5h-5v1.5ZM21.25 13v4h1.5v-4h-1.5Zm-7.5 6V9h-1.5v10h1.5Zm5.134.884a1.25 1.25 0 0 1-1.768 0l-1.06 1.06a2.75 2.75 0 0 0 3.889 0l-1.061-1.06Zm-1.768-1.768a1.25 1.25 0 0 1 1.768 0l1.06-1.06a2.75 2.75 0 0 0-3.889 0l1.061 1.06ZM6.884 19.884a1.25 1.25 0 0 1-1.768 0l-1.06 1.06a2.75 2.75 0 0 0 3.889 0l-1.061-1.06Zm-1.768-1.768a1.25 1.25 0 0 1 1.768 0l1.06-1.06a2.75 2.75 0 0 0-3.889 0l1.061 1.06Zm13.768 0c.244.244.366.563.366.884h1.5c0-.703-.269-1.408-.805-1.945l-1.061 1.061Zm.366.884c0 .321-.122.64-.366.884l1.06 1.06A2.743 2.743 0 0 0 20.75 19h-1.5ZM16 18.25h-3v1.5h3v-1.5Zm1.116 1.634A1.244 1.244 0 0 1 16.75 19h-1.5c0 .703.269 1.408.805 1.945l1.061-1.061ZM16.75 19c0-.321.122-.64.366-.884l-1.06-1.06A2.743 2.743 0 0 0 15.25 19h1.5Zm-11.634.884A1.244 1.244 0 0 1 4.75 19h-1.5c0 .703.269 1.408.805 1.945l1.061-1.061ZM4.75 19c0-.321.122-.64.366-.884l-1.06-1.06A2.744 2.744 0 0 0 3.25 19h1.5Zm8.25-.75H8v1.5h5v-1.5Zm-6.116-.134c.244.244.366.563.366.884h1.5c0-.703-.269-1.408-.805-1.945l-1.061 1.061ZM7.25 19c0 .321-.122.64-.366.884l1.06 1.06A2.744 2.744 0 0 0 8.75 19h-1.5Zm14-2c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 22.75 17h-1.5ZM18 9.75A3.25 3.25 0 0 1 21.25 13h1.5A4.75 4.75 0 0 0 18 8.25v1.5ZM1.25 17A2.75 2.75 0 0 0 4 19.75v-1.5c-.69 0-1.25-.56-1.25-1.25h-1.5Z"/></svg>
                    Fornecedores
                    </button>
                </li>
                ) : (<></>)}

                {(userCargoConfig !== undefined && userCargoConfig.data[4]["perm_id"] === 5 && userCargoConfig.data[4]["nvl_acesso"] === true)
                ? (<li className="buttonListItem">
                    <button onClick={() => setPage("Estoque")}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0.00 0.00 512.00 512.00"><path className="btn-icon" d="M 512.00 363.07  L 512.00 370.55  C 508.64 460.29 420.32 520.04 335.82 488.68  C 327.89 485.73 329.22 474.45 337.50 474.18  Q 339.35 474.12 343.37 475.53  C 392.23 492.71 446.73 475.48 476.28 432.79  C 507.90 387.12 502.83 324.39 462.68 285.34  C 416.69 240.60 344.74 241.28 299.69 286.95  C 251.39 335.92 257.79 416.32 312.05 458.46  Q 315.70 461.29 316.60 463.28  C 318.82 468.18 313.79 474.57 308.52 473.44  Q 306.22 472.95 302.56 470.08  Q 273.24 447.08 259.99 411.91  Q 259.80 411.41 259.33 411.66  Q 236.58 423.44 213.78 435.11  C 203.41 440.42 197.09 444.22 187.31 439.19  Q 98.21 393.33 9.19 347.30  Q 0.53 342.82 0.00 332.94  L 0.00 243.96  C 2.85 234.68 15.00 236.25 15.00 245.00  Q 15.00 289.00 15.00 332.54  A 1.55 1.54 -76.5 0 0 15.84 333.92  L 188.73 423.08  A 0.19 0.18 13.9 0 0 189.00 422.92  L 189.00 221.72  Q 189.00 221.18 188.53 220.94  L 134.51 193.06  Q 134.03 192.82 134.03 193.36  Q 133.94 221.86 134.00 250.35  C 134.02 257.50 130.79 264.52 122.16 260.12  Q 99.00 248.33 75.93 236.30  C 69.14 232.77 70.05 229.22 70.03 221.39  Q 69.95 190.84 70.03 160.62  Q 70.03 159.81 69.31 159.44  L 15.74 131.80  A 0.51 0.51 0.0 0 0 15.00 132.25  Q 15.01 169.80 14.99 207.53  Q 14.99 212.43 13.73 214.58  C 10.33 220.36 1.32 218.12 0.00 211.17  L 0.00 127.69  C 0.11 115.90 6.83 111.03 16.54 106.02  Q 102.73 61.59 188.92 17.15  Q 196.63 13.18 203.51 16.72  Q 294.57 63.66 385.59 110.64  C 392.70 114.32 393.23 118.57 393.23 126.64  Q 393.27 181.92 393.24 237.13  A 0.43 0.43 0.0 0 0 393.63 237.56  C 459.92 245.05 508.91 296.29 512.00 363.07  Z  M 24.65 118.72  A 0.46 0.46 0.0 0 0 24.65 119.54  L 77.44 146.74  A 0.46 0.46 0.0 0 0 77.86 146.74  L 249.59 58.19  A 0.46 0.46 0.0 0 0 249.59 57.37  L 196.85 30.15  A 0.46 0.46 0.0 0 0 196.43 30.15  L 24.65 118.72  Z  M 95.77 156.20  L 126.02 171.82  A 0.99 0.96 -44.4 0 0 126.93 171.82  L 298.60 83.30  A 0.38 0.38 0.0 0 0 298.60 82.63  L 267.26 66.47  Q 266.75 66.21 266.23 66.47  L 94.69 154.93  A 0.36 0.35 76.5 0 0 94.50 155.25  Q 94.47 155.95 95.09 156.00  Q 95.45 156.03 95.77 156.20  Z  M 143.52 180.14  A 0.39 0.39 0.0 0 0 143.52 180.84  L 196.44 208.13  A 0.39 0.39 0.0 0 0 196.80 208.13  L 368.64 119.49  A 0.39 0.39 0.0 0 0 368.64 118.79  L 315.77 91.49  A 0.39 0.39 0.0 0 0 315.41 91.49  L 143.52 180.14  Z  M 378.25 236.78  L 378.25 131.79  A 0.23 0.23 0.0 0 0 377.92 131.59  L 204.46 221.04  A 0.86 0.86 0.0 0 0 204.00 221.80  L 204.00 422.62  A 0.45 0.45 0.0 0 0 204.65 423.02  L 254.71 397.17  Q 255.41 396.81 255.25 396.04  C 237.78 315.95 295.66 240.43 377.79 237.25  A 0.48 0.47 -1.3 0 0 378.25 236.78  Z  M 119.00 185.33  A 0.43 0.43 0.0 0 0 118.77 184.95  L 85.62 167.85  A 0.43 0.43 0.0 0 0 84.99 168.24  L 85.03 223.87  A 0.43 0.43 0.0 0 0 85.26 224.25  L 118.37 241.38  A 0.43 0.43 0.0 0 0 119.00 240.99  L 119.00 185.33  Z"/><path className="btn-icon" d="M 366.21 429.29  C 354.31 439.42 335.91 439.58 323.86 429.30  C 311.56 418.80 308.67 401.43 316.80 387.44  C 320.75 380.65 328.81 373.89 334.89 367.71  A 0.67 0.66 45.0 0 0 334.88 366.78  C 320.63 352.50 305.97 340.60 314.54 317.81  C 321.51 299.29 344.63 292.32 361.33 301.74  C 368.24 305.64 375.19 313.85 381.43 320.05  A 0.83 0.83 0.0 0 0 382.61 320.04  C 388.63 313.91 395.86 305.28 403.27 301.42  C 424.75 290.22 450.82 304.28 451.71 328.97  C 452.33 346.08 440.44 355.97 429.08 366.59  A 0.79 0.79 0.0 0 0 429.07 367.74  C 435.66 374.14 444.44 381.82 448.23 389.24  C 460.91 414.09 438.42 442.57 411.19 436.04  C 398.86 433.08 391.96 423.54 382.22 414.21  Q 381.85 413.85 381.49 414.23  C 376.68 419.43 370.10 425.98 366.21 429.29  Z  M 387.89 335.89  C 383.39 340.36 379.24 338.94 375.02 334.81  Q 367.90 327.84 360.87 320.75  Q 355.66 315.50 352.53 314.04  C 334.21 305.49 318.44 329.16 332.82 343.42  Q 342.06 352.58 351.16 361.89  C 354.85 365.66 353.82 369.85 350.32 373.44  Q 342.88 381.10 335.27 388.60  Q 330.45 393.36 329.06 396.11  C 319.77 414.50 343.61 430.88 358.30 416.28  Q 367.10 407.54 375.87 398.76  C 379.88 394.76 383.86 394.63 388.07 398.77  Q 396.99 407.56 405.82 416.42  C 420.14 430.82 443.96 414.46 435.17 396.52  Q 433.72 393.54 427.13 387.02  Q 420.04 380.00 413.09 372.84  C 409.48 369.12 409.71 365.04 413.41 361.29  Q 422.13 352.44 430.93 343.68  C 445.05 329.60 430.74 306.19 412.35 313.58  Q 408.98 314.94 403.90 319.98  Q 395.90 327.94 387.89 335.89  Z"/>
                    <rect className="btn-icon" x="-39.15" y="-7.50" transform="translate(76.80,321.48) rotate(27.3)" width="78.30" height="15.00" rx="7.37"/>
                    </svg>
                    Estoque
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