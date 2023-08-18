import { useEffect, useState, useCallback } from 'react';
import './scss/style.scss';
import CommandPanel from './components/CommandPanel';
import InsertForm from './components/InsertForm';
import BaseList from './components/BaseList';
import BaseCrud from './components/BaseCrud';
import BaseDetails from './components/BaseDetails';
import BaseSearch from './components/BaseSearch';
import { PropTypes } from 'prop-types';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function Bases({user, host}){
    const [insert, setInsert] = useState(false)
    const [search, setSearch] = useState(false)
    const [allBases, setAllBases] = useState(undefined)
    const [hideDetails, setHideDetails] = useState(true)
    const [currentBase, setCurrentBase] = useState(undefined)
    const [baseInserted, setBaseInserted] = useState(undefined)
    const [baseRemoved, setBaseRemoved] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchConfig, setSearchConfig] = useState("nome")

    const fetchList = useCallback(() => {
        const crud = new BaseCrud();
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }
        
        crud.getBaseList(setAllBases, options)
    }, [user, host])

    useEffect(() => {
        setBaseInserted({"base_inserted":false})
        setBaseRemoved({"base_removed":false})
        fetchList()
    }, [fetchList])

    useEffect(() => {
        if(baseInserted != undefined && "base_inserted" in baseInserted) {
            if(baseInserted.base_inserted == true){
                setBaseInserted({"base_inserted":false})
                fetchList()
            }
        }
    }, [baseInserted, host, user, fetchList])

    useEffect(() => {
        if(baseRemoved != undefined && "base_removed" in baseRemoved) {
            if(baseRemoved.base_removed == true){
                setBaseRemoved({"base_removed":false})
                fetchList()
            }
        }
    }, [baseRemoved, fetchList])

    return (
        <>
            <section id="bases">
                {(!insert) ? ((!search) ? (<CommandPanel setInsert={setInsert} setSearch={setSearch} allBases={(allBases != undefined)?(allBases):({})}/>) : (<></>)) : (<></>)}

                {(insert) ? (<InsertForm host={host} user={user} setInsert={setInsert} setBaseInserted={setBaseInserted} fetchList={fetchList}/>) : (<></>)}

                {(search) ? (<BaseSearch setSearchTerm={setSearchTerm} setSearchConfig={setSearchConfig} searchConfig={searchConfig}/>) : (<></>)}
                
                <BaseList allBases={allBases} setHideDetails={setHideDetails} setCurrentBase={setCurrentBase} searchTerm={searchTerm} searchConfig={searchConfig}/>
                
                <BaseDetails host={host} hideDetails={hideDetails} setHideDetails={setHideDetails} currentBase={currentBase} user={user} setBaseRemoved={setBaseRemoved} fetchList={fetchList}/>
            </section>
        </>
    )
}

Bases.propTypes = {
    user: PropTypes.object,
    host: PropTypes.string
}

export default Bases;