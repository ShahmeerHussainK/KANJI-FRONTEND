import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from './dashboardSubComponents/header'
import SideBar from './dashboardSubComponents/sideBarNav'
import BranchViewPanel from './viewBranchSubComponents/branchViewPanel'
import { Loader } from 'react-overlay-loader';
import { url,logout } from './helper'

class ListBranches extends Component{
    constructor(props){
        super(props)
        this.state={
            branches:null,
            org_id:null,
            org_name:null,
            section:0,
            loading:true,
            isBranchAdmin:false,
            inactive_branch_count:0,
        }
    }

    componentWillMount = () =>{
        var url_local = window.location.href
        url_local = new URL(url_local);
        var id = url_local.searchParams.get("id");
        var name = url_local.searchParams.get("tag")
        console.log("go nuts")
        var cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        if (loginStatus === undefined) {
            window.location = '/login'
        }
        var branch_admin = cookies.get('branch-admin')
        if(branch_admin === 'true'){
            window.location = '/dashboard'
            this.setState({isBranchAdmin:true})
        }

        var organization_admin = cookies.get('organization-admin')
        var superuser = cookies.get('superuser')
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        var global_ref = this
        this.setState({
            isAdmin:superuser,
            isOrgAdmin:organization_admin,
            isBranchAdmin:branch_admin
        })

        var http = new XMLHttpRequest();
        http.open('GET',url+'/api/branch?user_id='+user_id+'&org_id='+id, true)
        http.setRequestHeader("Authorization", "Token "+token);
        http.send()
        console.log(url+'/api/branch?user_id='+user_id+'&org_id='+id)
        http.onreadystatechange = function(){
            if(http.status === 200 && http.readyState === 4){
                
                var json = JSON.parse(http.responseText)
                console.log(http.responseText)
                if(json.status === 200){
                   if(json.branches.length !== 0){
                    global_ref.setState({
                        branches:json.branches,
                        org_id:json.branches[0].organisation_id,
                        org_name:json.branches[0].organisation_name,
                        loading:false,
                        section:1
                    })
                   }
                
                   else{
                       global_ref.setState({
                           loading:false,
                           section:2
                       })
                   }
                   global_ref.setState({
                    inactive_branch_count:json.inactive_branch_count,
                    org_id:id,
                    org_name:name
                })
                }
               
            }   
            if(http.readyState === 4 && http.status === 401){
                logout()
            }
        }
    }

    create_branch = () =>{
        window.location="/create-branch"
    }

    render(){
       if(this.state.section === 0){
        return(
            <div>
                <Loader loading={this.state.loading} fullPage={true} />
            </div>
        )
       }
       if(this.state.section === 1){
        console.log(typeof this.state.isBranchAdmin)
          if(this.state.isBranchAdmin === 'false'){
              console.log("aint no branch admin i tell you that")
            return(
                <div>
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
            <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                    <h1 style={{textAlign:"center"}}>{this.state.org_name+"'s Branches"}</h1>
                    </div>
                    <div className="col-md-4">
                    {/* <button class="btn btn-blue-alt fetch_questions" id="btn" style={{margin:0, width:150,float:"right"}} onClick={this.create_branch.bind(this)} ><i class="fa fa-plus"   style={{marginRight:5}}></i><b>Create Branch</b></button> */}
                    <a class="create-org-btn" onClick={this.create_organization}>
                        <span class="fa fa-plus" style={{ color: "white" }}></span><b onClick={this.create_branch.bind(this)}>Create Branch</b>
                    </a>
                    <a href={"/list-revoked-branches/?id="+this.state.org_id+"&tag="+this.state.org_name} class="notification" hidden={this.state.inactive_branch_count === 0}>
                        <span>Inactive Branch</span>
                        <span class="badge">{this.state.inactive_branch_count}</span>
                    </a>
                    </div>
                </div>
                <div className="row">
                {this.state.branches.map((branch,i)=> <BranchViewPanel key={i} data={branch} isBranchAdmin={false} orgName={this.state.org_name}/>)}
                </div>  
            </div>
            </div>
                </div>
               
            )
          }
          else{
            return(
                <div>
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
            <div className="row">
                    <div className="col-md-12">
                    <h1 style={{textAlign:"center"}}>{this.state.org_name+"'s Branches"}</h1>
                    </div>
                </div>
                <div className="row">
                {this.state.branches.map((branch,i)=> <BranchViewPanel key={i} data={branch} isBranchAdmin={true} orgName={this.state.org_name}/>)}
                </div>  
            </div>
            </div>
                </div>
               
            )
          }
       }
       if(this.state.section === 2){
        return(
            <div>
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
        <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                    <h1 style={{textAlign:"center"}}>No Branches</h1>
                    </div>
                    <div className="col-md-4">
                    {/* <button class="btn btn-blue-alt fetch_questions" id="btn" style={{margin:0, width:150,float:"right"}} onClick={this.create_branch.bind(this)} ><i class="fa fa-plus"   style={{marginRight:5}}></i><b>Create Branch</b></button> */}
                    <a class="create-org-btn" onClick={this.create_organization}>
                        <span class="fa fa-plus" style={{ color: "white" }}></span><b onClick={this.create_branch.bind(this)}>Create Branch</b>
                    </a>
                    <a href={"/list-revoked-branches/?id="+this.state.org_id+"&tag="+this.state.org_name} class="notification" hidden={this.state.inactive_branch_count === 0}>
                        <span>Inactive Branches</span>
                        <span class="badge">{this.state.inactive_branch_count}</span>
                    </a>
                    </div>
                </div>
            <div className="row">
            
            </div>  
        </div>
        </div>
            </div>
           
        )
       }
    }
}

export default ListBranches