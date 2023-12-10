import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import CrudProtoCon from "./CrudProtoCon";

const options = { method: undefined, headers: undefined, body: undefined }

function CotacaoDetails({hideDetails, setHideDetails, currentCotacao, user, host, setCotacaoRemoved, fetchList}){
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
    }, [user, host, setStatusMessage, fetchList])

    const handleRemove = useCallback(() => {
        if(currentCotacao.cot_id != null){
            // const crudProto = new CrudProtoCon()

            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"

            const cotRawData = {
                "cot_id": currentCotacao.cot_id
            }

            options['body'] = JSON.stringify(cotRawData)

            setTimeout(() => {
                setCotacaoRemoved({"cotacao_removed":true})
            }, 1000)
        }
    }, [currentCotacao, user, host, setCotacaoRemoved])
    
    useEffect(() => {
        if(currentCotacao != undefined && !editing){
            const date = currentCotacao.registro
            const splited = date.split(' ')
            const dia = splited[1]
            const mes = splited[2]
            const ano = splited[3]
            const hora = splited[4]
            const registro = `${dia} de ${mes} de ${ano} às ${hora}`

            const cotacaoFields = document.querySelectorAll('.cotacao-text')
            cotacaoFields.forEach( field => {
                let capitalizedField = undefined
                if(field.classList[1] != 'registro'){
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                    field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentCotacao[field.classList[1]] == null)?('Não definido'):(currentCotacao[field.classList[1]])}</span>`
                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                    field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentCotacao[field.classList[1]] == null)?('Não definido'):(registro)}</span>`
                }

            })
        }
    }, [currentCotacao, editing])

    useEffect(() => {
        if(editing){
            const cotacaoFields = document.querySelectorAll('.cot-text')
            let capitalizedField = undefined

            cotacaoFields.forEach( field => {
                if(field.classList[1] !== 'registro' 
                && field.classList[1] !== 'cot_id'){
                    const span = field.children[0]
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                    
                    let input = document.createElement('input')
                    input.setAttribute('type', 'text')
                    input.setAttribute('class', 'cotacao-input')

                    const attribute = span.innerText !== 'Não definido' ? span.innerHTML : ''
                    input.setAttribute('value', attribute)

                    if(field.classList[1] === 'cotacao_est_civil'){
                        field.innerHTML = 'Estado civil'
                        input = document.createElement('select')
                        input.setAttribute('class', 'cotacao-input')
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
        <div id="cotacao-details" className={!hideDetails ? '' : 'cotacao-details-hidden'}>
            <div className="modal">
                {(statusMessage !== undefined) ? (
                    <div className="modal-feedbackMessage success">
                        <p className="feedbackMessage">{statusMessage}</p>
                    </div>
                ):(
                    <>
                    <header>
                        <h2>Detalhes da Cotação</h2>
                    </header>
                    <ul id="attributeList">
                        <li className="box">
                            <p className="cotacao-text registro">Registro: <span className="registro_value">xx/xx/xxxx</span></p>
                        </li>
                        <li className="box">
                            <p className="cotacao-text cot_id">ID: <span className="cot_id_value">id</span></p>
                        </li>
                        <li className="box">
                            <p className="cotacao-text colab_id">Colab: <span className="colab_id_value">colab</span></p>
                        </li>
                        <li className="box">
                            <p className="cotacao-text cot_status">Status: <span className="cot_status_value">status</span></p>
                        </li>
                    </ul>

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

CotacaoDetails.propTypes = {
    hideDetails: PropTypes.bool.isRequired,
    setHideDetails: PropTypes.func.isRequired,
    currentCotacao: PropTypes.object,
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    setCurrentCotacao: PropTypes.func,
    setCotacaoRemoved: PropTypes.func,
    fetchList: PropTypes.func
}

export default CotacaoDetails