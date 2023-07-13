import React, {useEffect, useState} from "react";
import passChange from "./PassChange";

export default function PassChangeForm({user, setTrocarSenhaOpen}) {
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)
    const [match, setMatch] = useState(true)
    const test = (e) => {
        e.preventDefault()
        const new_pass = e.target.elements.new_password.value
        const new_pass_repeat = e.target.elements.new_password_repeat.value

        if (new_pass !== new_pass_repeat) {
            setMatch(false)
            setFeedbackMessage("As senhas não coincidem.")
        } else { 
            setMatch(true)
            passChange(user["x-JWT"], user["colab_id"], new_pass, setFeedbackMessage)
        }
    }

    useEffect(() => {
        if (match) {
            document.querySelector(".new_password").value = ""
            document.querySelector(".new_password_repeat").value = ""

            setTimeout(() => {
                setFeedbackMessage(undefined)
                setTrocarSenhaOpen(false)
            }, 3000)
        }
    }, [feedbackMessage])

    return (
        <>
            <form id="passChangeForm" onSubmit={(e) => test(e)}>
                <input type="text" className="input_pass new_password" name="new_password" placeholder="Insira a nova senha"/>
                <input type="text" className="input_pass new_password_repeat" name="new_password_repeat" placeholder="Repita a nova senha"/>
                <div>
                    <span className={feedbackMessage !== undefined ? "feedbackMessage" : "hidden"}>{feedbackMessage}</span>
                </div>
                <button className="btnEnviar">Enviar</button>
            </form>
        </>
    )
}