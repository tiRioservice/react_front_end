import {useEffect, useState} from 'react';
import EndCrud from './EndCrud';
import PropTypes from 'prop-types';
const crud = new EndCrud();
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function EnderecoDetails({end_id, user, host}){
    const [end, setEnd] = useState(undefined)
    
    useEffect(() => {
        if(end_id != undefined && user != undefined && host != undefined){
            options.method = "POST"
            options.body = JSON.stringify({"end_id":end_id})
            options['headers'] = {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Cross-Origin-Opener-Policy": "*",
                "Authorization": "Bearer " + user["x-JWT"],
                "Host": host
            }
            
            crud.getEndData(setEnd, options)
        }
    }, [end_id, user, host])

    return (
        <div className="endDetails">
            <h2>Detalhes do Endereço</h2>
            <div className="endereco">
                <div className="box">
                    <p className="end-text end_id">End ID: 
                        <span className="end_id_value">{(end !== undefined) ? (end.endereco.end_id) : ('')}</span>
                    </p>
                </div>
                <div className="box">
                    <p className="end-text end_cep">CEP:
                        <span className="end_cep_value">{(end !== undefined) ? (end.endereco.end_cep) : ('')}</span>
                    </p>
                </div>
                <div className="box">
                    <p className="end-text end_logradouro">Logradouro:
                        <span className="end_logradouro_value">{(end !== undefined) ? (end.endereco.end_logradouro) : ('')}</span>
                    </p>
                </div>
                <div className="box">
                    <p className="end-text end_numero">Numero:
                        <span className="end_numero_value">{(end !== undefined) ? (end.endereco.end_numero) : ('')}</span>
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
                        <span className="end_referencia_value">{(end !== undefined) ? (end.endereco.end_referencia) : ('')}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

EnderecoDetails.propTypes = {
    end_id: PropTypes.number,
    user: PropTypes.object,
    host: PropTypes.string
}

export default EnderecoDetails;