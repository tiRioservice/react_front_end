import { useState } from 'react'
import './scss/style.scss';
import Nav from '../nav/Nav';
import DashboardContent from './DashboardContent';
import Bases from '../subcomponents/bases/Bases';
import Colaboradores from '../subcomponents/colaboradores/Colaboradores';
import Cargos from '../subcomponents/cargos/Cargos';

export default function Dashboard({user, logOut}){
    const [page, setPage] = useState("Dashboard")

    const renderSwitch = ({page}) => {
        switch(page){
            case "Dashboard":
                return <DashboardContent setPage={setPage} user={user}/>
            case "Cargos":
                return <Cargos/>
            case "Colaboradores":
                return <Colaboradores user={user}/>
            case "Bases":
                return <Bases/>
            default:
                return "Default"
        }
    }

    return (
        <>
            <Nav user={user} logOut={logOut} setPage={setPage}/>
            <section id="dashboard">
                <header>
                    <h1>{page}</h1>
                </header>
                {renderSwitch({page})}
            </section>
        </>
    )
}