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
            <div className="box">
                <label htmlFor="fornecedoresAccess" className="fornecedoresAccess">Área de Fornecedores</label>
                <input type="checkbox" name="fornecedoresAccess" id="fornecedoresAccess" className="cargoConfig config4"/>
            </div>
            <div className="box">
                <label htmlFor="estoqueAccess" className="estoqueAccess">Área de Estoque</label>
                <input type="checkbox" name="estoqueAccess" id="estoqueAccess" className="cargoConfig config5"/>
            </div>
            <div className="box">
                <label htmlFor="cotacoesAccess" className="cotacoesAccess">Área de Cotações</label>
                <input type="checkbox" name="cotacoesAccess" id="cotacoesAccess" className="cargoConfig config6"/>
            </div>
        </div>
    </>)
}

InsertCargoConfigs.propTypes = {
    setAllCheckboxes: PropType.func.isRequired
}

export default InsertCargoConfigs;