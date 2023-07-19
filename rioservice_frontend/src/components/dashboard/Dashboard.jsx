import { useState } from 'react'
import './scss/style.scss';
import Nav from '../nav/Nav';
import DashboardContent from './DashboardContent';
import Bases from '../subcomponents/bases/Bases';
import Colaboradores from '../subcomponents/colaboradores/Colaboradores';
import Cargos from '../subcomponents/cargos/Cargos';
import PropTypes from "prop-types";

function Dashboard({user, logOut, host}){
    const [page, setPage] = useState("Dashboard")

    const renderSwitch = ({page}) => {
        switch(page){
            case "Dashboard":
                return <DashboardContent host={host} setPage={setPage} user={user}/>
            case "Cargos":
                return <Cargos host={host} user={user}/>
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
            <Nav user={user} host={host} logOut={logOut} setPage={setPage}/>
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