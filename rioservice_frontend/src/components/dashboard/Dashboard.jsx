import { useState, useEffect, useCallback } from 'react'
import './scss/style.scss';
import Nav from '../nav/Nav';
import DashboardContent from './DashboardContent';
import Bases from '../subcomponents/bases/Bases';
import Colaboradores from '../subcomponents/colaboradores/Colaboradores';
import Cargos from '../subcomponents/cargos/Cargos';
import CargoConfigCrud from '../dashboard/components/CargoConfigCrud';
import CategCrud from '../subcomponents/categorias/components/CategCrud';
import PropTypes from "prop-types";
import Fornecedores from '../subcomponents/fornecedores/Fornecedores';
import Estoque from '../subcomponents/estoque/Estoque';
import Categorias from '../subcomponents/categorias/Categorias';
import Itens from '../subcomponents/itens/Itens';
import Cotacoes from '../subcomponents/cotacoes/Cotacoes';
import WhatsNew from '../whatsnew/WhatsNew';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function Dashboard({user, logOut, host}){
    const userCargo = user["cargo_id"]
    const [page, setPage] = useState("Dashboard")
    const [userCargoConfig, setUserCargoConfig] = useState(undefined)
    const [stockCategs, setStockCategs] = useState(undefined)
    const [allBases, setAllBases] = useState(undefined)

    const fetchCategs = useCallback(() => {
        const categCrud = new CategCrud();
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        options['method'] = "GET"
        delete options.body
        categCrud.getCategList(setStockCategs, options)
    },[user, host])

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
            case "Fornecedores":
                return <Fornecedores host={host} user={user}/>
            case "Bases":
                return <Bases host={host} user={user} allBases={allBases} setAllBases={setAllBases}/>
            case "Estoque":
                return <Estoque user={user} host={host} setPage={setPage} fetchCategs={fetchCategs} setAllBases={setAllBases}/>
            case "Categorias":
                return <Categorias host={host} user={user}/>
            case "Itens":
                return <Itens host={host} user={user} stockCategs={stockCategs} allBases={allBases}/>
            case "Cotacoes":
                return <Cotacoes host={host} user={user}/>
            case "Novidades":
                return <WhatsNew/>
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