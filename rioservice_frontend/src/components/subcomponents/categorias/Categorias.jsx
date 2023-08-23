import { useEffect, useState, useCallback } from 'react';
import './scss/style.scss';
import CommandPanel from './components/CommandPanel';
import InsertForm from './components/InsertForm';
import CategList from './components/CategList';
import CategCrud from './components/CategCrud';
import CategDetails from './components/CategDetails';
import CategSearch from './components/CategSearch';
import { PropTypes } from 'prop-types';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function Categorias({user, host}){
    const [insert, setInsert] = useState(false)
    const [search, setSearch] = useState(false)
    const [allCategs, setAllCategs] = useState(undefined)
    const [hideDetails, setHideDetails] = useState(true)
    const [currentCateg, setCurrentCateg] = useState(undefined)
    const [categInserted, setCategInserted] = useState(undefined)
    const [categRemoved, setCategRemoved] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchConfig, setSearchConfig] = useState("nome")

    const fetchList = useCallback(() => {
        const categCrud = new CategCrud();
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        categCrud.getCategList(setAllCategs, options)
    },[user, host])

    useEffect(() => {
        setCategInserted({"categ_inserted":false})
        setCategRemoved({"categ_removed":false})
        fetchList()
    }, [fetchList])

    useEffect(() => {
        if(categInserted !== undefined && "categ_inserted" in categInserted) {
            if(categInserted.categ_inserted == true){
                setCategInserted({"categ_inserted":false})
                fetchList()
            }
        }
    }, [categInserted, host, user, fetchList])

    useEffect(() => {
        if(categRemoved != undefined && "categ_removed" in categRemoved) {
            if(categRemoved.categ_removed == true){
                setCategRemoved({"categ_removed":false})
                fetchList()
            }
        }
    }, [categRemoved, fetchList])

    return (
        <>
            <section id="categorias">
                {(!insert) ? ((!search) ? (<CommandPanel setInsert={setInsert} setSearch={setSearch} allCategs={(allCategs != undefined)?(allCategs):({})}/>):(<></>)) : (<></>)}

                {(insert) ? (<InsertForm host={host} user={user} setInsert={setInsert} setCategInserted={setCategInserted} categInserted={categInserted} fetchList={fetchList}/>) : (<></>)}

                {(search) ? (<CategSearch setSearchTerm={setSearchTerm} setSearchConfig={setSearchConfig} searchConfig={searchConfig}/>) : (<></>)}

                <CategList allCategs={allCategs} setHideDetails={setHideDetails} setCurrentCateg={setCurrentCateg} searchTerm={searchTerm} searchConfig={searchConfig}/>
                
                <CategDetails host={host} hideDetails={hideDetails} setHideDetails={setHideDetails} currentCateg={currentCateg} user={user} setCategRemoved={setCategRemoved} fetchList={fetchList}/>
            </section>
        </>
    )
}

Categorias.propTypes = {
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired
}

export default Categorias;