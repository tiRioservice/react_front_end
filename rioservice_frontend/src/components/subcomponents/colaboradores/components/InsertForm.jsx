import React, {useState} from 'react';
import ColabCrud from './ColabCrud';

export default function CommandPanel({setInsert, host}){
    const crud = new ColabCrud();
    const [login] = useState(undefined)
    const [password] = useState(undefined)
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)

    const resetForm = () => {
        document.getElementById('matricula').value = ''
        document.getElementById('nome').value = ''
        document.getElementById('cpf').value = ''
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const cpf = e.target.elements.cpf.value
        const nome = e.target.elements.nome.value
        const matricula = e.target.elements.matricula.value

        const cpfLastFour = cpf.substring(cpf.length - 4, cpf.length)

        const data = {
            "data":{
                colab_cpf: cpf,
                colab_nome: nome,
                colab_matricula: matricula == '' ? '0' : matricula,
                colab_login:nome,
                colab_password:matricula + nome + cpfLastFour
            }
        }

        crud.insertColab(data, setFeedbackMessage, host)

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
                    <form onSubmit={handleSubmit} className='form-insert-colaborador'>
                        <div className='inputBox'>
                            <label htmlFor='matricula'>Matrícula</label>
                            <input type='text' id='matricula' name='matricula' placeholder='Matricula do colaborador' maxLength="8" title='O número de matrícula pode ter até 8 digitos.'/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='nome'>Nome</label>
                            <input type='text' id='nome' name='nome' placeholder='Nome do colaborador' pattern='[a-z]{1,50}' title='O nome pode ter até 50 caracteres.' maxLength='50' required/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='cpf'>CPF</label>
                            <input type='test' id='cpf' name='cpf' placeholder='CPF (Somente os números)' maxLength="11" pattern='[0-9]{11,11}' title="Somente os 11 digitos do CPF, sem ponto ou hífen." required/>
                        </div>

                        <div className="organizer">
                            <button className="submitButton">Enviar</button>
                            <span className={feedbackMessage === undefined ? 'hidden' : 'feedbackMessage'}>{feedbackMessage !== undefined ? feedbackMessage : "Mensagem indefinida"}</span>
                        </div>
                    </form>

                    <p className='alerta-senha2'>A senha provisória é : matricula + nome + 4 ultimos digitos do cpf</p>
                </div>
            </div>
        </>
    )
}