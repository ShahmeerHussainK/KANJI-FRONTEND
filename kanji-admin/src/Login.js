import React, { Component } from 'react';
// import '../bratilius-theme-package/assets-minified/all-demo.css'
// import '../CSS/assets-minified/all-demo.css'
// import '../CSS/css/bootstrap.css'
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';

class Login extends Component{     
    
    
    constructor(props){
        super(props)
        this.validateUsername = this.validateUsername.bind(this)
        this.attemptLogin = this.attemptLogin.bind(this)
        this.makeSleep = this.makeSleep.bind()
        this.state={
            usernameErrorMsgHidden:true,
            showSpinner:true
        }
    }

    componentWillMount(){
        document.getElementById("spiner").style.display="block"
        const cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        console.log(loginStatus)
        if (loginStatus === 'true'){
            window.location = '/dashboard'
        }
        // cookies.set('loggedIn', 'true', { path: '/' });
        console.log(cookies.get('is')); // Pacman

    }

    validateUsername(){ 
        var usernameField = document.getElementById('inputEmail');
        var fieldVal = usernameField.value;
        console.log(fieldVal)
        var usernameRegex = /^[a-zA-Z0-9]+$/;
        var isCorrect = usernameRegex.test(fieldVal)
        console.log(isCorrect)
      
        if(isCorrect === false){
            console.log("in condition")
            document.getElementById("inputEmail").style.border = "1px solid #5887B5";
            this.setState({
                usernameErrorMsgHidden:false
            })
        }
        else{
            console.log("in else")
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

    attemptLogin(event){
        console.log(this)
        this.setState({
            showSpinner:false
        })
        var login_this = this;
        var usernameField = document.getElementById('inputEmail').value;
        var passwordField = document.getElementById('inputPassword').value;
        event.preventDefault()
        // alert("You will now login with following credentials "+usernameField+" "+passwordField)
        console.log(usernameField)
        console.log(passwordField)
        var http = new XMLHttpRequest();
        http.open('POST', 'http://192.168.10.12:8000/api/login/', false);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange = function() {
            if(http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)
                console.log(json);
                if(json.status === 200){
                    const cookies = new Cookies();
                cookies.set('loggedIn', 'true', { path: '/' });
                cookies.set('firstname', json.firstname, { path: '/' });
                login_this.setState({
                    showSpinner:true
                })
                window.location='/dashboard'
                // alert("Logged in");
                }
                else{
                    login_this.setState({
                        showSpinner:true
                    })
                    window.location='/login'
                }
            }
            else{
                login_this.setState({
                    showSpinner:true
                })
                window.location='/login'
            }
        }
        console.log(http)
        http.send("username="+usernameField+"&password="+passwordField)
    }   

    render(){
        return(
      <div>
          <div className="center-vertical">
    <div className="center-content">
    
        <form action="" id="login-validation" className="col-md-4 center-margin" method="">
        
            <h3 className="text-center pad25B font-gray text-transform-upr font-size-23">Kanji Admin</h3>
            <div id="login-form" className="content-box modal-content">
            
                <div className="content-box-wrapper pad20A">

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address:</label>
                        <div className="input-group input-group-lg">
                            <span className="input-group-addon addon-inside bg-white font-primary">
                                <i className="glyph-icon icon-envelope-o"></i>
                            </span>
                            <input type="email" className="form-control" id="inputEmail" onBlur={this.validateUsername} placeholder="Enter email"></input>
                            <div className="isa_error" hidden={this.state.usernameErrorMsgHidden}>
                            Username is invalid.
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password:</label>
                        <div className="input-group input-group-lg">
                            <span className="input-group-addon addon-inside bg-white font-primary">
                                <i className="glyph-icon icon-unlock-alt"></i>
                            </span>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="text-right col-md-6">
                            <a href="/forgotpassword" className="switch-button" switch-target="#login-forgot" switch-parent="#login-form" title="Recover password">Forgot your password?</a>
                        </div>
                    </div>
                </div>
                <div className="button-pane">
                    <button type="submit" className="btn btn-block btn-primary" onClick={this.attemptLogin}>Login</button>
                </div>
            </div>
        </form>
    </div>
</div>
      </div>
        )
    }
}

export default Login