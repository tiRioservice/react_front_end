import {useState, useEffect} from 'react';
import Logo from './components/Logo';
import Form from './components/Form';
import './scss/style.scss';
import Ver from './components/Ver';
import PropTypes from 'prop-types';

function Login({data, appVersion, setLoggedIn, setUser, host}) {
    const [feedbackMessage, setFeedbackMessage] = useState(undefined)
    
    useEffect(() => {
        if(feedbackMessage !== undefined) {
            setTimeout(() => {
                setFeedbackMessage(undefined)
            }, 5000)
        }
    }, [feedbackMessage])
    
    return (
        <>
            <section id="loginScreen">
                <div className="loginScreen__container">
                    <div className="logoWrapper">
                        <Logo/>
                    </div>
                    <Form host={host} setLoggedIn={setLoggedIn} setUser={setUser} setFeedbackMessage={setFeedbackMessage}/>
                    {(feedbackMessage !== undefined) 
                    ? (<div className="feedbackMessageContainer">
                        <p className="feedbackMessage">
                            {feedbackMessage}
                        </p>
                    </div>) 
                    : ("")}
                    <Ver api_version={data.api_version} app_version={appVersion}/>
                </div>
            </section>
        </>
    )
}

Login.propTypes = {
    data: PropTypes.object.isRequired,
    appVersion: PropTypes.string.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    host: PropTypes.string.isRequired
}

export default Login;