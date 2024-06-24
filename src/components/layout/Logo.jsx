import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo6.png'; // Importar la imagen del logo

const Logo = () => {
    return (
        <div className='logo'>
            <Link className='link-rrd' to="/">
                <img src={logo} alt="Camila Espiral" className='logo-image' />
            </Link>
        </div>
    );
};

export default Logo;
