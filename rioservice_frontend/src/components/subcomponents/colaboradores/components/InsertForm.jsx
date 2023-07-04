import React, {useState} from 'react';
import ColabCrud from './ColabCrud';

export default function CommandPanel({user, setInsert}){
    const crud = new ColabCrud();
    const [login] = useState(undefined)
    const [password] = useState(undefined)

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
                colab_matricula: matricula,
                colab_login:nome,
                colab_password:matricula + nome + cpfLastFour
            }
        }

        crud.insertColab(data)
    }

    return (
        <>
            <div id="form-panel">
                <div className='panel'>
                    <form onSubmit={handleSubmit} className='form-insert-colaborador'>
                        <div className='inputBox'>
                            <label htmlFor='matricula'>Matrícula</label>
                            <input type='text' id='matricula' name='matricula' placeholder='Matricula do colaborador'/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='nome'>Nome</label>
                            <input type='text' id='nome' name='nome' placeholder='Nome do colaborador'/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='cpf'>CPF</label>
                            <input type='text' id='cpf' name='cpf' placeholder='CPF do colaborador'/>
                        </div>

                        <p className='alerta-senha'>A senha provisória é : matricula + nome + 4 ultimos digitos do cpf</p>

                        <button className="submitButton">Enviar</button>
                    </form>
                </div>
            </div>
        </>
    )
}