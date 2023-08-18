import { useEffect, useState, useRef, useCallback } from 'react';
import './scss/style.scss';
import CommandPanel from './components/CommandPanel';
import InsertForm from './components/InsertForm';
import ColabList from './components/ColabList';
import ColabCrud from './components/ColabCrud';
import ColabDetails from './components/ColabDetails';
import ColabSearch from './components/ColabSearch';
import { PropTypes } from 'prop-types';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function Colaboradores({user, host}){
    const [insert, setInsert] = useState(false)
    const [search, setSearch] = useState(false)
    const [allColabs, setAllColabs] = useState(undefined)
    const [hideDetails, setHideDetails] = useState(true)
    const [currentColab, setCurrentColab] = useState(undefined)
    const [colabInserted, setColabInserted] = useState(undefined)
    const [colabRemoved, setColabRemoved] = useState(undefined)
    const refresh = useRef(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchConfig, setSearchConfig] = useState("CPF")

    const refreshColabList = useCallback(() => {
        const crud = new ColabCrud();
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            crud.getColabList(setAllColabs, options)
            refresh.current = false
    }, [user, host])

    useEffect(()=>{
        setColabInserted({"colab_inserted":false})
        setColabRemoved({"colab_removed":false})
        refreshColabList()
    }, [])

    useEffect(() => {
        if(colabInserted !== undefined && "colab_inserted" in colabInserted) {
            if(colabInserted.colab_inserted == true){
                setColabInserted({"colab_inserted":false})
                refreshColabList()
            }
        }
    }, [colabInserted, refreshColabList])

    useEffect(() => {
        if(colabRemoved != undefined && "colab_removed" in colabRemoved) {
            if(colabRemoved.colab_removed == true){
                setColabRemoved({"colab_removed":false})
                refreshColabList()
            }
        }
    }, [colabRemoved, refreshColabList])

    return (
        <>
            <section id="colaboradores">
                {(!insert) ? ((!search) ? (<CommandPanel setInsert={setInsert} setSearch={setSearch} allColabs={(allColabs != undefined)?(allColabs):({})}/>) : ("")) : ("")}

                {(insert) ? (<InsertForm host={host} user={user} setInsert={setInsert} setColabInserted={setColabInserted} refresh={refresh}/>) : ("")}
                
                {(search) ? (<ColabSearch setSearchTerm={setSearchTerm} setSearchConfig={setSearchConfig} searchConfig={searchConfig}/>) : ("")}
                
                <ColabList allColabs={allColabs} setHideDetails={setHideDetails} setCurrentColab={setCurrentColab} searchTerm={searchTerm} searchConfig={searchConfig}/>
                
                <ColabDetails host={host} hideDetails={hideDetails} setHideDetails={setHideDetails} currentColab={currentColab} user={user} setColabRemoved={setColabRemoved} refreshColabList={refreshColabList}/>
            </section>
        </>
    )
}

Colaboradores.propTypes = {
    user: PropTypes.object,
    host: PropTypes.string
}

export default Colaboradores;