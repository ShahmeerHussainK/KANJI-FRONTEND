import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from './dashboardSubComponents/header'
import SideBar from './dashboardSubComponents/sideBarNav'
import { url,logout } from './helper'
import { Loader } from 'react-overlay-loader';
import SelectList from './createQuestionSubComponents/dropdownSelect'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CreateBranchAdmin extends Component{

    constructor(props){
        super(props)
        this.state={
            options_organization:[],
            organization:null,
            orgs_loaded:false,
            options_branch: [],
            branch: null,
            isSuper:false,
            isOrg:false,
            isBranch:false,
            orgAdminSelectionModalOpen:false,
            branchAdminSelectionModalOpen:false,
            loading:false,
            loadingBranches:false,
            fnameError:false,
            lnameError:false,
            emailError:false,
            usernameError:false,
            passwordError:false,
            messageBoxOpen:false,
            messageTitle:"",
            messageBody:"",
            messageType:1
        }
        this.HandleOrgAdminSelect = this.HandleOrgAdminSelect.bind(this)
        this.closeOrgSelectModal = this.closeOrgSelectModal.bind(this)
        this.handleOrganizationSelectBranch = this.handleOrganizationSelectBranch.bind(this)
        this.handleOrganizationSelect.bind(this)
        this.handleBranchSelectSelect.bind(this)
        this.HandleBranchAdminSelect.bind(this)
        this.closeBranchSelectModal.bind(this)
        this.validateFirstName.bind(this)
        this.validateLastName.bind(this)
        this.validateEmailName.bind(this)
        this.validateUsername.bind(this)
        this.checkpasswords.bind(this)
        this.closeMessageBox.bind(this)
        this.create_user.bind(this)
        this.HandleSuperAdminSelect.bind(this)
    }

    componentWillMount = () =>{
        this.setState({loading:true})
        var cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        if (loginStatus === undefined) {
            window.location = '/login'
        }
        var superuser = cookies.get('organization-admin')
        if(superuser !== 'true'){
            window.location = '/dashboard'
        }
        var cookies = new Cookies();
        var dashboar_ref = this
        var http = new XMLHttpRequest();
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        http.open('GET', url+'/api/questions/wizard/organisation?user_id=' + user_id, true);
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
                            orgs.push(temp)
                            console.log(orgs)
                        });  
                        dashboar_ref.setState({
                            options_organization: orgs,
                            loading:false,

                        })
                    }
                }
                if(http.readyState === 4 && http.status === 401){
                    logout()
                }
    }

    }

    HandleOrgAdminSelect = () =>{
        this.setState({
            isSuper:false,
            isOrg:true,
            isBranch:false
        })
       if(this.state.orgs_loaded === false){
           console.log("is zero")
        this.setState({
            loading:true
        })
        var cookies = new Cookies();
        var dashboar_ref = this
        var http = new XMLHttpRequest();
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        http.open('GET', url+'/api/questions/wizard/organisation?user_id=' + user_id, true);
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
                            orgs.push(temp)
                            console.log(orgs)
                        });  
                        dashboar_ref.setState({
                            options_organization: orgs,
                            loading:false,
                            orgAdminSelectionModalOpen:true,
                            orgs_loaded:true
                        })
                    }
                }
    }
       }
       else{
           this.setState({
               orgAdminSelectionModalOpen:true
           })
       }
    }

    closeOrgSelectModal = () =>{
        this.setState({
            orgAdminSelectionModalOpen:false
        })
    }

    //Form Validation functions

    validateFirstName = () =>{
        var input = document.getElementById("firstname").value
        if(input === ''){
            this.setState({fnameError:true})
        }
        else{
            this.setState({fnameError:false})
        }
    }

    validateLastName = () =>{
        var input = document.getElementById("lastname").value
        if(input === ''){
            this.setState({lnameError:true})
        }
        else{
            this.setState({lnameError:false})
        }
    }

    validateEmailName = () =>{
        var emailRegex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
        var input = document.getElementById('email').value
        var isvalid = emailRegex.test(input)
        if(isvalid === false){
            this.setState({
                emailError:true
            })

        }
        else{
            this.setState({
                emailError:false
            })
        }
    
    }

    validateUsername = () =>{
        var usernameRegex = /^[a-zA-Z0-9!@#$%^&*().]+$/;
        var input = document.getElementById('username').value
        var isvalid = usernameRegex.test(input)
        if(isvalid === false){
            this.setState({
                usernameError:true
            })

        }
        else{
            this.setState({
                usernameError:false
            })
        }
       
    }

    checkpasswords = () =>{
        var password = document.getElementById("password").value
        var cpassword = document.getElementById("confirmpassword").value
       if(cpassword !== ''){
        if(password !== cpassword){
            this.setState({
                passwordError:true
            })
        }
        else{
            this.setState({
                passwordError:false
            })
        }
       }
    }

    handleOrganizationSelectBranch = (organization) => {
        this.setState({ organization,loading:true});
        const cookies = new Cookies();
            var http = new XMLHttpRequest();
            var dashboar_ref = this
            var user_id = cookies.get('user_id')
            var token = cookies.get('token')
            console.log('Token ' + token)
            http.open('GET', url+'/api/questions/wizard/branch?user_id=' + user_id + '&org_id=' + organization.id, true);
            http.setRequestHeader("Authorization", "Token " + token);
            http.send()
            http.onreadystatechange = function () {
                console.log(http.responseText)
                if (http.readyState === 4 && http.status === 200) {
                    var json = JSON.parse(http.responseText)
                    if (json.status === 200) {
                        var branches = []
                        json.branches.forEach(element => {
                            var temp = {
                                value: element.branch_name, label: element.branch_name, id: element.branch_id
                            }
                            branches.push(temp)
                            console.log(branches)
                        });
                        dashboar_ref.setState({
                            options_branch: branches,
                            branch:null,
                            loading:false
                        })
                    }

                }
    }}

    handleOrganizationSelect = (organization) => {
        this.setState({ organization}, this.enable_btn);
    }

    handleBranchSelectSelect = (branch) => {
        this.setState({ branch }, this.enable_btn);

        console.log(`Option selected:`, branch);
    }

    HandleBranchAdminSelect = () =>{
        this.setState({
            isSuper:false,
            isOrg:false,
            isBranch:true
        })
        if(this.state.orgs_loaded === false){
            console.log("is zero")
         this.setState({
             loading:true
         })
         var cookies = new Cookies();
         var dashboar_ref = this
         var http = new XMLHttpRequest();
         var user_id = cookies.get('user_id')
         var token = cookies.get('token')
         http.open('GET', url+'/api/questions/wizard/organisation?user_id=' + user_id, true);
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
                             orgs.push(temp)
                             console.log(orgs)
                         });  
                         dashboar_ref.setState({
                             options_organization: orgs,
                             loading:false,
                             branchAdminSelectionModalOpen:true,
                             orgs_loaded:true
                         })
                     }
                 }
     }
        }
        else{
            this.setState({
                branchAdminSelectionModalOpen:true
            })
        }
    }

    closeBranchSelectModal = () =>{
        this.setState({
            branchAdminSelectionModalOpen:false
        })
    }



    HandleSuperAdminSelect = () =>{
        this.setState({
            isSuper:true,
            isOrg:false,
            isBranch:false
        })
    }

    closeMessageBox = () =>{
        if(this.state.messageType === 1){
            this.setState({
                messageBoxOpen:false
            })
        }
        if(this.state.messageType === 2){
            this.setState({
                messageBoxOpen:false
            })
            this.HandleOrgAdminSelect()
        }
        if(this.state.messageType === 3){
            this.setState({
                messageBoxOpen:false
            })
            this.HandleBranchAdminSelect()
        }
        if(this.state.messageType === 4){
            this.setState({
                messageBoxOpen:false
            })
            window.location = "/create-branch-admin/"
        }
    }

    create_user = () =>{
        // console.log(this.state.fnameError)
        // console.log(this.state.lnameError)
        // console.log(this.state.emailError)
        // console.log(this.state.usernameError)
        // console.log(this.state.passwordError)

        var fname = document.getElementById("firstname").value
        var lname = document.getElementById("lastname").value
        var email =document.getElementById("email").value
        var username = document.getElementById("username").value
        var password = document.getElementById("password").value
        var cpassword = document.getElementById("confirmpassword").value

        if(fname === '' && lname === '' && email === '' && username === '' && password === '' && cpassword === ''){
            this.setState({
                messageTitle:"Empty form",
                messageBody:"Please fill in required details",
                messageBoxOpen:true,
                messageType:1
            })
            return
        }


        if(this.state.fnameError === true | this.state.lnameError === true | this.state.emailError === true  | this.state.usernameError === true | this.state.passwordError === true | cpassword === ''){
            this.setState({
                messageTitle:"Missing Credentials",
                messageBody:"One of the form fields is incorrect. Please input correct data",
                messageBoxOpen:true,
                messageType:1
            })
            return
        }

        if( this.state.organization === null){
            this.setState({
                messageTitle:"Organization Missing",
                messageBody:"Please select organization for user",
                messageBoxOpen:true,
                messageType:1
            })
            return
        }

        if(this.state.branch === null){
            this.setState({
                messageTitle:"Branch Missing",
                messageBody:"Please select branch for user",
                messageBoxOpen:true,
                messageType:1
            })
            return
        }



        var arg_list = '&first_name='+fname+'&last_name='+lname+"&email="+email+'&username='+username+'&password='+password+'&is_branch_admin=True&branch_id='+this.state.branch.id

        // arg_list = this.state.isBranch ? arg_list+'&is_branch_admin=True&branch_id='+this.state.branch.id : arg_list

        console.log(arg_list)

        const cookies = new Cookies();
        var http = new XMLHttpRequest();
        var dasboard_ref = this
        var token = cookies.get('token')
        console.log('Token ' + token)
        http.open('POST', url+'/api/user/register', true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send(arg_list)
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                console.log(http.responseText)
                if(json.status === 200){
                    dasboard_ref.setState({
                        messageTitle:"User Created",
                        messageBody:"User "+fname+" "+lname+" has been created successfully",
                        messageBoxOpen:true,
                        messageType:4
                    })
                }
                else{
                    dasboard_ref.setState({
                        messageTitle:"Could not create user",
                        messageBody:"User "+fname+" "+lname+" could not be created",
                        messageBoxOpen:true,
                        messageType:1
                    })
                }
            }
            else{
                dasboard_ref.setState({
                    messageTitle:"Could not create user",
                    messageBody:"User "+fname+" "+lname+" could not be created. A server error occured",
                    messageBoxOpen:true,
                    messageType:1
                })
            }
            if(http.readyState === 4 && http.status === 401){
                logout()
            }
        }
        http.onerror = function(){
            dasboard_ref.setState({
                messageTitle:"No response",
                messageBody:"Could not contact server",
                messageBoxOpen:true,
                messageType:1
            })
        }
        http.timeout = function(){
            dasboard_ref.setState({
                messageTitle:"Request Timeout",
                messageBody:"Server did not respond in time. Try again",
                messageBoxOpen:true,
                messageType:1
            })
        }

    }

    render(){
        return(
            <div>
                <Loader loading={this.state.loading} fullPage={true} />
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
        <Modal isOpen={this.state.messageBoxOpen}>
            <ModalHeader>{this.state.messageTitle}</ModalHeader>
            <ModalBody><b>{this.state.messageBody}</b></ModalBody>
            <ModalFooter><Button color="primary" onClick={this.closeMessageBox}>Close</Button></ModalFooter>
        </Modal>
        <Modal isOpen={this.state.orgAdminSelectionModalOpen}>
        <ModalHeader>Select Organization For User</ModalHeader>
        <ModalBody>
     
            <h3 ><b>Select Organization</b></h3>
            <SelectList options={this.state.options_organization} actionHandler={this.handleOrganizationSelect} selectedOption={this.state.organization} />
                    
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={this.closeOrgSelectModal}>Done</Button>
        </ModalFooter>
        </Modal>

        
        <div className="row">
            <div className="col-md-2"></div> 
            <div className="col-md-8">
            <h2 style={{textAlign:"center"}}>Create User</h2>
            </div> 
            <div className="col-md-2"></div> 
            </div>

            <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
            <form>
                    <div className="form-group">
                        <label htmlFor="firstname"><b>First Name</b></label>
                        <input type="text" className="form-control" id="firstname" placeholder="Enter First Name" onChange={this.validateFirstName}></input>
                        <div class="isa_error" hidden={!this.state.fnameError} style={{marginTop:5}}>
                                <i class="fa fa-times-circle"></i>
                                <b>Please provide first name</b>
                            </div>
                    </div>

                    <div className="form-group">
                    
                        <label ><b>Last Name</b></label>
                        <input type="text" className="form-control" id="lastname" placeholder="Enter Last Name" onChange={this.validateLastName}></input>
                        <div class="isa_error" hidden={!this.state.lnameError} style={{marginTop:5}}>
                                <i class="fa fa-times-circle"></i>
                                <b>Please provide last name</b>
                            </div>
                    </div>

                     {/* <div className="form-group">
                        <label for="GPSLocation"><b>GPS location</b></label>
                        <input type="text" className="form-control" id="GPSLocation" placeholder="Enter Branch GPS location"></input>
                    </div> */}

                    <div className="form-group">
                        <label><b>Email</b></label>
                        <input type="email" className="form-control" id="email" placeholder="Enter Email Address" onBlur={this.validateEmailName}></input>
                        <div class="isa_error" hidden={!this.state.emailError} style={{marginTop:5}}>
                                <i class="fa fa-times-circle"></i>
                                <b>Email Address is not valid</b>
                            </div>
                    </div>

                    <div className="form-group">
                        <label ><b>Username</b></label>
                        <input type="text" className="form-control" id="username" placeholder="Enter Username" onChange={this.validateUsername}></input>
                        <div class="isa_error" hidden={!this.state.usernameError} style={{marginTop:5}}>
                                <i class="fa fa-times-circle"></i>
                                <b>Username is not valid</b>
                            </div>
                    </div>

                    <div className="form-group">
                        <label ><b>Password</b></label>
                        <input type="password" className="form-control" id="password" placeholder="Enter Password" onBlur={this.checkpasswords}></input>
                    </div>

                    <div className="form-group">
                        <label ><b>Confirm Password</b></label>
                        <input type="password" className="form-control" id="confirmpassword" placeholder="Confirm Password" onBlur={this.checkpasswords}></input>
                        <div class="isa_error" hidden={!this.state.passwordError} style={{marginTop:5}}>
                                <i class="fa fa-times-circle"></i>
                                <b>Passwords do not match</b>
                            </div>
                    </div>

                    <div className="form-group" >
                    
                    <label ><b>Select Orgaization</b></label>
                    <SelectList options={this.state.options_organization} actionHandler={this.handleOrganizationSelectBranch} selectedOption={this.state.organization} />
                    
                    </div>

                    <div className="form-group">
                  
                    <label ><b>Select Branch</b></label>
                        <SelectList options={this.state.options_branch} actionHandler={this.handleBranchSelectSelect} selectedOption={this.state.branch} />
                    
                    </div>

                    <button type="button" className="btn btn-block btn-primary" max-width='100%' onClick={this.create_user}>Create User</button>

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

export default CreateBranchAdmin