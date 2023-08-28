import {useCallback, useEffect, useRef, useState} from 'react';
import ItemCrud from './ItemCrud';
import EstoqueCrud from '../../estoque/components/EstoqueCrud';
import { PropTypes } from 'prop-types';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function InsertForm({host, user, setInsert, setItemInserted, fetchList, stockCategs, allBases}){
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)
    const [itemData, setItemData] = useState(undefined)
    const [estoqueData, setEstoqueData] = useState(undefined)
    const item_id = useRef(null)
    const estoque_id = useRef(null)
    const n_items = useRef(0)
    const item_inserted = useRef(false)
    const estoque_inserted = useRef(false)
    const itemData_ref = useRef(null)
    const estoqueData_ref = useRef(null)
    const [all_ok, setAll_ok] = useState(false)

    const insertEstoque_func = useCallback(() => {
        if(estoqueData !== undefined) {

            const estoqueCrud = new EstoqueCrud();
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }
    
            options['method'] = "POST"

            if(item_id.current != null){
                const rawData = {
                    "item_id": item_id.current,
                    "base_id": parseInt(estoqueData.base_id),
                    "estoque_qnt": parseInt(estoqueData.estoque_qnt),
                    "estoque_min": parseInt(estoqueData.estoque_min),
                }
    
                options['body'] = JSON.stringify(rawData)
                estoqueCrud.insertEstoque(setAll_ok, estoque_inserted, estoque_id, options)
            }
        }

    }, [user, host, setAll_ok, estoqueData, item_id, estoque_inserted, estoque_id])

    const insertItem_func = useCallback(() => {
        if(n_items.current != 1 && item_inserted.current === false){
            const itemCrud = new ItemCrud();
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }
            
            const rawData = {
                "categ_id": itemData_ref.current.categ_id,
                "item_nome": itemData_ref.current.item_nome,
                "item_tamanho": itemData_ref.current.item_tamanho,
                "item_preco": itemData_ref.current.item_preco,
                "item_qualidade": itemData_ref.current.item_qualidade,
                "item_desc": itemData_ref.current.item_desc
            }
            
            options['method'] = "POST"
            options['body'] = JSON.stringify(rawData)
            itemCrud.insertItem(setFeedbackMessage, item_inserted, item_id, options)
            
            setTimeout(() => {
                if(item_inserted.current === true){
                    n_items.current = 1
                    setItemInserted({"item_inserted":true})
                    insertEstoque_func()
                }
            }, 1000)
        }
    }, [itemData_ref, user, host, setFeedbackMessage, item_inserted, n_items, item_id, insertEstoque_func, setItemInserted])

    const resetForm = useCallback(() => {
        document.getElementById('nome').value = ''
        document.getElementById('desc').value = ''
        setInsert(false)
        
        setTimeout(() => {
            setItemData(undefined)
            setFeedbackMessage(undefined)
            setAll_ok(false)
            fetchList()
        }, 1000)

    }, [setInsert, setItemData, setFeedbackMessage, fetchList, setAll_ok])

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        
        if(itemData === undefined){
            const nome = e.target.elements.nome.value
            const desc = e.target.elements.desc.value
            const categ_id = e.target.elements.categ.value
            const tamanho = e.target.elements.tamanho.value
            const preco = e.target.elements.preco.value
            const qualidade = e.target.elements.qualidade.value

            setItemData({
                "categ_id": categ_id ? categ_id : null,
                "item_nome": nome,
                "item_tamanho": tamanho !== '' ? tamanho : 'N/A',
                "item_preco": preco !== '' ? preco : 0,
                "item_qualidade": qualidade ? qualidade : 3,
                "item_desc": desc !== '' ? desc : 'N/A',
            })
        }

        if(estoqueData === undefined){
            const estoque_qnt = e.target.elements.estoque_qnt.value
            const estoque_min = e.target.elements.estoque_min.value
            const base_id = e.target.elements.base.value

            setEstoqueData({
                "item_id": null,
                "base_id": base_id,
                "estoque_qnt": estoque_qnt,
                "estoque_min": estoque_min
            })
        }
    }, [itemData, estoqueData, setItemData, setEstoqueData])

    useEffect(() => {
        if(itemData !== undefined){
            itemData_ref.current = {...itemData}
            insertItem_func()
        }
    }, [itemData, insertItem_func, itemData_ref])
    
    useEffect(() => {
        if(estoqueData !== undefined){
            estoqueData_ref.current = {...estoqueData}
        }
    }, [estoqueData])

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
                    <form onSubmit={handleSubmit} className='form-insert-item'>
                        <div className="inputBox">
                            <label htmlFor="categ">Categoria</label>
                            <select name="categ" id="categ">
                                {stockCategs !== undefined ? stockCategs.categ_list.map((categ) => {
                                    return <option key={categ.categ_id} value={categ.categ_id}>{categ.categ_nome}</option>
                                }) : <></>}
                            </select>
                        </div>
                        <div className="inputBox">
                            <label htmlFor="base">Base</label>
                            <select name="base" id="base">
                                {(allBases !== undefined) ? (allBases.data.map((base) => {
                                    return <option key={base.base_id} value={base.base_id}>{base.base_nome}</option>
                                })) : (<></>)}
                            </select>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='nome'>Nome do item</label>
                            <input type='text' id='nome' name='nome' placeholder='Nome de 1 a 30 caracteres.' maxLength='30' required/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='preco'>Preço</label>
                            <input type='text' id='preco' name='preco' placeholder='Preço do item' maxLength="8" title="O presente campo possui um limite de 8 caracteres."/>
                        </div>
                        <div className="inputBox">
                            <label htmlFor="qualidade">Qualidade</label>
                            <select name="qualidade" id="qualidade">
                                <option value="1">1 - Péssima</option>
                                <option value="2">2 - Ruim</option>
                                <option value="3">3 - Regular</option>
                                <option value="4">4 - Boa</option>
                                <option value="5">5 - Ótima</option>
                            </select>
                        </div>
                        <div className="inputBox">
                            <label htmlFor="tamanho">Tamanho</label>
                            <input type="text" name="tamanho" id="tamanho" placeholder="Tamanho do item" maxLength="3" title="O presente campo possui um limite de 3 caracteres."/>
                        </div>
                        <div className="inputBox">
                            <label htmlFor='estoque_qnt'>Estoque</label>
                            <input type='text' id='estoque_qnt' name='estoque_qnt' placeholder='Quantidade atual.' maxLength='4' required/>
                        </div>
                        <div className="inputBox">
                            <label htmlFor='estoque_min'>Estoque min</label>
                            <input type='text' id='estoque_min' name='estoque_min' placeholder='Quantidade minima.' maxLength='4' required/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='desc'>Descrição</label>
                            <input type='text' id='desc' name='desc' placeholder='Descrição do item' maxLength="300" title="O presente campo possui um limite de 300 caracteres."/>
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
    setItemInserted: PropTypes.func.isRequired,
    fetchList: PropTypes.func.isRequired,
    stockCategs: PropTypes.object.isRequired,
    allBases: PropTypes.object.isRequired
}

export default InsertForm;