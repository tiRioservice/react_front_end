import React, {useState} from 'react';
import CargoCrud from './CargoCrud';

export default function CommandPanel({user, setInsert, host}){
    const crud = new CargoCrud();
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)

    const resetForm = () => {
        document.getElementById('nome').value = ''
        document.getElementById('desc').value = ''
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const nome = e.target.elements.nome.value
        const desc = e.target.elements.desc.value

        const data = {
                cargo_nome: nome,
                cargo_desc: desc == '' ? 'N/A' : desc,
        }

        crud.insertCargo(data, setFeedbackMessage, user["x-JWT"], host)

        setTimeout(() => {
            setFeedbackMessage(undefined)
            resetForm()
            setInsert(false)
        }, 3000)


    }

    return (
        <>
            <div id="form-panel">
                <div className='panel'>
                    <form onSubmit={handleSubmit} className='form-insert-cargo'>
                        <div className='inputBox'>
                            <label htmlFor='nome'>Nome do cargo</label>
                            <input type='text' id='nome' name='nome' placeholder='Nome de 1 a 30 caracteres.' maxLength='30' required/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='desc'>Descrição</label>
                            <input type='text' id='desc' name='desc' placeholder='Descrição do cargo' maxLength="300" title="O presente campo possui um limite de 300 caracteres."/>
                        </div>

                        <div className="organizer">
                            <button className="submitButton">Enviar</button>
                            <span className={feedbackMessage === undefined ? 'hidden' : 'feedbackMessage'}>{feedbackMessage !== undefined ? feedbackMessage : "Mensagem indefinida"}</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}