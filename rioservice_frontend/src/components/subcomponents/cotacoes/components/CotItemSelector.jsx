import { useCallback, useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import ItemCrud from '../../itens/components/ItemCrud';
import EstoqueCrud from '../../estoque/components/EstoqueCrud';

const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function CotItemSelector({host, user, selectedItems_ref, selectedItemQnt_ref}){
    const sugestions = useRef(undefined)
    const itemList = useRef(undefined)
    const estoqueList = useRef(undefined)
    const [selectedItemQnt, setSelectedItemQnt] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [showSugestion, setShowSugestion] = useState(false)

    const removeItemFromQuotation = useCallback((e) => {
        e.preventDefault()
        const item_id = Number(e.target.dataset.item_id)
        const newSelectedItems = selectedItems.filter(item => item.item_id !== item_id)
        const newSelectedItemQnt = selectedItemQnt.filter(qnt => qnt.item_id !== item_id)
        setSelectedItems(newSelectedItems)
        setSelectedItemQnt(newSelectedItemQnt)
    }, [selectedItems, selectedItemQnt, setSelectedItems, setSelectedItemQnt])

    const handleQntChange = useCallback((e) => {
        e.preventDefault()
        const action = e.target.dataset.action
        const item_id = Number(e.target.dataset.item_id)
        const addedItemQnt = selectedItemQnt.find(qnt => qnt.item_id === item_id)
        const newSelectedItemQnt = selectedItemQnt.filter(qnt => qnt !== addedItemQnt)

        switch(action){
            case "++":
                if (addedItemQnt.item_qnt >= 0){
                    addedItemQnt.item_qnt += 10
                }
                break;
            case "+":
                if (addedItemQnt.item_qnt >= 0){
                    addedItemQnt.item_qnt += 1
                }
                break;
            case "-":
                if (addedItemQnt.item_qnt > 0){
                    addedItemQnt.item_qnt -= 1
                }
                break;
            case "--":
                if (addedItemQnt.item_qnt > 0){
                    addedItemQnt.item_qnt -= 10
                }
                break;
            default:
                break;
            }

        addedItemQnt.item_subtotal = addedItemQnt.item_qnt * itemList.current.item_list.find(item => item.item_id === item_id).item_preco
        
        setTimeout(() => {
            setSelectedItemQnt([...newSelectedItemQnt, addedItemQnt])
        }, 300)
    }, [selectedItemQnt, setSelectedItemQnt])

    const setQuantity = useCallback((item) => {
        if(!(selectedItemQnt.find(qnt => qnt.item_id == item.item_id))){
            setSelectedItemQnt([...selectedItemQnt, {item_id: item.item_id, item_qnt: 0, item_subtotal: 0}])
        }
    }, [selectedItemQnt])

    const addItemToQuotation = useCallback((e) => {
        e.preventDefault()
        const searchInputField = document.querySelector("#cotacao-search")
        const item_id = Number(e.target.dataset.item_id)
        const item = itemList.current.item_list.find(item => item.item_id === item_id)
        if(!(selectedItems.find(item => item.item_id === item_id))){
            setSelectedItems([...selectedItems, item])
        }

        setTimeout(() => {
            setQuantity(item)
        }, 300)

        setShowSugestion(false)
        searchInputField.value = ""
        searchInputField.focus()
    }, [selectedItems, itemList, setQuantity])

    const createElementsFromSugestions = useCallback(() => {
        const list = document.querySelector(".sugestionList")
        list.innerHTML = ""
        if(sugestions.current != undefined){
            sugestions.current.forEach(sugestion => {
                const sugestionElement = document.createElement("li")
                const button = document.createElement("button")
                button.innerHTML = "+"
                button.dataset.item_id = sugestion.item_id
                button.onclick = (e) => {
                    addItemToQuotation(e)
                }
                sugestionElement.className = "sugestion"
                sugestionElement.innerHTML = sugestion.item_nome
                sugestionElement.appendChild(button)
                document.querySelector(".sugestionList").appendChild(sugestionElement)
            })
        }
    }, [sugestions, addItemToQuotation])

    const fetchEstoqueList = useCallback(() => {
        const estoqueCrud = new EstoqueCrud();
        options.method = "GET"
        options.headers = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        estoqueCrud.getEstoqueList(estoqueList, options)
    }, [host, user])

    const fetchItemList = useCallback(() => {
        const itemCrud = new ItemCrud();
        options.method = "GET"
        options.headers = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        itemCrud.getItemList(itemList, options)
    }, [host, user])

    const startSearch = useCallback((e) => {
        e.preventDefault()
        let temp_list = []
        const search_term = document.getElementById("cotacao-search").value
        itemList.current.item_list.forEach(item => {
            if(search_term.length >= 2){
                setShowSugestion(true)
                if(item.item_nome.toLowerCase().includes(search_term.toLowerCase())){
                    temp_list.push(item)
                }
            } else {
                temp_list = []
                setShowSugestion(false)
            }
        })
        sugestions.current = temp_list
        createElementsFromSugestions()
    }, [createElementsFromSugestions, itemList])

    useEffect(() => {
        fetchItemList()
        fetchEstoqueList()
    }, [fetchItemList, fetchEstoqueList])

    useEffect(() => {
        if(selectedItems != [] && selectedItemQnt != []){
            selectedItems_ref.current = selectedItems
            selectedItemQnt_ref.current = selectedItemQnt
        }
    }, [selectedItems, selectedItemQnt, selectedItems_ref, selectedItemQnt_ref])

    return (
        <>
            <div id="cotacao-item-selector">
                <fieldset>
                    <h2>Acrescente itens à cotação</h2>
                    <div className="setOrganizer">
                        <div className="addItem">
                            <input type="search" name="cotacao-search" id="cotacao-search" placeholder={`Buscar item por nome`} onInput={(e) => {startSearch(e)}}/>
                        </div>
                    </div>
                    <div className="setSugestionList" hidden={(showSugestion)?(false):(true)} autoComplete="off">
                        <ul className="sugestionList">
                        </ul>
                    </div>
                    <div className="selectedItems">
                        <h2>Itens selecionados</h2>
                        <ul className="selectedItemsList">
                            {(selectedItems != [] && selectedItemQnt != []) ?(selectedItems.map((item, i) => {
                                return (
                                    <li key={item.item_id}>
                                        <div className="quotationItem">
                                            <h2>#{item.item_id}</h2>
                                            <div className="dataOrganizer">
                                                <p>Nome: <span>{item.item_nome}</span></p>
                                                <p>Preço: <span>R$ {item.item_preco.toFixed(2)}</span></p>
                                                <p>Descrição: <span>{item.item_desc}</span></p>
                                            </div>
                                        </div>
                                        <div className="qntModule">
                                            <button data-action="--" data-item_id={item.item_id} onClick={handleQntChange}>--</button>
                                            <button data-action="-" data-item_id={item.item_id} onClick={handleQntChange}>-</button>
                                            <p>Pedido: <span>{(selectedItemQnt != [] 
                                            && selectedItemQnt.length > 0 
                                            && selectedItemQnt[i] != undefined)
                                            ? (selectedItemQnt.find(qnt => qnt.item_id === item.item_id).item_qnt)
                                            : (0)}</span></p>
                                            <button data-action="+" data-item_id={item.item_id} onClick={handleQntChange}>+</button>
                                            <button data-action="++" data-item_id={item.item_id} onClick={handleQntChange}>++</button>
                                        </div>
                                        <div className="finalValue">
                                            <p>Total: <span>R$ {(selectedItemQnt != [] 
                                            && selectedItemQnt.length > 0 
                                            && selectedItemQnt[i] != undefined)
                                            ? (selectedItemQnt.find(qnt => qnt.item_id === item.item_id).item_subtotal).toFixed(2)
                                            : (0)}</span></p>
                                        </div>
                                        <div className="actionOrganizer">
                                            <button className="removeItem" data-item_id={item.item_id} onClick={(e) => {removeItemFromQuotation(e)}}>Remover</button>
                                        </div>
                                    </li>
                                )
                            })):("nope")}
                        </ul>
                    </div>
                </fieldset>

            </div>
        </>
    )
}

CotItemSelector.propTypes = {
    host: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    selectedItems_ref: PropTypes.object.isRequired,
    selectedItemQnt_ref: PropTypes.object.isRequired
}

export default CotItemSelector;