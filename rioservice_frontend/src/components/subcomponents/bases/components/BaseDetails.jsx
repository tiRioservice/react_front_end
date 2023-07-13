import { useEffect, useState } from "react";

export default function BaseDetails({hideDetails, setHideDetails, currentBase, jwt, host}){
    const [editing, setEditing] = useState(false)
    const [statusMessage, setStatusMessage] = useState(undefined)

    const handleEdit = () => {
        setEditing(true)
    }

    const handleEditSave = () => {
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
                    field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentBase[field.classList[1]] == null)?('Não definido'):(currentBase[field.classList[1]])}</span>`
                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                    field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentBase[field.classList[1]] == null)?('Não definido'):(registro)}</span>`
                }

            })

        }
    }, [currentBase])

    useEffect(() => {
        if(editing){
            const baseFields = document.querySelectorAll('.base-text')
            let capitalizedField = undefined

            baseFields.forEach( field => {
                if(field.classList[1] !== 'registro' 
                && field.classList[1] !== 'base_id' 
                && field.classList[1] !== 'base_matricula'){
                    const span = field.children[0]
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                    
                    let input = document.createElement('input')
                    input.setAttribute('type', 'text')
                    input.setAttribute('class', 'base-input')

                    const attribute = span.innerText !== 'Não definido' ? span.innerHTML : ''
                    input.setAttribute('value', attribute)

                    if(field.classList[1] === 'base_est_civil'){
                        field.innerHTML = 'Estado civil'
                        input = document.createElement('select')
                        input.setAttribute('class', 'base-input')
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
        <div id="base-details" className={!hideDetails ? '' : 'base-details-hidden'}>
            <div className="modal">
                <header>
                    <h2>Detalhes do Base</h2>
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