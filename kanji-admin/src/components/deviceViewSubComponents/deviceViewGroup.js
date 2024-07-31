import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { url,media_url } from '../helper'
import DeviceViewPanel from './deviceViewPanel'

class DeviceViewGroup extends Component{

    constructor(props){
        super(props)
        this.state = {
            isAdmin:'',
            isOrgAdmin:'',
            isBranchAdmin:'',
        }
    }

    componentWillMount = () =>{
        var cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        if (loginStatus === undefined) {
            window.location = '/login'
        }
    }





    render(){
       return(
        <div style={{marginTop:30}}>
        <div className="row">
            <div className="col-md-6"><h1>{this.props.data.branch_name}</h1></div>
            <div className="col-md-6">
            </div>
        </div>
        <div className="row">
       
        {this.props.data.registered_devices.map((device,i)=> <DeviceViewPanel key={i} data={device}  startStopLoader={this.props.startStopLoader}/>)}
        </div>
    </div>
       )
    }

}

export default DeviceViewGroup