import React, {useState} from 'react';
import MenuHamburguer from './components/MenuHamburguer';
import Menu from './components/Menu';
import Profile from './components/Profile';
import logo from '../../assets/rioservice_logo.webp';
import './scss/style.scss';

export default function Nav({user, logOut, setPage}) {

    const [menuOpen, setMenuOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)

    return (
        <>
            <nav id="navigation">
                <ul>
                    <li>
                        <img id="logo" src={logo} ald="Logo da RioService" onClick={() => setPage("Dashboard")}/>
                    </li>
                    <li><MenuHamburguer menuOpen={menuOpen} setMenuOpen={setMenuOpen}/></li>
                </ul>
                <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} setPage={setPage} logOut={logOut} user={user} setProfileOpen={setProfileOpen}/>
                <Profile user={user} profileOpen={profileOpen} setProfileOpen={setProfileOpen} setMenuOpen={setMenuOpen}/>
            </nav>
        </>
    )
}