import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import {ShopContext} from '../context/ShopProvider'

function Navbar(){
    const {openCart,closeCart} = useContext(ShopContext)

    const [click,setClick] = useState(false);
    const [button,setButton] = useState(true);
    const handleClick = () => {
        setClick(!click)
        closeCart()
    };
    const closeMobileMenu = () => {
        setClick(false)
        closeCart()
    };



    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        }else{
            setButton(true);
        }
    };

    // solved the problem of the sign up sheet appearing on refresh page, navbar issue fixed
    // useEffect(() => {
    //     showButton()
    // }, []);

    window.addEventListener('resize',showButton)

    return(
        <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    KANYE KLOTHES
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    
                    <i className={ click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>  
                    <li className='nav-item'> 
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Products
                    </Link>
                    </li>

                </ul>
            </div>
        </nav>
        </>
    )
}

export default Navbar