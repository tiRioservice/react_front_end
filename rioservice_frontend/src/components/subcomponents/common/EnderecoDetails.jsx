import {useEffect, useState, useCallback, useRef } from 'react';
import EndCrud from './EndCrud';
import PropTypes from 'prop-types';
import getEnd from './viaCep';
import './scss/style.scss';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function EnderecoDetails({end_id, user, host, editing, saveNewEnd, saveNewEndReady, newEndRef, newEndNumberRef, newEndReferenceRef, end_type}){
    const current_end_id = (end_id != undefined) ? (end_id) : (0)
    const [end, setEnd] = useState(undefined)
    const [newEnd, setNewEnd] = useState(undefined)
    const updateData = useRef(undefined)

    const saveNewEnd_func = useCallback(() => {
        const endCrud = new EndCrud();
        options.method = "POST"
        options.headers = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        options.body = JSON.stringify(updateData.current)
        endCrud.updateEnd(undefined, options)
    }, [user, host])

    const handleSaveNewEnd = useCallback(() => {
        if(end != undefined){
            if(newEndRef){
                updateData.current = {
                    end_id: end_id,
                    end_tipo: end_type,
                    end_cep: (newEndRef.current != undefined) ? (Number(newEndRef.current.cep.replace("-",""))) : (end.endereco.end_cep),
                }

                updateData.current["end_numero"] = (newEndNumberRef.current != undefined) ? (Number(newEndNumberRef.current)) : (end.endereco.end_numero)
                updateData.current["end_referencia"] = (newEndReferenceRef.current != undefined) ? (newEndReferenceRef.current) : (end.endereco.end_referencia)
            } else {
                updateData.current = {
                    end_id: end_id,
                    end_tipo: end_type,
                    end_cep: end.endereco.end_cep,
                }
                
                updateData.current["end_numero"] = null
                updateData.current["end_referencia"] = null
            }

            saveNewEnd_func()
        }
    }, [newEndRef, end_id, updateData, newEndNumberRef, newEndReferenceRef, end, saveNewEnd_func, end_type]);

    const compareCep = useCallback((cep) => {
        if(cep != end.endereco.end_cep){
            saveNewEndReady.current = true
        }
    }, [end, saveNewEndReady])

    const getNewAddress = useCallback((e) => {
        if(e.target.value.length == 8){
            getEnd(e.target.value, setNewEnd)
            compareCep(parseInt(e.target.value))
        }
    }, [setNewEnd, compareCep])

    const getNewNumber = useCallback((e) => {
        newEndNumberRef.current = e.target.value
    }, [newEndNumberRef])

    const getNewRef = useCallback((e) => {
        newEndReferenceRef.current = e.target.value
    }, [newEndReferenceRef])

    const setNewEndRef_func = useCallback(() => {
        newEndRef.current = newEnd
    }, [newEnd, newEndRef])

    useEffect(() => {
        if(newEnd != undefined){
            setNewEndRef_func()
        }
    }, [newEnd, setNewEndRef_func])
    
    useEffect(() => {
        if(current_end_id != undefined && user != undefined && host != undefined){
            const crud = new EndCrud();
            options.method = "POST"
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }
            
            options.body = JSON.stringify({"end_id":current_end_id})
            crud.getEndData(setEnd, options)
        }
    }, [current_end_id, user, host])

    useEffect(() => {
        handleSaveNewEnd()
    }, [saveNewEnd, handleSaveNewEnd])

    return (
        <div className="endDetails">
            <h2>Detalhes do Endereço</h2>
            <div className="endereco">
                {(!editing)
                ?(
                    <div className="box">
                        <p className="end-text end_id">End ID: 
                            <span className="end_id_value">{(end !== undefined) ? (end.endereco.end_id) : ('')}</span>
                        </p>
                    </div>

                ) : ('')
                }
                <div className="box">
                    <p className="end-text end_cep">CEP:
                        {(!editing)
                        ? (<span className="end_cep_value">{(end !== undefined) ? (end.endereco.end_cep) : ('')}</span>)
                        : (<input type="text" className="end_cep_value" defaultValue={(end !== undefined) ? (end.endereco.end_cep) : ('')} onChange={getNewAddress}/>)}
                    </p>
                </div>
                <div className="box">
                    <p className="end-text end_logradouro">Logradouro:
                        <span className="end_logradouro_value">{(end !== undefined) ? (end.endereco.end_logradouro) : ('')}</span>
                    </p>
                </div>
                <div className="box">
                    <p className="end-text end_numero">Numero:
                    {(!editing)
                        ? (<span className="end_numero_value">{(end !== undefined) ? (end.endereco.end_numero) : ('')}</span>)
                        : (<input type="text" className="end_numero_value" defaultValue={(end !== undefined) ? (end.endereco.end_numero) : ('')} onChange={getNewNumber}/>)}
                    </p>
                </div>
                <div className="box">
                    <p className="end-text end_bairro">Bairro:
                        <span className="end_bairro_value">{(end !== undefined) ? (end.endereco.end_bairro) : ('')}</span>
                    </p>
                </div>
                <div className="box">
                    <p className="end-text end_cidade">Cidade:
                        <span className="end_cidade_value">{(end !== undefined) ? (end.endereco.end_cidade) : ('')}</span>
                    </p>
                </div>
                <div className="box">
                    <p className="end-text end_uf">UF:
                        <span className="end_uf_value">{(end !== undefined) ? (end.endereco.end_uf) : ('')}</span>
                    </p>
                </div>
                <div className="box">
                    <p className="end-text end_referencia">Referencia:
                        {(!editing)
                        ? (<span className="end_referencia_value">{(end !== undefined) ? (end.endereco.end_referencia) : ('')}</span>)
                        : (<input type="text" className="end_referencia_value" defaultValue={(end !== undefined) ? (end.endereco.end_referencia) : ('')} onChange={getNewRef}/>)}
                    </p>
                </div>
            </div>
        </div>
    )
}

EnderecoDetails.propTypes = {
    end_id: PropTypes.number,
    user: PropTypes.object,
    host: PropTypes.string,
    editing: PropTypes.bool,
    saveNewEnd: PropTypes.object,
    saveNewEndReady: PropTypes.object,
    newEndRef: PropTypes.object,
    newEndNumberRef: PropTypes.object,
    newEndReferenceRef: PropTypes.object,
    end_type: PropTypes.number
}

export default EnderecoDetails;