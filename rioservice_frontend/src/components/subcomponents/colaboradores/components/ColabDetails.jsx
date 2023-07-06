import { useEffect, useState } from "react"

export default function ColabDetails({hideDetails, setHideDetails, currentColab}){
    const [editing, setEditing] = useState(false)

    const handleEdit = () => {
        setEditing(true)
    }

    const handleEditSave = () => {
        console.log('Salvando edição')
    }
    
    useEffect(() => {
        if(currentColab != undefined && !editing){
            const colabFields = document.querySelectorAll('.colab-text')
            colabFields.forEach( field => {
                let capitalizedField = undefined
                if(field.classList[1] != 'registro'){
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                }
                field.innerHTML = `${capitalizedField} <span className="${field.classList[1]}_value">:${currentColab[field.classList[1]]} </span>`
            })
        }
    }, [currentColab])

    useEffect(() => {
        if(editing){
            const colabFields = document.querySelectorAll('.colab-text')
            colabFields.forEach( field => {
                let capitalizedField = undefined
                if(field.classList[1] != 'registro'){
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                    const span = field.children[0]
                    const input = document.createElement('input')
                    input.setAttribute('type', 'text')
                    input.setAttribute('class', 'colab-input')
                    input.setAttribute('value', span.innerHTML.split(':')[1].trim())
                    field.innerHTML = capitalizedField
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
                        <p className="colab-text registro">Registro: <span className="registro_value">123</span></p>
                    </li>
                    <li className="box">
                        <p className="colab-text colab_id">ID: <span className="colab_id_value">123</span></p>
                    </li>
                    <li className="box">
                        <p className="colab-text colab_matricula">Matricula: <span className="colab_matricula_value">123</span></p>
                    </li>
                    <li className="box">
                        <p className="colab-text colab_nome">Nome: <span className="colab_nome_value">Nome do colaborador</span></p>
                    </li>
                    <li className="box">
                        <p className="colab-text colab_cpf">CPF: <span className="colab_cpf_value">CPF do colaborador</span></p>
                    </li>
                </ul>

                <div className="btnOrganizer">
                    {(!editing) ? (
                        <button className="btnEditColab" onClick={() => handleEdit()}>Editar</button>
                        ) : (
                        <button className="btnEditSaveColab" onClick={() => handleEditSave()}>Salvar</button>
                    )}
                    <button className="btnCloseModal" onClick={() => {
                        setHideDetails(true)
                        setEditing(false)
                    }}>Fechar</button>
                </div>
            </div>
        </div>
    )
}