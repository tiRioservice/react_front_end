import {useCallback, useEffect, useRef, useState} from 'react';
import CargoCrud from './CargoCrud';
import CargoConfigCrud from '../../../dashboard/components/CargoConfigCrud';
import InsertCargoConfigs from './InsertCargoConfigs';
import { PropTypes } from 'prop-types';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function InsertForm({host, user, setInsert, setCargoInserted, cargoInserted,  refresh}){
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)
    const [cargoData, setCargoData] = useState(undefined)
    const [cargoConfig, setCargoConfig] = useState(undefined)
    const [allCheckboxes, setAllCheckboxes] = useState([])
    const cargo_id = useRef(null)
    const n_cargos = useRef(0)
    const cargo_inserted = useRef(false)
    const cargoData_ref = useRef(null)
    const [all_ok, setAll_ok] = useState(false)

    const configureCargo = useCallback(() => {
        if(allCheckboxes !== undefined && cargo_id.current !== null){
            let allCheckboxes_temp = []
    
            allCheckboxes.forEach((checkbox) => {
                const configPattern = {
                    "cargo_id":cargo_id.current,
                    "perm_id": Number(checkbox.classList[1].substring(6)),
                    "nvl_acesso": checkbox.checked
                }
    
                allCheckboxes_temp.push(configPattern)
            })
            
            setCargoConfig(allCheckboxes_temp)
        }
    }, [allCheckboxes, cargo_id])

    const insertCargo_func = useCallback(() => {
        if(n_cargos.current != 1 && cargo_inserted.current === false){
            const cargoCrud = new CargoCrud();
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }
            
            const rawData = {
                "cargo_nome": cargoData_ref.current.cargo_nome,
                "cargo_desc": cargoData_ref.current.cargo_desc
            }
            
            options['method'] = "POST"
            options['body'] = JSON.stringify(rawData)
            cargoCrud.insertCargo(setFeedbackMessage, cargo_inserted, cargo_id, options)
            
            setTimeout(() => {
                if(cargo_inserted.current === true){
                    n_cargos.current = 1
                    setCargoInserted({"cargo_inserted":true})
                }
            }, 1000)
        }
    }, [cargoData_ref, user, host, setFeedbackMessage, cargo_inserted, n_cargos, cargo_id, setCargoInserted])

    const resetForm = useCallback(() => {
        document.getElementById('nome').value = ''
        document.getElementById('desc').value = ''
        setInsert(false)
        
        setTimeout(() => {
            setCargoData(undefined)
            setFeedbackMessage(undefined)
            setCargoInserted({"cargo_inserted":false})
            refresh.current = true
            setAll_ok(false)
        }, 1000)

    }, [setInsert, setCargoInserted, setCargoData, setFeedbackMessage, refresh, setAll_ok])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(cargoData === undefined){
            const nome = e.target.elements.nome.value
            const desc = e.target.elements.desc.value
            setCargoData({
                "cargo_nome": nome,
                "cargo_desc": desc !== '' ? desc : 'N/A'
            })
        }
    }

    useEffect(() => {
        if(cargoConfig !== undefined){
            const cargoConfigCrud = new CargoConfigCrud();
            cargoConfig.forEach((config) => {
                options['headers'] = {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Cross-Origin-Opener-Policy": "*",
                    "Authorization": "Bearer " + user["x-JWT"],
                    "Host": host
                }

                options['method'] = "POST"
                options['body'] = JSON.stringify(config)
                cargoConfigCrud.insertCargoConfig(setFeedbackMessage, options)
            })

            setAll_ok(true)
        }
    }, [cargoConfig, user, host, setFeedbackMessage, setAll_ok])

    useEffect(() => {
        if(cargoData !== undefined){
            cargoData_ref.current = {...cargoData}
            insertCargo_func()
        }
    }, [cargoData, insertCargo_func, cargoData_ref, configureCargo])

    useEffect(() => {
        if(cargoInserted.cargo_inserted){
            configureCargo()
        }
    }, [cargoInserted, configureCargo])

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
                            <label htmlFor='nome'>Nome do cargo</label>
                            <input type='text' id='nome' name='nome' placeholder='Nome de 1 a 30 caracteres.' maxLength='30' required/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='desc'>Descrição</label>
                            <input type='text' id='desc' name='desc' placeholder='Descrição do cargo' maxLength="300" title="O presente campo possui um limite de 300 caracteres."/>
                        </div>

                        <InsertCargoConfigs user={user} setAllCheckboxes={setAllCheckboxes} />

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
    setCargoInserted: PropTypes.func.isRequired,
    cargoInserted: PropTypes.object.isRequired,
    refresh: PropTypes.object.isRequired
}

export default InsertForm;