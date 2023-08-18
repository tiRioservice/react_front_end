import { useCallback, useEffect, useState, useRef } from "react";
import CargoCrud from "./CargoCrud";
import PermissaoCrud from "../../../dashboard/components/PermissaoCrud";
import CargoConfigCrud from "../../../dashboard/components/CargoConfigCrud";
import PropTypes from "prop-types";

const options = { method: undefined, headers: undefined, body: undefined }

function ConfigList({user, host, editing, currentCargoConfigs, setCargoConfigs}){
    const [list, setList] = useState(undefined)
    const [permData, setPermData] = useState(undefined)
    const cargoConfig = useRef(undefined)

    const startSetConfigs = useCallback(() => {
        if(cargoConfig.current.length > 0){
            setCargoConfigs(cargoConfig.current)
        }
    }, [setCargoConfigs, cargoConfig])
    
    const handleChange = useCallback((e, perm_id) => {
        if(cargoConfig.current){
            cargoConfig.current[perm_id - 1].nvl_acesso = (e.target.value == 'true') ? (1) : (0)
            setTimeout(startSetConfigs, 1000)
        }
    }, [cargoConfig, startSetConfigs])

    useEffect(() => {
        if(editing && currentCargoConfigs !== undefined && currentCargoConfigs.data){
            cargoConfig.current = []
            setTimeout(() => {
            const configFields = document.querySelectorAll('.nvl')
            configFields.forEach( (field, i) => {
                if(field.nodeName === 'SELECT'){
                    const permConfig = {
                        "cargo_config_id": currentCargoConfigs.data[i].cargo_config_id,
                        "cargo_id": currentCargoConfigs.data[i].cargo_id,
                        "perm_id": i + 1,
                        "nvl_acesso": (field.value == 'true') ? (1) : (0)
                    }
        
                    cargoConfig.current.push(permConfig)
                }
            })

            setCargoConfigs(cargoConfig.current)
            }, 400)

        }
    }, [currentCargoConfigs, cargoConfig, editing, setCargoConfigs])

    useEffect(() => {
        if(currentCargoConfigs !== undefined && currentCargoConfigs.data){
            let elements;
            if(!editing){
                elements = currentCargoConfigs.data.map( config => {
                    const tag = (
                    <p key={config.cargo_config_id} className="cargoConfigItem">
                        <span className="permissao">
                            {config.perm_id}
                        </span>
                        <span className="nvl">
                            {(config.nvl_acesso === true)?("Ativado"):("Desativado")}
                        </span>
                    </p>)
                    return tag
                })
            } else {
                elements = currentCargoConfigs.data.map( config => {
                    const tag = (
                    <p key={config.cargo_config_id} className="cargoConfigItem">
                        <span className="permissao">
                            {config.perm_id}
                        </span>
                        <select className="nvl" defaultValue={(config.nvl_acesso === true)?("true"):("false")} onChange={(e) => {handleChange(e, config.perm_id)}}>
                            <option value="true">Ativado</option>
                            <option value="false">Desativado</option>
                        </select>
                    </p>)
                    return tag
                })
            }

            setList(elements)
        } else {
            setList(['Sem configurações'])
        }
    }, [currentCargoConfigs, setList, editing, handleChange])

    useEffect(() => {
        const permissaoCrud = new PermissaoCrud()
        options['method'] = "POST"
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        if(list !== undefined && list !== 'Sem configurações'){
            list.forEach( element => {
                const perm = element.props
                if(perm !== undefined){
                    const perm_id = perm.children[0].props.children
                    options['body'] = JSON.stringify({"perm_id": perm_id})
                    permissaoCrud.getPermissaoData(setPermData, options)
                }
            })
        }
    }, [list, user, host])

    useEffect(() => {
        if(permData !== undefined){
            const allConfigDisplays = document.querySelectorAll('.permissao')
            const perm_id = permData.data.perm_id
            allConfigDisplays.forEach( configDisplay => {
                const config_id = Number(configDisplay.innerText)
                if(perm_id === config_id){
                    configDisplay.innerHTML = permData.data.perm_nome
                }
            })
        }
    }, [permData])

    return (
        <>  
            <h3 className="title">Niveis de acesso</h3>
            {list}
        </>
    )
}

ConfigList.propTypes = {
    currentCargoConfigs: PropTypes.object,
    editing: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    setCargoConfigs: PropTypes.func
}

function CargoDetails({hideDetails, setHideDetails, currentCargo, user, host, setCargoRemoved, currentCargoConfigs, fetchConfigs, fetchList}){
    const [editing, setEditing] = useState(false)
    const [statusMessage, setStatusMessage] = useState(undefined)
    const [cargoConfigs, setCargoConfigs] = useState(undefined)

    const resetAllData = useCallback(() =>{
        setEditing(false)
        setHideDetails(true)
        setStatusMessage(undefined)
        fetchConfigs()
        fetchList()
    }, [setEditing, fetchConfigs, setHideDetails, setStatusMessage, fetchList])

    const handleEdit = useCallback(() => {
        setEditing(true)
    }, [setEditing])

    const handleEditSaveConfigs = useCallback((options) => {
        const cargoConfigCrud = new CargoConfigCrud()
        if(cargoConfigs !== undefined && cargoConfigs.length > 0){
            cargoConfigs.forEach( config => {
                options['body'] = JSON.stringify(config)
                cargoConfigCrud.updateCargoConfig(setStatusMessage, options)
            })
        }
    }, [cargoConfigs])

    const handleEditSave = useCallback(() => {
        const cargoCrud = new CargoCrud()
        const colabFields = document.querySelectorAll('.cargo-text')
        const cargoData = {
            "cargo_id": undefined,
            "cargo_nome": undefined,
            "cargo_desc": undefined,
        }

        colabFields.forEach( field => {
            const firstChild = field.childNodes[1]
            if(field.classList[1] != 'registro')
            {
                if(firstChild.nodeName == 'INPUT'){
                    console.log(firstChild.value)
                    cargoData[field.classList[1]] = (!isNaN(firstChild.value)) ? (Number(firstChild.value)) : (firstChild.value)
                } else if(firstChild.nodeName == 'SPAN'){
                    cargoData[field.classList[1]] = (!isNaN(firstChild.innerText)) ? (Number(firstChild.innerText)) : (firstChild.innerText)
                }
            }
        })

        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        options['method'] = "POST"
        handleEditSaveConfigs(options)

        options['body'] = JSON.stringify(cargoData)
        cargoCrud.updateCargo(setStatusMessage, options)
        fetchList()
    }, [user, host, setStatusMessage, handleEditSaveConfigs, fetchList])

    const handleRemoveConfigs = useCallback((options) => {
        const cargoConfigCrud = new CargoConfigCrud()
        currentCargoConfigs.data.forEach( config => {
            options['body'] = JSON.stringify({"cargo_config_id":config.cargo_config_id})
            cargoConfigCrud.removeCargoConfig(setStatusMessage, options)
        })
    }, [currentCargoConfigs])

    const handleRemove = useCallback(() => {
        if(currentCargo.cargo_id != null){
            const cargoCrud = new CargoCrud()

            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"

            const cargoRawData = {
                "cargo_id": currentCargo.cargo_id
            }

            handleRemoveConfigs(options)
            options['body'] = JSON.stringify(cargoRawData)
            cargoCrud.removeCargo(setStatusMessage, options)

            setTimeout(() => {
                setCargoRemoved({"cargo_removed":true})
            }, 1000)
        }
    }, [currentCargo, user, host, setStatusMessage, setCargoRemoved, handleRemoveConfigs])
    
    useEffect(() => {
        if(currentCargo != undefined && !editing){
            const date = currentCargo.registro
            const splited = date.split(' ')
            const dia = splited[1]
            const mes = splited[2]
            const ano = splited[3]
            const hora = splited[4]
            const registro = `${dia} de ${mes} de ${ano} às ${hora}`

            const cargoFields = document.querySelectorAll('.cargo-text')
            cargoFields.forEach( field => {
                let capitalizedField = undefined
                if(field.classList[1] != 'registro'){
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                    field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentCargo[field.classList[1]] == null)?('Não definido'):(currentCargo[field.classList[1]])}</span>`
                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                    field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentCargo[field.classList[1]] == null)?('Não definido'):(registro)}</span>`
                }

            })
        }
    }, [currentCargo, editing])

    useEffect(() => {
        if(editing){
            const colabFields = document.querySelectorAll('.cargo-text')
            let capitalizedField = undefined

            colabFields.forEach( field => {
                if(field.classList[1] !== 'registro' 
                && field.classList[1] !== 'cargo_id' 
                && field.classList[1] !== 'cargo_matricula'){
                    const span = field.children[0]
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                    
                    let input = document.createElement('input')
                    input.setAttribute('type', 'text')
                    input.setAttribute('class', 'cargo-input')

                    const attribute = span.innerText !== 'Não definido' ? span.innerHTML : ''
                    input.setAttribute('value', attribute)

                    if(field.classList[1] === 'cargo_est_civil'){
                        field.innerHTML = 'Estado civil'
                        input = document.createElement('select')
                        input.setAttribute('class', 'cargo-input')
                        const options = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)']
                        options.forEach( option => {
                            const optionElement = document.createElement('option')
                            optionElement.setAttribute('value', option)
                            optionElement.innerHTML = option
                            input.appendChild(optionElement)
                        })
                    } else {
                        field.innerHTML = capitalizedField
                    }

                    field.appendChild(input)
                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                }
            })
        }
    }, [editing])

    useEffect(() => {
        if(statusMessage){
            setTimeout(() => {
                resetAllData()
            }, 3000)
        }
    }, [statusMessage, resetAllData])
    
    return (
        <div id="cargo-details" className={!hideDetails ? '' : 'cargo-details-hidden'}>
            <div className="modal">
                {(statusMessage !== undefined) ? (
                    <div className="modal-feedbackMessage success">
                        <p className="feedbackMessage">{statusMessage}</p>
                    </div>
                ):(
                    <>
                    <header>
                        <h2>Detalhes do Cargo</h2>
                    </header>
                    <ul id="attributeList">
                        <li className="box">
                            <p className="cargo-text registro">Registro: <span className="registro_value">xx/xx/xxxx</span></p>
                        </li>
                        <li className="box">
                            <p className="cargo-text cargo_id">ID: <span className="cargo_id_value">id</span></p>
                        </li>
                        <li className="box">
                            <p className="cargo-text cargo_nome">Nome: <span className="cargo_nome_value">nome</span></p>
                        </li>
                        <li className="box">
                            <p className="cargo-text cargo_desc">Desc: <span className="cargo_desc_value">desc</span></p>
                        </li>
                    </ul>

                    <ConfigList user={user} host={host} editing={editing} currentCargoConfigs={currentCargoConfigs} setCargoConfigs={setCargoConfigs}/>

                    <div className="btnOrganizer">
                    {(!editing)?(<button className="btn btnRemoveCargo" onClick={handleRemove}>Remover</button>):(<></>)}
                            {(!editing) ? (
                                <button className="btn btnEdit" onClick={() => handleEdit()}>Editar</button>
                                ) : (
                                <button className="btn btnEditSave" onClick={() => handleEditSave()}>Salvar</button>
                            )}
                        <button className="btnCloseModal" onClick={() => {
                            setHideDetails(true)
                            setEditing(false)
                        }}>Fechar</button>
                    </div>
                </>
                )}
            </div>
        </div>
    )
}

CargoDetails.propTypes = {
    hideDetails: PropTypes.bool.isRequired,
    setHideDetails: PropTypes.func.isRequired,
    currentCargo: PropTypes.object,
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    setCurrentCargo: PropTypes.func,
    setCargoRemoved: PropTypes.func,
    currentCargoConfigs: PropTypes.object,
    setCargoConfigs: PropTypes.func,
    fetchConfigs: PropTypes.func,
    fetchList: PropTypes.func
}

export default CargoDetails