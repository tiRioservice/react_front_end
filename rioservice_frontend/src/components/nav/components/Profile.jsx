import { useState } from "react"
import PassChangeForm from "../../login/components/PassChangeForm"

export default function Profile({user, profileOpen, setProfileOpen, setMenuOpen}){
    const [trocarSenhaOpen, setTrocarSenhaOpen] = useState(false)

    const trocarSenha = () => {
        setTrocarSenhaOpen(!trocarSenhaOpen)
    }
    
    return (
        <>
            <div id="profile" className={(!profileOpen) ? ('profile-closed') : ('profile-open')}>
                <div className="data">
                    <h1>Perfil</h1>
                    <p className="user-attributes">ID de usuario: <span>{user.colab_id}</span></p>
                    <p className="user-attributes">Matricula de usuario: <span>{user.colab_matricula}</span></p>
                    <p className="user-attributes">Usuario logado: <span>{user.colab_nome}</span></p>
                    <p className="user-attributes">Data de nasc.: <span>{user.colab_nascimento}</span></p>
                    <p className="user-attributes">CPF: <span>{user.colab_cpf}</span></p>
                    <p className="user-attributes">RG: <span>{user.colab_rg}</span></p>
                    <p className="user-attributes">Estado civil: <span>{user.colab_est_civil}</span></p>
                    <p className="user-attributes">Naturalidade: <span>{user.colab_naturalidade}</span></p>
                    <p className="user-attributes">Telefone: <span>{user.colab_fone}</span></p>
                    <p className="user-attributes">Celular: <span>{user.colab_celular}</span></p>
                    <p className="user-attributes">Escolaridade: <span>{user.colab_escolaridade}</span></p>
                    <p className="user-attributes">Admissão: <span>{user.colab_admissao}</span></p>
                    <p className="user-attributes">Email: <span>{user.colab_email}</span></p>

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