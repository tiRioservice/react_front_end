import React, { useEffect, useState } from 'react';
import './scss/style.scss';
import CommandPanel from './components/CommandPanel';
import InsertForm from './components/InsertForm';
import BaseList from './components/BaseList';
import BaseCrud from './components/BaseCrud';
import BaseDetails from './components/BaseDetails';

export default function Bases({user, host}){
    const [insert, setInsert] = useState(false)
    const [allBases, setAllBases] = useState(undefined)
    const [hideDetails, setHideDetails] = useState(true)
    const [currentBase, setCurrentBase] = useState(undefined)

    useEffect(() => {
        const crud = new BaseCrud();
        const jwt = user["x-JWT"]
        crud.getBaseList(jwt, setAllBases, host)
    }, [insert])

    return (
        <>
            <section id="bases">
                {(!insert) ? (<CommandPanel setInsert={setInsert}/>) : (<InsertForm host={host} user={user} setInsert={setInsert}/>)}
                <BaseList allBases={allBases} setHideDetails={setHideDetails} setCurrentBase={setCurrentBase}/>
                <BaseDetails host={host} hideDetails={hideDetails} setHideDetails={setHideDetails} currentBase={currentBase} jwt={user["x-JWT"]} />
            </section>
        </>
    )
}