import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from '../dashboardSubComponents/header'
import SideBar from '../dashboardSubComponents/sideBarNav'
import { url,logout } from '../helper'
import { Loader } from 'react-overlay-loader';
import SelectList from '../createQuestionSubComponents/dropdownSelect'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CreateBranch extends Component{
    constructor(props){
        super(props)

        this.state={
            section:2,
            loading:true,
            btn_disabled:true,
            nameErrorHidden:true,
            runIPErrorHidden:true,
            runIPMissingErrorHidden:true,
            userIPErrorHidden:true,
            options_organization:[],
            organization:null,
            message_type:1,
            message_title:"",
            message_body:"",
            message_box_open:false
        }

        this.validateName = this.validateName.bind(this)
        this.handleOrganizationSelect = this.handleOrganizationSelect.bind(this)
        this.enable_btn = this.enable_btn.bind(this)
        this.create_branch = this.create_branch.bind(this)
        this.close_message_box_modal = this.close_message_box_modal.bind(this)
        this.validateRIP.bind(this)
        this.validateUIP.bind(this)
    }

    componentWillMount = () =>{
        var cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        if (loginStatus === undefined) {
            window.location = '/login'
        }
        var branch_admin = cookies.get('branch-admin')
        if(branch_admin === 'true'|| cookies.get('branch-user') === "true"){
            window.location = '/dashboard'
        }
        this.setState({
            loading:true
        })
        var dashboar_ref = this
        var http = new XMLHttpRequest();
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        http.open('GET', url+'/api/questions/wizard/organisation?user_id=' + user_id, true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.send()
        http.onreadystatechange = function () {
            //(http.responseText)
            if (http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)
                    if (json.status === 200) {
                        var orgs = []
                        json.organisations.forEach(element => {
                            var temp = {
                                value: element.org_name, label: element.org_name, id: element.org_id
                            }
                            orgs.push(temp)
                            //(orgs)
                        });  
                        dashboar_ref.setState({
                            options_organization: orgs,
                            loading:false
                        })
                    }
                }

    }
}
    validateName = ()=>{
        var input = document.getElementById("branchName").value
        //(input)
        if(input === ''){
            this.setState({
                nameErrorHidden:false
            },this.enable_btn)
        }
        else{
            this.setState({
                nameErrorHidden:true
            },this.enable_btn)
        }
    }

    enable_btn = () => {
        var input = document.getElementById("branchName").value
        if (this.state.organization != null & input!=='') {
            this.setState({
                btn_disabled: false
            })
        }
        else{
            this.setState({
                btn_disabled: true
            })
        }
    }

    handleOrganizationSelect = (organization) => {
        this.setState({ organization}, this.enable_btn);
    }

    close_message_box_modal = () => {
        
        if(this.state.message_type ===1){
            this.setState({
                message_box_open: !this.state.message_box_open,
                loading: false
            })
            window.location = '/create-branch'
        }
        if(this.state.message_type === 2){
            this.setState({
                message_box_open: !this.state.message_box_open,
                loading: false
            })
        }
    }


    create_branch = () =>{
        var cookies = new Cookies();
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        var dashboar_ref = this
        if(this.state.runIPErrorHidden === false ){
            this.setState({
                message_title:"Incorrect IP",
                message_body:"Please enter correct IP address Run server",
                message_type:2,
                message_box_open:true
            })
            return
        }
        if(this.state.userIPErrorHidden === false){
            this.setState({
                message_title:"Incorrect IP",
                message_body:"Please enter correct IP address for photo server",
                message_type:2,
                message_box_open:true
            })
            return
        }
        
        var branch_name = document.getElementById("branchName").value
        var branch_address = document.getElementById("branchAddress").value
        var api_server_ip = document.getElementById("APIServerIP").value
        var photo_upload_ip = document.getElementById("PhotoUploadIP").value
        var photo_upload_user = document.getElementById("PhotoUploaduser").value
        var photo_upload_password = document.getElementById("PhotoUploadPassword").value
        var photo_upload_directory = document.getElementById("PhotoUploadInitialDirectory").value
        var longitude = document.getElementById("Longitude").value
        var Latitude = document.getElementById("Latitude").value
        if(api_server_ip === ""){
            this.setState({
                runIPMissingErrorHidden:false
            })
            return 
        }
        else{
            this.setState({
                runIPMissingErrorHidden:true
            })
        }
        this.setState({loading:true})
        var arg_list = '&org_id='+this.state.organization.id+'&user_id='+user_id+'&branch_name='+branch_name+'&branch_address='+branch_address+'&api_server_ip='+api_server_ip
                        +'&photo_upload_ip='+photo_upload_ip+'&photo_upload_user='+photo_upload_user+'&photo_upload_password='+photo_upload_password
                        +'&photo_upload_directory='+photo_upload_directory+'&branch_longitude='+longitude+'&branch_latitude='+Latitude
                        //+'&gps_location='+gps_location
        var http = new XMLHttpRequest()
        http.open('POST',url+'/api/branch', true)
        http.setRequestHeader("Authorization", "Token " + token);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        //(arg_list)
        http.send(arg_list)
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                //(json)
                if(json.status === 200){
                    dashboar_ref.setState({
                        message_title:"Branch created",
                        message_body:"Branch has been created cuccessfully",
                        message_type:1,
                        message_box_open:true
                    })
                }
                else{
                    dashboar_ref.setState({
                        message_title:"Failure",
                        message_body:"Branch could not be created",
                        message_type:2,
                        message_box_open:true
                    })
                }
            }
            if(http.readyState === 4 && http.status === 401){
                logout()
            }
            
        }
        http.onerror = function(){
            dashboar_ref.setState({
                message_title:"Failure",
                message_body:"Branch could not be created",
                message_type:2,
                message_box_open:true
            })
        }
        http.ontimeout = function(){
            dashboar_ref.setState({
                message_title:"Timeout",
                message_body:"Request has timed out. Try again",
                message_type:2,
                message_box_open:true
            })
        }
    }

    validateRIP = () =>{
        var input = document.getElementById("APIServerIP").value
        //(input)
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input)){
            //("correct")
            this.setState({
                runIPErrorHidden:true
            })
        }
        else{
            this.setState({
                runIPErrorHidden:false
            })
        }
    }
    validateUIP = () =>{
        var input = document.getElementById("PhotoUploadIP").value
        //(input)
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input)){
            //("correct")
            this.setState({
                userIPErrorHidden:true
            })
        }
        else{
            this.setState({
                userIPErrorHidden:false
            })
        }
    }
    render(){
        if(this.state.section === 1){
            return(
                <div>
                   <Loader loading={this.state.loading} fullPage={true} />       
                </div>
            )
        }
        if(this.state.section === 2){
           return(
            <div>
                <Modal isOpen={this.state.message_box_open}>
            <ModalHeader>
            {this.state.message_title}
            </ModalHeader>
            <ModalBody>
                 <b>{this.state.message_body}</b>
            </ModalBody>
            <ModalFooter>
                 <Button color="primary" onClick={this.close_message_box_modal}>Close</Button>
            </ModalFooter>
                </Modal>

            <Loader loading={this.state.loading} fullPage={true} />
            <div className="clearfix" id="page-header">
                <div>
                    <Header />
                </div>
            </div>

            <div >
                <SideBar isActive="branch"/>
            </div>

            <div id="page-content-wrapper" className="rm-transition">
            <div id="page-content">

            <div className="row">
            <div className="col-md-2"></div> 
            <div className="col-md-8">
            <h2 style={{textAlign:"center"}}>Create Branch</h2>
            </div> 
            <div className="col-md-2"></div> 
            </div>
            <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
            <form>
                    <div className="form-group">
                        <label for="branchName"><b>Name</b></label>
                        <input type="text" className="form-control" id="branchName" placeholder="Enter Branch Name" onBlur={this.validateName} maxLength="40"></input>
                        <div class="isa_error" hidden={this.state.nameErrorHidden}>
                                <i class="fa fa-times-circle"></i>
                                <b>You need to provide name to create a branch</b>
                            </div>
                    </div>
                    
                    <div className="form-group">
                    <label ><b>Select Organization</b></label>
                    <SelectList options={this.state.options_organization} actionHandler={this.handleOrganizationSelect} selectedOption={this.state.organization} />
                    </div>


                    <div className="form-group">
                    
                        <label for="branchAddress"><b>Address</b></label>
                        <input type="text" className="form-control" id="branchAddress" placeholder="Enter Branch Address" ></input>
                    </div>

                     {/* <div className="form-group">
                        <label for="GPSLocation"><b>GPS location</b></label>
                        <input type="text" className="form-control" id="GPSLocation" placeholder="Enter Branch GPS location"></input>
                    </div> */}
                    <div className="form-group">
                        <label><b>GPS location</b></label>
                       <div className="row">
                       <div className="col-md-6">
                       <div className="form-group">
                        <label for="GPSLocation"><b>Longitude</b></label>
                        <input type="text" className="form-control" id="Longitude" placeholder="Enter Branch GPS location" maxLength="40"></input>
                    </div>
                       </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <label for="GPSLocation"><b>Latitude</b></label>
                        <input type="text" className="form-control" id="Latitude" placeholder="Enter Branch GPS location" maxLength="40"></input>
                    </div>
                    </div>
                       </div>
                    </div>

                    <div className="form-group">
                        <label for="APIServerIP"><b>API Server IP</b></label>
                        <input type="text" className="form-control" id="APIServerIP" placeholder="Enter Branch API Server IP" maxLength="40" onBlur={this.validateRIP}></input>
                        <div class="isa_error" hidden={this.state.runIPErrorHidden}>
                                <i class="fa fa-times-circle"></i>
                                <b>IP is not correct</b>
                            </div>
                        <div class="isa_error" hidden={this.state.runIPMissingErrorHidden}>
                            <i class="fa fa-times-circle"></i>
                            <b>Please Enter Runsheet Server IP</b>
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="PhotoUploadIP"><b>Photo Upload IP</b></label>
                        <input type="text" className="form-control" id="PhotoUploadIP" placeholder="Enter Branch Photo Upload IP" maxLength="40" onBlur={this.validateUIP}></input>
                        <div class="isa_error" hidden={this.state.userIPErrorHidden}>
                                <i class="fa fa-times-circle"></i>
                                <b>IP is not correct</b>
                            </div>
                    </div>

                    <div className="form-group">
                        <label for="PhotoUploaduser"><b>Photo Upload User</b></label>
                        <input type="text" className="form-control" id="PhotoUploaduser" placeholder="Enter Branch Photo Upload User" maxLength="40"></input>
                    </div>

                    <div className="form-group">
                        <label for="PhotoUploadPassword"><b>Photo Upload Password</b></label>
                        <input type="text" className="form-control" id="PhotoUploadPassword" placeholder="Enter Branch Photo Upload Password" maxLength="40" ></input>
                    </div>

                    <div className="form-group">
                        <label for="PhotoUploadInitialDirectory"><b>Photo Upload Initial Directory</b></label>
                        <input type="text" className="form-control" id="PhotoUploadInitialDirectory" placeholder="Enter Branch Photo Upload Initial Directory" ></input>
                    </div>
                    <button type="button" className="btn btn-block btn-primary" max-width='100%' disabled={this.state.btn_disabled} onClick={this.create_branch}>Create Branch</button>

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
}

export default CreateBranch