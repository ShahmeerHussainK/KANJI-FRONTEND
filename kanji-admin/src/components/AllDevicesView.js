import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from './dashboardSubComponents/header'
import SideBar from './dashboardSubComponents/sideBarNav'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Loader } from 'react-overlay-loader';
import { url,logout } from './helper'
import DeviceViewGroup from './deviceViewSubComponents/deviceViewGroup'


class ViewAllDevices extends Component{

    constructor(props){
        super(props)
        this.state = {
            loading:true,
            section:0,
            devices:null
        }
        this.startStopLoader.bind(this)
    }

    componentWillMount = () =>{
        var cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        if (loginStatus === undefined) {
            window.location = '/login'
        }
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        var global_ref = this
        var http = new XMLHttpRequest()
        console.log(url+"/api/device/registered?user_id="+user_id)
        http.open("GET",url+"/api/device/registered?user_id="+user_id)
        http.setRequestHeader("Authorization","Token "+token)
        http.send()
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                console.log(http.responseText)
                if(json.status === 200){
                    var devices = []
                    json.branch.forEach(element =>{
                        
                        if(element.registered_devices !== undefined){
                            devices.push(element)
                        }
                    })
                    global_ref.setState({
                        loading:false,
                        section:1,
                        devices:devices
                    })
                }
                else{
                    global_ref.setState({
                        loading:false,
                        section:2
                    })
                }
            }
            if(http.readyState === 4 && http.status === 401){
                logout()
            }
        }
        http.onerror = function(){
            global_ref.setState({
                loading:false,
                section:2
            })
        }
        http.ontimeout = function(){
            global_ref.setState({
                loading:false,
                section:2
            })
        }
    }

    startStopLoader = () =>{
        this.setState({
            loading:this.state.loading
        })
    }


    render(){
        if(this.state.section === 0){
            return(
                <div>
                    <Loader loading={this.state.loading} fullPage={true} />
                </div>
            )
    }
    if(this.state.section === 1){
        return(
            <div>
                        <div className="clearfix" id="page-header">
                            <div>
                                <Header />
                            </div>
                        </div>
        
                        <div >
                            <SideBar />
                        </div>
                        <div id="page-content-wrapper" className="rm-transition">
                        <div id="page-content" >
                        <Loader loading={this.state.loading} fullPage={true} />
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 style={{textAlign:"center"}}>All Devices</h1>
                                </div>
                            </div>
                            <div >
                            {this.state.devices.map((device,i)=> <DeviceViewGroup key={i} data={device} startStopLoader={this.startStopLoader}/>)}
                            </div>
                        </div>
                        </div>
                </div>
        )
    }
    if(this.state.section === 2){
        return(
            <div>
                <div className="clearfix" id="page-header">
            <div>
                <Header />
            </div>
        </div>

        <div >
            <SideBar />
        </div>
        <div id="page-content-wrapper" className="rm-transition">
                        <div id="page-content">
            <div className="row">
            <div className="col-md-12">
                <h3 style={{textAlign:"center"}}>No devices to show</h3>
            </div>
        </div>
            </div>
            </div>
            </div>
        )
    }
}
}

export default ViewAllDevices;