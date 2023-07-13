import React, {useEffect, useState} from 'react';
import AreaAlert from '../../common/AreaAlert';

export default function CargoList({allCargos, setHideDetails, setCurrentCargo}){
    const [fetched, setFetched] = useState(false)
    const [allCargosFetched, setAllCargosFetched] = useState(undefined)
    const [cargos, setCargos] = useState(undefined)

    const fetchCargos = () => {
        setAllCargosFetched(allCargos)

        if(allCargosFetched !== undefined) {
            setFetched(true)
        }
    }

    const getCargo = (cargo) => {
        setCurrentCargo(cargo)
    }

    const mapCargos = () => {
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
    }


    useEffect(() => {
        if(allCargos) {
            if(!fetched){
                if(!allCargos.msg){
                    allCargosFetched === undefined && fetchCargos();
                    mapCargos();
                }
            }

        }

    }, [allCargos, allCargosFetched])

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
        : (<AreaAlert frase="Não há cargos registrados! Experimente inserir um para que o sistema possa indexá-lo!"/>)}
        </>
    )
}