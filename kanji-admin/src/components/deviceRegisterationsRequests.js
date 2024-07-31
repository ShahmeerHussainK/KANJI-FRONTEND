import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from './dashboardSubComponents/header'
import SideBar from './dashboardSubComponents/sideBarNav'
import { url,logout } from './helper'
import { Loader } from 'react-overlay-loader';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DevicePanel from './deviceRegisterationSubComponents/devicePanel'

class DeviceRegisterationRequests extends Component{

    constructor(props){
        super(props)
        this.state = {
            loading:false,
            devices :null,
            message_title:null,
            message_body:null,
            message_type:1,
            message_box_open:false,
            section:0
        }
        this.close_message_box.bind(this)
    }

    componentWillMount = () =>{
        var cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        if (loginStatus === undefined) {
            window.location = '/login'
        }
        var global_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        var http = new XMLHttpRequest();
        console.log(url+'/api/questions?user_id='+user_id)
        http.open("GET", url+'/api/device/register/request?user_id='+user_id, true)
        http.setRequestHeader("Authorization", "Token " + token);
        http.send()
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                console.log(http.responseText)
                var json = JSON.parse(http.responseText)
                if(json.status === 200){

                    if(json.device_pending_requests.length === 0){
                        global_ref.setState({
                            section:-1
                        })

                    }else{
                        global_ref.setState({
                            devices:json.device_pending_requests,
                            section:1
                        })
                    }

                    console.log(global_ref.state.devices)
                }
                else{
                    global_ref.setState({
                        message_title:"Server Error",
                        message_body:"An error occured while fetching records from server",
                        message_type:1,
                        message_box_open:true
                    })
                }
            }
            if(http.readyState === 4 && http.status === 401){
                logout()
            }
        }
    }

    close_message_box = () =>{
        if(this.state.message_type === 1){
            this.setState({
                message_box_open:false,
                loading:false, 
            })
        }
        if(this.state.message_type === 2){
            this.setState({
                message_box_open:false,
                loading:false
            })
        }
    }

    startStopLoader = () =>{
        this.setState({
            loading:!this.state.loading
        })
    }
    render(){
        if(this.state.section === 0){
            return(
                <div>
                    <Loader loading={true} fullPage={true} />
                </div>
            )
        }
        if(this.state.section === 1){
            return(
                <div>
                    <Loader loading={this.state.loading} fullPage={true} />
                    <Modal isOpen={this.state.message_box_open}>
                        <ModalHeader>{this.state.message_title}</ModalHeader>
                        <ModalBody>{this.state.message_body}</ModalBody>
                        <ModalFooter ><Button color="primary" onClick={this.close_message_box}>Close</Button></ModalFooter>
                        </Modal>
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
                <div className="row" >
                    <div className="col-md-12"><h3 style={{textAlign:"center"}}>Device Registeration</h3></div>
                </div>
                
                    <div className="row" style={{marginTop:30}}>
                        {this.state.devices.map((device,i)=><DevicePanel key={i} data={device} startStopLoader={this.startStopLoader.bind(this)}/>)}
                    </div>
                
            </div>
            </div>
                </div>
            )
        }
        if(this.state.section === -1){
            
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
                        <h3 style={{textAlign:"center"}}>No Devices To Be Regsitered</h3>
                </div>
                </div>
                    </div>
                )
            
        }
    }

}

export default DeviceRegisterationRequests;