import { useEffect, useState } from 'react';
import './scss/style.scss';
import CommandPanel from './components/CommandPanel';
import InsertForm from './components/InsertForm';
import BaseList from './components/BaseList';
import BaseCrud from './components/BaseCrud';
import BaseDetails from './components/BaseDetails';
import { PropTypes } from 'prop-types';

function Bases({user, host}){
    const [insert, setInsert] = useState(false)
    const [allBases, setAllBases] = useState(undefined)
    const [hideDetails, setHideDetails] = useState(true)
    const [currentBase, setCurrentBase] = useState(undefined)
    // const [currentAddress, setCurrentAddress] = useState(undefined)
    const [baseInserted, setBaseInserted] = useState(undefined)

    useEffect(() => {
        setBaseInserted({"base_inserted":false})
    }, [])

    useEffect(() => {
        if(baseInserted !== undefined && "base_inserted" in baseInserted) {
            const crud = new BaseCrud();
            const jwt = user["x-JWT"]
            crud.getBaseList(jwt, setAllBases, host)
        }
    }, [baseInserted, host, user])

    return (
        <>
            <section id="bases">
                {(!insert) ? (<CommandPanel setInsert={setInsert}/>) : (<InsertForm host={host} user={user} setInsert={setInsert} setBaseInserted={setBaseInserted}/>)}
                
                <BaseList allBases={allBases} setHideDetails={setHideDetails} setCurrentBase={setCurrentBase}/>
                
                <BaseDetails host={host} hideDetails={hideDetails} setHideDetails={setHideDetails} currentBase={currentBase} jwt={user["x-JWT"]} />
            </section>
        </>
    )
}

Bases.propTypes = {
    user: PropTypes.object,
    host: PropTypes.string
}

export default Bases;