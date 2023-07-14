import { useEffect, useState } from 'react';
import getEnd from './viaCep';

export default function EnderecoForm() {
    const [end, setEnd] = useState(undefined)

    const handleCep = (e) => {
        const cep = e.target.value
        if(cep.length == 8){
            getEnd(cep, setEnd)
        }
    }

    useEffect(() => {
        if(end !== undefined){
            document.getElementsByName('logradouro')[0].value = end.logradouro
            document.getElementsByName('bairro')[0].value = end.bairro
            document.getElementsByName('cidade')[0].value = end.localidade
            document.getElementsByName('uf')[0].value = end.uf

            if(end.erro){
                document.querySelectorAll('.readOnlyInput').forEach(input => {
                    input.value = 'CEP não encontrado.'
                })
            }
        }
    }, [end])

    return (
        <>
            <div className='inputBox'>
                <label htmlFor='cep'>CEP</label>
                <input type='text' id='cep' name='cep' placeholder='CEP (Somente os numeros)' maxLength="8" title="O presente campo possui um limite de 8 digitos e aceita somente números." pattern="\d{8,8}" onChange={handleCep}/>
            </div>
            <div className='inputBox'>
                <label htmlFor='logradouro'>Logradouro</label>
                <input type='text' defaultValue='-' name='logradouro' className='readOnlyInput' readOnly/>
            </div>
            <div className='inputBox'>
                <label htmlFor='numero'>Numero</label>
                <input type='text' defaultValue='' name='numero' maxLength="10" pattern='\d{1,10}' title="O presente campo possui um limite de 10 digitos e aceita somente números."/>
            </div>
            <div className='inputBox'>
                <label htmlFor='bairro'>Bairro</label>
                <input type='text' defaultValue='-' name='bairro' className='readOnlyInput' readOnly/>
            </div>
            <div className='inputBox'>
                <label htmlFor='cidade'>Cidade</label>
                <input type='text' defaultValue='-' name='cidade' className='readOnlyInput' readOnly/>
            </div>
            <div className='inputBox'>
                <label htmlFor='uf'>UF</label>
                <input type='text' defaultValue='-' name='uf' className='readOnlyInput' readOnly/>
            </div>
            <div className='inputBox'>
                <label htmlFor='referencia'>Referencia</label>
                <input type='text' defaultValue='' name='referencia' maxLength="300"/>
            </div>
        </>
    )
}