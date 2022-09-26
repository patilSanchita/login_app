import React, { Component } from 'react';
import styles from './Footer.module.css';

class Footer extends Component{
    render(){
        return(
            <div className={styles.footerMain}>
                <footer id="footer">
                    <p>TATA STRIVE &copy; 2021, All Rights Reserved</p>
                </footer>
            </div>
        )
    }
}

export default Footer;