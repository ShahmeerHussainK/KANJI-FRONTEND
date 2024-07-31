import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Loader } from 'react-overlay-loader';
import Fade from 'react-reveal/Fade';
import { url } from '../helper'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class RevokedDeviceViewPanel extends Component{

    constructor(props){
        super(props)
        this.state = {
            devices :null,
            message_title:null,
            message_body:null,
            message_type:1,
            message_box_open:false,
            section:0
        }
        this.close_message_box.bind(this)
        this.HandleActivateClick.bind(this)

    }

    close_message_box = () =>{
        if(this.state.message_type === 1){
            this.setState({
                message_box_open:false
            })
            this.props.startStopLoader()

           
         
        }
        if(this.state.message_type === 2){
            this.setState({
                message_box_open:false
            })
            this.props.startStopLoader()
            document.getElementById(""+this.props.data.imei).outerHTML = ""
        }
    }


    HandleActivateClick = () =>{
        this.props.startStopLoader()
        var cookies = new Cookies()
        var http = new XMLHttpRequest();
        var global_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        http.open('PUT', url+'/api/device/revoked?user_id='+user_id, true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        var arg_list = "&device_id="+this.props.data.device_id
        http.send(arg_list)
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    global_ref.setState({
                        message_title:"Device Activated",
                        message_body:"Device has been Activated",
                        message_type:2,
                        message_box_open:true
                    })
                    // document.getElementById(""+global_ref.props.data.imei).innerHTML = ""
                }
                else{
                    global_ref.setState({
                        message_title:"Device Not Activated",
                        message_body:"Device could not be activated",
                        message_type:1,
                        message_box_open:true
                    })
                }
            }
        }
        http.onerror = function (){
            global_ref.setState({
                message_title:"Device Not Activated",
                message_body:"A server error occured. Please try again",
                message_type:1,
                message_box_open:true
            })
        }
        http.ontimeout = function (){
            global_ref.setState({
                message_title:"Device Not Activated",
                message_body:"Request timed out. Please try again",
                message_type:1,
                message_box_open:true
            })
        }
    }


    render(){
        return(
            <Fade left>
             <div>
            <div class="col-md-4" style={{marginTop:20}} id={this.props.data.imei}>
                <Loader loading={this.state.loading} fullPage={true} />
                <Modal isOpen={this.state.message_box_open}>
                    <ModalHeader>{this.state.message_title}</ModalHeader>
                    <ModalBody>{this.state.message_body}</ModalBody>
                    <ModalFooter ><Button color="primary" onClick={this.close_message_box}>Close</Button></ModalFooter>
                </Modal>
            <div class="icon-box icon-box-offset-medium bg-black  icon-boxed">
                <i class="icon-large glyph-icon bg-red icon-tablet"></i>
                <h3 style={{color:"white", textAlign:"left", marginLeft:50}} hidden={this.props.data.branch_name === undefined ? true : false}>Branch Name:<span style={{color:"white", marginLeft:10}}>{this.props.data.branch_name}</span></h3>
                <h3 style={{color:"white", textAlign:"left", marginLeft:50}}>Make:<span style={{color:"white", marginLeft:10}}>{this.props.data.make}</span></h3>
                <h3 style={{color:"white", textAlign:"left", marginLeft:50}}>Model:<span style={{color:"white", marginLeft:10}}>{this.props.data.model}</span></h3>
                <h3 style={{color:"white", textAlign:"left", marginLeft:50}}>IMEI:<span style={{color:"white", marginLeft:10}}>{this.props.data.imei}</span></h3>
                <div style={{marginTop:10}}>
                <button class="btn btn-success" id={"btnRevoke"+this.props.data.device_id} style={{  width:250}} onClick={this.HandleActivateClick}>Activate</button>
                </div>

            </div>
            
        </div>
        </div>
           </Fade>
        )
    }
}

export default RevokedDeviceViewPanel