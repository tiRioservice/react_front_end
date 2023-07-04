import React, { useState } from 'react';
import userFetch from '../../../ApiFetchData';
import authSignUp from './AuthSignUp';
import authLogin from './AuthLogin';

export default function Form({setLoggedIn, setUser}) {
    const [login, setLogin] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    return (
        <>
            <form id="loginForm">
                <input onInput={(e) => { setLogin(e.target.value)}} type="text" placeholder="login" id="inputLogin" className="inputLogin" name="inputLogin" autoComplete="username"/>
                <input onInput={(e) => { setPassword(e.target.value)}} type="password" placeholder="senha" id="inputPassword" className="inputPassword" name="inputPassword" autoComplete="current-password"/>
                <button className="btnEnviar" onClick={(e) => { authLogin(e, login, password, setLoggedIn, setUser)}}>Entrar</button>
            </form>
        </>
    )
}