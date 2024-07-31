import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { url } from '../helper'
import Fade from 'react-reveal/Fade';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Loader } from 'react-overlay-loader';


class RevokedOrganizationViewPanel extends Component{

    constructor(props){
        super(props)
        this.state = {
            message_title:null,
            message_body:null,
            message_type:1,
            message_box_open:false,
            loading:false,
            data:null,
            viewModalOpen:false
        }
        this.HandleActivateClick.bind(this)
        this.close_message_box_modal.bind(this)
        this.closeViewModal.bind(this)
        this.HandleViewClick.bind(this)
    }

    componentWillMount = () => {
        this.setState({
            data: this.props.data
        })
    }

    close_message_box_modal = () =>{
        if(this.state.message_type === 1){
            this.setState({
                message_box_open:false,
                loading:false
            })
            document.getElementById(""+this.state.data.branch_id).outerHTML = ""
        }
        if(this.state.message_type === 2){
            this.setState({
                message_box_open:false,
                loading:false
            })
        }
    }
    HandleViewClick = () => {
        //("viewer must open" )
        this.setState({
            viewModalOpen: true,

        })
    }
    closeViewModal = () => {
        this.setState({
            viewModalOpen: false
        })
    }
    HandleActivateClick = () =>{
        this.setState({loading:true})
        const cookies = new Cookies();
        var http = new XMLHttpRequest();
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        http.open('PUT', url+'/api/branch/revoked?user_id='+user_id+'&branch_id='+this.state.data.branch_id, true);
        http.setRequestHeader("Authorization", "Token "+token);
        http.send()
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                //(http.responseText)
                if(json.status === 200){
                    dashboar_ref.setState({
                        message_type:1,
                        message_title:"Branch Activated",
                        message_body:""+dashboar_ref.state.data.branch_name+" has been activated",
                        message_box_open:true
                    })
                }
                else{
                    dashboar_ref.setState({
                        message_type:2,
                        message_title:"Branch Not Activated",
                        message_body:""+dashboar_ref.state.data.branch_name+" could not be activated",
                        message_box_open:true
                    })
                }
            }
            http.onerror = function(){
                dashboar_ref.setState({
                    message_type:2,
                    message_title:"Branch Not Activated",
                    message_body:""+dashboar_ref.state.data.branch_name+" could not be activated",
                    message_box_open:true
                })
            }
            http.ontimeout = function(){
                dashboar_ref.setState({
                    message_type:2,
                    message_title:"Branch Not Activated",
                    message_body:""+dashboar_ref.state.data.branch_name+" could not be activated",
                    message_box_open:true
                })
            }
        }
    }

    
    render(){

        return(
            
            <div class="col-md-4" id={""+this.state.data.branch_id}>
                    <Loader loading={this.state.loading} fullPage={true} />
                    <Modal isOpen={this.state.message_box_open}>
                    <ModalHeader>{this.state.message_title}</ModalHeader>
                    <ModalBody>{this.state.message_body}</ModalBody>
                    <ModalFooter><Button color="primary" onClick={this.close_message_box_modal}>Close</Button></ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.viewModalOpen}>
                                <ModalHeader>Branch Details</ModalHeader>
                                <ModalBody>

                                    <div className="row" >
                                        <div className="col-md-6">
                                            <h5>Branch Name:</h5><b style={{ fontSize: "200" }}>{this.state.data.branch_name}</b>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Branch Address:</h5><b>{this.state.data.branch_address}</b>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: 10 }}>
                                        <div className="col-md-6">
                                            <h5>Longitute:</h5><b style={{ fontSize: "200" }}>{this.state.data.branch_latitude}</b>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Latitude:</h5><b>{this.state.data.branch_longitude}</b>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: 10 }}>
                                        <div className="col-md-6">
                                            <h5>Branch API Server IP:</h5><b>{this.state.data.branch_api_server_ip}</b>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Branch Photo Upload IP:</h5><b>{this.state.data.branch_photo_upload_ip}</b>
                                        </div>
                                    </div>
                                    <div className="row" style={{ marginTop: 10 }}>
                                        <div className="col-md-6">
                                            <h5>Branch Photo Upload User:</h5><b>{this.state.data.branch_photo_upload_user}</b>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Branch Photo Upload Password:</h5><b>{this.state.data.branch_photo_upload_password}</b>
                                        </div>
                                    </div>
                                    <div className="row" style={{ marginTop: 10 }}>
                                        <div className="col-md-6">
                                            <h5>Branch Upload Directory:</h5><b>{this.state.data.branch_photo_upload_directory}</b>
                                        </div>
                                        <div className="col-md-6">
                                            {/* <h4>Branch Photo Upload Password:</h4><b>{this.props.data.branch_photo_upload_password}</b> */}
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.closeViewModal}>Close</Button>
                                </ModalFooter>
                            </Modal>
                            <Fade left>
                        <div>
            <div class="panel-layout">
                <div class="panel-box">

                    <div class="panel-content bg-twitter">
                        <h3>{this.state.data.branch_name}</h3>
                    </div>
                    <div class="panel-content pad15A bg-white">
                        <div class="center-vertical">

                            <ul class="center-content list-group list-group-separator row mrg0A">
                                <li class="col-md-6">
                                            <a id={this.props.data.branch_id}>
                                                        <i class="glyph-icon opacity-60"></i>
                                                        <a > <h4 onClick={this.HandleViewClick} class="font-back fas fa-eye branch-opt-btn">View</h4></a>
                                                    </a>
                                    </li>
                                <li class="col-md-6">
                                    <a id={this.state.data.branch_id}>
                                        <i class="glyph-icon opacity-60"></i>
                                        <a > <h4 onClick={this.HandleActivateClick} class="fas fa-toggle-on branch-opt-btn">Activate</h4></a>
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>

                </div>
       </div>
       </div>
           </Fade>
       </div>
       
   )
       

    }
}

export default RevokedOrganizationViewPanel;