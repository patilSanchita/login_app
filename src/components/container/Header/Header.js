import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";
import * as appConstant from '../../../constants';
import Notifications, {notify} from 'react-notify-toast';
import logo from "./../../../images/logo.png";
import LogoutIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import HomeIcon from '@material-ui/icons/Home';
import styles from './Header.module.css';

class Header extends Component{
    constructor(props){
        super(props);

    }

    onClickLogout(){
        axios.post(`${appConstant.API_URL}/${appConstant.LOGOUT_API}`,{},data)
        .then((response) => {
            if(response.data !== ""){
                localStorage.setItem('loginStatus',false);
                localStorage.setItem('userDetails',{});
                notify.show("User logged out Successfully", "success", 2000);
                return <Navigate to="/login" />
            }else{
                notify.show("Something went wrong", "error", 2000);
            }
        },
        (error) => {
            console.log(error);
            notify.show("Something went wrong", "error", 2000);
        },
        ).catch((error) => console.log("Error: "+error));;
    }

    render(){
        let loginStatus = localStorage.getItem('loginStatus');
        return(
            <div id="hdrMain">
                <Notifications />
                <header id="header" className={styles.header}>
                    <nav id="navbar" className={styles.navbar}>
                        <div className="container">
                            <img src={logo} alt="Tata STRIVE"/>
                            {loginStatus === true ? <ul>
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