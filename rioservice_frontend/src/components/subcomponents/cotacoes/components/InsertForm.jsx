import {useCallback, useEffect, useRef, useState} from 'react';
import CotacaoCrud from './CotacaoCrud';
import CotItemSelector from './CotItemSelector';
import CotFornSelector from './CotFornSelector';
import CrudProtoCon from './CrudProtoCon';
import { PropTypes } from 'prop-types';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function InsertForm({host, user, setInsert, setCotacaoInserted,  fetchList}){
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)
    const [cotacaoData, setCotacaoData] = useState(undefined)
    const cotacao_id = useRef(null)
    const n_cotacoes = useRef(0)
    const cotacao_inserted = useRef(false)
    const cotacaoData_ref = useRef(null)
    const [all_ok, setAll_ok] = useState(false)
    const selectedItems_ref = useRef(null)
    const selectedItemQnt_ref = useRef(null)
    const selectedForn_ref = useRef(null)
    const pagamentoEntrega_ref = useRef(null)

    const attatchItemsToCot_func = useCallback((item, index) => {
        if(cotacao_id.current != null && pagamentoEntrega_ref.current != null){
            const crud_proto = CrudProtoCon()
            const lista_item = {
                "cot_id": cotacao_id.current,
                "item_id": item.item_id,
                "lista_itens_nome": item.item_nome,
                "lista_itens_qnt_necessaria": selectedItemQnt_ref.current[index].item_qnt,
                "lista_itens_val_un": item.item_preco,
                "lista_itens_sub_total": selectedItemQnt_ref.current[index].item_subtotal
            }
            
            options['method'] = "POST"
            options['body'] = JSON.stringify(lista_item)
            crud_proto.insert("cot_lista_itens", options)
        }
    },[selectedItemQnt_ref, cotacao_id])

    const attatchFornToCot_func = useCallback(() => {
        if(cotacao_id.current != null && pagamentoEntrega_ref.current != null){
            const crud_proto = CrudProtoCon()
            const lista_forn = {
                "cot_id": cotacao_id.current,
                "forn_id": selectedForn_ref.current.forn_id,
                "lista_forn_prazo_pag": pagamentoEntrega_ref.current.prazoPag.replaceAll("-", ""), //Sujeito a mudanças
                "lista_forn_prazo_entrega": pagamentoEntrega_ref.current.prazoEntrega.replaceAll("-", ""), //Sujeito a mudanças
            }

            options['method'] = "POST"
            options['body'] = JSON.stringify(lista_forn)
            crud_proto.insert("cot_lista_forn", options)
        }
    }, [selectedForn_ref, cotacao_id, pagamentoEntrega_ref])

    const insertCotacao_func = useCallback(() => {
        if(n_cotacoes.current != 1 && cotacao_inserted.current === false){
            const cotacaoCrud = new CotacaoCrud();
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }
            
            const rawData = {
                "colab_id":user.colab_id,
                "cot_valid": cotacaoData_ref.current.cotacao_valid,
                "cot_status": 1,
                "cot_val_total": selectedItemQnt_ref.current.reduce((acc, item) => acc + item.item_subtotal, 0)
            }
            
            options['method'] = "POST"
            options['body'] = JSON.stringify(rawData)
            if(selectedItems_ref.current !== null && selectedItemQnt_ref.current !== null){
                if(selectedForn_ref.current !== null){
                    cotacaoCrud.insertCotacao(setFeedbackMessage, cotacao_inserted, cotacao_id, options)
                    selectedItems_ref.current.forEach( (item, index) => {
                        setTimeout(() => {
                            attatchItemsToCot_func(item, index)
                        }, 300)
                    })

                    setTimeout(() => {
                        attatchFornToCot_func()
                    }, 600)

                    setTimeout(() => {
                        if(cotacao_inserted.current === true){
                            setAll_ok(true)
                            n_cotacoes.current = 1
                            setCotacaoInserted({"cotacao_inserted":true})
                        }
                    }, 1000)
                }
            }
            
        }
    }, [cotacaoData_ref, user, host, setFeedbackMessage, cotacao_inserted, n_cotacoes, cotacao_id, setCotacaoInserted, attatchItemsToCot_func, attatchFornToCot_func, selectedItems_ref, selectedItemQnt_ref, selectedForn_ref])

    const resetForm = useCallback(() => {
        document.getElementById('valid').value = ''
        setInsert(false)
        
        setTimeout(() => {
            setCotacaoData(undefined)
            setFeedbackMessage(undefined)
            setCotacaoInserted({"cotacao_inserted":false})
            fetchList()
            setAll_ok(false)
        }, 1000)

    }, [setInsert, setCotacaoInserted, setCotacaoData, setFeedbackMessage, fetchList, setAll_ok])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(cotacaoData === undefined){
            const valid = e.target.elements.valid.value
            setCotacaoData({
                "cotacao_valid": valid,
            })

            pagamentoEntrega_ref.current = {
                "prazoPag": e.target.elements.prazoPag.value,
                "prazoEntrega": e.target.elements.prazoEntrega.value
            }
        }
    }

    useEffect(() => {
        if(cotacaoData !== undefined){
            cotacaoData_ref.current = {...cotacaoData}
            insertCotacao_func()
        }
    }, [cotacaoData, insertCotacao_func, cotacaoData_ref, pagamentoEntrega_ref])

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
                    <form onSubmit={handleSubmit} className='form-insert-cotacao' autoComplete='off'>

                        <CotItemSelector host={host} user={user} selectedItems_ref={selectedItems_ref} selectedItemQnt_ref={selectedItemQnt_ref}/>
                        <CotFornSelector host={host} user={user} selectedForn_ref={selectedForn_ref}/>

                        <div id="validTitle">
                            <fieldset>
                                <h2>Defina a validade da cotação</h2>
                            </fieldset>
                        </div>

                        <div className='inputBox'>
                            <label htmlFor='valid'>Validade</label>
                            <input type='date' id='valid' name='valid' placeholder='Validade da cotação' title="O presente campo atribui uma data de validade para a cotação."/>
                        </div>

                        <div id="validTitle">
                            <fieldset>
                                <h2>Defina o prazo para pagamento</h2>
                            </fieldset>
                        </div>

                        <div className='inputBox'>
                            <label htmlFor='prazoPag'>Prazo para pagamento</label>
                            <input type='date' id='prazoPag' name='prazoPag' placeholder='Prazo para pagamento' title="O presente campo atribui uma data de pagamento para a cotação."/>
                        </div>

                        <div id="validTitle">
                            <fieldset>
                                <h2>Defina o prazo para entrega</h2>
                            </fieldset>
                        </div>

                        <div className='inputBox'>
                            <label htmlFor='prazoEntrega'>Prazo para entrega</label>
                            <input type='date' id='prazoEntrega' name='prazoEntrega' placeholder='Prazo para entrega' title="O presente campo atribui uma data de entrega para a cotação."/>
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
    setCotacaoInserted: PropTypes.func.isRequired,
    cotacaoInserted: PropTypes.object.isRequired,
    fetchList: PropTypes.func.isRequired
}

export default InsertForm;