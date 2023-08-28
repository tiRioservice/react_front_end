import {useCallback, useEffect, useState} from 'react';
import AreaAlert from '../../common/AreaAlert';
import PropTypes from 'prop-types';

function ItemList({allItems, setHideDetails, setCurrentItem, searchTerm, searchConfig}){
    const [fetched, setFetched] = useState(false)
    const [allItemsFetched, setAllItemsFetched] = useState(undefined)
    const [items, setItems] = useState(undefined)

    const fetchItems = useCallback(() => {
        if(allItems != undefined){
            setAllItemsFetched(allItems)

            if(allItemsFetched != undefined) {
                setFetched(true)
            }
        }

    }, [allItems, allItemsFetched, setAllItemsFetched])

    const getItem = useCallback((item) => {
        setCurrentItem(item)
        setHideDetails(false)
    }, [setCurrentItem, setHideDetails])

    const mapItems = useCallback(() => {
        if(allItems.item_list != undefined){
            setItems(allItems.item_list.map( (item) => {
                return (
                    <tr className={`item item-${item.item_id}`} key={item.item_id} onClick={() => {getItem(item)}}>
                        <td>
                            {item.item_id} {/* TROCA : name / nome */}
                        </td>
                        <td>
                            {item.item_nome} {/* TROCA : name / nome */}
                        </td>
                        <td>
                            {item.item_desc}
                        </td>
                    </tr>
                )
            }))
        }
    }, [allItems, getItem])

    const filterItems = useCallback(() => {
        if(searchTerm !== undefined){
            if(searchTerm !== ""){
                if(searchConfig != "nome"){
                    setItems(allItems.item_list.filter( item => {
                        return item.item_id.toString().includes(searchTerm.toString());
                    }).map( (item) => {
                        return (
                            <tr className={`item item-${item.item_id}`} key={item.item_id} onClick={() => {getItem(item)}}>
                                <td>
                                    {item.item_id}
                                </td>
                                <td>
                                    {item.item_nome}
                                </td>
                                <td>
                                    {item.item_desc}
                                </td>
                            </tr>
                        )
                    }))
                } else {
                    setItems(allItems.item_list.filter(item => {
                        return item['item_nome'].split(' ').join().includes(searchTerm);
                    }).map( (item) => {
                        return (
                            <tr className={`item item-${item.item_id}`} key={item.item_id} onClick={() => {getItem(item)}}>
                                <td>
                                    {item.item_id}
                                </td>
                                <td>
                                    {item.item_nome}
                                </td>
                                <td>
                                    {item.item_desc}
                                </td>
                            </tr>
                        )
                    }))
                }
            } else {
                mapItems();
            }
        }
    }, [allItems, getItem, mapItems, searchTerm, searchConfig])

    useEffect(() => {
        if(allItems != undefined) {
            fetchItems();
            filterItems();
        }

    }, [allItems, allItemsFetched, fetchItems, fetched, filterItems])

    return (
        <>
            {(items !== undefined) ?
                (<div id="item-list">
                    <table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Nome</td>
                                <td>Desc</td>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </div>)
            : (<AreaAlert frase="Não há itens registrados! Experimente inserir um para que o sistema possa indexá-lo!"/>)
            }
        </>
    )
}

ItemList.propTypes = {
    host: PropTypes.string,
    user: PropTypes.object,
    allItems: PropTypes.object,
    setHideDetails: PropTypes.func,
    setCurrentItem: PropTypes.func,
    searchTerm: PropTypes.string,
    searchConfig: PropTypes.string,
}

export default ItemList;