import {useCallback, useEffect, useRef, useState} from 'react';
import CategCrud from './CategCrud';
import { PropTypes } from 'prop-types';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function InsertForm({host, user, setInsert, setCategInserted, categInserted,  fetchList}){
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)
    const [categData, setCategData] = useState(undefined)
    const categ_id = useRef(null)
    const n_categs = useRef(0)
    const categ_inserted = useRef(false)
    const categData_ref = useRef(null)
    const [all_ok, setAll_ok] = useState(false)

    const insertCateg_func = useCallback(() => {
        if(n_categs.current != 1 && categ_inserted.current === false){
            const categCrud = new CategCrud();
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }
            
            const rawData = {
                "categ_nome": categData_ref.current.categ_nome,
                "categ_desc": categData_ref.current.categ_desc
            }
            
            options['method'] = "POST"
            options['body'] = JSON.stringify(rawData)
            categCrud.insertCateg(setFeedbackMessage, categ_inserted, categ_id, options)
            
            setTimeout(() => {
                if(categ_inserted.current === true){
                    n_categs.current = 1
                    setCategInserted({"categ_inserted":true})
                }
            }, 1000)
        }
    }, [categData_ref, user, host, setFeedbackMessage, categ_inserted, n_categs, categ_id, setCategInserted])

    const resetForm = useCallback(() => {
        document.getElementById('nome').value = ''
        document.getElementById('desc').value = ''
        setInsert(false)
        
        setTimeout(() => {
            setCategData(undefined)
            setFeedbackMessage(undefined)
            setCategInserted({"categ_inserted":false})
            fetchList()
            setAll_ok(false)
        }, 1000)

    }, [setInsert, setCategInserted, setCategData, setFeedbackMessage, fetchList, setAll_ok])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(categData === undefined){
            const nome = e.target.elements.nome.value
            const desc = e.target.elements.desc.value
            setCategData({
                "categ_nome": nome,
                "categ_desc": desc !== '' ? desc : 'N/A'
            })
        }
    }

    useEffect(() => {
        if(categData !== undefined){
            categData_ref.current = {...categData}
            setAll_ok(true)
            insertCateg_func()
        }
    }, [categData, insertCateg_func, categData_ref, setAll_ok])

    useEffect(() => {
        if(categInserted !== undefined && "categ_inserted" in categInserted) {
            if(categInserted.categ_inserted == true){
                setCategInserted({"categ_inserted":false})
            }
        }
    }, [categInserted, setCategInserted])

    useEffect(() => {
        if(all_ok){
            setTimeout(() => {
                resetForm()
            }, 3000)
        }
    }, [all_ok, resetForm])

    return (
        <>
            <div id="form-panel">
                <div className='panel'>
                    <form onSubmit={handleSubmit} className='form-insert-cargo'>
                        <div className='inputBox'>
                            <label htmlFor='nome'>Nome da categoria</label>
                            <input type='text' id='nome' name='nome' placeholder='Nome de 1 a 30 caracteres.' maxLength='30' required/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='desc'>Descrição</label>
                            <input type='text' id='desc' name='desc' placeholder='Descrição da categoria' maxLength="300" title="O presente campo possui um limite de 300 caracteres."/>
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

InsertForm.propTypes = {
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    setInsert: PropTypes.func.isRequired,
    setCategInserted: PropTypes.func.isRequired,
    categInserted: PropTypes.object.isRequired,
    fetchList: PropTypes.func.isRequired
}

export default InsertForm;