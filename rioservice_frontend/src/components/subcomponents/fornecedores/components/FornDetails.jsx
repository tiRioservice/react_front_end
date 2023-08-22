import { useEffect, useState, useCallback } from "react";
import EnderecoDetails from "../../common/EnderecoDetails";
import FornCrud from "./FornCrud";
import EndCrud from "../../common/EndCrud";
import PropTypes from "prop-types";
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function FornDetails({hideDetails, setHideDetails, currentForn, user, host, setFornRemoved, refreshFornList}){
    const [editing, setEditing] = useState(false)
    const [statusMessage, setStatusMessage] = useState(undefined)
    const [endId, setEndId] = useState(undefined)
    const [allForns, setAllForns] = useState(undefined)

    const resetAllData = useCallback(() => {
        setStatusMessage(undefined)
        setEditing(false)
        setHideDetails(true)
        refreshFornList()
    }, [setHideDetails, setStatusMessage, setEditing, refreshFornList])

    const fetchAllForns = useCallback(()=>{
        const fornCrud = new FornCrud();
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        options['method'] = "GET"
        fornCrud.getFornList(setAllForns, options)
    }, [user, host])

    const handleEdit = useCallback(() => {
        setEditing(true)
    }, [setEditing])

    const handleEditSave = useCallback(() => {
        setStatusMessage('Salvando alterações...')
        const fornCrud = new FornCrud();
        const colabFields = document.querySelectorAll('.forn-text')
        const data = {
            "forn_cnpj": undefined,
            "forn_nome_fantasia": undefined,
            "forn_insc_estadual": undefined,
            "forn_insc_municipal": undefined
        }

        colabFields.forEach( field => {
            const firstChild = field.children[0]
            if(firstChild.nodeName === 'SPAN'){
                if(!isNaN(firstChild.innerText)){
                    data[field.classList[1]] = Number(firstChild.innerText)
                }
                return
            } else {
                if(firstChild.value){
                    data[field.classList[1]] 
                    = (!isNaN(firstChild.value) && firstChild.value !== '') 
                    ? Number(firstChild.value) 
                    : (firstChild.value)
                    return
                }
            }


            data[field.classList[1]] = (firstChild.innerText != '') ? (firstChild.innerText) : (null)
            if(data[field.classList[1]] == null){
                delete data[field.classList[1]]
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
        options['body'] = JSON.stringify(data)
        fornCrud.updateForn(setStatusMessage, options)
    }, [user, host, setStatusMessage])

    const handleRemove = useCallback(() => {
        if(currentForn.forn_id != null){
            const fornCrud = new FornCrud();
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"

            const fornRawData = {
                "forn_id": currentForn.forn_id
            }
            
            options['body'] = JSON.stringify(fornRawData)
            fornCrud.removeForn(setStatusMessage, options)
            if(currentForn.end_id != null){
                const endCrud = new EndCrud()
                const endRawData = {
                    "end_id": currentForn.end_id
                }
                
                options['body'] = JSON.stringify(endRawData)
                endCrud.removeEnd(options)
            }

            setFornRemoved({"forn_removed":true})
        }
    }, [currentForn, user, host, setFornRemoved])

    useEffect(() => {
        fetchAllForns()
    },[fetchAllForns])
    
    useEffect(() => {
        if(currentForn != undefined && editing === false){
            const date = currentForn.registro
            const splited = date.split(' ')
            const dia = splited[1]
            const mes = splited[2]
            const ano = splited[3]
            const hora = splited[4]
            const registro = `${dia} de ${mes} de ${ano} às ${hora}`

            const fornFields = document.querySelectorAll('.forn-text')
            fornFields.forEach( field => {
                let capitalizedField = undefined
                if(field.classList[1] != 'registro'){
                    if(field.classList[1] === 'forn_id'){
                        capitalizedField = 'ID'
                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentForn[field.classList[1]] == null)?('Não definido'):(currentForn[field.classList[1]])}</span>`
                    } else 
                    if(field.classList[1] === 'forn_cnpj'){ 
                        capitalizedField = 'CNPJ'
                        allForns.data.forEach( forn => {
                            if(forn.forn_id == currentForn.forn_id){
                                field.innerHTML = `${capitalizedField}: <span id="${forn.forn_cnpj}" className="${field.classList[1]}_value">${forn.forn_cnpj}</span>`

                            }
                        })
                    } else 
                    if(field.classList[1] === 'forn_nome_fantasia'){
                        capitalizedField = 'Nome'
                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${currentForn.forn_nome_fantasia}</span>`
                    } else
                    if(field.classList[1] === 'forn_insc_estadual'){
                        capitalizedField = 'Nome'
                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${currentForn.forn_insc_estadual}</span>`
                    } else
                    if(field.classList[1] === 'forn_insc_municipal'){
                        capitalizedField = 'Nome'
                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${currentForn.forn_insc_municipal}</span>`
                    }
                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                    field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentForn[field.classList[1]] == null)?('Não definido'):(registro)}</span>`
                }
                

            })

            setEndId(currentForn.end_id)
        }
    }, [currentForn, editing, allForns])

    useEffect(() => {
        if(editing){
            const fornFields = document.querySelectorAll('.forn-text')
            let capitalizedField = undefined

            fornFields.forEach( field => {
                if(field.classList[1] !== 'registro' 
                && field.classList[1] !== 'forn_id'){
                    const span = field.children[0]
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                    
                    let input = document.createElement('input')
                    input.setAttribute('type', 'text')
                    input.setAttribute('class', 'forn-input')

                    const attribute = span.innerText !== 'Não definido' ? span.innerHTML : ''
                    input.setAttribute('value', attribute)

                    if(field.classList[1] === 'forn_cnpj'){
                        field.innerHTML = 'CNPJ'
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
        if(statusMessage !== undefined){
            setTimeout(() => {
                resetAllData()
            }, 3000)
        }
    }, [statusMessage, resetAllData])
    
    return (
        <div id="forn-details" className={!hideDetails ? '' : 'forn-details-hidden'}>
            <div className="modal">
                {(statusMessage !== undefined) ? (
                    <div className="modal-feedbackMessage success">
                        <p className="feedbackMessage">{statusMessage}</p>
                    </div>
                ):( 
                    <>
                        <header>
                            <h2>Detalhes do Fornecedor</h2>
                        </header>
                        <ul id="attributeList">
                            <li className="box">
                                <p className="forn-text registro">Registro: <span className="registro_value">xx/xx/xxxx</span></p>
                            </li>
                            <li className="box">
                                <p className="forn-text forn_id">ID: <span className="forn_id_value">####</span></p>
                            </li>
                            <li className="box">
                                <p className="forn-text forn_cnpj">CNPJ: <span className="forn_cnpj_value">####</span></p>
                            </li>
                            <li className="box">
                                <p className="forn-text forn_nome_fantasia">Nome: <span className="forn_nome_fantasia_value">####</span></p>
                            </li>
                            <li className="box">
                                <p className="forn-text forn_insc_estadual">Insc. estadual: <span className="forn_insc_estadual_value">###########</span></p>
                            </li>
                            <li className="box">
                                <p className="forn-text forn_insc_municipal">Insc. municipal: <span className="forn_insc_municipal_value">#############</span></p>
                            </li>
                        </ul>

                        {(endId !== undefined && endId !== null) 
                        ? (<EnderecoDetails user={user ? user : undefined} host={host} end_id={endId} />) 
                        : (<h2 className="detailsAdvice">Endereço não cadastrado!</h2>)}

                        <div className="btnOrganizer">
                            {(!editing) ? (<button className="btn btnRemoveForn" onClick={handleRemove}>Remover</button>) : (<></>)}
                            {(!editing) ? (
                                <button className="btnEdit" onClick={() => handleEdit()}>Editar</button>
                                ) : (
                                <button className="btnEditSave" onClick={() => handleEditSave()}>Salvar</button>
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

FornDetails.propTypes = {
    hideDetails: PropTypes.bool,
    setHideDetails: PropTypes.func,
    currentForn: PropTypes.object,
    user: PropTypes.object,
    host: PropTypes.string,
    setFornRemoved: PropTypes.func,
    refreshFornList: PropTypes.func
}

export default FornDetails;