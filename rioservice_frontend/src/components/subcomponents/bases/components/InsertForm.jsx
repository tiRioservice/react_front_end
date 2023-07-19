import {useEffect, useState} from 'react';
import BaseCrud from './BaseCrud';
import EnderecoForm from '../../common/EnderecoForm';
import EndCrud from '../../common/EndCrud';
import PropTypes from 'prop-types';

function CommandPanel({user, setInsert, host, setBaseInserted}){
    const [baseCrud] = useState(new BaseCrud())
    const [endCrud] = useState(new EndCrud())
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)
    const [insertEndReady, setInsertEndReady] = useState(false)
    const [endereco_inserted, setEndereco_inserted] = useState(false)
    const [base_inserted, setBase_inserted] = useState(false)
    const [endData, setEndData] = useState(undefined)
    const [baseData, setBaseData] = useState(undefined)

    const resetForm = () => {
        document.getElementById('nome').value = ''
        document.getElementById('desc').value = ''
        setBaseData(undefined)
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

        if(insertEndReady === true && endData === undefined){
            setEndData({
                "end_tipo": '1',
                "end_cep": Number(e.target.elements.cep.value),
                "end_numero": Number(e.target.elements.numero.value),
                "end_referencia": e.target.elements.referencia.value !== '' ? e.target.elements.referencia.value : 'N/A'
            })

            setBaseData({
                "base_nome": e.target.elements.nome.value,
                "base_desc": e.target.elements.desc.value !== '' ? e.target.elements.desc.value : 'N/A'
            })
        }

        if(insertEndReady === false && baseData === undefined){
            setBaseData({
                "base_nome": e.target.elements.nome.value,
                "base_desc": e.target.elements.desc.value !== '' ? e.target.elements.desc.value : 'N/A',
                "end_id": null
            })
        }
    }
    
    useEffect(() => {
        if(endData !== undefined){
            endCrud.insertEnd(endData, setFeedbackMessage, user["x-JWT"], host, setEndereco_inserted)
        }
    }, [endData, host, user, endCrud])

    useEffect(() => {
        if(typeof(baseData) == "object" && typeof(endData) == "object" && endereco_inserted === true){
            const data = {
                "end_tipo": endData.end_tipo,
                "end_cep": endData.end_cep,
                "end_numero": endData.end_numero
            }

            endCrud.getEndBaseId(data, user["x-JWT"], host, baseData, setBaseData)
        }
    },[endereco_inserted, endData, user, host, baseData, endCrud])
    
    useEffect(() => {
        if(typeof(baseData) == "object") {
            baseCrud.insertBase(baseData, setFeedbackMessage, user["x-JWT"], host, setBase_inserted)
        }
    }, [baseData, user, host, baseCrud])
    
    useEffect(() => {
        if(base_inserted === true){
            setBaseInserted({"base_inserted":true})
            setTimeout(() => {
                setFeedbackMessage(undefined)
                resetForm()
                setInsert(false)
                setBaseInserted({"base_inserted":false})
                setEndData(undefined)
                setEndereco_inserted(false)
            }, 3000)
        }
    }, [base_inserted, setBaseInserted, setInsert])

    return (
        <>
            <div id="form-panel">
                <div className='panel'>
                    <form onSubmit={handleSubmit} className='form-insert-base'>
                        <div className='inputBox'>
                            <label htmlFor='nome'>Nome identificador</label>
                            <input type='text' id='nome' name='nome' placeholder='Nome identificador de 1 a 30 caracteres.' maxLength='30' required/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='desc'>Descrição</label>
                            <input type='text' id='desc' name='desc' placeholder='Descrição' maxLength="300" title="O presente campo possui um limite de 300 caracteres."/>
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
                </div>
            </div>
        </>
    )
}

CommandPanel.propTypes = {
    user: PropTypes.object,
    setInsert: PropTypes.func,
    host: PropTypes.string,
    setBaseInserted: PropTypes.func
}

export default CommandPanel;