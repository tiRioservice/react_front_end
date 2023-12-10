import { useEffect, useState, useCallback, useRef } from "react";
import EnderecoDetails from "../../common/EnderecoDetails";
import ColabCrud from "./ColabCrud";
import EndCrud from "../../common/EndCrud";
import CargoCrud from "../../cargos/components/CargoCrud";
import BaseCrud from "../../bases/components/BaseCrud";
import PropTypes from "prop-types";
import EnderecoForm from "../../common/EnderecoForm";
const colabCrud = new ColabCrud()
const endCrud = new EndCrud()
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function ColabDetails({hideDetails, setHideDetails, currentColab, user, host, setColabRemoved, refreshColabList, newEndRef, newEndNumberRef, newEndReferenceRef}){
    const [editing, setEditing] = useState(false)
    const [statusMessage, setStatusMessage] = useState(undefined)
    const [endId, setEndId] = useState(undefined)
    const [allCargos, setAllCargos] = useState(undefined)
    const [allBases, setAllBases] = useState(undefined)
    const saveNewEndReady = useRef(false)
    const saveNewEnd = useRef(undefined)
    const [editNewEndStart, setEditNewStart] = useState(false)

    const resetAllData = useCallback(() => {
        setStatusMessage(undefined)
        setEditing(false)
        setHideDetails(true)
        refreshColabList()
    }, [setHideDetails, setStatusMessage, setEditing, refreshColabList])

    const fetchAllBases = useCallback(()=>{
        const baseCrud = new BaseCrud();
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        options['method'] = "GET"
        baseCrud.getBaseList(setAllBases, options)
    }, [user, host])

    const fetchAllCargos = useCallback(()=>{
        const cargoCrud = new CargoCrud();
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        options['method'] = "GET"
        delete options.body
        cargoCrud.getCargoList(setAllCargos, options)
    }, [user, host])

    const editAddAddress = useCallback((e) => {
        e.preventDefault()
        setEditNewStart(true)
    }, [setEditNewStart])

    const handleEdit = () => {
        setEditing(true)
    }

    const handleEditSave = () => {
        setStatusMessage('Salvando alterações...')
        let end_id = null
        const colabFields = document.querySelectorAll('.colab-text')
        const data = {
            "colab_id": undefined,
            "colab_matricula": undefined,
            "colab_nome": undefined,
            "colab_nascimento": undefined,
            "colab_cpf": undefined,
            "colab_rg": undefined,
            "colab_est_civil": undefined,
            "colab_naturalidade": undefined,
            "colab_fone": undefined,
            "colab_celular": undefined,
            "colab_escolaridade": undefined,
            "colab_admissao": undefined,
            "colab_email": undefined,
            "colab_centro_custo": undefined,
            "colab_status": undefined,
            "cargo_id": undefined
        }

        if(editNewEndStart){
            end_id = handleEditSaveNewAddress({"new end": "new end"})
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
        colabCrud.updateColab(setStatusMessage, options)
    }

    const handleEditSaveNewAddress = useCallback((endData) => {
        console.log("save new address data: ", endData)
        return 1989
    },[])

    const handleRemove = () => {
        if(currentColab.colab_id != null){
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"

            const colabRawData = {
                "colab_id": currentColab.colab_id
            }
            
            options['body'] = JSON.stringify(colabRawData)
            colabCrud.removeColab(setStatusMessage, options)
            if(currentColab.end_id != null){
                const endRawData = {
                    "end_id": currentColab.end_id
                }
                
                options['body'] = JSON.stringify(endRawData)
                endCrud.removeEnd(options)
            }

            setColabRemoved({"colab_removed":true})
        }
    }

    useEffect(() => {
        fetchAllCargos()
        fetchAllBases()
    },[fetchAllCargos, fetchAllBases])
    
    useEffect(() => {
        if(currentColab != undefined && editing === false){
            const date = currentColab.registro
            const splited = date.split(' ')
            const dia = splited[1]
            const mes = splited[2]
            const ano = splited[3]
            const hora = splited[4]
            const registro = `${dia} de ${mes} de ${ano} às ${hora}`

            const colabFields = document.querySelectorAll('.colab-text')
            colabFields.forEach( field => {
                let capitalizedField = undefined
                if(field.classList[1] != 'registro'){
                    if(field.classList[1] === 'colab_est_civil'){
                        capitalizedField = 'Estado civil'
                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentColab[field.classList[1]] == null)?('Não definido'):(currentColab[field.classList[1]])}</span>`
                    } else
                    if(field.classList[1] === 'cargo_id'){ 
                        capitalizedField = 'Cargo'
                        allCargos.data.forEach( cargo => {
                            if(cargo.cargo_id == currentColab.cargo_id){
                                field.innerHTML = `${capitalizedField}: <span id="${cargo.cargo_id}" className="${field.classList[1]}_value">${cargo.cargo_nome}</span>`

                            }
                        })
                    } else
                    if(field.classList[1] === 'base_id'){ 
                        capitalizedField = 'Base'
                        allBases.data.forEach( base => {
                            if(base.base_id == currentColab.base_id){
                                field.innerHTML = `${capitalizedField}: <span id="${base.base_id}" className="${field.classList[1]}_value">${base.base_nome}</span>`
                            }
                        })
                    } 
                    else if(field.classList[1] === 'colab_fone'){
                        capitalizedField = 'Telefone(fixo)'
                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentColab[field.classList[1]] == null)?('Não definido'):(currentColab[field.classList[1]])}</span>`
                    } else if(field.classList[1] === 'colab_centro_custo'){
                        capitalizedField = 'Centro de custo'
                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentColab[field.classList[1]] == null)?('Não definido'):(currentColab[field.classList[1]])}</span>`
                    } else if(field.classList[1] === 'colab_status'){ 
                        capitalizedField = 'Status'
                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentColab[field.classList[1]] == 0)?('INATIVO'):('ATIVO')}</span>`
                    } else if(field.classList[1] === 'colab_admissao'){ 
                        capitalizedField = 'Admissao'
                        const fullDate = currentColab[field.classList[1]]
                        let formattedDate = undefined
                        if(fullDate != null){
                            const dataFromDate = fullDate.split(' ')
                            const [diaDaSem, data, mes, ano, horario, fuso] = dataFromDate
                            const meses = {
                                'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
                            }
    
                            const unused = [diaDaSem, horario, fuso]
                            
                            for (const [key, value] of Object.entries(meses)) {
                                if(String(mes) == key){
                                    formattedDate = `${ano}-${value}-${data}`
                                }
                            }
                        }

                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentColab[field.classList[1]] == null)?('-'):(formattedDate)}</span>`
                    } else if(field.classList[1] === 'colab_nascimento'){ 
                        capitalizedField = 'Nascimento'
                        const fullDate = currentColab[field.classList[1]]
                        let formattedDate = undefined
                        if(fullDate != null){
                            const dataFromDate = fullDate.split(' ')
                            const [diaDaSem, data, mes, ano, horario, fuso] = dataFromDate
                            const meses = {
                                'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
                            }
    
                            const unused = [diaDaSem, horario, fuso]
                            
                            for (const [key, value] of Object.entries(meses)) {
                                if(String(mes) == key){
                                    formattedDate = `${ano}-${value}-${data}`
                                }
                            }
                        }

                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentColab[field.classList[1]] == null)?('-'):(formattedDate)}</span>`
                    } else {
                        capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentColab[field.classList[1]] == null)?('Não definido'):(currentColab[field.classList[1]])}</span>`
                    }

                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                    field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentColab[field.classList[1]] == null)?('Não definido'):(registro)}</span>`
                }
                

            })

            setEndId(currentColab.end_id)
        }
    }, [currentColab, editing, allCargos, allBases])

    useEffect(() => {
        if(editing){
            const colabFields = document.querySelectorAll('.colab-text')
            let capitalizedField = undefined

            colabFields.forEach( field => {
                if(field.classList[1] !== 'registro' 
                && field.classList[1] !== 'colab_id' 
                && field.classList[1] !== 'colab_matricula'){
                    const span = field.children[0]
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                    
                    let input = document.createElement('input')
                    input.setAttribute('type', 'text')
                    input.setAttribute('class', 'colab-input')

                    const attribute = span.innerText !== 'Não definido' ? span.innerHTML : ''
                    input.setAttribute('value', attribute)

                    if(field.classList[1] === 'base_id'){
                        const fieldText = field.childNodes[1].id
                        const base_id = parseInt(fieldText)
                        const allOptions = allBases.data

                        if(allBases !== undefined){
                            input = document.createElement('select')
                            input.setAttribute('class', 'colab-input')
                            field.innerHTML = 'Cargo'

                            allOptions.forEach( option => {
                                const optionElement = document.createElement('option')
                                optionElement.setAttribute('value', option.base_id)
                                optionElement.innerHTML = option.base_nome
                                if(option.base_id == base_id){
                                    optionElement.setAttribute('selected', true)
                                }

                                input.appendChild(optionElement)
                            })
                            field.parentNode.hidden = false
                        }

                    } else if(field.classList[1] === 'cargo_id'){
                        const fieldText = field.childNodes[1].id
                        const cargo_id = parseInt(fieldText)
                        
                        if(allCargos !== undefined){
                            input = document.createElement('select')
                            input.setAttribute('class', 'colab-input')
                            field.innerHTML = 'Cargo'
                            const allOptions = allCargos.data

                            allOptions.forEach( option => {
                                const optionElement = document.createElement('option')
                                optionElement.setAttribute('value', option.cargo_id)
                                optionElement.innerHTML = option.cargo_nome
                                if(option.cargo_id == cargo_id){
                                    optionElement.setAttribute('selected', true)
                                }

                                input.appendChild(optionElement)
                            })
                            field.parentNode.hidden = false
                        }
                    } else if(field.classList[1] === 'colab_est_civil'){
                        field.innerHTML = 'Estado civil'
                        input = document.createElement('select')
                        input.setAttribute('class', 'colab-input')
                        const options = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)']
                        options.forEach( option => {
                            const optionElement = document.createElement('option')
                            optionElement.setAttribute('value', option)
                            optionElement.innerHTML = option
                            input.appendChild(optionElement)
                        })
                    } else if(field.classList[1] === 'colab_centro_custo'){
                        field.innerHTML = 'Centro de custo'
                    } else if(field.classList[1] === 'colab_fone'){
                        field.innerHTML = 'Telefone(fixo)'
                    } else if(field.classList[1] === 'colab_email'){
                        field.innerHTML = 'Email'
                        input.type = 'email'
                    } else if(field.classList[1] === 'colab_escolaridade'){
                        field.innerHTML = 'Escolaridade'
                        input = document.createElement('select')
                        input.setAttribute('class', 'colab-input')
                        const options = ['Ensino Fundamental Incompleto', 'Ensino Fundamental Completo', 'Ensino Médio Incompleto', 'Ensino Médio Completo', 'Ensino Técnico', 'Ensino Superior Incompleto', 'Ensino Superior Completo', 'Pós-Graduação', 'Mestrado']
                        options.forEach( option => {
                            const optionElement = document.createElement('option')
                            optionElement.setAttribute('value', option)
                            optionElement.innerHTML = option
                            input.appendChild(optionElement)
                        })
                    } else if(field.classList[1] === 'colab_status'){
                        let status_code = field.innerText.split(': ')[1] === 'ATIVO' ? 1 : 0
                        field.innerHTML = 'Status'
                        input = document.createElement('select')
                        input.setAttribute('class', 'colab-input')
                        const options = ['INATIVO', 'ATIVO']
                        options.forEach( (option, index) => {
                            const optionElement = document.createElement('option')
                            optionElement.setAttribute('value', index)
                            optionElement.innerHTML = option
                            optionElement.selected = (index === status_code) ? true : false
                            input.appendChild(optionElement)
                        })
                    } else if(field.classList[1] === 'colab_admissao'){
                        let dateValue = span.innerText !== '-' ? span.innerHTML : '-'
                        input = document.createElement('input')
                        input.setAttribute('class', 'colab-input')
                        input.setAttribute('type', 'date')
                        input.value = dateValue
                        field.innerHTML = 'Admissao'
                    } else if(field.classList[1] === 'colab_nascimento'){
                        let dateValue = span.innerText !== '-' ? span.innerHTML : '-'
                        input = document.createElement('input')
                        input.setAttribute('class', 'colab-input')
                        input.setAttribute('type', 'date')
                        input.value = dateValue
                        field.innerHTML = 'Nascimento'
                    } else {
                        field.innerHTML = capitalizedField
                    }

                    field.appendChild(input)
                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                }
            })
        }
    }, [editing, fetchAllCargos, allCargos, allBases])

    useEffect(() => {
        if(statusMessage !== undefined){
            setTimeout(() => {
                resetAllData()
            }, 3000)
        }
    }, [statusMessage, resetAllData])
    
    return (
        <div id="colab-details" className={!hideDetails ? '' : 'colab-details-hidden'}>
            <div className="modal">
                {(statusMessage !== undefined) ? (
                    <div className="modal-feedbackMessage success">
                        <p className="feedbackMessage">{statusMessage}</p>
                    </div>
                ):( 
                    <>
                        <header>
                            <h2>Detalhes do Colaborador</h2>
                        </header>
                        <ul id="attributeList">
                            <li className="box">
                                <p className="colab-text registro">Registro: <span className="registro_value">xx/xx/xxxx</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_id">ID: <span className="colab_id_value">####</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_matricula">Matricula: <span className="colab_matricula_value">####</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_nome">Nome: <span className="colab_nome_value">Nome do colaborador</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_nascimento">Data de nascimento: <span className="colab_nascimento_value">Data de nascimento do colaborador</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_cpf">CPF: <span className="colab_cpf_value">CPF do colaborador</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_rg">RG: <span className="colab_rg_value">RG do colaborador</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_est_civil">Estado civil: <span className="colab_est_civil_value">Estado civil do colaborador</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_naturalidade">Naturalidade: <span className="colab_naturalidade_value">Naturalidade do colaborador</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_fone">Telefone (res): <span className="colab_fone_value">Telefone do colaborador</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_celular">Celular: <span className="colab_celular_value">Celular do colaborador</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_escolaridade">Escolaridade: <span className="colab_escolaridade_value">Escolaridade do colaborador</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_admissao">Admissão: <span className="colab_admissao_value">Admissão do colaborador</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_email">Email: <span className="colab_email_value">Email do colaborador</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_centro_custo">Centro de custo: <span className="colab_centro_custo_value">Centro de custo do colaborador</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text base_id">Base:<span className="base_id_value">xx</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text cargo_id">Cargo:<span className="cargo_id_value">xx</span></p>
                            </li>
                            <li className="box">
                                <p className="colab-text colab_status">Status: <span className="colab_status_value">Status do colaborador</span></p>
                            </li>
                        </ul>

                        {(endId !== undefined && endId !== null) 
                        ? (<EnderecoDetails user={user ? user : undefined} host={host} end_id={endId} editing={editing} saveNewEnd={saveNewEnd} saveNewEndReady={saveNewEndReady} newEndRef={newEndRef} newEndNumberRef={newEndNumberRef} newEndReferenceRef={newEndReferenceRef} end_type={2}/>) 
                        : (
                        <>
                        {(editing && editNewEndStart) ? (<EnderecoForm/>) : (<h2 className="detailsAdvice">Endereço não cadastrado!</h2>)}
                        {(editing && !editNewEndStart)?(<button className="btnEditAddAddress" onClick={editAddAddress}>Inserir um endereço</button>):(<></>)}
                        </>)}

                        <div className="btnOrganizer">
                            {(!editing) ? (<button className="btn btnRemoveBase" onClick={handleRemove}>Remover</button>) : (<></>)}
                            {(!editing) ? (
                                <button className="btnEdit" onClick={() => handleEdit()}>Editar</button>
                                ) : (
                                <button className="btnEditSave" onClick={() => handleEditSave()}>Salvar</button>
                            )}
                            <button className="btnCloseModal" onClick={() => {
                                setHideDetails(true)
                                setEditing(false)
                                setEditNewStart(false)
                            }}>Fechar</button>
                        </div>
                    </>
                )}

                

            </div>
        </div>
    )
}

ColabDetails.propTypes = {
    hideDetails: PropTypes.bool,
    setHideDetails: PropTypes.func,
    currentColab: PropTypes.object,
    user: PropTypes.object,
    host: PropTypes.string,
    setColabRemoved: PropTypes.func,
    refreshColabList: PropTypes.func,
    newEndRef: PropTypes.object,
    newEndNumberRef: PropTypes.object,
    newEndReferenceRef: PropTypes.object
}

export default ColabDetails;