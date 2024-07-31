import React, { Component } from 'react';
import { Loader } from 'react-overlay-loader';
import { url } from '../helper'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../CSS/assets-minified/all-demo.css'


class ChangePassword extends Component{

    constructor(props){
        super(props)
        this.state={
            "btn_disabled":true,
            loading:false,
            noEmailMessage:null,
            noEmailMessageHidden:true,
            passwordMismatchErrorhidden:true,
            passwordViewicon:"fa fa-eye passviewicon",
            messageModalOpen:false,
            messageTitle:null,
            messageBody:null,
            messageType:0
        }
        this.matchPassword = this.matchPassword.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.cloaseMessageBox = this.cloaseMessageBox.bind(this)
    }

    matchPassword = () =>{
        var n_password = document.getElementById("NewPassword")
        n_password = n_password.value
        var c_password = document.getElementById("confirmPassword")
        c_password = c_password.value

        if(n_password === c_password){
            this.setState({
                "btn_disabled":false,
                passwordMismatchErrorhidden:true
            })
        }
        else{
            this.setState({
                "btn_disabled":true,
                passwordMismatchErrorhidden:false
            })
        }
    }

    cloaseMessageBox = () =>{
        if(this.state.messageType === 0){
            this.setState({
                messageModalOpen:false
            })
        }
        if(this.state.messageType === 1){
            this.setState({
                messageModalOpen:false
            })
            window.location = '/login'
        }
    }

    changePassword = () =>{
        this.setState({
            loading:true
        })
        var password = document.getElementById("NewPassword").value
        var http = new XMLHttpRequest()
        var dashboar_ref = this
        http.open('PUT', url+'/api/user/reset_password', true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send("&username="+this.props.username+"&new_password="+password)
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    dashboar_ref.setState({
                        loading:false,
                        noEmailMessageHidden:true,
                        messageTitle:"Password Changed",
                        messageBody:"Your password has been changed. You are going to be redirected to login page",
                        messageType:1,
                        messageModalOpen:true
                    })
                    
                }
                else{
                    dashboar_ref.setState({
                        noEmailMessageHidden:false,
                        noEmailMessage:"Could Not Reset Password",
                        loading:false
                    })
                }
            }
            else{
                dashboar_ref.setState({
                    noEmailMessageHidden:false,
                    noEmailMessage:"Could Not Reset Password",
                    loading:false
                })
            }
        }
        http.onerror = function(){
            dashboar_ref.setState({
                noEmailMessageHidden:false,
                noEmailMessage:"Could Not Reset Password",
                loading:false
            })
        }
    }

    togglePasswordView = () =>{
        var input = document.getElementById("NewPassword")
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
            
            <form id="login-validation" className="col-md-4 center-margin" >
        <Loader loading={this.state.loading} fullPage={true} />
        <Modal isOpen={this.state.messageModalOpen}>
            <ModalHeader>{this.state.messageTitle}</ModalHeader>
            <ModalBody>
                <b>{this.state.messageBody}</b>
            </ModalBody>
            <ModalFooter>
                <Button onClick={this.cloaseMessageBox}>Close</Button>
            </ModalFooter>
        </Modal>
        <h3 className="text-center pad25B font-gray text-transform-upr font-size-23">Kanji Admin</h3>
        <div id="login-form" className="content-box modal-content">

            <div className="content-box-wrapper pad20A">

                <div className="form-group">
                    {/* <label htmlFor="exampleInputEmail1">Email address:</label> */}
                    <label htmlFor="exampleInputPassword1">New Password:</label>
                    <div className="input-group input-group-lg">
                    <i class="fas fa-key inputicon" ></i>
                        <input type="password" className="form-control" id="NewPassword" onBlur={this.validateUsername} placeholder="Enter New Password"></input>
                        <i className={this.state.passwordViewicon} title="Show password" onClick={this.togglePasswordView.bind(this)}></i>
                    </div>
                </div>
                <div className="form-group">
                    {/* <label htmlFor="exampleInputPassword1">Confirm </label> */}
                    <label htmlFor="exampleInputPassword1">Confirm Password:</label>
                    <div className="input-group input-group-lg">
                    <i class="fas fa-key inputicon" ></i>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" onBlur={this.matchPassword}></input>
                    </div>
                    <div class="isa_error" hidden={this.state.passwordMismatchErrorhidden}>
                                <i class="fa fa-times-circle"></i>
                                <b>Passwords do not match</b>
                            </div>
                </div>
            </div>
            <div className="button-pane">
            <div style={{marginBottom:3}} hidden={this.state.noEmailMessageHidden}>
            <i class="fa fa-times-circle"></i>
            <b style={{textAlign:"left"}}>{this.state.noEmailMessage}</b>
            </div>
                <button type="button" className="btn btn-block btn-primary" disabled={this.state.btn_disabled} onClick={this.changePassword} >Save Password</button>
            </div>
        </div>
    </form> 
        )
    }
}

export default ChangePassword;