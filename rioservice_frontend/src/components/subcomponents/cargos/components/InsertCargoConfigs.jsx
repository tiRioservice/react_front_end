import { useEffect } from 'react';
import PropType from 'prop-types';

function InsertCargoConfigs({setAllCheckboxes}){

    useEffect(() => {
        const configs = document.querySelectorAll(".cargoConfig")
        setAllCheckboxes(configs)
    },[setAllCheckboxes])

    return (<>
        <div className="insertCargoConfigs">
            <h2>Configurar acesso do cargo</h2>
            <div className="box">
                <label htmlFor="baseAccess" className="baseAccess">Área de Bases</label>
                <input type="checkbox" name="baseAccess" id="baseAccess" className="cargoConfig config1"/>
            </div>
            <div className="box">
                <label htmlFor="colaboradoresAccess" className="colaboradoresAccess">Área de Colaboradores</label>
                <input type="checkbox" name="colaboradoresAccess" id="colaboradoresAccess" className="cargoConfig config2"/>
            </div>
            <div className="box">
                <label htmlFor="cargosAccess" className="cargosAccess">Área de Cargos</label>
                <input type="checkbox" name="cargosAccess" id="cargosAccess" className="cargoConfig config3"/>
            </div>
        </div>
    </>)
}

InsertCargoConfigs.propTypes = {
    setAllCheckboxes: PropType.func.isRequired
}

export default InsertCargoConfigs;