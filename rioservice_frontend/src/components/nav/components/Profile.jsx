import { useState } from "react";
import PassChangeForm from "../../login/components/PassChangeForm";
import EnderecoDetails from "../../subcomponents/common/EnderecoDetails";
import PropTypes from "prop-types";

function Profile({user, host, profileOpen, setProfileOpen, setMenuOpen, trocarSenhaOpen, setTrocarSenhaOpen}){
    const [endId] = useState(user.end_id)

    const trocarSenha = () => {
        setTrocarSenhaOpen(!trocarSenhaOpen)
    }
    
    return (
        <>
            <div id="profile" className={(!profileOpen) ? ('profile-closed') : ('profile-open')}>
                <div className="data">
                    <h1>Perfil</h1>
                    <p className="user-attributes">ID de usuario: <span>{user.colab_id != null ? user.colab_id : '-'}</span></p>
                    <p className="user-attributes">Matricula de usuario: <span>{user.colab_matricula != null ? user.colab_matricula : '-'}</span></p>
                    <p className="user-attributes">Usuario logado: <span>{user.colab_nome != null ? user.colab_nome : '-'}</span></p>
                    <p className="user-attributes">Data de nasc.: <span>{user.colab_nascimento != null ? user.colab_nascimento : '-'}</span></p>
                    <p className="user-attributes">CPF: <span>{user.colab_cpf != null ? user.colab_cpf : '-'}</span></p>
                    <p className="user-attributes">RG: <span>{user.colab_rg != null ? user.colab_rg : '-'}</span></p>
                    <p className="user-attributes">Estado civil: <span>{user.colab_est_civil != null ? user.colab_est_civil : '-'}</span></p>
                    <p className="user-attributes">Naturalidade: <span>{user.colab_naturalidade != null ? user.colab_naturalidade : '-'}</span></p>
                    <p className="user-attributes">Telefone: <span>{user.colab_fone != null ? user.colab_fone : '-'}</span></p>
                    <p className="user-attributes">Celular: <span>{user.colab_celular != null ? user.colab_celular : '-'}</span></p>
                    <p className="user-attributes">Escolaridade: <span>{user.colab_escolaridade != null ? user.colab_escolaridade : '-'}</span></p>
                    <p className="user-attributes">Admissão: <span>{user.colab_admissao != null ? user.colab_admissao : '-'}</span></p>
                    <p className="user-attributes">Email: <span>{user.colab_email != null ? user.colab_email : '-'}</span></p>

                    {(endId !== undefined && endId !== null) 
                    ? (<EnderecoDetails jwt={user["x-JWT"]} host={host} end_id={endId} />) 
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