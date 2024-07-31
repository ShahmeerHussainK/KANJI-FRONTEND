import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { url,media_url } from '../helper'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Loader } from 'react-overlay-loader';
import Fade from 'react-reveal/Fade';

class RevokedOrganizationViewPanel extends Component{

    constructor(props){
        super(props)
        this.state = {
            message_title:null,
            message_body:null,
            message_type:1,
            message_box_open:false,
            loading:false
        }
        this.HandleActivateClick.bind(this)
        this.close_message_box_modal.bind(this)
    }

    close_message_box_modal = () =>{
        if(this.state.message_type === 1){
            this.setState({
                message_box_open:false,
                loading:false
            })
            document.getElementById(""+this.props.data.organisation_id).outerHTML = ""
        }
        if(this.state.message_type === 2){
            this.setState({
                message_box_open:false,
                loading:false
            })
        }
    }
    HandleActivateClick = () =>{
        this.setState({loading:true})
        const cookies = new Cookies();
        var http = new XMLHttpRequest();
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        //( url+'/api/organisation/revoked?user_id='+user_id+'&org_id='+this.props.data.organisation_id)
        http.open('PUT', url+'/api/organisation/revoked?user_id='+user_id+'&org_id='+this.props.data.organisation_id, true);
        http.setRequestHeader("Authorization", "Token "+token);
        http.send()
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                //(http.responseText)
                if(json.status === 200){
                    dashboar_ref.setState({
                        message_type:1,
                        message_title:"Organization Activated",
                        message_body:""+dashboar_ref.props.data.organisation_name+" has been activated",
                        message_box_open:true
                    })
                }
                else{
                    dashboar_ref.setState({
                        message_type:2,
                        message_title:"Organization Not Activated",
                        message_body:""+dashboar_ref.props.data.organisation_name+" could not be activated",
                        message_box_open:true
                    })
                }
            }
            http.onerror = function(){
                dashboar_ref.setState({
                    message_type:2,
                    message_title:"Organization Not Activated",
                    message_body:""+dashboar_ref.props.data.organisation_name+" could not be activated",
                    message_box_open:true
                })
            }
            http.ontimeout = function(){
                dashboar_ref.setState({
                    message_type:2,
                    message_title:"Organization Not Activated",
                    message_body:""+dashboar_ref.props.data.organisation_name+" could not be activated",
                    message_box_open:true
                })
            }
        }
    }

    
    render(){
        //(media_url+this.props.data.organisation_logo)
        return(
            
            <div class="col-md-6" id={""+this.props.data.organisation_id}>
                    <Loader loading={this.state.loading} fullPage={true} />
                    <Modal isOpen={this.state.message_box_open}>
                    <ModalHeader>{this.state.message_title}</ModalHeader>
                    <ModalBody>{this.state.message_body}</ModalBody>
                    <ModalFooter><Button color="primary" onClick={this.close_message_box_modal}>Close</Button></ModalFooter>
                    </Modal>
                    <Fade left>
             <div>
           <div class="panel-layout">
               <div class="panel-box col-xs-4 bg-green">
                   <div class="panel-content">
                   <img id={"logo"+this.props.data.org_id} src={media_url+this.props.data.organisation_logo} height={110} width={110} alt="" class="org_logo" ></img>
                   </div>
               </div>
               <div class="panel-box col-xs-8">

                   <div class="panel-content  bg-black">
                       <div class="sparkline-big">
                       {/* <a href={"/list-branches/?id="+this.props.data.organisation_id} className="org_title">
                       <h6 className="OrganizationName" id={"name"+this.props.data.organisation_id}>{this.props.data.organisation_name}</h6>
                       </a> */}
                       <h6 className="OrganizationName" id={"name"+this.props.data.organisation_id}>{this.props.data.organisation_name}</h6>
                       </div>
                   </div>
                   <div class="panel-content bg-white">
                       <div class="center-vertical">

                           <ul class="center-content nav nav-justified">   
                               <li>
                               <a>
                                       <i class="glyph-icon opacity-60"></i>
                                       <a > <h4 id={this.props.data.organisation_id}  onClick={this.HandleActivateClick} class="fas fa-toggle-on org_opt_btn">Activate</h4></a>
                                   </a></li>
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