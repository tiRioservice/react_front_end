import {useEffect, useState, useRef, useCallback} from 'react';
import EnderecoForm from '../../common/EnderecoForm';
import ColabCrud from './ColabCrud';
import EndCrud from '../../common/EndCrud';
import { PropTypes } from 'prop-types';
const colabCrud = new ColabCrud();
const endCrud = new EndCrud()
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function CommandPanel({setInsert, host, user, setColabInserted, refresh}){
    // const [login] = useState(undefined)
    // const [password] = useState(undefined)
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)
    const [insertEndReady, setInsertEndReady] = useState(false)
    const [endData, setEndData] = useState(undefined)
    const [colabData, setColabData] = useState(undefined)
    const n_colabs = useRef(0)
    const colab_inserted = useRef(false)
    const end_id = useRef(null)
    const colabData_ref = useRef(null)

    const insertColab_func = useCallback(() => {
        if(n_colabs.current != 1 && colab_inserted.current == false){
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"
            const rawData = {
                "colab_cpf":colabData_ref.current.colab_cpf,
                "colab_nome":colabData_ref.current.colab_nome,
                "colab_matricula":colabData_ref.current.colab_matricula,
                "colab_login":colabData_ref.current.colab_login,
                "colab_password":colabData_ref.current.colab_password,
                "end_id":colabData_ref.current.end_id
            }

            options['body'] = JSON.stringify(rawData)
            colabCrud.insertColab(setFeedbackMessage, colab_inserted, options)

            setTimeout(() => {
                if(colab_inserted.current === true){
                    n_colabs.current = 1
                }
            }, 1000)
        }
    }, [colabData_ref, colab_inserted, user, host])

    const resetForm = useCallback(() => {
        document.getElementById('matricula').value = ''
        document.getElementById('nome').value = ''
        document.getElementById('cpf').value = ''
        setInsert(false)
        setEndData(undefined)
        setColabData(undefined)
        
        setTimeout(() => {
            setColabInserted({"colab_inserted":false})
        }, 3000)

        refresh.current = true
    }, [setColabData, setInsert, setColabInserted, setEndData, refresh])

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

        const cpfLastFour = cpf.substring(cpf.length - 4, cpf.length)

        if(insertEndReady === true && endData === undefined){
            setEndData({
                "end_tipo": '2',
                "end_cep": Number(e.target.elements.cep.value),
                "end_numero": Number(e.target.elements.numero.value),
                "end_referencia": e.target.elements.referencia.value !== '' ? e.target.elements.referencia.value : 'N/A'
            })
        }

        if(colabData === undefined) {
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
        if(user !== undefined && host !== undefined && endData !== undefined && end_id.current === null){
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"
            options['body'] = JSON.stringify(endData)
        }
        if(endData !== undefined && options.headers.Host !== undefined){
            endCrud.insertEnd(setFeedbackMessage, end_id, options)
        }
    }, [endData, end_id, user, host, setFeedbackMessage])

    useEffect(()=>{
        if(colabData !== undefined && "end_id" in colabData && colabData["end_id"] === null){
            setTimeout(() => {
                colabData_ref.current = {...colabData, "end_id": end_id.current}
                insertColab_func()
            }, 1000)
        }
    }, [end_id, colabData, insertColab_func])

    useEffect(()=>{
        if(feedbackMessage === "Usuário inserido com sucesso!"){
            setColabInserted({"colab_inserted":true})
            setTimeout(() => {
                resetForm()
            }, 3000)
        }
    }, [setColabInserted, feedbackMessage, resetForm])

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

CommandPanel.propTypes = {
    user: PropTypes.object,
    host: PropTypes.string,
    setInsert: PropTypes.func,
    setColabInserted: PropTypes.func,
    refresh: PropTypes.object
}

export default CommandPanel;