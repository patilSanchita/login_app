import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";
import * as appConstant from '../../../constants';
import Notifications, {notify} from 'react-notify-toast';
import Home from '../../container/Home/Home';
import Button from "../../UI/Button/Button";
import styles from './Form.module.css';

const Form = () => {

    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);

    const [enteredUsernameTouched, setEnteredUserTouched] = useState(false);
    const [enteredPasswordIsTouched, setEnteredPasswordIsTouched] = useState(false);

    const enteredUsernameIsvalid = enteredUsername.trim() !== '';
    const usernameInputIsValid = !enteredUsernameIsvalid && enteredUsernameTouched;
    
    let pwdErrMsg = '';
    let enteredPasswordIsvalid = false;
    if(enteredPassword.trim() === ''){
        pwdErrMsg = 'Please enter password.';
        enteredPasswordIsvalid = false;
    }else if(enteredPassword.length <= '8'){
        pwdErrMsg = 'Password must contains minimum 8 characters.';
        enteredPasswordIsvalid = false;
    }else if(enteredPassword.length <= '10'){
        pwdErrMsg = 'Password must contains atleast 1 special character, number and capital letter.';
        enteredPasswordIsvalid = false;
    }else{
        enteredPasswordIsvalid = true;
    }

    const passwordInputIsValid = !enteredPasswordIsvalid && enteredPasswordIsTouched;

    let formIsvalid = false;

    if(enteredUsernameIsvalid && enteredPasswordIsvalid){
        formIsvalid = true;
    }

    const userNameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const userNameBlurHandler = (event) => {
        setEnteredUserTouched(true);
    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const passwordBlurHandler = (event) => {
        setEnteredPasswordIsTouched(true);
    }

    //form submit handler
    const formSubmissionHandler = (event) => {
        event.preventDefault();
    
        // console.log(enteredUsername, enteredPassword);
        postDataToServer(enteredUsername, enteredPassword);

        setEnteredUsername('');
        setEnteredUserTouched(false);
        setEnteredPassword('');
        setEnteredPasswordIsTouched(false);
    }

    //function to post data on server
    const postDataToServer = async(username,password) => {
        let userName = "testuser";
        let userPassword = "Qwerty@12345";

        if(username === userName && password === userPassword){
            setLoginStatus(true);
            localStorage.setItem('loginStatus',true);
        }

        // const data = {
        //     username:username,
        //     password:password
        // };

        // let urldata = "";
        // urldata=`${appConstant.API_URL}${appConstant.LOGIN_API}`;
        // console.log("urldata: "+urldata)

        // axios({method: 'post', url: urldata, data: data})
        // .then((response) => {
        //     //console.log("response: "+response.data);
        //     if(response.data !== ""){
        //         this.setState({
        //             username:response.data.username,
        //             password:response.data.password,
        //         });
        //         setLoginStatus(true);
        //         localStorage.setItem('loginStatus',true);
        //         localStorage.setItem("userDetails",JSON.stringify({username:response.data.username,password:response.data.password}));
        //         notify.show("User login Successfully", "success", 2000);
        //     }else{""
        //         notify.show("Incorrect username or password", "error", 2000);
        //     }
        // },
        // (error) => {
        //     console.log(error);
        //     notify.show("Something went wrong", "error", 2000);
        // },
        // ).catch((error) => console.log("Error: "+error));;

    };

    if(loginStatus === true){
        return <Navigate  to="/home" />
    }

        return(
            <div>
                <Notifications />
                <div className={`${styles.formMainDiv} test`}>
                    <form className={styles.form} onSubmit={formSubmissionHandler}>
                        <div className={styles.inputgroup}>
                            <label htmlFor="username">Username</label>
                            <input 
                                id="username" 
                                type="text"  
                                onChange={userNameChangeHandler} 
                                onBlur={userNameBlurHandler}
                                value={enteredUsername}
                            />
                            {!enteredUsernameIsvalid && enteredUsernameTouched ?<p className="errortext">Username cannot be empty</p>:null}
                        </div>
                        <div className={styles.inputgroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password" 
                                type="password" 
                                onChange={passwordChangeHandler}
                                onBlur={passwordBlurHandler}
                                value={enteredPassword} 
                            />
                            {!enteredPasswordIsvalid && enteredPasswordIsTouched ? <p className="errortext">{pwdErrMsg}</p>:null}
                        </div>
                        <Button id="loginBtn" type="submit" disabled={!formIsvalid}>Login</Button>
                    </form>
                    <a href="#" id="forgotPwd">Forgot Password?</a>
                </div>
            </div>
        )
}

export default Form;