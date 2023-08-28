import { useCallback, useEffect, useState } from "react";
import CategCrud from "./CategCrud";
import PropTypes from "prop-types";

const options = { method: undefined, headers: undefined, body: undefined }

function CategDetails({hideDetails, setHideDetails, currentCateg, user, host, setCategRemoved, fetchList}){
    const [editing, setEditing] = useState(false)
    const [statusMessage, setStatusMessage] = useState(undefined)

    const resetAllData = useCallback(() =>{
        setEditing(false)
        setHideDetails(true)
        setStatusMessage(undefined)
        fetchList()
    }, [setEditing, setHideDetails, setStatusMessage, fetchList])

    const handleEdit = useCallback(() => {
        setEditing(true)
    }, [setEditing])

    const handleEditSave = useCallback(() => {
        const categCrud = new CategCrud()
        const categFields = document.querySelectorAll('.categ-text')
        const categData = {
            "categ_id": undefined,
            "categ_nome": undefined,
            "categ_desc": undefined,
        }

        categFields.forEach( field => {
            const firstChild = field.childNodes[1]
            if(field.classList[1] != 'registro')
            {
                if(firstChild.nodeName == 'INPUT'){
                    console.log(firstChild.value)
                    categData[field.classList[1]] = (!isNaN(firstChild.value)) ? (Number(firstChild.value)) : (firstChild.value)
                } else if(firstChild.nodeName == 'SPAN'){
                    categData[field.classList[1]] = (!isNaN(firstChild.innerText)) ? (Number(firstChild.innerText)) : (firstChild.innerText)
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

        options['body'] = JSON.stringify(categData)
        categCrud.updateCateg(setStatusMessage, options)
        fetchList()
    }, [user, host, setStatusMessage, fetchList])

    const handleRemove = useCallback(() => {
        if(currentCateg.categ_id != null){
            const categCrud = new CategCrud()

            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"

            const categRawData = {
                "categ_id": currentCateg.categ_id
            }

            options['body'] = JSON.stringify(categRawData)
            categCrud.removeCateg(setStatusMessage, options)

            setTimeout(() => {
                setCategRemoved({"categ_removed":true})
            }, 1000)
        }
    }, [currentCateg, user, host, setStatusMessage, setCategRemoved])
    
    useEffect(() => {
        if(currentCateg != undefined && !editing){
            const date = currentCateg.registro
            const splited = date.split(' ')
            const dia = splited[1]
            const mes = splited[2]
            const ano = splited[3]
            const hora = splited[4]
            const registro = `${dia} de ${mes} de ${ano} às ${hora}`

            const categFields = document.querySelectorAll('.categ-text')
            categFields.forEach( field => {
                let capitalizedField = undefined
                if(field.classList[1] != 'registro'){
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                    field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentCateg[field.classList[1]] == null)?('Não definido'):(currentCateg[field.classList[1]])}</span>`
                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                    field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentCateg[field.classList[1]] == null)?('Não definido'):(registro)}</span>`
                }

            })
        }
    }, [currentCateg, editing])

    useEffect(() => {
        if(editing){
            const colabFields = document.querySelectorAll('.categ-text')
            let capitalizedField = undefined

            colabFields.forEach( field => {
                if(field.classList[1] !== 'registro' 
                && field.classList[1] !== 'categ_id'){
                    const span = field.children[0]
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                    
                    let input = document.createElement('input')
                    input.setAttribute('type', 'text')
                    input.setAttribute('class', 'categ-input')

                    const attribute = span.innerText !== 'Não definido' ? span.innerHTML : ''
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
        if(statusMessage){
            setTimeout(() => {
                resetAllData()
            }, 3000)
        }
    }, [statusMessage, resetAllData])
    
    return (
        <div id="categ-details" className={!hideDetails ? '' : 'categ-details-hidden'}>
            <div className="modal">
                {(statusMessage !== undefined) ? (
                    <div className="modal-feedbackMessage success">
                        <p className="feedbackMessage">{statusMessage}</p>
                    </div>
                ):(
                    <>
                    <header>
                        <h2>Detalhes do categ</h2>
                    </header>
                    <ul id="attributeList">
                        <li className="box">
                            <p className="categ-text registro">Registro: <span className="registro_value">xx/xx/xxxx</span></p>
                        </li>
                        <li className="box">
                            <p className="categ-text categ_id">ID: <span className="categ_id_value">id</span></p>
                        </li>
                        <li className="box">
                            <p className="categ-text categ_nome">Nome: <span className="categ_nome_value">nome</span></p>
                        </li>
                        <li className="box">
                            <p className="categ-text categ_desc">Desc: <span className="categ_desc_value">desc</span></p>
                        </li>
                    </ul>

                    <div className="btnOrganizer">
                    {(!editing)?(<button className="btn btnRemovecateg" onClick={handleRemove}>Remover</button>):(<></>)}
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

CategDetails.propTypes = {
    hideDetails: PropTypes.bool.isRequired,
    setHideDetails: PropTypes.func.isRequired,
    currentCateg: PropTypes.object,
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    setCurrentCateg: PropTypes.func,
    setCategRemoved: PropTypes.func,
    fetchList: PropTypes.func
}

export default CategDetails