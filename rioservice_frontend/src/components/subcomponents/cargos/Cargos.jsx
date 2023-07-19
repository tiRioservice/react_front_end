import React, { useEffect, useState } from 'react';
import './scss/style.scss';
import CommandPanel from './components/CommandPanel';
import InsertForm from './components/InsertForm';
import CargoList from './components/CargoList';
import CargoCrud from './components/CargoCrud';
import CargoDetails from './components/CargoDetails';

export default function Cargos({user, host}){
    const [insert, setInsert] = useState(false)
    const [allCargos, setAllCargos] = useState(undefined)
    const [hideDetails, setHideDetails] = useState(true)
    const [currentCargo, setCurrentCargo] = useState(undefined)

    useEffect(() => {
        const crud = new CargoCrud();
        const jwt = user["x-JWT"]
        crud.getCargoList(jwt, setAllCargos, host)
    }, [])

    useEffect(() => {
        if(currentCargo !== undefined){
            setHideDetails(false)
        }
    }, [currentCargo])

    return (
        <>
            <section id="cargos">
                {(!insert) ? (<CommandPanel setInsert={setInsert}/>) : (<InsertForm host={host} user={user} setInsert={setInsert}/>)}
                <CargoList allCargos={allCargos} setHideDetails={setHideDetails} setCurrentCargo={setCurrentCargo}/>
                <CargoDetails host={host} hideDetails={hideDetails} setHideDetails={setHideDetails} currentCargo={currentCargo} jwt={user["x-JWT"]} />
            </section>
        </>
    )
}