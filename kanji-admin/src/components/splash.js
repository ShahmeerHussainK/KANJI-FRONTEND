import React, { Component } from 'react';
// import '../bratilius-theme-package/assets-minified/all-demo.css'
import '../CSS/assets-minified/all-demo.css'
// import '../CSS/css/bootstrap.css'
import Cookies from 'universal-cookie';
import Dashboard from './dashbord'
import Login from './Login';


class Splash extends Component{

    constructor(props){
        super(props)
        this.state={
            isLoggedin:false
        }
    }

    componentWillMount =() => {     
        const cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        console.log(loginStatus)
        if (loginStatus === 'true'){
            this.setState({
                isLoggedin:true
            })
        }
    }
    
    render = () => {
        if (this.state.isLoggedin === true){
            return(
                <div >
                    <Dashboard />
                </div>
            )
        }
        else{
            return(
                <div id="loading">
                    <Login />
                </div>
            )
        }
    }
}

export default Splash