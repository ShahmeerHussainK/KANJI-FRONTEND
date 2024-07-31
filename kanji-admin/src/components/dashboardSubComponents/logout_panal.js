import React, { Component } from 'react';
// import ProfileImage from '../../assets/dummy-images/slav.jpg'
import ProfileImage from '../../CSS/dummy-images/people/logo.png'


class LogoutPanel extends Component{
    render(){
        return(
            <div className="box-sm the-thing" >
                    <div className="login-box clearfix" >
                        <div className="user-img">
                            <a href="" title="" className="change-img">Change photo</a>
                            <img src={ProfileImage} alt=""></img>
                        </div>
                        <div className="user-info">
                        <span>
                            {this.props.firstname}
                        </span>
                            <a href="" title="">Edit profile</a>
                            <a href="" title="">Reset Your Password</a>
                        </div>
                    </div>
                    
                    <div className="pad5A button-pane button-pane-alt text-center">
                        <a href="/dashboard" className="btn display-block font-normal btn-danger" onClick={this.logout}>
                            <i className="glyph-icon icon-power-off"></i>
                            Logout
                        </a>
                    </div>
                </div>
        )
    }
}

export default LogoutPanel;