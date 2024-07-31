import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Loader } from 'react-overlay-loader';
import { url,media_url } from '../helper'

class TableRow extends Component{
   
    constructor(props){
        super(props)
        this.state={
            message_title:null,
            message_body:null,
            message_type:1,
            message_box_open:false,
            loading:false
        }
    }

    HandleRevokeClick = () =>{
        this.setState({loading:true})
        var cookies = new Cookies()
        var http = new XMLHttpRequest();
        var global_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        http.open('PUT', url+'/api/device/registered?user_id='+user_id, true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        var arg_list = "&device_id="+this.props.data.device_id
        http.send(arg_list)
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                console.log(http.responseText)
                if(json.status === 200){
                    global_ref.setState({
                        message_title:"Device Revoked",
                        message_body:"Device has been revoked",
                        message_type:2,
                        message_box_open:true,
                        loading:false
                    })
                    // document.getElementById(""+global_ref.props.data.imei).innerHTML = ""
                }
                else{
                    global_ref.setState({
                        message_title:"Device Not Revoked",
                        message_body:"Device could not be revoked",
                        message_type:1,
                        message_box_open:true
                    })
                }
            }
        }

    }
    close_message_box = () =>{
        if(this.state.message_type === 1){
            this.setState({
                message_box_open:false
            })
        }
        if(this.state.message_type === 2){
            document.getElementById(""+this.props.data.device_id).innerHTML = ""
            this.setState({
                message_box_open:false
            })
        }
    }
   
    render(){

        return(
                
            
                <tr id={""+this.props.data.device_id}>
                <Loader loading={this.state.loading} fullPage={true} />
                <Modal isOpen={this.state.message_box_open}>
                    <ModalHeader>{this.state.message_title}</ModalHeader>
                    <ModalBody>{this.state.message_body}</ModalBody>
                    <ModalFooter ><Button color="primary" onClick={this.close_message_box.bind(this)}>Close</Button></ModalFooter>
                </Modal>
                <td>{this.props.data.device_make}</td>
                <td>{this.props.data.device_model}</td>
                <td>{this.props.data.device_last_check_in.substr(0, this.props.data.device_last_check_in.indexOf('.'))}</td>
                <td>{this.props.data.device_last_driver}</td>
                <td>{this.props.data.device_imei_no}</td>
                {/* <td  ><a> <i id={this.props.data.id}  ><FaTabletAlt /></i></a></td> */}
                <td><button class="btn btn-xs font-back " style={{backgroundColor:'#F44336', color:'white',marginRight:5}}  onClick={this.HandleRevokeClick.bind(this)} >Revoke</button></td>
                </tr>
               
        );
    }
}

export default TableRow;