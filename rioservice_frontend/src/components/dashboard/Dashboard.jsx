import { useState } from 'react'
import './scss/style.scss';
import Nav from '../nav/Nav';
import DashboardContent from './DashboardContent';

export default function Dashboard({user, logOut}){
    const [page, setPage] = useState("Dashboard")

    const renderSwitch = ({page}) => {
        switch(page){
            case "Dashboard":
                return <DashboardContent user={user}/>
            case "Cargos":
                return "Area de Cargos"
            case "Colaboradores":
                return "Area de Colaboradores"
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