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
            loginSuccess:false
        }
    }

    componentDidMount(){
        if(this.props.panel === "Home"){
            let userData = JSON.parse(localStorage.getItem('userDetails'));
            //console.log("Stored Details:: "+JSON.stringify(userData));
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
        // let dataObj={
        //     username:this.state.username,
        //     password:this.state.password
        // }
        // if(this.state.username=== uname && this.state.password===pwd){
            // this.setState({loginSuccess:true});
            this.postDataToServer(this.state.username,this.state.password,"login");
           // localStorage.setItem('userDetails', JSON.stringify(dataObj));
            //localStorage.setItem('loginStatus',true);
        // }else{
            // notify.show("User not Register", "error", 3000);
        // }
         this.setState({username:'',password:''});
    };

    //edit function to post data on server
     postDataToServer = async(username,password,key) => {
        // var config = {
        //     headers: {
        //       "Content-Type": "application/json; charset=utf-8",
        //       "Cache-Control":"no-cache",
        //       "Access-Control-Allow-Origin":"*",
        //       "Access-Control-Allow-Headers": "X-Requested-With, content-type"
        //     }
        //   };
          const data = {
            username:username,
            password:password
          };
        //   axios.get(`${appConstant.API_URL}${appConstant.CREATE_USER_API}?username=${username}&password=${password}`, config)
        //axios.post(`${appConstant.API_URL}${appConstant.CREATE_USER_API}?username=${username}&password=${password}`,data,config)
        // axios({
        //     method: 'post',
        //     url: `${appConstant.API_URL}${appConstant.CREATE_USER_API}?username=${username}&password=${password}`,
        //     data: data,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "Access-Control-Allow-Origin":"*",
        //     }, 
        // })
        // .then((response) => {
        //     console.log(response);
        //     console.log("success");
        //     notify.show("User Added Successfully", "success", 2000);

        // },
        // (error) => {
        //     console.log(error);
        //     console.log("error");
        //     notify.show("Something went wrong", "error", 2000);
        // },
        // ).catch((error) => console.log("Error: "+error));;
        let urldata = "";
        switch(key){
            case "login" :
                console.log("inlogin");
                urldata=`${appConstant.API_URL}${appConstant.LOGIN_API}?username=${username}&password=${password}`
                break;
            case "create" :
                console.log("increate");
                urldata=`${appConstant.API_URL}${appConstant.CREATE_USER_API}`
                break;
            case "edit" :
                console.log("inedit");
                urldata=`${appConstant.API_URL}${appConstant.EDIT_USER_API}?username=${username}&password=${password}`
                break;
            default:
                console.log('default');
        }
        await fetch(urldata,{
            method:'POST',
            // headers: {
            //     "Content-Type": "application/json; charset=utf-8",
            //     // "Cache-Control":"no-cache",
            // },
            body:JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.error)
            }
            return response.json();
        })
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    // handleErrors(response) {
    //     console.log("handleErrors "+JSON.stringify(response));
    //      if (!response.ok) {
    //        throw Error(response.statusText);
    //      } //else if(!response.)
    //      return response;
    // }

    //registration function
    handleClick = (e) => {
        e.preventDefault();
        // let dataObj={
        //     username:this.state.username,
        //     password:this.state.password
        // }
        this.postDataToServer(this.state.username,this.state.password,"create");
        this.setState({username:'',password:''});
        //this.postDataToServer(dataObj);
        //notify.show("User Registation Successful", "success", 3000);
    };

    render(){

        if(this.state.loginSuccess=== true){
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