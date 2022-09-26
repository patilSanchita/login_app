import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";
import * as appConstant from '../../../constants';
import Notifications, {notify} from 'react-notify-toast';
import Home from '../../container/Home/Home';
import Button from "../../UI/Button/Button";
import styles from './Form.module.css';

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            loginStatus:false
        }
    }

    componentDidMount(){
        if(this.props.panel === "Home"){
            let userData = JSON.parse(localStorage.getItem('userDetails'));
            // console.log("Stored Details:: "+JSON.stringify(userData));
            this.setState({
                username:userData.username,
                password:userData.password
            });
        }
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.id]:event.target.value});
    }

    //form handler function
    handleSubmit = (e) => {
        e.preventDefault();
        let key = this.props.panel==="Login"? "login": "edit";
        this.postDataToServer(this.state.username,this.state.password,key);
        this.setState({username:'',password:''});
    };

    //edit function to post data on server
     postDataToServer = async(username,password,key) => {
        const data = {
            username:username,
            password:password
        };
       
        let urldata = "";
        switch(key){
            case "login" :
                urldata=`${appConstant.API_URL}${appConstant.LOGIN_API}`
                break;
            case "create" :
                urldata=`${appConstant.API_URL}${appConstant.CREATE_USER_API}`
                break;
            case "edit" :
                urldata=`${appConstant.API_URL}${appConstant.EDIT_USER_API}`
                break;
            default:
                console.log('default');
        }

        axios({method: 'post', url: urldata, data: data})
        .then((response) => {
            // console.log("response: "+response.data);
            if(response.data !== ""){
                this.setState({
                    username:response.data.username,
                    password:response.data.password,
                });
                if(key === "login"){
                    this.setState({ loginStatus:true});
                }
                localStorage.setItem("userDetails",JSON.stringify({username:response.data.username,password:response.data.password}));
                notify.show(key==="create"?"User Added Successfully":key==="login"?"User login Successfully":"Password Updated", "success", 2000);
            }else{""
                notify.show(key==="create"?"User Already Exsist":"Incorrect username or password", "error", 2000);
            }
        },
        (error) => {
            console.log(error);
            notify.show("Something went wrong", "error", 2000);
        },
        ).catch((error) => console.log("Error: "+error));;

    };

    //registration function
    handleClick = (e) => {
        e.preventDefault();
        this.postDataToServer(this.state.username,this.state.password,"create");
        this.setState({username:'',password:''});
    };

    render(){

        if(this.state.loginStatus === true){
            return <Navigate  to="/home" />
        }

        return(
            <div>
                <Notifications />
                <div className={styles.formMainDiv}>
                    <h3>{this.props.title}</h3>
                    <form className={styles.form} onSubmit={this.handleSubmit}>
                        <div className={styles.inputgroup}>
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" name="username" value={this.state.username} onChange={this.inputChangeHandler} autoComplete="new-userName" required disabled={this.props.panel==="Login"?false:true}/>
                        </div>
                        <div className={styles.inputgroup}>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password" value={this.state.password} onChange={this.inputChangeHandler} autoComplete="new-password" required/>
                        </div>
                        <Button id="loginBtn" type="submit">{this.props.panel==="Login"? "Login": "Edit"}</Button>
                    </form>
                    {this.props.panel==="Login" ? <Button id="registerBtn" type="submit" onClick={this.handleClick}>Register</Button>:null}
                </div>
            </div>
        )
    }
}

export default Form;