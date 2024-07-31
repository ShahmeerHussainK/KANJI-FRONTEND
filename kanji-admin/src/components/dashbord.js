import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../CSS/assets-minified/all-demo.css'
import '../CSS/assets-minified/css/bootstrap.min.css'
import '../CSS/assets-minified/fontawesome/css/fontawesome.css'
import OrganizationPanel from './dashboardSubComponents/oraganizationPanel'
import BranchPanel from './dashboardSubComponents/branchPanel'
import DevicePanel from './dashboardSubComponents/devicePanel'
import Header from './dashboardSubComponents/header'
import SideBar from './dashboardSubComponents/sideBarNav'
import DeviceTable from './dashboardSubComponents/deviceTable'
import {url,logout} from './helper'


class Dashboard extends Component{

    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
        this.state={
            "firstname":"",
            "superuser":'',
            "organization_admin":"",
            "branch_admin":"",
            "organization":"",
            "branches":"",
            "device_count":null,
            "devices":[],
            "section":2,
            "pending_device_count":0,
            SideBarOpen:true
        }
        this.fetch = this.fetch.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    componentWillMount = () =>{
        const cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        if (loginStatus === undefined){
            window.location = '/login'
        }
        else{
            this.fetch()
            var fname = cookies.get('firstname')
            var superuser = cookies.get('superuser')
            var organization_admin = cookies.get('organization-admin')
            var branch_admin = cookies.get('branch-admin')
            this.setState({
                firstname:fname,
                superuser:superuser,
                organization_admin:organization_admin,
                branch_admin:branch_admin
            })
        }
    }

    fetch = () => {
        const cookies = new Cookies();
        var http = new XMLHttpRequest();
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        http.open('GET', url+'/api/dashboard?user_id='+user_id, true);
        console.log(url)
        http.setRequestHeader("Authorization", "Token "+token);

        http.send()
        // http.setRequestHeader('Authorization','Token '+token)
        http.onreadystatechange = function(){

            if(http.readyState === 4 && http.status === 200) {
                console.log(this.responseText)
                var json = JSON.parse(http.responseText )
                if(json.status === 200){
                    console.log(json.total_devices)
                    var branch = null   
                    var device_c = null
                    if(json.total_orgs){
                        var orgs = json.total_orgs
                    }
                    else{
                        var orgs = 0
                    }
                    if(json.org_name){
                       orgs = json.org_name
                    }
                    
                    if(json.total_branches){
                        branch = json.total_branches
                    }
                    else{
                        branch = 0
                    }
                    if(json.branch_name){
                        branch = json.branch_name
                    }
                    
                    if(json.total_devices){
                        device_c = json.total_devices
                    }
                    else{
                        device_c = 0
                    }
                    console.log("&&&&&")
                    console.log(json)
                    dashboar_ref.setState({
                        "organization":orgs,
                        "branches":branch,
                        "devices":json.device_list,
                        "device_count":device_c,
                        "pending_device_count":json.pending_device_count
                    })
                    console.log("on set "+json.total_devices)
                }
        }
        if(http.readyState === 4 && http.status === 401){
            logout()
        }
        
    }
}

    logout = () =>{
        const cookies = new Cookies();
        cookies.remove('loggedIn')
        window.location = '/'
    }

    toggle = () =>{
        this.setState({
            SideBarOpen:!this.state.SideBarOpen
        })
    }

    render(){
        if (this.state.superuser === 'true')
        {
            return(
                <div>
                         
                               <div className="clearfix"  id="page-header">
                               <div>
                                   <Header toggle={this.toggle}/>
                               </div>
                           </div>
                          
                       <div >
                           <SideBar SideBarOpen={this.state.SideBarOpen}  device_count={this.state.pending_device_count}/>
                        </div> 
                               
               
                        <div id="page-content-wrapper" className="rm-transition">
                           <div id="page-content">
                              <OrganizationPanel orgTitle={this.state.organization}/>
                              <BranchPanel  title={this.state.branches} header={"Branches"}/>
                               <DevicePanel title={this.state.device_count} header={"Devices"}/>
                               <DeviceTable devices={this.state.devices}/>
                            </div>
               
                       </div>
                           
               </div>
                       )
        }

        if(this.state.organization_admin === 'true'){
            return(
         <div>
            <div className="clearfix"  id="page-header">
                  <Header /> 
                </div>
                          
            <div >
                <SideBar device_count={this.state.pending_device_count}/>
             </div>   
               
            <div id="page-content-wrapper" className="rm-transition">
                    <div id="page-content">
                        <OrganizationPanel orgTitle={this.state.organization}/>
                        <BranchPanel  title={this.state.branches} header={"Branches"}/>
                        <DevicePanel title={this.state.device_count} header={"Devices"}/>
                        <DeviceTable devices={this.state.devices}/>
                    </div>
               
             </div>
                           
        </div>
     )
     }

        if(this.state.branch_admin === 'true'){
            console.log("devs "+this.state.device_count)
            return(
                <div>
                    <div className="clearfix"  id="page-header">
                       
                    <Header />
                       
                    </div>      
                    <div >
                        <SideBar device_count={this.state.pending_device_count}/>
                    </div>   
               
                <div id="page-content-wrapper" className="rm-transition">
                    <div id="page-content">
                      <BranchPanel title={this.state.branches} header={"Branch"}/>
                      <DevicePanel title={this.state.device_count} header={"Devices"}/>
                      <DeviceTable devices={this.state.devices}/>
                    </div>
                 </div>
                           
               </div>
                       )
        }
        
  
        
}
}

export default Dashboard