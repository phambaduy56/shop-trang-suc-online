import Menu from './svg/bars-solid.svg'
import Close from './svg/times-solid.svg'
import CartIcon from './svg/shopping-cart-solid.svg';
import { Link } from 'react-router-dom';
import './css/Header.css';
import { useState, useEffect } from "react";
import { connect } from 'react-redux';

function Header(props) {


    // useEffect(() => {

    //     if (props.listCart !== null) {
    //         setSl(props.listCart.length);
    //     }

    // }, [])


    return (
        <header className="header">
            <div className="menu">
                <img src={Menu} alt="" width="20" />
            </div>
            <div className="logo">
                <h1><Link to="/"> Tiffany&Co</Link></h1>
            </div>
            <nav>
                <ul>
                    <li className="li"><Link to="/">Home</Link></li>
                    <li className="li"><Link to="/">Product</Link></li>
                    <li className="li"><Link to="/">Contact</Link></li>
                    <li className="li"><Link to="/">About</Link></li>
                    <li className="li">{
                        localStorage.getItem("token") ?
                            <Link to="/">Profile</Link> :
                            <Link to="/login">Login/Register</Link>}
                    </li>

                    <li className="close">
                        <img src={Close} alt="" width="20" />
                    </li>
                </ul>
                <div className="nav-cart">
                    <span className="span">{props.listCart.length}</span>
                    <Link to="/cart">
                        <img src={CartIcon} alt="" width="20" />
                    </Link>
                </div>
            </nav>
        </header>
    )

}

const mapstateToProps = (state) => {
    console.log(state)
    return {
        listCart: state.cart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Header);