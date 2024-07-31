import React, { Component } from 'react';
// import '../bratilius-theme-package/assets-minified/all-demo.css'
import Cookies from 'universal-cookie';
import LeftHeader from './left-header'
import RightHeader from './right-header'

class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            'firstname':''
        }
    }
    componentWillMount = () =>
    {
        const cookies = new Cookies();
        var fname = cookies.get('firstname')
        this.setState({
            firstname:fname
        }) 
    }
    render(){
        return(
            <div>
            <div id="header-left">
                <LeftHeader />
                
                </div>
                <div id="header-right">
                <RightHeader firstname={this.state.firstname}/>
                </div>
            </div>    
        )
    }
}

export default Header;