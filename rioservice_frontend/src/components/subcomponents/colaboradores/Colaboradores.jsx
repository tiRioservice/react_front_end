import { useEffect, useState } from 'react';
import './scss/style.scss';
import CommandPanel from './components/CommandPanel';
import InsertForm from './components/InsertForm';
import ColabList from './components/ColabList';
import ColabCrud from './components/ColabCrud';
import ColabDetails from './components/ColabDetails';
import AreaAlert from '../common/AreaAlert';
import PropTypes from 'prop-types';

function Colaboradores({user, host}){
    const [insert, setInsert] = useState(false)
    const [allColabs, setAllColabs] = useState(undefined)
    const [hideDetails, setHideDetails] = useState(true)
    const [currentColab, setCurrentColab] = useState(undefined)
    const [colabInserted, setColabInserted] = useState(undefined)
    const [hasColabs, setHasColabs] = useState(true)

    useEffect(()=>{
        setColabInserted({"colab_inserted":false})
    }, [])

    useEffect(() => {
        if(colabInserted !== undefined && "colab_inserted" in colabInserted) {
            const crud = new ColabCrud();
            const jwt = user["x-JWT"]
            crud.getColabList(jwt, setAllColabs, host)
        }
    }, [colabInserted, host, user])

    return (
        <>
            <section id="colaboradores">
                {(!insert) ? (<CommandPanel setInsert={setInsert}/>) : (<InsertForm host={host} user={user} setInsert={setInsert} setColabInserted={setColabInserted}/>)}
                
                {hasColabs ?
                (<ColabList setHasColabs={setHasColabs} allColabs={allColabs} setHideDetails={setHideDetails} setCurrentColab={setCurrentColab}/>)
                : (<AreaAlert frase="Não há colaboradores cadastrados"/>)}
                
                <ColabDetails host={host} hideDetails={hideDetails} setHideDetails={setHideDetails} currentColab={currentColab} jwt={user["x-JWT"]} />
            </section>
        </>
    )
}

Colaboradores.propTypes = {
    user: PropTypes.object,
    host: PropTypes.string
}

export default Colaboradores;