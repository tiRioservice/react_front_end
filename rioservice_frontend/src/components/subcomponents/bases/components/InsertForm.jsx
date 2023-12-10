import {useCallback, useEffect, useState, useRef} from 'react';
import EnderecoForm from '../../common/EnderecoForm';
import BaseCrud from './BaseCrud';
import EndCrud from '../../common/EndCrud';
import {PropTypes} from 'prop-types';
const baseCrud = new BaseCrud()
const endCrud = new EndCrud()
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function CommandPanel({user, setInsert, host, setBaseInserted, fetchList}){
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)
    const [insertEndReady, setInsertEndReady] = useState(false)
    const [endData, setEndData] = useState(undefined)
    const [baseData, setBaseData] = useState(undefined)
    const n_bases = useRef(0)
    const base_inserted = useRef(false)
    const end_id = useRef(null)
    const baseData_ref = useRef(null)

    const insertBase_func = useCallback(() => {
        if(n_bases.current != 1 && base_inserted.current === false){
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"
            const rawData = {
                "base_nome": baseData_ref.current.base_nome,
                "base_desc": baseData_ref.current.base_desc,
                "end_id": baseData_ref.current.end_id
            }

            options['body'] = JSON.stringify(rawData)
            baseCrud.insertBase(setFeedbackMessage, base_inserted, options)
            
            setTimeout(() => {
                if(base_inserted.current === true){
                    n_bases.current = 1
                    setBaseInserted({"base_inserted":true})
                }
            }, 1000)
        }
    }, [baseData_ref, base_inserted, setFeedbackMessage, user, host, setBaseInserted])

    const resetForm = useCallback(() =>{
        document.getElementById('nome').value = ''
        document.getElementById('desc').value = ''
        setInsert(false)
        setEndData(undefined)
        setFeedbackMessage(undefined)

        setTimeout(() => {
            setBaseInserted({"base_inserted":false})
        }, 3000)

        fetchList()
    }, [setInsert, setBaseInserted, setEndData, setFeedbackMessage, fetchList])

    const handleInsertEnd = useCallback(() => {
        const insertEnd = document.getElementById('insertEnd')
        
        if (insertEnd.checked) {
            setInsertEndReady(true)
        } else {
            setInsertEndReady(false)
        }
    }, [setInsertEndReady])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(insertEndReady === true && endData === undefined){
            setEndData({
                "end_tipo": '1',
                "end_cep": Number(e.target.elements.cep.value),
                "end_numero": Number(e.target.elements.numero.value),
                "end_referencia": e.target.elements.referencia.value !== '' ? e.target.elements.referencia.value : 'N/A'
            })
        }

        if(baseData === undefined){
            setBaseData({
                "base_nome": e.target.elements.nome.value,
                "base_desc": e.target.elements.desc.value !== '' ? e.target.elements.desc.value : 'N/A',
                "end_id": null
            })
        }
    }
    
    useEffect(() => {
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
    
            if(endData !== undefined && options.headers.Host !== undefined){
                endCrud.insertEnd(setFeedbackMessage, end_id, options)
            }
        }
    }, [endData, end_id, user, host, setFeedbackMessage])

    useEffect(() => {
        if(baseData !== undefined && "end_id" in baseData && baseData["end_id"] == null){
                setTimeout(() => {
                    baseData_ref.current = {...baseData, "end_id": end_id.current}
                    insertBase_func()
                }, 1000)
        }
    }, [end_id, baseData, insertBase_func])
    
    useEffect(() => {
        if(feedbackMessage === "Base inserida com sucesso!"){
            setBaseInserted({"base_inserted":true})
            setTimeout(() => {
                resetForm()
            }, 3000)
        }
    }, [setBaseInserted, resetForm, feedbackMessage])

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
                            <input type="checkbox" name="insertEnd" id="insertEnd" onChange={handleInsertEnd}/>
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
    setBaseInserted: PropTypes.func,
    fetchList: PropTypes.func
}

export default CommandPanel;