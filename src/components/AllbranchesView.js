import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from './dashboardSubComponents/header'
import SideBar from './dashboardSubComponents/sideBarNav'
import {  Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Loader } from 'react-overlay-loader';
import { url,logout } from './helper'
import BranchPanelGroup from './viewBranchSubComponents/branchViewPanelGroup'
import BottomScrollListener  from 'react-bottom-scroll-listener'
import loadingGif from '../CSS/assets-minified/images/loadingMore.gif'

class BranchView extends Component{
    constructor(props){
        super(props)

        this.state = {
            isAdmin:'',
            isOrgAdmin:'',
            isBranchAdmin:'',
            loading:true,
            section:0,
            createBranchModalOpen:false,
            all_branches:[],
            contentLoaderHidden:true,
            currentPage:1,
            hasNext:false
        }
        // this.create_branch = this.create_branch(this)
        this.loadMore = this.loadMore.bind(this)
    }

    componentWillMount = () =>{
        var cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        if (loginStatus === undefined) {
            window.location = '/login'
        }
        var branch_admin = cookies.get('branch-admin')
        if(branch_admin === 'true'){
            // window.location = '/dashboard'
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
        http.open('GET',url+'/api/branch?user_id='+user_id, true)
        http.setRequestHeader("Authorization", "Token "+token);
        http.send()

        http.onreadystatechange = function(){
            if(http.status === 200 && http.readyState === 4){
                
                var json = JSON.parse(http.responseText)
                console.log(json)
                if(json.status === 200){
                    var data = []
                    json.organisations.forEach(element =>{
                        if(element.branches !== undefined){
                            data.push(element)
                        }
                    })
                    global_ref.setState({
                        all_branches:data,
                        section:1
                    })
                }
               
            }   
            if(http.readyState === 4 && http.status === 401){
                logout()
            }
        }
    }

    loadMore = () =>{
        if(this.state.hasNext === true){
            this.setState({
                currentPage:this.state.currentPage + 1,
                contentLoaderHidden:false
            })
            var cookies = new Cookies();
            var user_id = cookies.get('user_id')
            var token = cookies.get('token')
            var global_ref = this
           
            var http = new XMLHttpRequest();
            http.open('GET',url+'/api/branch?user_id='+user_id, true)
            http.setRequestHeader("Authorization", "Token "+token);
            http.send()

            http.onreadystatechange = function(){
                if(http.status === 200 && http.readyState === 4){
                    
                    var json = JSON.parse(http.responseText)
                    
                    if(json.status === 200){
                       
                        
                        global_ref.setState({
                            // all_branches:data,
                            contentLoaderHidden:true,
                            hasNext:json.has_next,
                        })
                        json.organisations.forEach(element =>{
                            if(element.branches !== undefined){
                                global_ref.setState(prevState => ({
                                    all_branches: [...prevState.all_branches, element]
                                  }))
                            }
                        })
                    }
                
                }   
                if(http.readyState === 4 && http.status === 401){
                    logout()
                }
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
            if(this.state.isAdmin === 'true' | this.state.isOrgAdmin === 'true'){
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
                        <Modal isOpen={this.state.createBranchModalOpen}>
                            <ModalHeader>Create Branch</ModalHeader>
                            <ModalBody>
                            <form >
                                <div className="form-group">
                                    <label for="branchName">Branch Name</label>
                                    <input type="text" className="form-control" id="branchName" placeholder="Enter Branch Name"></input>
                                </div>
                                
                                <div className="form-group">
                                
                                    <label for="branchAddress">Branch Address</label>
                                    <input type="text" className="form-control" id="branchAddress" placeholder="Enter Branch Address"></input>
                                </div>
        
                                <div className="form-group">
                                    <label for="GPSLocation">Email address</label>
                                    <input type="text" className="form-control" id="GPSLocation" placeholder="Enter Branch GPS Location"></input>
                                </div>
        
                                <div className="form-group">
                                    <label for="GPSLocation">Email address</label>
                                    <input type="text" className="form-control" id="GPSLocation" placeholder="Enter Branch Name"></input>
                                </div>
        
                            </form>
                            </ModalBody>
                        </Modal>
                        {/* <BranchPanelGroup data={this.state.all_branches}/> */}
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4"><h1 style={{textAlign:"center"}}>All Branches</h1></div>
                            <div className="col-md-4">
                            <button class="btn btn-blue-alt fetch_questions" id="btn" style={{margin:0, width:150,float:"right"}} onClick={this.create_branch.bind(this)} ><i class="fa fa-plus"   style={{marginRight:5}}></i><b>Create Branch</b></button>
                            </div>
                        </div>
                 
                        {this.state.all_branches.map((branch,i)=> <BranchPanelGroup key={i} data={branch}/>)}
                        
                   
                        {/* <BranchPanelGroup /> */}
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
                        {/* <BranchPanelGroup data={this.state.all_branches}/> */}
                        <div className="row">
                            {/* <div className="col-md-4"></div> */}
                            <div className="col-md-12"><h1 style={{textAlign:"center"}}>All Branches</h1></div>

                        </div>
                        
                        {this.state.all_branches.map((branch,i)=> <BranchPanelGroup key={i} data={branch}/>)}
                     
                        {/* <BranchPanelGroup /> */}
                        </div>
                        </div>
                            
        
                </div>
                   )
            }
        }
    }
}

export default BranchView