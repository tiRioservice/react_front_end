import {useEffect, useState, useRef, useCallback} from 'react';
import EnderecoForm from '../../common/EnderecoForm';
import FornCrud from './FornCrud';
import EndCrud from '../../common/EndCrud';
import { PropTypes } from 'prop-types';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function CommandPanel({setInsert, host, user, setFornInserted, refreshFornList}){
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)
    const [insertEndReady, setInsertEndReady] = useState(false)
    const [endData, setEndData] = useState(undefined)
    const [fornData, setFornData] = useState(undefined)
    const n_forns = useRef(0)
    const forn_inserted = useRef(false)
    const end_id = useRef(null)
    const fornData_ref = useRef(null)

    const insertForn_func = useCallback(() => {
        if(n_forns.current != 1 && forn_inserted.current == false){
            const fornCrud = new FornCrud();
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"

            const rawData = {
                "forn_cnpj":fornData_ref.current.forn_cnpj,
                "forn_nome_fantasia":fornData_ref.current.forn_nome_fantasia,
                "forn_insc_estadual":fornData_ref.current.forn_insc_estadual,
                "forn_insc_municipal":fornData_ref.current.forn_insc_municipal,
                "end_id":fornData_ref.current.end_id
            }

            options['body'] = JSON.stringify(rawData)
            fornCrud.insertForn(setFeedbackMessage, forn_inserted, options)
            setFornInserted({"forn_inserted":true})

            setTimeout(() => {
                if(forn_inserted.current === true){
                    n_forns.current = 1
                }
            }, 1000)
        }
    }, [fornData_ref, forn_inserted, user, host, setFornInserted, setFeedbackMessage])

    const resetForm = useCallback(() => {
        document.getElementById('cnpj').value = ''
        document.getElementById('nome').value = ''
        document.getElementById('insc_estadual').value = ''
        document.getElementById('insc_municipal').value = ''
        setInsert(false)
        setEndData(undefined)
        setFornData(undefined)

        refreshFornList()
    }, [setFornData, setInsert, setEndData, refreshFornList])

    const handleInsertEnd = useCallback(() => {
        const insertEnd = document.getElementById('insertEnd')
        
        if (insertEnd.checked) {
            setInsertEndReady(true)
        } else {
            setInsertEndReady(false)
        }
    }, [setInsertEndReady])

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        if(insertEndReady === true && endData === undefined){
            setEndData({
                "end_tipo": '3',
                "end_cep": Number(e.target.elements.cep.value),
                "end_numero": Number(e.target.elements.numero.value),
                "end_referencia": e.target.elements.referencia.value !== '' ? e.target.elements.referencia.value : 'N/A'
            })
        }

        if(fornData === undefined) {
            setFornData({
                "forn_cnpj": e.target.elements.cnpj.value,
                "forn_nome_fantasia": e.target.elements.nome.value,
                "forn_insc_estadual": e.target.elements.insc_estadual.value,
                "forn_insc_municipal":e.target.elements.insc_municipal.value,
                "end_id": null
            })
        }
    }, [insertEndReady, endData, fornData])

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
        
        if(endData !== undefined && options.headers['Host'] !== undefined){
            const endCrud = new EndCrud()
            endCrud.insertEnd(setFeedbackMessage, end_id, options)
        }
    }, [endData, end_id, user, host, setFeedbackMessage])

    useEffect(()=>{
        if(fornData !== undefined && "end_id" in fornData && fornData["end_id"] === null){
            setTimeout(() => {
                fornData_ref.current = {...fornData, "end_id": end_id.current}
                insertForn_func()
            }, 1000)
        }
    }, [end_id, fornData, insertForn_func, feedbackMessage])

    useEffect(()=>{
        if(feedbackMessage === 'Fornecedor inserido com sucesso!'){
            setTimeout(() => {
                resetForm()
            }, 3000)
        }
    }, [setFornInserted, feedbackMessage, resetForm])

    return (
        <>
            <div id="form-panel">
                <div className='panel'>
                    <form onSubmit={handleSubmit} className='form-insert-fornecedor'>
                        <div className='inputBox'>
                            <label htmlFor='cnpj'>CNPJ</label>
                            <input type='text' id='cnpj' name='cnpj' placeholder='Cnpj do fornecedor' maxLength="14" title='O CNPJ pode ter até 14 digitos.' required/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='nome'>Nome</label>
                            <input type='text' id='nome' name='nome' placeholder='Nome do fornecedor' title='O nome pode ter até 50 caracteres.' maxLength='50'/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='insc_estadual'>Insc. estadual</label>
                            <input type='text' id='insc_estadual' name='insc_estadual' placeholder='Insc. estadual (Somente os números)' maxLength="9" pattern='[0-9]{9,9}' title="Somente os 9 digitos da Insc. estadual." required/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='insc_municipal'>Insc. estadual</label>
                            <input type='text' id='insc_municipal' name='insc_municipal' placeholder='Insc. municipal (Somente os números)' maxLength="11" pattern='[0-9]{11,11}' title="Somente os 11 digitos da Insc. municipal." required/>
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
    host: PropTypes.string,
    setInsert: PropTypes.func,
    setFornInserted: PropTypes.func,
    refreshFornList: PropTypes.func
}

export default CommandPanel;