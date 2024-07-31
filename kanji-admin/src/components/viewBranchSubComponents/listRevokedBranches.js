import React, { Component } from 'react';
import Cookies from 'universal-cookie';
// import '../CSS/assets-minified/all-demo.css'
// import '../CSS/assets-minified/css/bootstrap.min.css'
import Header from '../dashboardSubComponents/header'
import SideBar from '../dashboardSubComponents/sideBarNav'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Loader } from 'react-overlay-loader';
import { url,media_url } from '../helper'
import RevokedOrganizationViewPanel from './rovokedBranchesViewPanel'


class RevokedBranchList extends Component{

    constructor(props){
        super(props)
        this.state={
            loading:false,
            section:0,
            branches:[],
            org_name:null,
            org_id:null,
        }

    }

    componentWillMount = () =>{
        var url_local = window.location.href
        url_local = new URL(url_local);
        var id = url_local.searchParams.get("id");
        var name = url_local.searchParams.get("tag")
        const cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        var branch_admin = cookies.get('branch-admin')
        var superuser = cookies.get('superuser')
        var organization_admin = cookies.get('organization-admin')
      
        console.log(loginStatus)
        if (loginStatus === undefined) {
            window.location = "/login"
        }
        if(branch_admin === 'true'){
            window.location = "/dashboard"
        }

        var http = new XMLHttpRequest();
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        console.log("getting revoked")
        console.log(url+'/api/branch/revoked?user_id='+user_id+"&org_id="+id)
        http.open('GET', url+'/api/branch/revoked?user_id='+user_id+"&org_id="+id, true);
        http.setRequestHeader("Authorization", "Token "+token);
        http.send()
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                console.log(http.responseText)
                if(json.status === 200){
                    if(json.branches.length !== 0){
                    dashboar_ref.setState({
                        loading:false,
                        section:1,
                        org_name:name,
                        org_id:id,
                        branches:json.branches
                    })
                }
                else{
                    dashboar_ref.setState({
                        loading:false,
                        section:2
                    })
                }
                }
                else{
                    dashboar_ref.setState({
                        loading:false,
                        section:2
                    })
                }
            }
            http.onerror = function(){
                dashboar_ref.setState({
                    loading:false,
                    section:2
                })
            }
            http.ontimeout =  function(){
                dashboar_ref.setState({
                    loading:false,
                    section:2
                })
            }
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
            return(
                <div>
                    <Loader loading={this.state.loading} fullPage={true} />
                    <div className="clearfix"  id="page-header">
                            <div>
                               <Header />
                               </div>
                        </div>
                                  
                        <div >
                            <SideBar />
                        </div>
                        <div id="page-content-wrapper" className="rm-transition">
                            <div id="page-content">
                                <div class="example-box-wrapper">
                                <div className="row">
                                    <div className="col-md-12" style={{textAlign:"center"}}><h3>{this.state.org_name+"'s Inactive Branches"}</h3></div>
                                </div>
                                <div className="row">
                                    {/* {this.state.organizations.map((org,i)=><RevokedOrganizationViewPanel key={i} data={org} />)} */}
                                    {this.state.branches.map((branch, i)=><RevokedOrganizationViewPanel key={i} data={branch}/>)}
                                </div>
                        </div>
                        </div>
                </div>
                </div>
            )
        }
        if(this.state.section === 2){
            return(
                <div>
                                        <div className="clearfix"  id="page-header">
                            <div>
                               <Header />
                               </div>
                        </div>
                                  
                        <div >
                            <SideBar />
                        </div>
                        <div id="page-content-wrapper" className="rm-transition">
                            <div id="page-content">
                                <div class="example-box-wrapper">
                                <div className="row">
                                    <div className="col-md-12" style={{textAlign:"center"}}><h3>{"No Inactive Branches"}</h3></div>
                                </div>

                        </div>
                        </div>
                </div>
            </div>
            )
        }
    }
}

export default RevokedBranchList