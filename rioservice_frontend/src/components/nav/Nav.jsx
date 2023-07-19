import {useState} from 'react';
import MenuHamburguer from './components/MenuHamburguer';
import Menu from './components/Menu';
import Profile from './components/Profile';
import logo from '../../assets/rioservice_logo.webp';
import PropTypes from "prop-types";
import './scss/style.scss';

function Nav({user, host, logOut, setPage}) {
    const [trocarSenhaOpen, setTrocarSenhaOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)

    return (
        <>
            <nav id="navigation">
                <ul>
                    <li>
                        <img id="logo" src={logo} alt="Logo da RioService" onClick={() => setPage("Dashboard")}/>
                    </li>
                    <li><MenuHamburguer menuOpen={menuOpen} setMenuOpen={setMenuOpen}/></li>
                </ul>
                <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} setPage={setPage} logOut={logOut} user={user} setProfileOpen={setProfileOpen} setTrocarSenhaOpen={setTrocarSenhaOpen}/>
                <Profile user={user} host={host} profileOpen={profileOpen} setProfileOpen={setProfileOpen} setMenuOpen={setMenuOpen} trocarSenhaOpen={trocarSenhaOpen} setTrocarSenhaOpen={setTrocarSenhaOpen}/>
            </nav>
        </>
    )
}

Nav.propTypes = {
    user: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    logOut: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired
}

export default Nav