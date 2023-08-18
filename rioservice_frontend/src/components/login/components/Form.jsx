import { useState } from 'react';
import authLogin from './AuthLogin';
import PropTypes from 'prop-types';

function Form({setLoggedIn, setUser, host, setFeedbackMessage}) {
    const [login, setLogin] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    return (
        <>
            <form id="loginForm">
                <input onInput={(e) => { setLogin(e.target.value)}} type="text" placeholder="login" id="inputLogin" className="inputLogin" name="inputLogin" autoComplete="username"/>
                <input onInput={(e) => { setPassword(e.target.value)}} type="password" placeholder="senha" id="inputPassword" className="inputPassword" name="inputPassword" autoComplete="current-password"/>
                <button className="btnEnviar" onClick={(e) => { authLogin(e, login, password, setLoggedIn, setUser, host, setFeedbackMessage)}}>Entrar</button>
            </form>
        </>
    )
}

Form.propTypes = {
    setLoggedIn: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    host: PropTypes.string.isRequired,
    setFeedbackMessage: PropTypes.func.isRequired
}

export default Form;