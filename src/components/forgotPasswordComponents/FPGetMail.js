import React, { Component } from 'react';
import { Loader } from 'react-overlay-loader';
import { url } from '../helper'
// import '../../CSS/assets-minified/all-demo.css'

class FPGetMail extends Component{


     constructor(props){
         super(props)
            this.state={
                "btn-disabled":true,
                emailErrorMsgHidden:true,
                loading:false,
                noEmailMessage:"",
                noEmailMessageHidden:true,
                email:""
            }
            this.validateEmail = this.validateEmail.bind(this)
            this.handleCodeRequest = this.handleCodeRequest.bind(this)
     }
    

    validateEmail= () => {
        
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var email = document.getElementById("inputEmail").value
        var isvalid = re.test(email);
        if(isvalid){
            this.setState({
                "btn-disabled":false,
                "emailErrorMsgHidden":true,
                noEmailMessageHidden:true
            })
        }
        else{
            this.setState({
                "btn-disabled":true,
                "emailErrorMsgHidden":false
            })
        }
      }

      handleCodeRequest = () =>{
        this.setState({
            loading:true
        })
        var email = document.getElementById("inputEmail").value
        var http = new XMLHttpRequest()
        var dashboar_ref = this
        http.open('POST', url+'/api/user/forgot_password', true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send("&email="+email)
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    dashboar_ref.setState({
                        loading:false,
                        noEmailMessageHidden:true,
                    })
                    dashboar_ref.props.switch(json.username,email)
                }
                else{
                    dashboar_ref.setState({
                        noEmailMessageHidden:false,
                        noEmailMessage:"Sorry we could not recogize email address you entered",
                        loading:false
                    })
                }
            }
            else{
                dashboar_ref.setState({
                    noEmailMessageHidden:false,
                    noEmailMessage:"Sorry we could not recogize email address you entered",
                    loading:false
                })
            }
        }
        http.onerror = function(){
            dashboar_ref.setState({
                noEmailMessageHidden:false,
                noEmailMessage:"Sorry we could not send you code",
                loading:false
            })
        }
      }
      handleEnterPress = (e) =>{
          e.preventDefault()
          if(e.key === 'Enter'){
              this.handleCodeRequest()
          }
      }

    render(){
       return(
        
        <div id="login-validation" className="col-md-4 center-margin">
        <Loader loading={this.state.loading} fullPage={true} />
        <h3 className="text-center pad35B font-gray text-transform-upr font-size-23">Kanji Admin</h3>
        <div id="login-form" className="content-box modal-content">
            <h3 style={{marginTop:10}} className="text-center pad5B font-gray text-transform-upr font-size-15">Forgot Password</h3>
            <div className="content-box-wrapper pad20A">

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address:</label>
                    <div className="input-group input-group-lg">
                    <i className="fa fa-envelope inputicon"></i>
                        <input type="email" className="form-control" id="inputEmail"  onChange={this.validateEmail}   placeholder="Enter email" ></input>   
                       
                    </div>

                    <div className="isa_error" hidden={this.state.emailErrorMsgHidden}>
                    <i class="fa fa-times-circle"></i>
                                <b>Email is not valid</b>
                            </div>
                           
                </div>
            </div>
            <div className="button-pane">
            <div style={{marginBottom:3}} hidden={this.state.noEmailMessageHidden}>
            <i class="fa fa-times-circle"></i>
            <b style={{textAlign:"left"}}>{this.state.noEmailMessage}</b>
            </div>
                <button type="button" className="btn btn-block btn-primary" disabled={this.state["btn-disabled"]} id="getCode" onClick={this.handleCodeRequest}>Request Code</button>
            </div>
        </div>
    </div>
       )
    }
}

export default FPGetMail;