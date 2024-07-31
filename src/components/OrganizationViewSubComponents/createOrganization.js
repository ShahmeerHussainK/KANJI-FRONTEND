import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from '../dashboardSubComponents/header'
import SideBar from '../dashboardSubComponents/sideBarNav'
import { Loader } from 'react-overlay-loader';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { url,logout } from '../helper'
const preview =   require('../../CSS/images/preview.png')

class CreateOrganization extends Component {

    constructor(props){
        super(props)
        this.state ={
            org_name:"",
            org_days:7,
            btn_disabled:true,
            loading:false,
            message_title:"",
            message_body:"",
            message_type:1,
            message_box_open:false,
            FileErrorHidden:true
        }
        this.handleNameInputChange = this.handleNameInputChange.bind(this)
        this.handleDaysInputChange.bind(this)
        this.create_organization = this.create_organization.bind(this)
        this.OpenFileBrowser = this.OpenFileBrowser.bind(this)
        this.changePreviewImg = this.changePreviewImg.bind(this)
        this.hasExtension = this.hasExtension.bind(this)
    }

    componentWillMount = () => {
        var cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        if (loginStatus === undefined) {
            window.location = '/login'
        }
        var branch_admin = cookies.get('branch-admin')
        var organization_admin = cookies.get('organization-admin')

        if (branch_admin === 'true' || organization_admin === 'true' || cookies.get('branch-user') === "true") {
            window.location= '/dashboard'
        }

    }

    create_organization = (event) =>{
        event.preventDefault()
        // var form = document.getElementById('orgData');
        // // //(form)
        // var formData = new FormData(form);
        // //(formData)
        this.setState({
            loading:true
        })
        var cookies = new Cookies();
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        var global_ref = this
        var fileInput = document.getElementById('logo');
        var nameInput = document.getElementById('org_name').value
        var file = fileInput.files[0];
        var formData = new FormData();
        formData.append('org_logo', file);
        formData.append('org_name', nameInput);
        formData.append('days',this.state.org_days)
        var http = new XMLHttpRequest();
        http.open('POST', url+'/api/organisation?user_id='+user_id, true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.send(formData);
        http.onreadystatechange = function (){
            if (http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    global_ref.setState({
                        loading:false,
                        message_title:"Success",
                        message_body:"Organization has been created successfully",
                        message_type:1,
                        message_box_open:true
                    })
                }
                else{
                    global_ref.setState({
                        loading:false,
                        message_title:"Error",
                        message_body:"Organization has could not be created",
                        message_type:2,
                        message_box_open:true
                    })
                }
        }
        if(http.readyState === 4 && http.status === 401){
            logout()
        }


    }
    http.ontimeout = function(){
        global_ref.setState({
            loading:false,
            message_title:"Timeout",
            message_body:"Request has timed out. Please Try again",
            message_type:2,
            message_box_open:true
        })
    }
    http.onerror = function(){
        global_ref.setState({
            loading:false,
            message_title:"Error",
            message_body:"Server encountered an error. Please try again",
            message_type:2,
            message_box_open:true
        })
    }

}

    handleNameInputChange = () =>{
        
        var input = document.getElementById('org_name').value
        this.setState({
            org_name:input
        },function(){
            if(this.state.org_name !== ''){
                this.setState({btn_disabled:false})
            }
        })
    }

    handleDaysInputChange = () =>{
        var input = document.getElementById("org_days").value
        this.setState({
            org_days:input
        })
    }

    close_message_box_modal = () =>{
        if(this.state.message_type === 1){
            this.setState({
                message_box_open:false
            })
            window.location = "/view-organization"
        }
        if(this.state.message_type === 2){
            this.setState({
                message_box_open:false
            })
        }
    }

    hasExtension = (inputID, exts) => {
        var fileName = document.getElementById(inputID).value;
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }

    OpenFileBrowser = () => {
        var elem = document.getElementById('logo');
        if(elem && document.createEvent) {
           var evt = document.createEvent("MouseEvents");
           evt.initEvent("click", true, false);
           elem.dispatchEvent(evt);
        }
    
     }

     changePreviewImg = () =>{
        //('selected')
        var input = document.getElementById('logo')
        if(!this.hasExtension('logo',['.jpg','.png','.bmp','.JPG','.PNG','.BMP'])){
            this.setState({
                FileErrorHidden:false,
                message_body:"This file format is not supported. Only PNG, JPG and BMP files are allowed"
            })
            setTimeout(function(){
                this.setState({
                    FileErrorHidden:true,
                })
            }.bind(this),2000)
            return
        }
    
        if (input.files && input.files[0]) {
            //("not here")
            var reader = new FileReader();
    
            reader.onload = function (e) {
                //(e.target.result)
                document.getElementById('logoThumbnail').setAttribute('src',e.target.result)
            };
    
            reader.readAsDataURL(input.files[0]);
            this.setState({
                FileErrorHidden:true,
            })
        }
    }



    render() {
        return (
            <div>
                <Loader loading={this.state.loading} fullPage={true} />
                <Modal isOpen={this.state.message_box_open}>
                    <ModalHeader>{this.state.message_title}</ModalHeader>
                    <ModalBody>{this.state.message_body}</ModalBody>
                    <ModalFooter><Button color="primary" onClick={this.close_message_box_modal}>Close</Button></ModalFooter>
                </Modal>
                <div className="clearfix" id="page-header">
                    <div>
                        <Header />
                    </div>
                </div>

                <div >
                    <SideBar isActive="org"/>
                </div>

                <div id="page-content-wrapper" className="rm-transition">
                    <div id="page-content">

                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4"><h2 style={{marginLeft:100}}>Create Organization</h2></div>
                            <div className="col-md-4"></div>
                        </div>

                        <div className="row" style={{marginTop:30}}>
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <form id="orgData">
                                    <div class="form-group">
                                        <label ><h3>Organization Name</h3></label>
                                        <input type="text" class="form-control" id="org_name" value={this.state.org_name} placeholder="Enter organization name" onChange={this.handleNameInputChange} maxLength="40"></input>
                                    </div>
                                    <div class="form-group">
                                        <label><h3>Days To Delete Photos After</h3></label>
                                        <input type="number" class="form-control" id="org_days" value={this.state.org_days} placeholder="Specify number of days after which photos will be delete from the device" onChange={this.handleDaysInputChange}></input>
                                    </div>
                                    <div class="form-group ">
                                        <div class="thumbnail">
                                        {/* <img id='logoThumbnail' src="https://via.placeholder.com/200x200.png?text=Preview" alt=""></img> */}
                                        <img id='logoThumbnail' src={preview} alt=""></img>
                                        
                                        <h3 onClick={this.OpenFileBrowser}>Choose Logo</h3>
                                        <input type="file" id="logo" hidden={true} onChange={this.changePreviewImg}/>
                                    </div>
                                    <p class="isa_error" hidden={this.state.FileErrorHidden}><i class="fa fa-times-circle"></i>{this.state.message_body}</p>
                                    </div>

                                    <button type="submit" className="btn btn-block btn-primary" onClick={this.create_organization} max-width='100%' disabled={this.state.btn_disabled}>Create Organization</button>
                                </form>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateOrganization;