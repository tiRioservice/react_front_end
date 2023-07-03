import React, { useEffect, useState } from 'react';
import Logo from './components/Logo';
import Form from './components/Form';
import './scss/style.scss';
import Ver from './components/Ver';

export default function Login({data, appVersion, setLoggedIn, setUser}) {
    return (
        <>
            <section id="loginScreen">
                <div className="loginScreen__container">
                    <div className="logoWrapper">
                        <Logo/>
                    </div>
                    <Form setLoggedIn={setLoggedIn} setUser={setUser}/>
                    <Ver api_version={data.api_version} app_version={appVersion}/>
                </div>
            </section>
        </>
    )
}