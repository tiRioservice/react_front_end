import { useCallback, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import FornCrud from '../../fornecedores/components/FornCrud';

const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function CotFornSelector({host, user, selectedForn_ref}){
    const [fornList, setFornList] = useState(undefined)
    const [selected, setSelected] = useState(undefined)

    const fetchFornList = useCallback(() => {
        const fornCrud = new FornCrud();
        options.headers = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        fornCrud.getFornList(setFornList, options)
    }, [host, user])

    const handleSelect = useCallback((e) => {
        if(e.target.value === "null"){
            setSelected(undefined)
        } else {
            const forn_id = Number(e.target.value)
            const selectedForn = fornList.data.find(forn => forn.forn_id === forn_id)
            setSelected(selectedForn)
        }
    }, [setSelected, fornList])

    useEffect(() => {
        fetchFornList()
    }, [fetchFornList])

    useEffect(() => {
        if(selected !== undefined){
            selectedForn_ref.current = selected
        } else {
            selectedForn_ref.current = null
        }
    }, [selected, selectedForn_ref])

    return (
        <>
            <div id="cotacao-forn-selector">
                <fieldset>
                    <h2>Selecione um Fornecedor</h2>
                    <div className="fornSelector">
                        <select name="selectedForn" id="selectedForn" onChange={handleSelect} defaultValue="null">
                            <option value="null" disabled> - </option>
                            {(fornList !== undefined)
                            ?(fornList.data.map(forn => {
                                return(
                                    <option value={forn.forn_id} key={forn.forn_id}>{forn.forn_nome_fantasia}</option>
                                )
                            }))
                            :(null)}
                        </select>
                        {(selected !== undefined)
                        ?(
                            <>
                                <p className="aviso">CNPJ: {selected.forn_cnpj} | IE: {selected.forn_insc_estadual} | IM: {selected.forn_insc_municipal}</p>
                            </>
                        )
                        :(
                            <>
                                <p className="aviso">Nenhum fornecedor selecionado</p>
                            </>
                        )}
                    </div>
                </fieldset>
            </div>
        </>
    )
}

CotFornSelector.propTypes = {
    host: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    selectedForn_ref: PropTypes.object.isRequired
}

export default CotFornSelector;