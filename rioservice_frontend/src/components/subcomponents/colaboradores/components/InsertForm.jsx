import {useEffect, useState} from 'react';
import ColabCrud from './ColabCrud';
import EnderecoForm from '../../common/EnderecoForm';
import EndCrud from '../../common/EndCrud';

export default function CommandPanel({setInsert, host, user, setColabInserted}){
    // const [login] = useState(undefined)
    // const [password] = useState(undefined)
    const colabCrud = new ColabCrud();
    const endCrud = new EndCrud();
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)
    const [insertEndReady, setInsertEndReady] = useState(false)
    const [endereco_inserted, setEndereco_inserted] = useState(false)
    const [colab_inserted, setColab_inserted] = useState(false)
    const [endData, setEndData] = useState(undefined)
    const [colabData, setColabData] = useState(undefined)

    const resetForm = () => {
        document.getElementById('matricula').value = ''
        document.getElementById('nome').value = ''
        document.getElementById('cpf').value = ''
        setColabData(undefined)
    }

    const handleInsertEnd = () => {
        const insertEnd = document.getElementById('insertEnd')
        
        if (insertEnd.checked) {
            setInsertEndReady(true)
        } else {
            setInsertEndReady(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const cpf = e.target.elements.cpf.value
        const nome = e.target.elements.nome.value
        const matricula = e.target.elements.matricula.value
        console.log("---> ", nome.split(' ')[0].toLowerCase())

        const cpfLastFour = cpf.substring(cpf.length - 4, cpf.length)

        if(insertEndReady === true && endData === undefined){
            setEndData({
                "end_tipo": '2',
                "end_cep": Number(e.target.elements.cep.value),
                "end_numero": Number(e.target.elements.numero.value),
                "end_referencia": e.target.elements.referencia.value !== '' ? e.target.elements.referencia.value : 'N/A'
            })

            setColabData({
                "colab_cpf": cpf,
                "colab_nome": nome,
                "colab_matricula": matricula == '' ? '0' : matricula,
                "colab_login":nome.split(' ')[0].toLowerCase(),
                "colab_password":matricula + nome + cpfLastFour
            })
        }

        if(insertEndReady === false && colabData === undefined) {
            setColabData({
                "colab_cpf": cpf,
                "colab_nome": nome,
                "colab_matricula": matricula == '' ? '0' : matricula,
                "colab_login":nome,
                "colab_password":matricula + nome + cpfLastFour,
                "end_id": null
            })
        }
    }

    useEffect(()=>{
        if(endData !== undefined){
            endCrud.insertEnd(endData, setFeedbackMessage, user["x-JWT"], host, setEndereco_inserted)
        }
    }, [endData])

    useEffect(()=>{
        if(typeof(colabData) == "object" && typeof(endData) == "object" && endereco_inserted === true){
            const data = {
                "end_tipo": endData.end_tipo,
                "end_cep": endData.end_cep,
                "end_numero": endData.end_numero
            }

            endCrud.getEndColabId(data, user["x-JWT"], host, colabData, setColabData)
        }
    }, [endereco_inserted])

    useEffect(()=>{
        if(typeof(colabData) == "object") {
            colabCrud.insertColab(colabData, setFeedbackMessage, user["x-JWT"], host, setColab_inserted)
        }
    }, [colabData])

    useEffect(()=>{
        if(colab_inserted === true){
            setColabInserted({"colab_inserted":true})
            setTimeout(() => {
                setFeedbackMessage(undefined)
                resetForm()
                setInsert(false)
                setColabInserted({"colab_inserted":false})
                setEndData(undefined)
                setEndereco_inserted(false)
            }, 3000)
        }
    }, [colab_inserted])

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
                            <input type='text' id='nome' name='nome' placeholder='Nome do colaborador' title='O nome pode ter até 50 caracteres.' maxLength='50' required/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='cpf'>CPF</label>
                            <input type='test' id='cpf' name='cpf' placeholder='CPF (Somente os números)' maxLength="11" pattern='[0-9]{11,11}' title="Somente os 11 digitos do CPF, sem ponto ou hífen." required/>
                        </div>

                        <div className="inputBox">
                            <label htmlFor="insertEnd">Inserir um endereço:</label>
                            <input type="checkbox" name="insertEnd" id="insertEnd" onInput={handleInsertEnd}/>
                        </div>

                        <div className={(insertEndReady) ? ("formEnd") : ("hidden")}>
                            <EnderecoForm />
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