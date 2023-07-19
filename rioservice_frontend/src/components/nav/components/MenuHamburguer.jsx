import PropsTypes from 'prop-types';

function MenuHamburguer({setMenuOpen, menuOpen}) {
    return (
        <>
            <button className="menu-hamburguer" onClick={() => {setMenuOpen(!menuOpen)}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path id="menu-icon" d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z"/></svg>
            </button>
        </>
    )
}

MenuHamburguer.propTypes = {
    setMenuOpen: PropsTypes.func.isRequired,
    menuOpen: PropsTypes.bool.isRequired
}

export default MenuHamburguer