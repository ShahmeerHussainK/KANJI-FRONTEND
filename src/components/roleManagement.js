import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../CSS/assets-minified/all-demo.css'
import '../CSS/assets-minified/css/bootstrap.min.css'
import Header from './dashboardSubComponents/header'
import SideBar from './dashboardSubComponents/sideBarNav'
import { Loader } from 'react-overlay-loader';
import { url,logout } from './helper'
// import ResponseTable from './responseListSubComponenets/responseTable'
// import MultiSelectList from './roleManagementSubComponents/mutiSelectList'
import SelectList from './createQuestionSubComponents/dropdownSelect'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';

class RoleManagement extends Component{

    constructor(props){
        super(props)
        this.state = {
            section:1,
            orgEdit:true,
            branchEdit:true,
            branchView:false,
            branchViewEdit:true,
            userDeatilViewHidden:true,
            superuser:false,
            organization_admin:false,
            editOragizationModalOpen:false,
            editBranchModalOpen:false,
            allUsers : [],
            organizations:[],
            selectedOrganizations:[],
            branches:[],
            branch_opts:[],
            branchAdminSelectedOrg:null,
            selectedBranches:[],
            user_options:[],
            selectedUser:null,
            modalLoading:false,
            loading:false,
            messageBoxOpen:false,
            messageTitle:"",
            messageBody:"",
            messageType:0

        }
        this.HandleUserSelect = this.HandleUserSelect.bind(this)
        this.HandleOrgRadioClick = this.HandleOrgRadioClick.bind(this)
        this.HandleOrgEditClick = this.HandleOrgEditClick.bind(this)
        this.HandleOrganizationSelect = this.HandleOrganizationSelect.bind(this)
        this.fetchOrgBranches = this.fetchOrgBranches.bind(this)
        this.CloseBranchEditModal = this.CloseBranchEditModal.bind(this)
        this.HandleBranchRadioClick = this.HandleBranchRadioClick.bind(this)
        this.HandleBranchAdminOrgSelect = this.HandleBranchAdminOrgSelect.bind(this)
        this.HandleBranchSelect = this.HandleBranchSelect.bind(this)
        this.updateRoles = this.updateRoles.bind(this)
        this.closeMessageBox = this.closeMessageBox.bind(this)
    }

 
    componentWillMount = () =>{
        var cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        if (loginStatus === undefined) {
            window.location = '/login'
        }
        var temp = cookies.get('superuser')
        //(typeof temp )
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        this.setState({
            superuser : cookies.get('superuser'),
            organization_admin : cookies.get('organization-admin'),
        })
        if(cookies.get('branch-admin') === "true" || cookies.get('branch-user') === "true"){
           
            window.location = '/dashboard'
        }
        
        var global_ref = this
        var http = new XMLHttpRequest();
        http.open("GET",url+"/api/user/role?user_id="+user_id,true)
        http.setRequestHeader("Authorization", "Token " + token);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send()
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                //(http.responseText)
                var json = JSON.parse(http.responseText)
                
                if(json.status === 200){
                    var user_opts=[]
                    var org_opts = []
                    json.users.forEach(element =>{
                        temp = {value:element.user_id, label:element.first_name+" "+element.last_name+" ("+element.username+")", id:element.user_id}
                        user_opts.push(temp)
                    })

                    json.organisations.forEach(element =>{
                        temp={value:element.org_id, label:element.org_name, id:element.org_id}
                        org_opts.push(temp)
                    })
                    //("************")
                    //(org_opts)
                    global_ref.setState({
                        user_options:user_opts,
                        allUsers:json.users,
                        organizations:org_opts
                    })
                }
            }
        }
    }

    HandleUserSelect = (user) =>{
        
        this.state.allUsers.forEach(element =>{
            if(user.id === element.user_id){
                if(element.is_super_admin === true){
                    document.getElementById("super").checked = true
                    this.setState({branchEdit:true,orgEdit:true})
                }
                if(element.is_org_admin === true && element.user_orgs.length !== 0){
                    document.getElementById("org").checked = true
                    this.setState({orgEdit:false,branchEdit:true})
                }
                console.log("element ", element)
                if(element.is_branch_admin === true && element.user_branches.length !== 0){
                    document.getElementById("branch").checked = true
                    this.fetchOrgBranches(element.user_branches[0].org_id)
                    this.setState({branchEdit:false,orgEdit:true,loading:true})
                }
                // fix later
                if(element.is_branch_user === true && element.user_branches.length !== 0){
                    document.getElementById("branchView").checked = true
                    this.fetchOrgBranches(element.user_branches[0].org_id)
                    this.setState({branchViewEdit:false,orgEdit:false,loading:true})
                }
                if(element.is_revoked === true){
                    document.getElementById("revoked").checked = true
                    this.setState({branchEdit:true,orgEdit:true})
                }
            }
            this.setState({
                selectedUser:user,
                userDeatilViewHidden:false, selectedOrganizations:[], branchAdminSelectedOrg:null, selectedBranches:[]
            })
        })
    }
    fetchOrgBranches = (org_id) =>{
        //("fetch received "+org_id)
        var cookies = new Cookies();
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        var dashboar_ref = this;
        var http = new XMLHttpRequest();
        http.open('GET', url+'/api/questions/wizard/branch?user_id=' + user_id + '&org_id=' + org_id, true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send()
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                if (json.status === 200) {
                    //("got branches")
                    var branches = []
                    json.branches.forEach(element => {
                        var temp = {
                            value: element.branch_id, label: element.branch_name, id: element.branch_id
                        }
                        branches.push(temp)
                        //(branches)
                    });
                    dashboar_ref.setState({
                        branch_opts: branches,
                        branches:json.branches,
                        modalLoading:false,
                        loading:false
                    })
                }
            }
        }
    }

    CloseOrgEditModal = () =>{
        this.setState({
            editOragizationModalOpen:false
        })
    }

    closeMessageBox = () =>{
        if(this.state.messageType === 1){
            this.setState({messageBoxOpen:false})
            window.location = "/role-management/"
        }
        else{
            this.setState({messageBoxOpen:false})
        }
    }

    HandleOrgRadioClick = () =>{
        //("org handle called")
        if(this.state.selectedOrganizations.length === 0){
            var target = this.state.selectedUser
        var isChecked = document.getElementById("org").checked
        if(isChecked === true){
        var targetOrgs = []
        var tempSelectedopts=[]
        this.state.allUsers.forEach(element =>{
            if(element.user_id === target.id){
                targetOrgs = element.user_orgs
            }

        })
        targetOrgs.forEach(element =>{
            tempSelectedopts.push({value:element.org_id,label:element.org_name,id:element.org_id})
        })
            this.setState({
                editOragizationModalOpen:true, selectedOrganizations:tempSelectedopts
            })
        }
        }
        else{
            this.setState({
                editOragizationModalOpen:true, selectedOrganizations:tempSelectedopts
            })
        }
    }

    HandleOrgEditClick = () =>{
        document.getElementById("org").checked = true
        if(this.state.selectedOrganizations.length === 0){
            var target = this.state.selectedUser
            
            var targetOrgs = []
            var tempSelectedopts=[]
            this.state.allUsers.forEach(element =>{
                if(element.user_id === target.id){
                    targetOrgs = element.user_orgs
                }
    
            })
            targetOrgs.forEach(element =>{
                tempSelectedopts.push({value:element.org_id,label:element.org_name,id:element.org_id})
            })
            this.setState({editOragizationModalOpen:true, selectedOrganizations:tempSelectedopts})
        }
        else{
            this.setState({editOragizationModalOpen:true})
        }
    }

    HandleOrganizationSelect = (orgs) =>{
        this.setState({
            selectedOrganizations:orgs
        })
    }

    CloseBranchEditModal = () =>{
        this.setState({
            editBranchModalOpen:false
        })
    }

    HandleBranchRadioClick = () =>{
        document.getElementById("branch").checked=true
        var targetUser = null
        var tagetOrg = null
        var tagetBranches = []
        this.state.allUsers.forEach(element =>{
            if(this.state.selectedUser.id === element.user_id){
                targetUser = element
            }
        })
        if(targetUser.user_branches.length !== 0){
      
            if(this.state.branchAdminSelectedOrg === null){
                this.state.organizations.forEach(element =>{
                    if(element.id === targetUser.user_branches[0].org_id){
                        tagetOrg = element
                    }
                })
            }
            else{
                tagetOrg = this.state.branchAdminSelectedOrg
            }
         targetUser.user_branches.forEach(outElement =>{
            this.state.branches.forEach(InElement =>{
                if(InElement.branch_id === outElement.branch_id){
                    tagetBranches.push({value:outElement.branch_id,label:outElement.branch_name, id:outElement.branch_id})
                }
            })
         })
            this.setState({
                editBranchModalOpen:true,
                branchAdminSelectedOrg:tagetOrg,
                selectedBranches:tagetBranches
            })
        }
        else{
            this.setState({
                editBranchModalOpen:true,
            })
        }
    }
    HandleBranchViewRadioClick = () =>{
        document.getElementById("branchView").checked=true
        var targetUser = null
        var tagetOrg = null
        var tagetBranches = []
        this.state.allUsers.forEach(element =>{
            if(this.state.selectedUser.id === element.user_id){
                targetUser = element
            }
        })
        if(targetUser.user_branches.length !== 0){
      
            if(this.state.branchAdminSelectedOrg === null){
                this.state.organizations.forEach(element =>{
                    if(element.id === targetUser.user_branches[0].org_id){
                        tagetOrg = element
                    }
                })
            }
            else{
                tagetOrg = this.state.branchAdminSelectedOrg
            }
         targetUser.user_branches.forEach(outElement =>{
            this.state.branches.forEach(InElement =>{
                if(InElement.branch_id === outElement.branch_id){
                    tagetBranches.push({value:outElement.branch_id,label:outElement.branch_name, id:outElement.branch_id})
                }
            })
         })
            this.setState({
                editBranchModalOpen:true,
                branchAdminSelectedOrg:tagetOrg,
                selectedBranches:tagetBranches
            })
        }
        else{
            this.setState({
                editBranchModalOpen:true,
            })
        }
    }

    HandleBranchAdminOrgSelect = (org) =>{
        var targetUser = null
        // var tagetOrg = null
        var tagetBranches = []
        this.state.allUsers.forEach(element =>{
            if(this.state.selectedUser.id === element.user_id){
                targetUser = element
            }
        })
        if(targetUser.is_branch_admin === true && targetUser.user_branches[0].org_id === org.id){
            this.fetchOrgBranches(org.id)
            //("************")
            //(this.state.branches)
            targetUser.user_branches.forEach(element =>{
                tagetBranches.push({value:element.branch_id, label:element.branch_name,id:element.branch_id})
             })
            //(tagetBranches)
            this.setState({branchAdminSelectedOrg:org,
            selectedBranches:tagetBranches,
            modalLoading:true})
        }
        else{
            this.setState({branchAdminSelectedOrg:org,
                branch_opts:[],
                branches:[],
                selectedBranches:[],
                modalLoading:true})
            this.fetchOrgBranches(org.id)
        }
        
    }

    HandleBranchSelect = (branch) =>{
        this.setState({selectedBranches:branch})
    }

    updateRoles = () =>{
        var arg_list = "&u_id="+this.state.selectedUser.id
        var superUser = false
        if(this.state.superuser === "true"){
            superUser = document.getElementById("super").checked
        }     
        
        if(this.state.superuser === "true"){
            var org = document.getElementById("org").checked
        }
        var branch = document.getElementById("branch").checked;
        var branchView = document.getElementById("branchView").checked;
        var revoked = document.getElementById("revoked").checked

        if(org === true && this.state.selectedOrganizations.length === 0){
                this.setState({
                    messageTitle:"No Organization Selected",
                    messageBody:"You have checked Organization Admin Option. Please also select atleast one organization",
                    messageBoxOpen:true
                })
                return
        }

        if(branch === true && (this.state.branchAdminSelectedOrg === null || this.state.selectedBranches.length === 0)){
            this.setState({
                messageTitle:"No Organization/Branch Selected",
                messageBody:"You have checked Branch Admin Option. Please also select atleast one organization and branch",
                messageBoxOpen:true
            })
            return
        }
        if(org === true){
            var orgs = ""
            this.state.selectedOrganizations.forEach(element =>{
                
                orgs = orgs+","+element.id
            })
            orgs = orgs.substring(1)
            arg_list = arg_list + "&is_org=True&orgs="+orgs
        }
        
        if(branch === true){
            var branches = ""
            this.state.selectedBranches.forEach(element =>{
                branches = branches+","+element.id
            })
            arg_list = arg_list+"&is_branch=True"+"&branches="+branches.substring(1)
        }
        if(branchView)
        {
            var viewBranches = ""
            this.state.selectedBranches.forEach(element =>{
                viewBranches = viewBranches+","+element.id
            })
            arg_list = arg_list+"&is_branch_user=True"+"&branches="+viewBranches.substring(1)
        }        //(arg_list)
        if(superUser === true){
            arg_list = arg_list+"&is_super=True"
        }

        if(revoked === true){
            arg_list = arg_list+"&is_revoke=True"
        }
        const cookies = new Cookies();
        var http = new XMLHttpRequest();
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        http.open('POST', url+'/api/user/role?user_id='+user_id, true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send(arg_list)
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                //(http.responseText)
                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    dashboar_ref.setState({
                        messageTitle:"Role Updated",
                        messageBody:"The role for "+dashboar_ref.state.selectedUser.label+" has been successfully updated",
                        messageType:1,
                        messageBoxOpen:true
                    })
                }
                else{
                    dashboar_ref.setState({
                        messageTitle:"Role Could Not Be Updated",
                        messageBody:"The role for "+dashboar_ref.state.selectedUser.label+" could not be updated",
                        messageType:0,
                        messageBoxOpen:true
                    })
                }
            }
            if(http.readyState === 4 && http.status === 401){
                logout()
            }
        }
        http.onerror = function(){
            dashboar_ref.setState({
                messageTitle:"Role Could Not Be Updated",
                messageBody:"The role for "+dashboar_ref.state.selectedUser.label+" could not be updated",
                messageType:0,
                messageBoxOpen:true
            })
        }
        http.ontimeout = function(){
            dashboar_ref.setState({
                messageTitle:"Role Could Not Be Updated",
                messageBody:"The role for "+dashboar_ref.state.selectedUser.label+" could not be updated",
                messageType:0,
                messageBoxOpen:true
            })
        }
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
            if(this.state.superuser === "true"){
                return(
                    <div>
                        <Modal isOpen={this.state.messageBoxOpen}>
                            <ModalHeader>{this.state.messageTitle}</ModalHeader>
                            <ModalBody>
                                <b>{this.state.messageBody}</b>
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={this.closeMessageBox}>Close</Button>
                            </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.editOragizationModalOpen}>
                            <ModalHeader>Change Organization</ModalHeader>
                            
                            <ModalBody>
                            <h6>Organization:</h6>
                            <Select options={this.state.organizations} value={this.state.selectedOrganizations} onChange={this.HandleOrganizationSelect} isMulti={true}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.CloseOrgEditModal}>Close</Button>
                            </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.editBranchModalOpen}>
                            <Loader loading={this.state.modalLoading} />
                            <ModalHeader>
                                Change Branches
                            </ModalHeader>
                            <ModalBody>
                            <h6>Organization:</h6>
                            <SelectList options={this.state.organizations} selectedOption={this.state.branchAdminSelectedOrg} actionHandler={this.HandleBranchAdminOrgSelect}/>
                            <h6 style={{marginTop:10}}>Branches:</h6>
                            <Select options={this.state.branch_opts} value={this.state.selectedBranches} onChange={this.HandleBranchSelect} isMulti={true}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.CloseBranchEditModal}>Close</Button>
                            </ModalFooter>
                        </Modal>
                        <div className="clearfix"  id="page-header">
                                <div>
                                   <Header />
                                   </div>
                            </div>
                                      
                            <div >
                                <SideBar isActive="roles"/>
                            </div>
                            <div id="page-content-wrapper" className="rm-transition">
                            <div id="page-content">
                            <Loader loading={this.state.loading} fullPage={true} />
                            <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-4">
                                    <h2 style={{textAlign:"center"}}>Manage Users</h2>
                                </div>
                                <div className="col-md-4"></div>
                            </div>
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                <h5>Select a User</h5>
                                <SelectList options={this.state.user_options} selectedOption={this.state.selectedUser} actionHandler={this.HandleUserSelect}/>
                           
                                </div>
    
                                <div className="col-md-2"></div>
                            </div>
                            <ReactCSSTransitionGroup transitionName="example">
                            <div hidden={this.state.userDeatilViewHidden}>
                            
                            
                            <div className="row" style={{marginTop:30}}>
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <h3 style={{textAlign:"center"}}>User permissions</h3>
                                <input type="radio" name="permission" value="one" id="super" class="form-radio"  ></input><label className="my-label">Super User</label><br></br>
                                <input type="radio" name="permission" value="one" id="org" class="form-radio" onClick={this.HandleOrgEditClick}></input><label className="my-label">Organizational Admin</label><i hidden={this.state.orgEdit} class="fa fa-edit role-edit" onClick={this.HandleOrgEditClick}></i><br></br>
                                <input type="radio" name="permission" value="branch" id="branch" class="form-radio" onClick={this.HandleBranchRadioClick}></input><label className="my-label">Branch Admin</label><i hidden={this.state.branchEdit} id="branchEdit" class="fa fa-edit role-edit" onClick={this.HandleBranchRadioClick}></i><br></br>
                                <input type="radio" name="permission" value="branch" id="branchView" class="form-radio" onClick={this.HandleBranchViewRadioClick}></input><label className="my-label">Branch User</label><i hidden={this.state.branchViewEdit} id="branchViewEdit" class="fa fa-edit role-edit" onClick={this.HandleBranchViewRadioClick}></i><br></br>
                                <input type="radio" name="permission" value="revoke" id="revoked" class="form-radio" ></input><label className="my-label">User Blocked</label><br></br>
                                <button type="button" className="btn btn-block btn-primary" max-width='100%' onClick={this.updateRoles}>Update User permissions</button>
                            </div>
                            <div className="col-md-2"></div>
                            </div>
                            
                            </div>
                            </ReactCSSTransitionGroup>
    
                            </div>
                            </div>
                    </div>
                )
            }
        }
        if(this.state.organization_admin === "true"){
            return(
                <div>
                    <Modal isOpen={this.state.messageBoxOpen}>
                        <ModalHeader>{this.state.messageTitle}</ModalHeader>
                        <ModalBody>
                            <b>{this.state.messageBody}</b>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={this.closeMessageBox}>Close</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.editBranchModalOpen}>
                        <Loader loading={this.state.modalLoading} />
                        <ModalHeader>
                            Change Branches
                        </ModalHeader>
                        <ModalBody>
                        <h6>Organization:</h6>
                        <SelectList options={this.state.organizations} selectedOption={this.state.branchAdminSelectedOrg} actionHandler={this.HandleBranchAdminOrgSelect}/>
                        <h6 style={{marginTop:10}}>Branches:</h6>
                        <Select options={this.state.branch_opts} value={this.state.selectedBranches} onChange={this.HandleBranchSelect} isMulti={true}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.CloseBranchEditModal}>Close</Button>
                        </ModalFooter>
                    </Modal>
                    <div className="clearfix"  id="page-header">
                            <div>
                               <Header />
                               </div>
                        </div>
                                  
                        <div >
                            <SideBar isActive="roles"/>
                        </div>
                        <div id="page-content-wrapper" className="rm-transition">
                        <div id="page-content">
                        <Loader loading={this.state.loading} fullPage={true} />
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <h2 style={{textAlign:"center"}}>Manage Users</h2>
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                            <h5>Select a User</h5>
                            <SelectList options={this.state.user_options} selectedOption={this.state.selectedUser} actionHandler={this.HandleUserSelect}/>
                       
                            </div>

                            <div className="col-md-2"></div>
                        </div>
                        <ReactCSSTransitionGroup transitionName="example">
                        <div hidden={this.state.userDeatilViewHidden}>
                        
                        
                        <div className="row" style={{marginTop:30}}>
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h3 style={{textAlign:"center"}}>User permissions</h3>
                            <input type="radio" name="permission" value="branch" id="branch" class="form-radio" onClick={this.HandleBranchRadioClick}></input><label className="my-label">Branch Admin</label><i hidden={this.state.branchEdit} id="branchEdit" class="fa fa-edit role-edit" onClick={this.HandleBranchRadioClick}></i><br></br>
                            <input type="radio" name="permission" value="branch" id="branchView" class="form-radio" onClick={this.HandleBranchRadioClick}></input><label className="my-label">Branch View</label><i hidden={this.state.branchView} id="branchViewEdit" class="fa fa-edit role-edit" onClick={this.HandleBranchRadioClick}></i><br></br>
                            <input type="radio" name="permission" value="branch" id="branchView" class="form-radio" onClick={this.HandleBranchViewRadioClick}></input><label className="my-label">Branch User</label><i hidden={this.state.branchViewEdit} id="branchViewEdit" class="fa fa-edit role-edit" onClick={this.HandleBranchViewRadioClick}></i><br></br>
                            <input type="radio" name="permission" value="revoke" id="revoked" class="form-radio" ></input><label className="my-label">User Blocked</label><br></br>
                            <button type="button" className="btn btn-block btn-primary" max-width='100%' onClick={this.updateRoles}>Update User permissions</button>
                        </div>
                        <div className="col-md-2"></div>
                        </div>
                        
                        </div>
                        </ReactCSSTransitionGroup>

                        </div>
                        </div>
                </div>
            )
        }
    }
}

export default RoleManagement;