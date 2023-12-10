import { useEffect, useState, useCallback, useRef } from 'react';
import './scss/style.scss';
import CommandPanel from './components/CommandPanel';
import InsertForm from './components/InsertForm';
import FornList from './components/FornList';
import FornCrud from './components/FornCrud';
import FornDetails from './components/FornDetails';
import FornSearch from './components/FornSearch';
import { PropTypes } from 'prop-types';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}


function Fornecedores({user, host}){
    const [insert, setInsert] = useState(false)
    const [search, setSearch] = useState(false)
    const [allForns, setAllForns] = useState(undefined)
    const [hideDetails, setHideDetails] = useState(true)
    const [currentForn, setCurrentForn] = useState(undefined)
    const [fornInserted, setFornInserted] = useState(undefined)
    const [fornRemoved, setFornRemoved] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchConfig, setSearchConfig] = useState("nome_fantasia")
    const newEndRef = useRef(currentForn)
    const newEndNumberRef = useRef(undefined)
    const newEndReferenceRef = useRef(undefined)

    const refreshFornList = useCallback(() => {
        const crud = new FornCrud();
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            crud.getFornList(setAllForns, options)
    }, [user, host])

    useEffect(()=>{
        setFornInserted({"forn_inserted":false})
        setFornRemoved({"forn_removed":false})
        refreshFornList()
    }, [refreshFornList])

    useEffect(() => {
        if(fornInserted !== undefined && "forn_inserted" in fornInserted) {
            if(fornInserted.forn_inserted == true){
                setFornInserted({"forn_inserted":false})
                refreshFornList()
            }
        }
    }, [fornInserted, refreshFornList])

    useEffect(() => {
        if(fornRemoved != undefined && "forn_removed" in fornRemoved) {
            if(fornRemoved.forn_removed == true){
                setFornRemoved({"forn_removed":false})
                refreshFornList()
            }
        }
    }, [fornRemoved, refreshFornList])

    return (
        <>
            <section id="fornecedores">
                {(!insert) ? ((!search) ? (<CommandPanel setInsert={setInsert} setSearch={setSearch} allForns={(allForns != undefined)?(allForns):({})}/>) : ("")) : ("")}

                {(insert) ? (<InsertForm host={host} user={user} setInsert={setInsert} setFornInserted={setFornInserted} refreshFornList={refreshFornList}/>) : ("")}
                
                {(search) ? (<FornSearch setSearchTerm={setSearchTerm} setSearchConfig={setSearchConfig} searchConfig={searchConfig}/>) : ("")}
                
                <FornList allForns={allForns} setHideDetails={setHideDetails} setCurrentForn={setCurrentForn} searchTerm={searchTerm} searchConfig={searchConfig}/>
                
                <FornDetails host={host} hideDetails={hideDetails} setHideDetails={setHideDetails} currentForn={currentForn} user={user} setFornRemoved={setFornRemoved} refreshFornList={refreshFornList} newEndRef={newEndRef} newEndNumberRef={newEndNumberRef} newEndReferenceRef={newEndReferenceRef}/>
            </section>
        </>
    )
}

Fornecedores.propTypes = {
    user: PropTypes.object,
    host: PropTypes.string
}

export default Fornecedores;