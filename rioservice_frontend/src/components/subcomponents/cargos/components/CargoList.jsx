import {useCallback, useEffect, useState, useRef} from 'react';
import AreaAlert from '../../common/AreaAlert';
import PropTypes from 'prop-types';
import CargoConfigCrud from '../../../dashboard/components/CargoConfigCrud';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function CargoList({host, user, allCargos, setHideDetails, setCurrentCargo, searchTerm, searchConfig, setCurrentCargoConfigs}){
    const [fetched, setFetched] = useState(false)
    const [allCargosFetched, setAllCargosFetched] = useState(undefined)
    const [cargos, setCargos] = useState(undefined)
    const cargo_id = useRef(undefined)

    const fetchCargos = useCallback(() => {
        setAllCargosFetched(allCargos)

        if(allCargosFetched !== undefined) {
            setFetched(true)
        }
    }, [allCargos, allCargosFetched])

    const getCargoConfig = useCallback((cargo) => {
        if(cargo_id !== undefined){
            const userCargoConfigCrud = new CargoConfigCrud();
            options.method = "POST"
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }
            options.body = JSON.stringify({"cargo_id":cargo.cargo_id})
            userCargoConfigCrud.getCargoConfigList(setCurrentCargoConfigs, options)
        }
    }, [setCurrentCargoConfigs, user, host])

    const getCargo = useCallback((cargo) => {
        setCurrentCargo(cargo)
        setHideDetails(false)

        if(cargo.cargo_id !== null){
            getCargoConfig(cargo)
        }
    }, [setCurrentCargo, setHideDetails, getCargoConfig])

    const mapCargos = useCallback(() => {
        setCargos(allCargos.data.map( cargo => {
            return (
                <tr className={`cargo cargo-${cargo.cargo_id}`} key={cargo.cargo_id} onClick={() => {getCargo(cargo)}}>
                    <td>
                        {cargo.cargo_id} {/* TROCA : name / nome */}
                    </td>
                    <td>
                        {cargo.cargo_nome} {/* TROCA : name / nome */}
                    </td>
                    <td>
                        {cargo.cargo_desc}
                    </td>
                </tr>
            )
        }))
    }, [allCargos, getCargo])

    const filterCargos = useCallback(() => {
        if(searchTerm !== undefined){
            if(searchTerm !== ""){
                if(searchConfig != "nome"){
                    setCargos(allCargos.data.filter(cargo => {
                        return cargo.cargo_id.toString().includes(searchTerm.toString());
                    }).map( cargo => {
                        return (
                            <tr className={`cargo cargo-${cargo.cargo_id}`} key={cargo.cargo_id} onClick={() => {getCargo(cargo)}}>
                                <td>
                                    {cargo.cargo_id}
                                </td>
                                <td>
                                    {cargo.cargo_nome}
                                </td>
                                <td>
                                    {cargo.cargo_desc}
                                </td>
                            </tr>
                        )
                    }))
                } else {
                    setCargos(allCargos.data.filter(cargo => {
                        return cargo['cargo_nome'].split(' ').join().includes(searchTerm);
                    }).map( cargo => {
                        return (
                            <tr className={`cargo cargo-${cargo.cargo_id}`} key={cargo.cargo_id} onClick={() => {getCargo(cargo)}}>
                                <td>
                                    {cargo.cargo_id}
                                </td>
                                <td>
                                    {cargo.cargo_nome}
                                </td>
                                <td>
                                    {cargo.cargo_desc}
                                </td>
                            </tr>
                        )
                    }))
                }
            } else {
                mapCargos();
            }
        }
    }, [allCargos, getCargo, mapCargos, searchTerm, searchConfig])

    useEffect(() => {
        if(allCargos) {
            if(!fetched){
                if(!allCargos.msg){
                    allCargosFetched === undefined && fetchCargos();
                    filterCargos();
                }
            }

        }

    }, [allCargos, allCargosFetched, fetchCargos, fetched, filterCargos])

    return (
        <>
            {(cargos !== undefined) ?
                (<div id="cargo-list">
                    <table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Nome</td>
                                <td>Desc</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cargos}
                        </tbody>
                    </table>
                </div>)
            : (<AreaAlert frase="Não há cargos registrados! Experimente inserir um para que o sistema possa indexá-lo!"/>)
            }
        </>
    )
}

CargoList.propTypes = {
    host: PropTypes.string,
    user: PropTypes.object,
    allCargos: PropTypes.object,
    setHideDetails: PropTypes.func,
    setCurrentCargo: PropTypes.func,
    searchTerm: PropTypes.string,
    searchConfig: PropTypes.string,
    setCurrentCargoConfigs: PropTypes.func
}

export default CargoList;