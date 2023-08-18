import { useState, useEffect, useCallback } from 'react'
import './scss/style.scss';
import Nav from '../nav/Nav';
import DashboardContent from './DashboardContent';
import Bases from '../subcomponents/bases/Bases';
import Colaboradores from '../subcomponents/colaboradores/Colaboradores';
import Cargos from '../subcomponents/cargos/Cargos';
import CargoConfigCrud from '../dashboard/components/CargoConfigCrud';
import PropTypes from "prop-types";
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function Dashboard({user, logOut, host}){
    const userCargo = user["cargo_id"]
    const [page, setPage] = useState("Dashboard")
    const [userCargoConfig, setUserCargoConfig] = useState(undefined)

    const fetchConfigs = useCallback(()=>{
        const cargoConfigCrud = CargoConfigCrud();
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        options['method'] = "POST"
        options['body'] = JSON.stringify({"cargo_id": userCargo})
        cargoConfigCrud.getCargoConfigList(setUserCargoConfig, options)
    }, [userCargo, host, user])
    
    useEffect(() => {
        if(userCargo != null){
            fetchConfigs()
        }
    }, [userCargo, fetchConfigs])

    const renderSwitch = ({page}) => {
        switch(page){
            case "Dashboard":
                return <DashboardContent host={host} setPage={setPage} user={user}/>
            case "Cargos":
                return <Cargos host={host} user={user} fetchConfigs={fetchConfigs}/>
            case "Colaboradores":
                return <Colaboradores host={host} user={user}/>
            case "Bases":
                return <Bases host={host} user={user}/>
            default:
                return "Default"
        }
    }

    return (
        <>
            <Nav user={user} host={host} logOut={logOut} setPage={setPage} userCargoConfig={userCargoConfig}/>
            <section id="dashboard">
                <header>
                    <h1>{page}</h1>
                </header>
                {renderSwitch({page})}
            </section>
        </>
    )
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    host: PropTypes.string.isRequired
}

export default Dashboard