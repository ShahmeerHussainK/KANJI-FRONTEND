import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { url,logout } from '../helper'
class SideBar extends Component{


    constructor(props){
        super(props)
        this.state = {
            isSuper:false,
            device_count:0,
            dasboard:"",
            roles:"",
            requests:"",
            org:"",
            branch:"",
            isBranchUser:false,
            user:"",
            questions:"",
            response:""
        }
    }

    componentWillMount = () =>{
        const cookies = new Cookies();
        var superuser = cookies.get('superuser')
        var org = cookies.get('organization-admin')
        var branch = cookies.get('branch-admin')
        var branch_user = cookies.get('branch-user')
        if(superuser === 'true'){
           this.setState({
               isSuper:true
           })
        }

        if(org === 'true'){
            this.setState({
                isOrg:true
            })
        }
        if(branch === 'true'){
            this.setState({
                isBranch:true
            })
        }
        if(branch_user === 'true'){
            this.setState({
                isBranchUser:true
            })
        }
        if(this.props.isActive !== undefined){
            if(this.props.isActive === "dashboard"){
                this.setState({
                    dasboard:"sideBarListItem",
                    roles:"",
                    requests:"",
                    org:"",
                    branch:"",
                    user:"",
                    questions:"",
                    response:""
                })
            }
            if(this.props.isActive === "roles"){
                this.setState({
                    dasboard:"",
                    roles:"sideBarListItem",
                    requests:"",
                    org:"",
                    branch:"",
                    user:"",
                    questions:"",
                    response:""
                })
            }
            if(this.props.isActive === "requests"){
                this.setState({
                    dasboard:"",
                    roles:"",
                    requests:"sideBarListItem",
                    org:"",
                    branch:"",
                    user:"",
                    questions:"",
                    response:""
                })
            }
            if(this.props.isActive === "org"){
                this.setState({
                    dasboard:"",
                    roles:"",
                    requests:"",
                    org:"sideBarListItem",
                    branch:"",
                    user:"",
                    questions:"",
                    response:""
                })
            }
            if(this.props.isActive === "branch"){
                this.setState({
                    dasboard:"",
                    roles:"",
                    requests:"",
                    org:"",
                    branch:"sideBarListItem",
                    user:"",
                    questions:"",
                    response:""
                })
            }
            if(this.props.isActive === "user"){
                this.setState({
                    dasboard:"",
                    roles:"",
                    requests:"",
                    org:"",
                    branch:"",
                    user:"sideBarListItem",
                    questions:"",
                    response:""
                })
            }
            if(this.props.isActive === "questions"){
                this.setState({
                    dasboard:"",
                    roles:"",
                    requests:"",
                    org:"",
                    branch:"",
                    user:"",
                    questions:"sideBarListItem",
                    response:""
                })
            }
            if(this.props.isActive === "response"){
                this.setState({
                    dasboard:"",
                    roles:"",
                    requests:"",
                    org:"",
                    branch:"",
                    user:"",
                    questions:"",
                    response:"sideBarListItem"
                })
            }
        }
        // var http = new XMLHttpRequest();
        // var dashboar_ref = this
        // var user_id = cookies.get('user_id')
        // var token = cookies.get('token')
        // http.open('GET', url+'/api/dashboard?user_id='+user_id, true);
        // http.setRequestHeader("Authorization", "Token "+token);

        // http.send()
        // http.onreadystatechange = function(){

        //     if(http.readyState === 4 && http.status === 200) {
        //         var json = JSON.parse(http.responseText)
        //         if(json.status === 200){
        //             var device_c = json.pending_devices_count
        //             dashboar_ref.setState({
        //                 device_count:device_c
        //             })
        //         }
        // }
        // if(http.readyState === 4 && http.status === 401){
        //     logout()
        // }
    }

    render(){
        
        if(this.state.isSuper === true){
            return(
                <div id="page-sidebar" class="rm-transition">
                    <div id="page-sidebar-wrapper">
                        <div id="sidebar-menu">
                        <ul>
                            <li className={this.state.dasboard}>
                                <a href="/dashboard" title="Dashboard">
                                <i className="fa fa-tachometer-alt" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Dashboard</span>
                                </a>
                            </li>
                            <li className={this.state.roles}>
                                <a href="/role-management/" title="Manage Roles">
                                <i class="fa fa-user" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Manage Roles</span>
                                </a>
                            </li>
                            
                            <li className={this.state.requests}>
                                <a href="/device-registeration-requests/" title="Device Regsiteration Requests">
                                <i class="fa fa-mobile-alt" style={{marginLeft:12}}></i>
                        
                                <span style={{marginLeft:18}}>Device Requests <span hidden={this.state.device_count === 0 ? true:false} class="bs-label label-info">{this.state.device_count}</span></span>
                                
                                
                                </a>
                            </li>
                            <li className={this.state.org}>
                                <a href="/create-organization" title="Create Organization">
                                <i class="fa fa-plus" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Create Organization</span>
                                </a>
                            </li>
                            <li className={this.state.branch}>
                                <a href="/create-branch" title="Create Branch">
                                <i class="fa fa-plus" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Create Branch</span>
                                </a>
                            </li>
                            <li className={this.state.user}>
                                <a href="/create-user/" title="Create User">
                                <i class="fa fa-plus" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Create User</span>
                                </a>
                            </li>

                            <li className={this.state.questions}>
                                <a href="/questions" title="Questions">
                                <i className="fa fa-question-circle" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Questions</span>
                                </a>
                            </li>
                            <li className={this.state.response}>
                                <a href="/response-listing/" title="Responses">
                                <i className="fas fa-reply" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Responses</span>
                                </a>
                            </li>
                        </ul>
                        </div>
    
                    </div>
                </div>
            );
        }
        if(this.state.isOrg === true){
            return(
                <div id="page-sidebar" class="rm-transition">
                    <div id="page-sidebar-wrapper">
                        <div id="sidebar-menu">
                        <ul>
                            <li className={this.state.dasboard}>
                                <a href="/dashboard" title="Dashboard">
                                <i className="fa fa-tachometer-alt" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Dashboard</span>
                                </a>
                            </li>
                            <li className={this.state.roles}>
                                <a href="/role-management/" title="Manage Roles">
                                <i class="fa fa-user" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Manage Roles</span>
                                </a>
                            </li>
                            <li className={this.state.requests}>
                            <a href="/device-registeration-requests/" title="Device Regsiteration Requests">
                                <i class="fa fa-mobile-alt" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Device Regsiteration Requests</span>
                                </a>
                            </li>
                            <li className={this.state.branch}>
                                <a href="/create-branch" title="Create Branch">
                                <i class="fa fa-plus" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Create Branch</span>
                                </a>
                            </li>
                            <li className={this.state.user}>
                                <a href="/create-branch-admin/" title="Create Branch Admin">
                                <i class="fa fa-plus" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Create Branch Admin</span>
                                </a>
                            </li>
                            <li className={this.state.questions}>
                                <a href="/questions" title="Question">
                                <i className="fa fa-question-circle" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Questions</span>
                                </a>
                            </li>
                            <li className={this.state.response}>
                                <a href="/response-listing/" title="Responses">
                                <i className="fas fa-reply" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Responses</span>
                                </a>
                            </li>
                        </ul>
                        </div>
    
                    </div>
                </div>
            );
        }
        if(this.state.isBranch === true){
            return(
                <div id="page-sidebar" class="rm-transition">
                    <div id="page-sidebar-wrapper">
                        <div id="sidebar-menu">
                        <ul>
                            <li className={this.state.dasboard}>
                                <a href="/dashboard" title="Dashboard">
                                <i className="fa fa-tachometer-alt" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Dashboard</span>
                                </a>
                            </li>
                            <li className={this.state.requests}>
                            <a href="/device-registeration-requests/" title="Device Regsiteration Requests">
                                <i class="fa fa-mobile-alt" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Device Regsiteration Requests</span>
                                </a>
                            </li>
                            <li className={this.state.questions}>
                                <a href="/questions" title="Questions">
                                <i className="fa fa-question-circle" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Questions</span>
                                </a>
                            </li>
                            <li className={this.state.response}>
                                <a href="/response-listing/" title="Responses">
                                <i className="fas fa-reply" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Responses</span>
                                </a>
                            </li>
                        </ul>
                        </div>
    
                    </div>
                </div>
            );
        }
        if(this.state.isBranchUser === true){
            return(
                <div id="page-sidebar" class="rm-transition">
                    <div id="page-sidebar-wrapper">
                        <div id="sidebar-menu">
                        <ul>
                            <li className={this.state.questions}>
                                <a href="/questions" title="Questions">
                                <i className="fa fa-question-circle" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Questions</span>
                                </a>
                            </li>
                            <li className={this.state.response}>
                                <a href="/response-listing/" title="Responses">
                                <i className="fas fa-reply" style={{marginLeft:12}}></i>
                                <span style={{marginLeft:18}}>Responses</span>
                                </a>
                            </li>
                        </ul>
                        </div>
    
                    </div>
                </div>
            );
        }
    }
}
export default SideBar;


