import React, { Component } from 'react';
// import '../bratilius-theme-package/assets-minified/all-demo.css'
import '../CSS/assets-minified/all-demo.css'
// import '../CSS/css/bootstrap.css'
import Cookies from 'universal-cookie';
import { Loader } from 'react-overlay-loader';
import {url} from './helper'


class Login extends Component{     
    
    
    constructor(props){
        super(props)
        this.validateUsername = this.validateUsername.bind(this)
        this.attemptLogin = this.attemptLogin.bind(this)
        this.makeSleep = this.makeSleep.bind()
        this.enable_btn = this.enable_btn.bind(this)
        this.togglePasswordView = this.togglePasswordView.bind(this)
        this.state={
            usernameErrorMsgHidden:true,
            loginErrorMessageHidden:true,
            showSpinner:true,
            login_btn_disabled:true,
            loading:false,
            loginErrorMessage:"",
            passwordViewicon:"fa fa-eye passviewicon"
        }
    }

    componentWillMount(){
        const cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        console.log(loginStatus)
        if (loginStatus === 'true'){
            window.location = '/dashboard'
        }
      
        console.log(cookies.get('is')); // Pacman

    }

    validateUsername(){ 
        this.setState({loginErrorMessageHidden:true})
        this.enable_btn()
        // this.setState({loginErrorMessageHidden:false})
        var usernameField = document.getElementById('inputEmail');
        var fieldVal = usernameField.value;

        var usernameRegex = /^[a-zA-Z0-9]+$/;
        var isCorrect = usernameRegex.test(fieldVal)
        console.log(isCorrect)
        if(isCorrect === false){
    
            document.getElementById("inputEmail").style.border = "1px solid #5887B5";
            this.setState({
                usernameErrorMsgHidden:false
            })
        }
        else{
            
            document.getElementById("inputEmail").style.border = "";
            this.setState({
                usernameErrorMsgHidden:true
            })
        }
       
        console.log(this.state.usernameErrorMsgHidden)
        }

        makeSleep(event){
            
           alert("test")
        }   
    

        enable_btn = () =>{
            var usernameField = document.getElementById('inputEmail').value;
            var passwordField = document.getElementById('inputPassword').value;
            var usernameRegex = /^[a-zA-Z0-9]+$/;
            var isCorrect = usernameRegex.test(usernameField)
            if(isCorrect === true & passwordField !==""){
                this.setState({login_btn_disabled:false})
            }
            else{
                this.setState({login_btn_disabled:true})
            }
            
        }
    attemptLogin(event){
        console.log(this)
        this.setState({
            loading:true
        })
        var login_this = this;
        var usernameField = document.getElementById('inputEmail').value;
        var passwordField = document.getElementById('inputPassword').value;
        event.preventDefault()
        // alert("You will now login with following credentials "+usernameField+" "+passwordField)
        // console.log(usernameField)
        // console.log(passwordField)
        var http = new XMLHttpRequest();
        http.open('POST', url+'/api/user/login', true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange = function() {
            if(http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText )
                console.log(json);
                if(json.status === 200){
                    const cookies = new Cookies();
                cookies.set('loggedIn', 'true', { path: '/' });
                cookies.set('user_id',json.user_id, { path: '/' })
                cookies.set('username',json.username, { path: '/' })
                cookies.set('firstname', json.first_name, { path: '/' });
                cookies.set('lastname', json.last_name, { path: '/' });
                cookies.set('token',json.token, { path: '/' });
                cookies.set('superuser',json.is_superuser, { path: '/' });
                cookies.set('organization-admin',json.is_organisation_admin, { path: '/' });
                cookies.set('branch-admin',json.is_branch_admin, { path: '/' });
                login_this.setState({
                    showSpinner:true
                })
                window.location='/dashboard'
                // alert("Logged in");
                }
                console.log(json.status)
                console.log(typeof json.status)
                if(json.status ===  401){
                    login_this.setState({
                        showSpinner:true,
                        loginErrorMessageHidden:false,
                        loginErrorMessage:"Your account has been blocked. Contact your administrator",
                        loading:false
                    })
                }
                if(json.status === 400){
                    login_this.setState({
                        showSpinner:true,
                        loginErrorMessageHidden:false,
                        loginErrorMessage:"Incorrect Password.Please enter correct password",
                        loading:false
                    })
                }
                if(json.status === 404){
                    login_this.setState({
                        showSpinner:true,
                        loginErrorMessageHidden:false,
                        loginErrorMessage:"Could not find a user having this username.",
                        loading:false
                    })
                }
            }
            
        }
        http.onerror =  function(){
            login_this.setState({
                showSpinner:true,
                loginErrorMessageHidden:false,
                loginErrorMessage:"Sorry could not complete login",
                loading:false
            })
        }
        http.ontimeout = function(){
            login_this.setState({
                showSpinner:true,
                loginErrorMessageHidden:false,
                loginErrorMessage:"Sorry could not complete login",
                loading:false
            })
        }
        console.log(http)
        http.send("username="+usernameField+"&password="+passwordField)
    }   

    togglePasswordView = () =>{
        var input = document.getElementById("inputPassword")
        if(input.type === "password"){
            input.type = "text"
            this.setState({
                passwordViewicon:"fas fa-eye-slash passviewicon"
            })
        }
        else{
            input.type = "password"
            this.setState({
                passwordViewicon:"fas fa-eye passviewicon"
            })
        }
    }

    render(){
        return(
      <div>
          <div className="center-vertical">
    <div className="center-content">
    <Loader loading={this.state.loading} fullPage={true}/>
        <form action="" id="login-validation" className="col-md-4 center-margin" method="">
        
            <h3 className="text-center pad25B font-gray text-transform-upr font-size-23">Kanji Admin</h3>
            <div id="login-form" className="content-box modal-content">
            
                <div className="content-box-wrapper pad20A">

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username:</label>
                        <div className="input-group input-group-lg">
                        <i className="fa fa-user inputicon"></i>
                            <input type="text" className="form-control" id="inputEmail" onChange={this.validateUsername} placeholder="Enter Username" maxLength="40"></input>
                           
                        </div>
                        <div class="isa_error" hidden={this.state.usernameErrorMsgHidden}>
                                <i class="fa fa-times-circle"></i>
                                <b>Username is not valid</b>
                            </div>
                           
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password:</label>
                        <div className="input-group input-group-lg">
                        <i class="fas fa-key inputicon" ></i>
                            <input type="password" className="form-control" id="inputPassword" onChange={this.enable_btn} placeholder="Enter Password"></input>
                            <i className={this.state.passwordViewicon} title="Show password" onClick={this.togglePasswordView}></i>
                        </div>
                        <div class="isa_error" hidden={this.state.loginErrorMessageHidden}>
                                <i class="fa fa-times-circle"></i>
                                <b>{this.state.loginErrorMessage}</b>
                            </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">

                    </div>
                    <div class="text-right col-md-6">
                            <a href="/forgotpassword" class="switch-button" switch-target="#login-forgot"title="Recover password">Forgot your password?</a>
                        </div>
                    </div>
                </div>
                <div className="button-pane">
                    <button type="submit" className="btn btn-block btn-primary" onClick={this.attemptLogin} disabled={this.state.login_btn_disabled}>Login</button>
                </div>
            </div>
        </form>
    </div>
</div>
      </div>
        )
    }
}



export default Login;