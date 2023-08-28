import { useEffect, useState, useCallback } from 'react';
import './scss/style.scss';
import CommandPanel from './components/CommandPanel';
import InsertForm from './components/InsertForm';
import ItemList from './components/ItemList';
import ItemCrud from './components/ItemCrud';
import ItemDetails from './components/ItemDetails';
import ItemSearch from './components/ItemSearch';
import { PropTypes } from 'prop-types';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function Itens({user, host, stockCategs, allBases}){
    const [insert, setInsert] = useState(false)
    const [search, setSearch] = useState(false)
    const [allItems, setAllItems] = useState(undefined)
    const [hideDetails, setHideDetails] = useState(true)
    const [currentItem, setCurrentItem] = useState(undefined)
    const [itemInserted, setItemInserted] = useState(undefined)
    const [itemRemoved, setItemRemoved] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchConfig, setSearchConfig] = useState("nome")

    const fetchList = useCallback(() => {
        const itemCrud = new ItemCrud();
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        itemCrud.getItemList(setAllItems, options)
    },[user, host])

    useEffect(() => {
        setItemInserted({"item_inserted":false})
        setItemRemoved({"item_removed":false})
        fetchList()
    }, [fetchList])

    useEffect(() => {
        if(itemInserted !== undefined && "item_inserted" in itemInserted) {
            if(itemInserted.item_inserted == true){
                setItemInserted({"item_inserted":false})
                fetchList()
            }
        }
    }, [itemInserted, setItemInserted, host, user, fetchList])

    useEffect(() => {
        if(itemRemoved != undefined && "item_removed" in itemRemoved) {
            if(itemRemoved.item_removed == true){
                setItemRemoved({"item_removed":false})
                fetchList()
            }
        }
    }, [itemRemoved, setItemRemoved, fetchList])

    return (
        <>
            <section id="itens">
                {(!insert) ? ((!search) ? (<CommandPanel setInsert={setInsert} setSearch={setSearch} allItems={(allItems != undefined)?(allItems):({})}/>):(<></>)) : (<></>)}

                {(insert) ? (<InsertForm host={host} user={user} setInsert={setInsert} setItemInserted={setItemInserted} itemInserted={itemInserted} fetchList={fetchList} stockCategs={stockCategs} allBases={allBases}/>) : (<></>)}

                {(search) ? (<ItemSearch setSearchTerm={setSearchTerm} setSearchConfig={setSearchConfig} searchConfig={searchConfig}/>) : (<></>)}

                <ItemList allItems={allItems} setHideDetails={setHideDetails} setCurrentItem={setCurrentItem} searchTerm={searchTerm} searchConfig={searchConfig}/>
                
                <ItemDetails host={host} hideDetails={hideDetails} setHideDetails={setHideDetails} currentItem={currentItem} user={user} setItemRemoved={setItemRemoved} fetchList={fetchList} stockCategs={stockCategs} allBases={allBases}/>
            </section>
        </>
    )
}

Itens.propTypes = {
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    stockCategs: PropTypes.object.isRequired,
    allBases: PropTypes.object.isRequired
}

export default Itens;