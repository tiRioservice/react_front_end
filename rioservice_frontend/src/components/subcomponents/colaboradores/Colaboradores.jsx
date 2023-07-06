import React, { useEffect, useState } from 'react';
import './scss/style.scss';
import CommandPanel from './components/CommandPanel';
import InsertForm from './components/InsertForm';
import ColabList from './components/ColabList';
import ColabCrud from './components/ColabCrud';
import ColabDetails from './components/ColabDetails';

export default function Colaboradores({user}){
    const [insert, setInsert] = useState(false)
    const [allColabs, setAllColabs] = useState(undefined)
    const [hideDetails, setHideDetails] = useState(true)
    const [currentColab, setCurrentColab] = useState(undefined)
    
    useEffect(() => {
        const crud = new ColabCrud();
        const jwt = user["x-JWT"]
        crud.getColabList(jwt, setAllColabs)
    }, [])

    return (
        <>
            <section id="colaboradores">
                {(!insert) ? (<CommandPanel setInsert={setInsert}/>) : (<InsertForm user={user}/>)}
                <ColabList allColabs={allColabs} setHideDetails={setHideDetails} setCurrentColab={setCurrentColab}/>
                <ColabDetails hideDetails={hideDetails} setHideDetails={setHideDetails} currentColab={currentColab}/>
            </section>
        </>
    )
}