import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SelectList from '../createQuestionSubComponents/dropdownSelect'
import { Loader } from 'react-overlay-loader';
import { url, media_url } from '../helper'


class BranchViewPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            options_organization: [],
            organization: null,
            viewModalOpen: false,
            editModalOpen: false,
            editModalBtnsDisabled: true,
            deleteModalOpen: false,
            message_type: 1,
            message_title: "",
            message_body: "",
            message_box_open: false,
            data: null,
            runIPErrorHidden:true,
            userIPErrorHidden:true,
        }
        this.HandleViewClick = this.HandleViewClick.bind(this)
        this.HandleEditClick = this.HandleEditClick.bind(this)
        this.HandleDeleteClick.bind(this)
        this.closeViewModal = this.closeViewModal.bind(this)
        this.handleOrganizationSelect = this.handleOrganizationSelect.bind(this)
        this.update_branch = this.update_branch.bind(this)
        this.delete_branch = this.delete_branch.bind(this)
        this.validateRIP.bind(this)
        this.validateUIP.bind(this)
        this.validateName.bind(this)
    }

    componentWillMount = () => {
        this.setState({
            data: this.props.data
        })
    }

    closeViewModal = () => {
        this.setState({
            viewModalOpen: false
        })
    }

    close_message_box_modal = () => {

        if (this.state.message_type === 1) {
            this.setState({
                message_box_open: !this.state.message_box_open,
                loading: false,
                editModalBtnsDisabled:false
            })
        }
        if (this.state.message_type === 2) {
            this.setState({
                message_box_open: !this.state.message_box_open,
                loading: false,
                editModalBtnsDisabled:false
            })
        }
    }

    HandleViewClick = () => {
        console.log("viewer must open" )
        this.setState({
            viewModalOpen: true,

        })
    }

    HandleEditClick = (e) => {
        var cookies = new Cookies();
        this.setState({
            editModalOpen: true,
            loading: true
        })
        var dashboar_ref = this
        var http = new XMLHttpRequest();
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        console.log(url + '/api/questions/wizard/organisation?user_id=' + user_id)
        http.open('GET', url + '/api/questions/wizard/organisation?user_id=' + user_id, true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.send()
        http.onreadystatechange = function () {
            console.log(http.responseText)
            if (http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)
                if (json.status === 200) {
                    var orgs = []
                    json.organisations.forEach(element => {
                        var temp = {
                            value: element.org_name, label: element.org_name, id: element.org_id
                        }
                        if (element.org_name === dashboar_ref.props.orgName) {
                            dashboar_ref.setState({
                                organization: temp
                            })
                        }
                        orgs.push(temp)
                        console.log(orgs)
                    });

                    document.getElementById("branchName").value = dashboar_ref.state.data.branch_name
                    document.getElementById("branchAddress").value = dashboar_ref.state.data.branch_address
                    document.getElementById("APIServerIP").value = dashboar_ref.state.data.branch_api_server_ip
                    document.getElementById("PhotoUploadIP").value = dashboar_ref.state.data.branch_photo_upload_ip
                    document.getElementById("PhotoUploaduser").value = dashboar_ref.state.data.branch_photo_upload_user
                    document.getElementById("PhotoUploadPassword").value = dashboar_ref.state.data.branch_photo_upload_password
                    document.getElementById("PhotoUploadInitialDirectory").value = dashboar_ref.state.data.branch_photo_upload_directory
                    document.getElementById("Longitude").value = dashboar_ref.state.data.branch_longitude
                    document.getElementById("Latitude").value = dashboar_ref.state.data.branch_latitude
                    dashboar_ref.setState({
                        options_organization: orgs,
                        loading: false,
                        editModalBtnsDisabled: false
                    })
                }
            }

        }
    }

    HandleDeleteClick = () => {
        this.setState({
            message_title: "Delete Branch",
            message_body: "Are you sure you want to delete " + this.state.data.branch_name + "?",
            deleteModalOpen: true
        })
    }

    close_delete_modal = () => {
        this.setState({
            deleteModalOpen: false
        })
    }

    update_branch = () => {
        var cookies = new Cookies();
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        var dashboar_ref = this
        this.setState({ loading: true, editModalBtnsDisabled: true })
        var branch_name = document.getElementById("branchName").value
        var branch_address = document.getElementById("branchAddress").value
        var api_server_ip = document.getElementById("APIServerIP").value
        var photo_upload_ip = document.getElementById("PhotoUploadIP").value
        var photo_upload_user = document.getElementById("PhotoUploaduser").value
        var photo_upload_password = document.getElementById("PhotoUploadPassword").value
        var photo_upload_directory = document.getElementById("PhotoUploadInitialDirectory").value
        var longitude = document.getElementById("Longitude").value
        var Latitude = document.getElementById("Latitude").value
        var arg_list = '&branch_id=' + this.props.data.branch_id + '&org_id=' + this.state.organization.id + '&user_id=' + user_id + '&branch_name=' + branch_name + '&branch_address=' + branch_address + '&api_server_ip=' + api_server_ip
            + '&photo_upload_ip=' + photo_upload_ip + '&photo_upload_user=' + photo_upload_user + '&photo_upload_password=' + photo_upload_password
            + '&photo_upload_directory=' + photo_upload_directory + '&branch_longitude=' + longitude + '&branch_latitude=' + Latitude
        //+'&gps_location='+gps_location
        var http = new XMLHttpRequest()
        http.open('PUT', url + '/api/branch', true)
        http.setRequestHeader("Authorization", "Token " + token);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        console.log(arg_list)
        http.send(arg_list)
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
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)

                console.log(json)
                if (json.status === 200) {
                    dashboar_ref.setState({
                        editModalOpen: false,
                        message_title: "Branch Updated",
                        message_body: "Branch has been updated successfully",
                        message_type: 1,
                        message_box_open: true,
                        data: json,
                        editModalBtnsDisabled: true
                    })
                }
                else {
                    dashboar_ref.setState({
                        message_title: "Failure",
                        message_body: "Branch could not be updated",
                        message_type: 2,
                        message_box_open: true,

                    })
                }
            }

        }
        http.onerror = function () {
            dashboar_ref.setState({
                message_title: "Failure",
                message_body: "Branch could not be updated",
                message_type: 2,
                message_box_open: true,

            })
        }
        http.ontimeout = function () {
            dashboar_ref.setState({
                message_title: "Timeout",
                message_body: "Request has timed out. Try again",
                message_type: 2,
                message_box_open: true,

            })
        }
    }

    delete_branch = () => {
        var cookies = new Cookies();
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        var dashboar_ref = this
        var http = new XMLHttpRequest()
        http.open('DELETE', url + '/api/branch?user_id=' + user_id + '&branch_id=' + this.state.data.branch_id, true)
        http.setRequestHeader("Authorization", "Token " + token);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send()
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)
                console.log(http.responseText)
                if (json.status === 204) {
                    dashboar_ref.setState({
                        deleteModalOpen: false,
                        message_title: "Branch Deleted",
                        message_body: "branch has been deleted successfully",
                        message_box_open: true
                    })
                    document.getElementById("branchPanel" + dashboar_ref.props.data.branch_id).outerHTML = ""
                }
                else {
                    dashboar_ref.setState({
                        deleteModalOpen: false,
                        message_title: "Operation Unsuccessful",
                        message_body: "branch could not be deleted",
                        message_box_open: true
                    })
                }
            }
            http.onerror = function () {
                dashboar_ref.setState({
                    message_title: "Failure",
                    message_body: "Branch could not be deleted",
                    message_type: 2,
                    message_box_open: true,

                })
            }
            http.ontimeout = function () {
                dashboar_ref.setState({
                    message_title: "Timeout",
                    message_body: "Request has timed out. Try again",
                    message_type: 2,
                    message_box_open: true,

                })
            }
        }
    }

    closeEditModal = () => {
        this.setState({
            editModalOpen: false,
            editModalBtnsDisabled: true
        })
    }

    handleOrganizationSelect = (organization) => {
        this.setState({ organization }, this.enable_btn);
    }

    validateRIP = () =>{
        var input = document.getElementById("APIServerIP").value
        console.log(input)
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input)){
            console.log("correct")
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
        console.log(input)
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input)){
            console.log("correct")
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

    validateName = ()=>{
        var input = document.getElementById("branchName").value
        console.log(input)
        if(input == ''){
            this.setState({
                nameErrorHidden:false,
                editModalBtnsDisabled:true
            })
        }
        else{
            this.setState({
                nameErrorHidden:true,
                editModalBtnsDisabled:false
            })
        }
    }

    render() {
        if (this.props.isBranchAdmin === false) {
            console.log(this.props.data)
            if (this.props.data !== undefined) {
                if (this.props.data.branch_id !== undefined) {
                    return (

                        <div class="col-md-4" id={"branchPanel" + this.props.data.branch_id}>

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
                                            <h5>Branch Photo Upload User:</h5><b>{this.state.data.branch_photo_upload_user}</b>
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

                            <Modal isOpen={this.state.editModalOpen}>
                                <ModalHeader>Edit Branch</ModalHeader>
                                <ModalBody>
                                    <form>
                                        <Loader loading={this.state.loading} />
                                        <div className="form-group">
                                            <label for="branchName"><b>Name</b></label>
                                            <input type="text" className="form-control" id="branchName" placeholder="Enter Branch Name" onBlur={this.validateName} maxLength="40"></input>
                                            <div class="isa_error" hidden={this.state.nameErrorHidden}>
                                            <i class="fa fa-times-circle"></i>
                                            <b>Please provide branch name to update</b>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label ><b>Select Organization</b></label>
                                            <SelectList options={this.state.options_organization} actionHandler={this.handleOrganizationSelect} selectedOption={this.state.organization} />
                                        </div>


                                        <div className="form-group">

                                            <label for="branchAddress"><b>Address</b></label>
                                            <input type="text" className="form-control" id="branchAddress" placeholder="Enter Branch Address"></input>
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
                                                        <label for="Longitude"><b>Longitute</b></label>
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
                                        </div>

                                        <div className="form-group">
                                            <label for="PhotoUploadIP"><b>Photo Upload IP</b></label>
                                            <input type="text" className="form-control" id="PhotoUploadIP" placeholder="Enter Branch Photo Upload IP" onBlur={this.validateUIP} maxLength="40"></input>
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
                                            <input type="text" className="form-control" id="PhotoUploadPassword" placeholder="Enter Branch Photo Upload Password" maxLength="40"></input>
                                        </div>

                                        <div className="form-group">
                                            <label for="PhotoUploadInitialDirectory"><b>Photo Upload Initial Directory</b></label>
                                            <input type="text" className="form-control" id="PhotoUploadInitialDirectory" placeholder="Enter Branch Photo Upload Initial Directory"></input>
                                        </div>

                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={this.closeEditModal} disabled={this.state.editModalBtnsDisabled}>Cancel</Button>
                                    <Button onClick={this.update_branch} color="primary" disabled={this.state.editModalBtnsDisabled}>Update</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal isOpen={this.state.deleteModalOpen}>
                                <ModalHeader>
                                    <h3>{this.state.message_title}</h3>
                                </ModalHeader>
                                <ModalBody>
                                    <b>{this.state.message_body}</b>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={this.close_delete_modal}>Cancel</Button>
                                    <Button color="primary" onClick={this.delete_branch}>Delete</Button>
                                </ModalFooter>
                            </Modal>


                            {/* <div class="panel-layout">
                                <div class="panel-box col-xs-6">

                                    <div class="panel-content bg-white">
                                        <canvas id="icon-cloud" width="80" height="80"></canvas>
                                    </div>
                                    <div class="panel-content bg-black">
                                        <div class="center-vertical">

                                            <ul class="center-content nav nav-justified">

                                                <li>

                                                    <a id={this.props.data.branch_id}>
                                                        <i class="glyph-icon opacity-60"></i>
                                                        <a > <h4 onClick={this.HandleViewClick} class="font-back glyph-icon icon-eye org_opt_btn">View</h4></a>
                                                    </a>
                                                </li>

                                                <li>

                                                    <a id={this.props.data.branch_id}>
                                                        <i class="glyph-icon opacity-60"></i>
                                                        <a > <h4 onClick={this.HandleEditClick} class="font-back glyph-icon icon-edit org_opt_btn">Edit</h4></a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a id={this.props.data.branch_id}>
                                                        <i class="glyph-icon opacity-60"></i>
                                                        <a><h4 onClick={this.HandleDeleteClick} class="font-back glyph-icon icon-remove org_opt_btn">Delete</h4></a>
                                                    </a>
                                                </li>
                                            </ul>

                                        </div>
                                    </div>

                                </div>
                                <div class="panel-box col-xs-6 bg-blue-alt">
                                    <div class="panel-content">

                                        <a className="branchTitle" href={"/list-devices/?id="+this.state.data.branch_id}><h3>{this.state.data.branch_name}</h3></a>
                                    </div>
                                </div>
                            </div> */}
                        <div class="panel-layout">
                            <div class="panel-box">

                                <div class="panel-content bg-twitter">

                                    <a className="branchTitle" href={"/list-devices/?id="+this.state.data.branch_id}><h3>{this.state.data.branch_name}</h3></a>

                                </div>
                                <div class="panel-content pad15A bg-white">
                                    <div class="center-vertical">

                                        <ul class="center-content list-group list-group-separator row mrg0A">
                                            <li class="col-md-4">
                                            <a id={this.props.data.branch_id}>
                                                        <i class="glyph-icon opacity-60"></i>
                                                        <a > <h4 onClick={this.HandleViewClick} class="font-back glyph-icon icon-eye branch-opt-btn">View</h4></a>
                                                    </a>
                                            </li>
                                            <li class="col-md-4">
                                            <a id={this.props.data.branch_id}>
                                                <i class="glyph-icon opacity-60"></i>
                                                <a > <h4 onClick={this.HandleEditClick} class="font-back glyph-icon icon-edit branch-opt-btn">Edit</h4></a>
                                            </a>
                                            </li>
                                            <li class="col-md-4">
                                            <a id={this.props.data.branch_id}>
                                                <i class="glyph-icon opacity-60"></i>
                                                <a><h4 onClick={this.HandleDeleteClick} class="font-back glyph-icon icon-remove branch-opt-btn">Delete</h4></a>
                                            </a>
                                            </li>
                                        </ul>

                                    </div>
                                </div>

                            </div>
                        </div>

                        </div>

                    )
                }
            }
        }
        else {
            return (

                <div class="col-md-4" id={"branchPanel" + this.props.data.branch_id}>
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
                                            <h5>Branch Upload Directory:</h5><b>{this.state.branch_photo_upload_directory}</b>
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

                    {/* <div class="panel-layout">
                        <div class="panel-box col-xs-6">

                            <div class="panel-content bg-white">
                                <canvas id="icon-cloud" width="80" height="80"></canvas>
                            </div>
                            <div class="panel-content bg-black">
                                <div class="center-vertical">

                                    <ul class="center-content nav nav-justified">

                                        <li>

                                            <a id={this.props.data.branch_id}>
                                                <i class="glyph-icon opacity-60"></i>
                                                <a > <h4 onClick={this.HandleViewClick} class="font-back glyph-icon icon-eye org_opt_btn">View</h4></a>
                                            </a>
                                        </li>

                                    </ul>

                                </div>
                            </div>

                        </div>
                        <div class="panel-box col-xs-6 bg-blue-alt">
                            <div class="panel-content">

                                <a className="branchTitle" href={"/list-devices/?id="+this.state.data.branch_id}><h3>{this.state.data.branch_name}</h3></a>
                            </div>
                        </div>
                    </div> */}
                                                                        <div class="panel-layout">
                            <div class="panel-box">

                                <div class="panel-content bg-twitter">

                                    <a className="branchTitle" href={"/list-devices/?id="+this.state.data.branch_id}><h3>{this.state.data.branch_name}</h3></a>

                                </div>
                                <div class="panel-content pad15A bg-white">
                                    <div class="center-vertical">

                                        <ul class="center-content list-group list-group-separator row mrg0A">
                                            <li class="col-md-12">
                                            <a id={this.props.data.branch_id}>
                                                        <i class="glyph-icon opacity-60"></i>
                                                        <a > <h4 onClick={this.HandleViewClick} class="font-back glyph-icon icon-eye branch-opt-btn">View</h4></a>
                                                    </a>
                                            </li>
                                        </ul>

                                    </div>
                                </div>

                            </div>
                        </div>

                </div>

            )
        }
    }
}

export default BranchViewPanel;