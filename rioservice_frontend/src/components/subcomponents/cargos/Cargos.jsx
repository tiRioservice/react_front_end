import { useEffect, useState, useCallback } from 'react';
import './scss/style.scss';
import CommandPanel from './components/CommandPanel';
import InsertForm from './components/InsertForm';
import CargoList from './components/CargoList';
import CargoCrud from './components/CargoCrud';
import CargoDetails from './components/CargoDetails';
import CargoSearch from './components/CargoSearch';
import { PropTypes } from 'prop-types';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function Cargos({user, host, fetchConfigs}){
    const [insert, setInsert] = useState(false)
    const [search, setSearch] = useState(false)
    const [allCargos, setAllCargos] = useState(undefined)
    const [hideDetails, setHideDetails] = useState(true)
    const [currentCargo, setCurrentCargo] = useState(undefined)
    const [currentCargoConfigs, setCurrentCargoConfigs] = useState(undefined)
    const [cargoInserted, setCargoInserted] = useState(undefined)
    const [cargoRemoved, setCargoRemoved] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchConfig, setSearchConfig] = useState("nome")

    const fetchList = useCallback(() => {
        const cargoCrud = new CargoCrud();
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        cargoCrud.getCargoList(setAllCargos, options)
    },[user, host])

    useEffect(() => {
        setCargoInserted({"cargo_inserted":false})
        setCargoRemoved({"cargo_removed":false})
        fetchList()
    }, [fetchList])

    useEffect(() => {
        if(cargoInserted !== undefined && "cargo_inserted" in cargoInserted) {
            if(cargoInserted.cargo_inserted == true){
                setCargoInserted({"cargo_inserted":false})
                fetchList()
            }
        }
    }, [cargoInserted, host, user, fetchList])

    useEffect(() => {
        if(cargoRemoved != undefined && "cargo_removed" in cargoRemoved) {
            if(cargoRemoved.cargo_removed == true){
                setCargoRemoved({"cargo_removed":false})
                fetchList()
            }
        }
    }, [cargoRemoved, fetchList])

    return (
        <>
            <section id="cargos">
                {(!insert) ? ((!search) ? (<CommandPanel setInsert={setInsert} setSearch={setSearch} allCargos={(allCargos != undefined)?(allCargos):({})}/>):(<></>)) : (<></>)}

                {(insert) ? (<InsertForm host={host} user={user} setInsert={setInsert} setCargoInserted={setCargoInserted} cargoInserted={cargoInserted} fetchList={fetchList}/>) : (<></>)}

                {(search) ? (<CargoSearch setSearchTerm={setSearchTerm} setSearchConfig={setSearchConfig} searchConfig={searchConfig}/>) : (<></>)}

                <CargoList host={host} user={user} allCargos={allCargos} setHideDetails={setHideDetails} setCurrentCargo={setCurrentCargo} searchTerm={searchTerm} searchConfig={searchConfig} setCurrentCargoConfigs={setCurrentCargoConfigs}/>
                
                <CargoDetails host={host} hideDetails={hideDetails} setHideDetails={setHideDetails} currentCargo={currentCargo} user={user} setCargoRemoved={setCargoRemoved} currentCargoConfigs={currentCargoConfigs} fetchConfigs={fetchConfigs} fetchList={fetchList}/>
            </section>
        </>
    )
}

Cargos.propTypes = {
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    fetchConfigs: PropTypes.func
}

export default Cargos;