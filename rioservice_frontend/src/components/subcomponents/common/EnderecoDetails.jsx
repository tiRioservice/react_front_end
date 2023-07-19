import {useEffect, useState} from 'react';
import EndCrud from './EndCrud';
import PropTypes from 'prop-types';

function EnderecoDetails({end_id, jwt, host}){
    const [end, setEnd] = useState(undefined)

    useEffect(() => {
        const crud = new EndCrud();
        crud.getEndData({"end_id": end_id}, jwt, host, setEnd)
    }, [end_id, jwt, host])

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
    jwt: PropTypes.string,
    host: PropTypes.string
}

export default EnderecoDetails;