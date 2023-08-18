import { useState, useEffect, useCallback } from "react";
import PassChangeForm from "../../login/components/PassChangeForm";
import EnderecoDetails from "../../subcomponents/common/EnderecoDetails";
import CargoCrud from "../../subcomponents/cargos/components/CargoCrud";
import PropTypes from "prop-types";
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

function Profile({user, host, profileOpen, setProfileOpen, setMenuOpen, trocarSenhaOpen, setTrocarSenhaOpen}){
    const [endId] = useState(user.end_id)
    const [userNascimento, setUserNascimento] = useState(undefined)
    const [userAdmissao, setUserAdmissao] = useState(undefined)
    const [cargo, setCargo] = useState(undefined)

    const fetchCargo = useCallback(()=>{
        const cargoCrud = new CargoCrud();
        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + user["x-JWT"],
            "Host": host
        }

        options['method'] = "POST"
        options['body'] = JSON.stringify({"cargo_id": user.cargo_id})
        cargoCrud.getCargoData(setCargo, options)
    }, [user, host])

    const setDates = useCallback(() => {
        const date = new Date(user.colab_nascimento)
        const day = date.getDate() + 1
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const formattedDate = `${day}/${month}/${year}`

        const date2 = new Date(user.colab_admissao)
        const day2 = date2.getDate() + 1
        const month2 = date2.getMonth() + 1
        const year2 = date2.getFullYear()
        const formattedDate2 = `${day2}/${month2}/${year2}`

        setUserNascimento(formattedDate)
        setUserAdmissao(formattedDate2)
    }, [user])

    const trocarSenha = useCallback(() => {
        setTrocarSenhaOpen(!trocarSenhaOpen)
    }, [trocarSenhaOpen, setTrocarSenhaOpen])

    useEffect(() => {
        setDates()
        fetchCargo()
    },[setDates, fetchCargo])
    
    return (
        <>
            <div id="profile" className={(!profileOpen) ? ('profile-closed') : ('profile-open')}>
                <div className="data">
                    <h1>Perfil</h1>
                    <p className="user-attributes">ID de usuario: <span>{user.colab_id != null ? user.colab_id : '-'}</span></p>
                    <p className="user-attributes">Matricula: <span>{user.colab_matricula != null ? user.colab_matricula : '-'}</span></p>
                    <p className="user-attributes">Nome: <span>{user.colab_nome != null ? user.colab_nome : '-'}</span></p>
                    <p className="user-attributes">Data de nasc.: <span>{(user.colab_nascimento != null) ? (userNascimento) : ('-')}</span></p>
                    <p className="user-attributes">CPF: <span>{user.colab_cpf != null ? user.colab_cpf : '-'}</span></p>
                    <p className="user-attributes">RG: <span>{user.colab_rg != null ? user.colab_rg : '-'}</span></p>
                    <p className="user-attributes">Telefone: <span>{user.colab_fone != null ? user.colab_fone : '-'}</span></p>
                    <p className="user-attributes">Celular: <span>{user.colab_celular != null ? user.colab_celular : '-'}</span></p>
                    <p className="user-attributes">Email: <span>{user.colab_email != null ? user.colab_email : '-'}</span></p>
                    <p className="user-attributes">Estado civil: <span>{user.colab_est_civil != null ? user.colab_est_civil : '-'}</span></p>
                    <p className="user-attributes">Naturalidade: <span>{user.colab_naturalidade != null ? user.colab_naturalidade : '-'}</span></p>
                    <p className="user-attributes">Escolaridade: <span>{user.colab_escolaridade != null ? user.colab_escolaridade : '-'}</span></p>
                    <p className="user-attributes">Admissão: <span>{(user.colab_admissao != null) ? (userAdmissao) : ('-')}</span></p>
                    <p className="user-attributes">Cargo: <span>{(cargo != undefined) ? (cargo.data.cargo_nome) : ('-')}</span></p>

                    {(endId !== undefined && endId !== null) 
                    ? (<EnderecoDetails user={user} host={host} end_id={endId} />) 
                    : (<h2 className="detailsAdvice">Endereço não cadastrado!</h2>)}

                    <div className="organizer">
                        <p className={trocarSenhaOpen ? "hidden" : "trocar_senha"}>
                            <button className="trocar_senha-btn" onClick={() => {
                                trocarSenha()
                            }}>Trocar senha</button>
                        </p>

                        <div id="trocarSenha" className={trocarSenhaOpen ? "" : "hidden"}>
                            <PassChangeForm user={user} setTrocarSenhaOpen={setTrocarSenhaOpen}/>
                        </div>
                        {/* Inserir um campo vazio para injetar o formumario e outro para a mensagem. */}
                    </div>

                    <button className="profileCloseBtn" onClick={() => {
                        setProfileOpen(false)
                        setMenuOpen(false)
                        setTrocarSenhaOpen(false)
                    }}>
                        X
                    </button>
                </div>
            </div>
        </>
    )
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    profileOpen: PropTypes.bool.isRequired,
    setProfileOpen: PropTypes.func.isRequired,
    setMenuOpen: PropTypes.func.isRequired,
    trocarSenhaOpen: PropTypes.bool.isRequired,
    setTrocarSenhaOpen: PropTypes.func.isRequired
}

export default Profile