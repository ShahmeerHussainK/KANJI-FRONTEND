import React, { Component } from 'react';
import { Loader } from 'react-overlay-loader';
import { url} from '../helper'
import '../../CSS/assets-minified/all-demo.css'

class FPGetCode extends Component{

    constructor(props){
        super(props)
        this.state={
            "btn_code_disabled":true,
            loading:false,
            noEmailMessage:null,
            noEmailMessageHidden:true,
            resendMessageHidden:true,
        }
        this.validateCodeFormat = this.validateCodeFormat.bind(this)
        this.HandleCodeResetClick = this.HandleCodeResetClick.bind(this)
        this.HandleCodeResendRequest = this.HandleCodeResendRequest.bind(this)
    }


    validateCodeFormat = () =>{
        var code=document.getElementById("code")
        code = code.value
        code = parseInt(code)
        if(code>1000){
            this.setState({
                "btn_code_disabled":false
            })
        }
        else{
            this.setState({
                "btn_code_disabled":true
            })
        }
    }

    HandleCodeResetClick = () =>{
        this.setState({
            loading:true
        })
        var code = document.getElementById("code").value

        var http = new XMLHttpRequest()
        var dashboar_ref = this
        http.open('PUT', url+'/api/user/forgot_password', true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send("&username="+this.props.username+"&token="+code)
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){

                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    dashboar_ref.setState({
                        loading:false,
                        noEmailMessageHidden:true,
                        resendMessageHidden:true,
                    })
                    dashboar_ref.props.switch()
                }
                else{
                    dashboar_ref.setState({
                        noEmailMessageHidden:false,
                        noEmailMessage:"Sorry we could not validate code you entered",
                        resendMessageHidden:true,
                        loading:false
                    })
                }
            }
            else{
                dashboar_ref.setState({
                    noEmailMessageHidden:false,
                    noEmailMessage:"Sorry we could not validate code you entered",
                    resendMessageHidden:true,
                    loading:false
                })
            }
        }
        http.onerror = function(){
            dashboar_ref.setState({
                noEmailMessageHidden:false,
                noEmailMessage:"Sorry we could not validate code you entered",
                loading:false
            })
        }
    }

    HandleCodeResendRequest = (e) =>{
        e.preventDefault()
 
        this.setState({
            loading:true
        })
        var http = new XMLHttpRequest()
        var dashboar_ref = this
        http.open('POST', url+'/api/user/forgot_password', true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send("&email="+this.props.email)
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    dashboar_ref.setState({
                        loading:false,
                        noEmailMessageHidden:true,
                        resendMessageHidden:false
                    })
                    
                }
                else{
                    dashboar_ref.setState({
                        noEmailMessageHidden:false,
                        noEmailMessage:"Sorry we could not resend code",
                        loading:false
                    })
                }
            }
            else{
                dashboar_ref.setState({
                    noEmailMessageHidden:false,
                    noEmailMessage:"Sorry we could not resend code",
                    loading:false
                })
            }
        }
        http.onerror = function(){
            dashboar_ref.setState({
                noEmailMessageHidden:false,
                noEmailMessage:"Sorry we could not resend code",
                loading:false
            })
        }
    }

    render(){
       return(
        <div id="login-validation" className="col-md-4 center-margin">
        <Loader loading={this.state.loading} fullPage={true} />
        <h3 className="text-center pad25B font-gray text-transform-upr font-size-23">Kanji Admin</h3>
        <div id="login-form" className="content-box modal-content">
            <div className="content-box-wrapper pad20A">
                    <h5 style={{textAlign:"center"}}>Please enter code sent to you via email</h5>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Password Reset Code</label>
                    <div className="input-group input-group-lg">
                    <i className="fa fa-sync inputicon" onClick={this.HandleCodeResendRequest} title="Resend Code"></i>
                        <input type="text" className="form-control" id="code"  placeholder="Enter Code" onChange={this.validateCodeFormat}></input>
                    </div>
                    {/* <a href="" onClick={this.HandleCodeResendRequest}>Resend Code</a> */}
                </div>
            </div>
            <div className="button-pane">
            <div style={{marginBottom:3}} hidden={this.state.noEmailMessageHidden}>
            <i class="fa fa-times-circle"></i>
            <b style={{textAlign:"left"}}>{this.state.noEmailMessage}</b>
            </div>
            {/* <div style={{marginBottom:3}} hidden={this.state.resendMessageHidden}>
            <i class="fa fa-check" ></i>
            <b style={{textAlign:"left"}}>Password reset code has been resent to your email address</b>
            </div> */}
            
                <button type="button" className="btn btn-block btn-primary" disabled={this.state.btn_code_disabled} onClick={this.HandleCodeResetClick}>Reset Password</button>
            </div>
        </div>
    </div>
       )
    }
}

export default FPGetCode;