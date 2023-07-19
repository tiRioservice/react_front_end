import { useEffect, useState } from "react";
import EnderecoDetails from "../../common/EnderecoDetails";
import PropTypes from "prop-types";

function ColabDetails({hideDetails, setHideDetails, currentColab, jwt, host}){
    const [editing, setEditing] = useState(false)
    const [statusMessage, setStatusMessage] = useState(undefined)
    const [endId, setEndId] = useState(undefined)

    const handleEdit = () => {
        setEditing(true)
    }

    const handleEditSave = () => {
        console.log(jwt, host)
        setStatusMessage('Salvando alterações...')
        const colabFields = document.querySelectorAll('.colab-text')
        const data = {
            "colab_id": undefined,
            "colab_matricula": undefined,
            "colab_nome": undefined,
            // "colab_nascimento": undefined,
            "colab_cpf": undefined,
            // "colab_rg": undefined,
            "colab_est_civil": undefined,
            // "colab_naturalidade": undefined,
            // "colab_fone": undefined,
            // "colab_celular": undefined,
            // "colab_escolaridade": undefined,
            // "colab_admissao": undefined,
            // "colab_email": undefined,
            // "colab_centro_custo": undefined,
            // "colab_salario": undefined,
            // "colab_status": undefined,
            "colab_login": undefined
        }

        colabFields.forEach( field => {
            console.log(field);
            const firstChild = field.children[0]
            if(firstChild.nodeName !== 'SPAN'){
                if(firstChild.value){
                    data[field.classList[1]] = firstChild.value
                    return
                }
            }

            data[field.classList[1]] = firstChild.innerText
        })

        console.log(data)
        // updateColab(jwt, data, setStatusMessage)

        // setTimeout(() => {
        //     setStatusMessage(undefined)
        //     setEditing(false)
        // }, 3000)
    }
    
    useEffect(() => {
        if(currentColab != undefined && !editing){
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
                    } else if(field.classList[1] === 'colab_centro_custo'){
                        capitalizedField = 'Centro de custo'
                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentColab[field.classList[1]] == null)?('Não definido'):(currentColab[field.classList[1]])}</span>`
                    } else if(field.classList[1] === 'colab_status'){ 
                        capitalizedField = 'Status'
                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentColab[field.classList[1]] == 0)?('INATIVO'):('ATIVO')}</span>`
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
    }, [currentColab, editing])

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
                    console.log(attribute)
                    input.setAttribute('value', attribute)

                    if(field.classList[1] === 'colab_est_civil'){
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
    
    return (
        <div id="colab-details" className={!hideDetails ? '' : 'colab-details-hidden'}>
            <div className="modal">
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
                        <p className="colab-text colab_status">Status: <span className="colab_status_value">Status do colaborador</span></p>
                    </li>
                </ul>

                {(endId !== undefined && endId !== null) 
                ? (<EnderecoDetails jwt={jwt} host={host} end_id={endId} />) 
                : (<h2 className="detailsAdvice">Endereço não cadastrado!</h2>)}

                <div className="btnOrganizer">
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
                
                {(editing && statusMessage !== undefined) ? (
                    <div className="modal-feedbackMessage success">
                        <p className="feedbackMessage">{statusMessage}</p>
                    </div>
                ):('')}
            </div>
        </div>
    )
}

ColabDetails.propTypes = {
    hideDetails: PropTypes.bool,
    setHideDetails: PropTypes.func,
    currentColab: PropTypes.object,
    jwt: PropTypes.string,
    host: PropTypes.string
}

export default ColabDetails;