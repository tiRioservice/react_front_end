import { useCallback, useEffect, useState } from "react";
import EnderecoDetails from "../../common/EnderecoDetails";
import BaseCrud from "./BaseCrud";
import EndCrud from "../../common/EndCrud";
import PropTypes from "prop-types";
const baseCrud = new BaseCrud()
const endCrud = new EndCrud()
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function BaseDetails({hideDetails, setHideDetails, currentBase, user, host, setBaseRemoved, fetchList}){
    const [editing, setEditing] = useState(false)
    const [statusMessage, setStatusMessage] = useState(undefined)
    const [endId, setEndId] = useState(undefined)

    const resetAllData = useCallback(() => {
        setEditing(false)
        setHideDetails(true)
        setStatusMessage(undefined)
        fetchList()
    },[setHideDetails, setStatusMessage, setEditing, fetchList])

    const handleEdit = useCallback(() => {
        setEditing(true)
    }, [setEditing])

    const handleEditSave = useCallback(() => {
        setStatusMessage('Salvando alterações...')
        const baseFields = document.querySelectorAll('.base-text')
        const data = {
            "base_id": undefined,
            "base_nome": undefined,
            "base_desc": undefined,
        }

        baseFields.forEach( field => {
            const firstChild = field.children[0]
                if(firstChild.className != 'registro_value'){
                    if(firstChild.nodeName == 'INPUT'){
                        data[field.classList[1]] = (!isNaN(firstChild.value)) ? (Number(firstChild.value)) : (firstChild.value)
                    } else if(firstChild.nodeName == 'SPAN'){
                        data[field.classList[1]] = (!isNaN(firstChild.innerText)) ? (Number(firstChild.innerText)) : (firstChild.innerText)
                    }
                }
            }
        )

        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        options['method'] = "POST"
        options['body'] = JSON.stringify(data)
        baseCrud.updateBase(setStatusMessage, options)

        setTimeout(() => {
            setEditing(false)
            setStatusMessage(undefined)
        }, 3000)
    }, [user, host, setStatusMessage])

    const handleRemove = useCallback(() => {
        if(currentBase.base_id != null){
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"

            const baseRawData = {
                "base_id": currentBase.base_id
            }
            
            options['body'] = JSON.stringify(baseRawData)
            baseCrud.removeBase(setStatusMessage, options)

            if(currentBase.end_id != null){
                const endRawData = {
                    "end_id": currentBase.end_id
                }
                
                options['body'] = JSON.stringify(endRawData)
                endCrud.removeEnd(options)
            }

            setBaseRemoved({"base_removed":true})
        }
    }, [currentBase, user, host, setStatusMessage, setBaseRemoved])
    
    useEffect(() => {
        if(currentBase != undefined && !editing){
            const date = currentBase.registro
            const splited = date.split(' ')
            const dia = splited[1]
            const mes = splited[2]
            const ano = splited[3]
            const hora = splited[4]
            const registro = `${dia} de ${mes} de ${ano} às ${hora}`
            
            const baseFields = document.querySelectorAll('.base-text')
            baseFields.forEach( field => {
                let capitalizedField = undefined
                if(field.classList[1] != 'registro'){
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1);
                    field.innerHTML = `${capitalizedField}: <span class="${field.classList[1]}_value">${(currentBase[field.classList[1]] == null)?('Não definido'):(currentBase[field.classList[1]])}</span>`
                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                    field.innerHTML = `${capitalizedField}: <span class="${field.classList[1]}_value">${(currentBase[field.classList[1]] == null)?('Não definido'):(registro)}</span>`
                }

            })

            setEndId(currentBase.end_id)

        }
    }, [currentBase, editing])

    useEffect(() => {
        if(editing){
            const baseFields = document.querySelectorAll('.base-text')
            let capitalizedField = undefined

            baseFields.forEach( field => {
                if(field.classList[1] !== 'registro'
                && field.classList[1] !== 'base_id'){
                    const span = field.children[0]
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                    
                    let input = document.createElement('input')
                    const attribute = span.innerText !== 'Não definido' ? span.innerHTML : ''
                    input.setAttribute('type', 'text')
                    input.setAttribute('class', 'base-input')
                    input.setAttribute('value', attribute)
                    
                    field.innerHTML = capitalizedField
                    field.appendChild(input)
                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                }
            })
        }
    }, [editing])

    useEffect(() => {
        if(statusMessage !== undefined){
            setTimeout(() => {
                resetAllData()
            }, 3000)
        }
    }, [statusMessage, resetAllData])
    
    return (
        <div id="base-details" className={!hideDetails ? '' : 'base-details-hidden'}>
            <div className="modal">
                {(statusMessage !== undefined) ? (
                    <div className="modal-feedbackMessage success">
                        <p className="feedbackMessage">{statusMessage}</p>
                    </div>
                ):(
                    <>
                        <header>
                            <h2>Detalhes da Base</h2>
                        </header>
                        <ul id="attributeList">
                            <li className="box">
                                <p className="base-text registro">Registro: <span className="registro_value">xx/xx/xxxx</span></p>
                            </li>
                            <li className="box">
                                <p className="base-text base_id">ID: <span className="base_id_value">id</span></p>
                            </li>
                            <li className="box">
                                <p className="base-text base_nome">Nome: <span className="base_nome_value">nome</span></p>
                            </li>
                            <li className="box">
                                <p className="base-text base_desc">Desc: <span className="base_desc_value">desc</span></p>
                            </li>
                        </ul>

                        {(endId !== undefined && endId !== null) 
                        ? (<EnderecoDetails user={user ? user : undefined} host={host} end_id={endId} />) 
                        : (<h2 className="detailsAdvice">Endereço não cadastrado!</h2>)}

                        <div className="btnOrganizer">
                            {(!editing)?(<button className="btn btnRemoveBase" onClick={handleRemove}>Remover</button>):(<></>)}
                            {(!editing) ? (
                                <button className="btn btnEdit" onClick={() => handleEdit()}>Editar</button>
                                ) : (
                                <button className="btn btnEditSave" onClick={() => handleEditSave()}>Salvar</button>
                            )}
                            <button className="btn btnCloseModal" onClick={() => {
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

BaseDetails.propTypes = {
    hideDetails: PropTypes.bool,
    setHideDetails: PropTypes.func,
    currentBase: PropTypes.object,
    user: PropTypes.object,
    host: PropTypes.string,
    setBaseInserted: PropTypes.func,
    setBaseRemoved: PropTypes.func,
    fetchList: PropTypes.func
}

export default BaseDetails;