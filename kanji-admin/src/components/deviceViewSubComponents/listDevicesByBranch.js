import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from '../dashboardSubComponents/header'
import SideBar from '../dashboardSubComponents/sideBarNav'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Loader } from 'react-overlay-loader';
import { url,media_url } from '../helper'
import DeviceViewPanel from './deviceViewPanel'


class ListBranchDevices extends Component{

    constructor(props){
        super(props)
        this.state = {
            loading:true,
            section:0,
            devices:null,
            branch_name:null,
            branch_id:null,
            revoke_count:0
        }
        this.startStopLoader.bind(this)
    }

    componentWillMount = () =>{
        var url_local = window.location.href
        url_local = new URL(url_local);
        var id = url_local.searchParams.get("id");

        var cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        if (loginStatus === undefined) {
            window.location = '/login'
        }
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        var global_ref = this
        var http = new XMLHttpRequest()
        http.open("GET",url+"/api/device/registered?user_id="+user_id+"&branch_id="+id)
        http.setRequestHeader("Authorization","Token "+token)
        http.send()
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                console.log(http.responseText)
                if(json.status === 200){
                    if(json.registered_devices.length !== 0){
                        global_ref.setState({
                            loading:false,
                            section:1,
                            devices:json.registered_devices,
                            branch_name:json.branch_name,
                            branch_id:id,
                            revoke_count:json.revoke_count
                        })
                    }
                    else{
                        global_ref.setState({
                            loading:false,
                            section:2,
                            devices:json.registered_devices,
                            branch_name:json.branch_name,
                            branch_id:id,
                            revoke_count:json.revoke_count
                        })
                    }
                }
                else{
                    var count = 0
                    if(json.revoke_count !== undefined){
                        count = json.revoke_count
                    }
                    global_ref.setState({
                        loading:false,
                        section:2,
                        branch_id:id,
                        branch_name:json.branch_name,
                        revoke_count: count
                    })
                }
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
                        <div id="page-content">
                        <Loader loading={this.state.loading} fullPage={true} />
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 style={{textAlign:"center"}}>{this.state.branch_name+"'s Devices"}</h1>
                                    {/* <a href={"/list-revoked-devices/?id="+this.state.branch_id+"&tag="+this.state.branch_name} className="revoked-devices"><b className="revoked-devices-text">Manage Revoked Devices</b></a> */}
                                    <a href={"/list-revoked-devices/?id="+this.state.branch_id+"&tag="+this.state.branch_name} class="notification" hidden={this.state.revoke_count === 0}>
                                    <span>Revoked Devices</span>
                                    <span class="badge">{this.state.revoke_count}</span>
                                    </a>
                                </div>
                            </div>
                            <div >
                            {this.state.devices.map((device,i)=> <DeviceViewPanel key={i} data={device} startStopLoader={this.startStopLoader}/>)}
                            </div>
                        </div>
                        </div>
                </div>
        )
    }
    if(this.state.section === 2){
        console.log(this.state.revoke_count)
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
                <h3 style={{textAlign:"center"}}>No active devices to show</h3>
                <a href={"/list-revoked-devices/?id="+this.state.branch_id+"&tag="+this.state.branch_name} class="notification" hidden={this.state.revoke_count === 0}>
                                    <span>Revoked Devices</span>
                                    <span class="badge">{this.state.revoke_count}</span>
                                    </a>
            </div>
        </div>
        </div>
        </div>
            </div>
        )
    }
}
}

export default ListBranchDevices;