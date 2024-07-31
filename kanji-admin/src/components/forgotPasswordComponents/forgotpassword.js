import React, { Component } from 'react';
// import '../../CSS/assets-minified/all-demo.css'
import FPGetMail from './FPGetMail'
import FPGetCode from './FPGetCode'
import ChangePassword from './changePassword'

class ForgotPassword extends Component{

    constructor(props){
        super(props)
        this.state={
            "RenderedComponent":0,
            username:null,
            email:null
        }
        this.showGetCodeScreen = this.showGetCodeScreen.bind(this)
        this.showSetNewPasswordScreen = this.showSetNewPasswordScreen.bind(this)
    }
    
    showGetCodeScreen = (name, email) =>{
        console.log("got name "+name+" setting it")
        this.setState({
            "RenderedComponent":1,
            username:name,
            email:email
        })
        console.log("name on state is "+name)
    }
    showSetNewPasswordScreen = () =>{
        this.setState({
            "RenderedComponent":2
        })
    }


    render(){
        console.log("index is")
        console.log(this.state.RenderedComponent)
       if(this.state.RenderedComponent === 0){
        return(
            <div className="center-vertical">
                <div className="center-content">
                    <FPGetMail switch={this.showGetCodeScreen} />
                </div>
            </div>
        )
       }
       if(this.state.RenderedComponent === 1){
        return(
            <div className="center-vertical">
                <div className="center-content">
                    <FPGetCode switch={this.showSetNewPasswordScreen} username={this.state.username} email={this.state.email}/>
                </div>
            </div>
        )   
       }
       if(this.state.RenderedComponent === 2){
        return(
            <div className="center-vertical">
                <div className="center-content">
                    <ChangePassword username={this.state.username}/>
                </div>
            </div>
        )   
       }
      
    }
}

export default ForgotPassword;