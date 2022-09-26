import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import logo from "./../../../images/logo.png";
import LogoutIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import HomeIcon from '@material-ui/icons/Home';
import styles from './Header.module.css';

class Header extends Component{
    constructor(props){
        super(props);

    }

    onClickLogout(){
        localStorage.setItem('loginStatus',false);
        return <Navigate to="/login" />
    }

    render(){
        let loginStatus = localStorage.getItem('loginStatus');
        return(
            <div id="hdrMain">
                <header id="header" className={styles.header}>
                    <nav id="navbar" className={styles.navbar}>
                        <div className="container">
                            <img src={logo} alt="Tata STRIVE"/>
                            {loginStatus ? <ul>
                                <li>
                                    <a className="current" href="#"><HomeIcon /></a>
                                </li>
                                 <li>
                                    <a href="/login" onClick={this.onClickLogout}><LogoutIcon /></a>
                                </li>
                            </ul>:null}
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default Header;