import { useCallback, useEffect, useState } from "react";
import ItemCrud from "./ItemCrud";
import EstoqueCrud from "../../estoque/components/EstoqueCrud";
import PropTypes from "prop-types";

const options = { method: undefined, headers: undefined, body: undefined }

function StockDetails({user, host, editing, currentItem, allBases, stockData, setStockData, saveStock, setSaveStock, fetchList}){
    const [stockList, setStockList] = useState(undefined)
    const [baseName, setBaseName] = useState(undefined)
    const [estoque_qnt, setEstoque_qnt] = useState(undefined)
    const [estoque_min, setEstoque_min] = useState(undefined)

    const handleEditSaveEstoque = useCallback(() => {
        const estoqueCrud = new EstoqueCrud()
        const estoqueInputs = document.querySelectorAll('.estoque-input')
        const estoqueData = {
            "estoque_id": undefined,
            "item_id": currentItem.item_id,
            "base_id": undefined,
            "estoque_qnt": (estoque_qnt == undefined)?(undefined):(estoque_qnt),
            "estoque_min": (estoque_min == undefined)?(undefined):(estoque_min)
        }

        
        estoqueInputs.forEach( input => {
            if(estoqueData[input.classList[1]] === undefined){
                estoqueData[input.classList[1]] = parseInt(input.value)
            }
        })

        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        options['method'] = "POST"

        options['body'] = JSON.stringify(estoqueData)
        estoqueCrud.updateEstoque(options)

        setSaveStock(false)
    }, [setSaveStock, currentItem, user, host, estoque_qnt, estoque_min])

    const fetchStock = useCallback(() => {
        if(currentItem !== undefined && !editing){
            const estoqueCrud = new EstoqueCrud();
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "GET"
            delete options.body
            estoqueCrud.getEstoqueList(setStockList, options)
        }
    }, [currentItem, editing, user, host])

    const fetchStockData = useCallback(() => {
        if(stockList !== undefined && currentItem !== undefined){
            const estoqueCrud = new EstoqueCrud();
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }
    
            options['method'] = "GET"
            delete options.body
            stockList.estoque_list.forEach( estoque => {
                if(estoque.item_id === currentItem.item_id){
                    estoqueCrud.getEstoqueData(setStockData, estoque.estoque_id, options)
                }
            })
        }

    }, [stockList, currentItem, user, host, setStockData])

    useEffect(() => {
        if(allBases !== undefined && stockData !== undefined){
            allBases.data.forEach( base => {
                if(base.base_id === stockData.estoque_composition.base_id){
                    setBaseName(base.base_nome)
                }
            })
        }
    }, [allBases, stockData, setBaseName])

    useEffect(() => {
        if(saveStock){
            handleEditSaveEstoque()
            fetchList()
        }
    }, [saveStock, fetchList, handleEditSaveEstoque])

    useEffect(() => {
        fetchStock()
    }, [fetchStock])

    useEffect(() => {
        fetchStockData()
    }, [stockList, fetchStockData])

    return (
        <>  
            <h3 className="title">Estoque</h3>
            {(stockData != undefined) 
            ? (<div className="estoqueDetails">

                <input hidden readOnly type="text" className="estoque-input estoque_id" value={stockData.estoque_composition.estoque_id}/>

                <p className="estoque-data">Base: 
                {(editing && baseName)
                ?(<select defaultValue={stockData.estoque_composition.base_id} className="estoque-input base_id" name="estoque-base">
                    {allBases.data.map( (base, i) => {
                        return (
                            <option value={base.base_id} key={i}>{base.base_nome}</option>
                        )
                    })}
                </select>)
                :(<span>{baseName}</span>)}
                </p>

                <p className="estoque-data">Estoque: 
                    {(editing)
                    ?(<input type="text" className="estoque-input estoque_qnt" defaultValue={stockData.estoque_composition.estoque_qnt} onChange={(e) => {setEstoque_qnt(e.value)}}/>)
                    :(<span>{stockData.estoque_composition.estoque_qnt}</span>)}
                </p>

                <p className="estoque-data">Mínimo: 
                {(editing)
                ?(<input type="text" className="estoque-input estoque_min" defaultValue={stockData.estoque_composition.estoque_min} onChange={(e) => {setEstoque_min(e.value)}}/>)
                :(<span>{stockData.estoque_composition.estoque_min}</span>)}
                </p>
            </div>
            )
            :(<></>)}
        </>
    )
}

StockDetails.propTypes = {
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    editing: PropTypes.bool.isRequired,
    currentItem: PropTypes.object,
    allBases: PropTypes.object,
    stockData: PropTypes.object,
    setStockData: PropTypes.func,
    saveStock: PropTypes.bool,
    setSaveStock: PropTypes.func,
    fetchList: PropTypes.func
}

function ItemDetails({hideDetails, setHideDetails, currentItem, user, host, setItemRemoved, fetchList, stockCategs, allBases}){
    const [editing, setEditing] = useState(false)
    const [statusMessage, setStatusMessage] = useState(undefined)
    const [stockData, setStockData] = useState(undefined)
    const [saveStock, setSaveStock] = useState(false)

    const resetAllData = useCallback(() =>{
        setEditing(false)
        setHideDetails(true)
        setStatusMessage(undefined)
        fetchList()
    }, [setEditing, setHideDetails, setStatusMessage, fetchList])

    const handleEdit = useCallback(() => {
        setEditing(true)
    }, [setEditing])

    const handleEditSave = useCallback(() => {
        const itemCrud = new ItemCrud()
        const itemFields = document.querySelectorAll('.item-text')
        const itemData = {
            "categ_id": undefined,
            "item_nome": undefined,
            "item_tamanho": undefined,
            "item_preco": undefined,
            "item_qualidade": undefined,
            "item_desc": undefined
        }

        itemFields.forEach( field => {
            const firstChild = field.childNodes[1]
            if(field.classList[1] != 'registro')
            {
                if(firstChild.nodeName == 'INPUT'){
                    itemData[field.classList[1]] = (!isNaN(firstChild.value)) ? (Number(firstChild.value)) : (firstChild.value)
                } 
                else if(firstChild.nodeName == 'SPAN'){
                    itemData[field.classList[1]] = (!isNaN(firstChild.innerText)) ? (Number(firstChild.innerText)) : (firstChild.innerText)
                }
                else if(firstChild.nodeName == 'SELECT'){
                    itemData[field.classList[1]] = (!isNaN(firstChild.value)) ? (Number(firstChild.value)) : (firstChild.value)
                }
            }
        })

        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        options['method'] = "POST"

        options['body'] = JSON.stringify(itemData)
        itemCrud.updateItem(setStatusMessage, options)

        // fetchList()
        setSaveStock(true)
    }, [user, host, setStatusMessage, setSaveStock])

    const handleRemoveEstoque = useCallback(() => {
        if(stockData !== undefined){
            const estoqueCrud = new EstoqueCrud()

            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"

            const estoqueRawData = {
                "estoque_id": stockData.estoque_composition.estoque_id
            }

            options['body'] = JSON.stringify(estoqueRawData)
            estoqueCrud.removeEstoque(setStatusMessage, options)
            setItemRemoved({"item_removed":true})
        }
    }, [stockData, host, user, setStatusMessage, setItemRemoved])

    const handleRemove = useCallback(() => {
        if(currentItem.item_id != null){
            const itemCrud = new ItemCrud()

            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }

            options['method'] = "POST"

            const itemRawData = {
                "item_id": currentItem.item_id
            }

            options['body'] = JSON.stringify(itemRawData)
            itemCrud.removeItem(setStatusMessage, options)

            setTimeout(() => {
                handleRemoveEstoque()
            }, 1000)
        }
    }, [currentItem, user, host, setStatusMessage, handleRemoveEstoque])
    
    useEffect(() => {
        if(currentItem != undefined && !editing){
            const date = currentItem.registro
            const splited = date.split(' ')
            const dia = splited[1]
            const mes = splited[2]
            const ano = splited[3]
            const hora = splited[4]
            const registro = `${dia} de ${mes} de ${ano} às ${hora}`

            const itemFields = document.querySelectorAll('.item-text')
            itemFields.forEach( field => {
                let capitalizedField = undefined
                if(field.classList[1] != 'registro'){
                    if(field.classList[1] === 'categ_id'){
                        capitalizedField = 'Categoria'

                        const categ = stockCategs.categ_list.find( categ => categ.categ_id === currentItem.categ_id)

                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentItem[field.classList[1]] == null)?('Não definido'):(categ.categ_nome)}</span>`
                    } else 
                    if(field.classList[1] === 'item_tamanho'){
                        capitalizedField = 'Tamanho'

                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentItem[field.classList[1]] == null)?('Não definido'):(currentItem[field.classList[1]])}</span>`
                    } else
                    if(field.classList[1] === 'item_preco'){
                        capitalizedField = 'Preço'

                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentItem[field.classList[1]] == null)?('Não definido'):("R$ " + currentItem[field.classList[1]].toFixed(2))}</span>`
                    } else if(field.classList[1] === 'item_qualidade'){
                        capitalizedField = 'Qualidade'

                        const qualidades = ['Péssima', 'Ruim', 'Regular', 'Boa', 'Ótima']

                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentItem[field.classList[1]] == null)?('Não definido'):(qualidades[currentItem[field.classList[1]] - 1])}</span>`
                    } else {
                        capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                        field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentItem[field.classList[1]] == null)?('Não definido'):(currentItem[field.classList[1]])}</span>`
                    }
                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                    field.innerHTML = `${capitalizedField}: <span className="${field.classList[1]}_value">${(currentItem[field.classList[1]] == null)?('Não definido'):(registro)}</span>`
                }

            })
        }
    }, [currentItem, editing, stockCategs])

    useEffect(() => {
        if(editing){
            const itemFields = document.querySelectorAll('.item-text')
            let capitalizedField = undefined

            itemFields.forEach( field => {
                if(field.classList[1] !== 'registro' 
                && field.classList[1] !== 'item_id'){
                    const span = field.children[0]
                    capitalizedField = field.classList[1].split('_')[1].charAt(0).toUpperCase() + field.classList[1].split('_')[1].slice(1)
                    
                    let input = document.createElement('input')
                    input.setAttribute('type', 'text')
                    input.setAttribute('class', 'item-input')

                    const attribute = span.innerText !== 'Não definido' ? span.innerHTML : ''
                    input.setAttribute('value', attribute)

                    if(field.classList[1] === 'item_preco'){
                        field.innerHTML = 'Preço --'
                        input.setAttribute('value', attribute.replace('R$ ', ''))
                    } else if(field.classList[1] === 'categ_id'){
                        field.innerHTML = 'Categoria'
                        input = document.createElement('select')
                        input.setAttribute('class', 'item-input')
                        stockCategs.categ_list.forEach( categ => {
                            let option = document.createElement('option')
                            option.setAttribute('value', categ.categ_id)
                            option.innerHTML = categ.categ_nome
                            input.appendChild(option)
                        })
                    } else if(field.classList[1] === 'item_qualidade'){
                        field.innerHTML = 'Qualidade'
                        input = document.createElement('select')
                        input.setAttribute('class', 'item-input')
                        const qualidades = [{"id": 1, "nome": "Péssima"}, {"id": 2, "nome": "Ruim"}, {"id": 3, "nome": "Regular"}, {"id": 4, "nome": "Boa"}, {"id": 5, "nome": "Ótima"}]
                        qualidades.forEach( qualidade => {
                            let option = document.createElement('option')
                            option.setAttribute('value', qualidade.id)
                            option.innerHTML = qualidade.nome
                            if(qualidade.id === currentItem.item_qualidade){
                                option.setAttribute('selected', 'selected')
                            }
                            input.appendChild(option)
                        })
                    } else {
                        field.innerHTML = capitalizedField
                    }

                    field.appendChild(input)
                } else {
                    capitalizedField = field.classList[1].charAt(0).toUpperCase() + field.classList[1].slice(1)
                }
            })
        }
    }, [editing, stockCategs, currentItem])

    useEffect(() => {
        if(statusMessage){
            setTimeout(() => {
                resetAllData()
            }, 3000)
        }
    }, [statusMessage, resetAllData])
    
    return (
        <div id="item-details" className={!hideDetails ? '' : 'item-details-hidden'}>
            <div className="modal">
                {(statusMessage !== undefined) ? (
                    <div className="modal-feedbackMessage success">
                        <p className="feedbackMessage">{statusMessage}</p>
                    </div>
                ):(
                    <>
                    <header>
                        <h2>Detalhes do item</h2>
                    </header>
                    <ul id="attributeList">
                        <li className="box">
                            <p className="item-text registro">Registro: <span className="registro_value">xx/xx/xxxx</span></p>
                        </li>
                        <li className="box">
                            <p className="item-text item_id">ID: <span className="item_id_value">x</span></p>
                        </li>
                        <li className="box">
                            <p className="item-text categ_id">Categoria: <span className="categ_id_value">x</span></p>
                        </li>
                        <li className="box">
                            <p className="item-text item_nome">Nome: <span className="item_nome_value">x</span></p>
                        </li>
                        <li className="box">
                            <p className="item-text item_preco">Preço: <span className="item_preco_value">x</span></p>
                        </li>
                        <li className="box">
                            <p className="item-text item_tamanho">Tamanho: <span className="item_tamanho_value">x</span></p>
                        </li>
                        <li className="box">
                            <p className="item-text item_qualidade">Qualidade: <span className="item_qualidade_value">x</span></p>
                        </li>
                        <li className="box">
                            <p className="item-text item_desc">Desc: <span className="item_desc_value">x</span></p>
                        </li>
                    </ul>

                    <StockDetails user={user} host={host} editing={editing} currentItem={currentItem} allBases={allBases} stockData={stockData} setStockData={setStockData} saveStock={saveStock} setSaveStock={setSaveStock} fetchList={fetchList}/>

                    <div className="btnOrganizer">
                    {(!editing)?(<button className="btn btnRemoveItem" onClick={handleRemove}>Remover</button>):(<></>)}
                            {(!editing) ? (
                                <button className="btn btnEdit" onClick={() => handleEdit()}>Editar</button>
                                ) : (
                                <button className="btn btnEditSave" onClick={() => handleEditSave()}>Salvar</button>
                            )}
                        <button className="btnCloseModal" onClick={() => {
                            setHideDetails(true)
                            setEditing(false)
                        }}>Fechar</button>
                    </div>
                </>
                )}
            </div>
        </div>
    )
}

ItemDetails.propTypes = {
    hideDetails: PropTypes.bool.isRequired,
    setHideDetails: PropTypes.func.isRequired,
    currentItem: PropTypes.object,
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    setCurrentItem: PropTypes.func,
    setItemRemoved: PropTypes.func,
    fetchList: PropTypes.func,
    stockCategs: PropTypes.object,
    allBases: PropTypes.object
}

export default ItemDetails