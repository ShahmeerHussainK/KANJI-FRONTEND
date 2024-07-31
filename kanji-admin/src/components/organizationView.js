import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../CSS/assets-minified/all-demo.css'
import '../CSS/assets-minified/css/bootstrap.min.css'
import Header from './dashboardSubComponents/header'
import SideBar from './dashboardSubComponents/sideBarNav'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Loader } from 'react-overlay-loader';
import OrganizationViewPanel from './OrganizationViewSubComponents/organizationViewPanel'
import { url,media_url,logout } from './helper'
import update from 'react-addons-update';


class OrganizationList extends Component{

    constructor(props){
        super(props)
        this.state={
            super_admin:'',
            org_admin:'',
            "org_list":[
                {"organisation_name":"Metrol"},{"organisation_name":"Duke"},{"organisation_name":"HHM"}
            ],
            section:0,
            editModalOpen:false,
            editTarget:{"org_name":"fake","org_logo":"logo"},
            editImageChanged:false,
            deleteModalOpen:false,
            deleteTarget:{"org_id":"id"},
            editCurrentImg:"https://res.cloudinary.com/argon-tech/image/upload/v1532955025/kncikwliledqmw1nlqih.jpg",
            loading:false,
            message_title:"",
            message_body:"",
            message_type:1,
            message_box_open:false,
            FileErrorHidden:true,
            inactive_count:0,
            org_days:1,
        }
        this.create_organization = this.create_organization.bind(this)
        this.search_target_organization = this.search_target_organization.bind(this)
        this.OpenFileBrowser = this.OpenFileBrowser.bind(this)
        this.changePreviewImg = this.changePreviewImg.bind(this)
        this.hasExtension = this.hasExtension.bind(this)
        this.update_organization = this.update_organization.bind(this)
        this.close_message_box_modal = this.close_message_box_modal.bind(this)
        this.close_edit_modal = this.close_edit_modal.bind(this)
        this.triggerOrgDeletion = this.triggerOrgDeletion.bind(this)
        this.close_delete_modal = this.close_delete_modal.bind(this)
        this.delete_organization = this.delete_organization.bind(this)
        this.handleNameInputChange = this.handleNameInputChange.bind(this)
        this.handleDaysInputChange = this.handleDaysInputChange.bind(this)
    }

   componentWillMount = () =>{
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
    this.setState({
        super_admin:superuser,
        org_admin:organization_admin
    })
    var http = new XMLHttpRequest();
    var dashboar_ref = this
    var user_id = cookies.get('user_id')
    var token = cookies.get('token')
    console.log(url+'/api/organisation?user_id='+user_id)
    http.open('GET', url+'/api/organisation?user_id='+user_id, true);
    http.setRequestHeader("Authorization", "Token "+token);
    
    http.onreadystatechange = function(){
        if(http.readyState === 4 && http.status === 200) {
            var json = JSON.parse(http.responseText )
            console.log(http.responseText)
            if(json.status === 200){
                
                dashboar_ref.setState({
                    "org_list":json.organisations,
                    inactive_count:json.inactive_orgs_count,
                    section:1
                })
            }
            else{
                dashboar_ref.setState({
                    inactive_count:json.inactive_orgs_count,
                    section:2
                })
            }
        }
        if(http.readyState === 4 && http.status === 401){
            logout()
        }
    }

    http.send()
    
   }

   handleNameInputChange = () =>{
    var input = document.getElementById('org_name').value
    console.log(input)
        this.setState({
            org_name:input
        })
   }

   handleDaysInputChange = () =>{
    var input = document.getElementById("org_days").value
    this.setState({
        org_days:input
    })
}

   create_organization = () =>{
       window.location = "/create-organization"
   }

   close_edit_modal = () =>{
    this.setState({editModalOpen:false})
   }
   close_delete_modal = () =>{
       this.setState({deleteModalOpen:false})
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

   update_organization = (event) =>{
    event.preventDefault()
    // var form = document.getElementById('orgData');
    // // console.log(form)
    // var formData = new FormData(form);
    // console.log(formData)
    this.setState({
        loading:true,
        editModalOpen:false
    })
    var cookies = new Cookies();
    var user_id = cookies.get('user_id')
    var token = cookies.get('token')
    var global_ref = this
    var fileInput = null
    var file = null
    if(this.state.editImageChanged === true){
        fileInput = document.getElementById('logo');
        var file = fileInput.files[0];
    }
    var nameInput = document.getElementById('org_name').value
    var formData = new FormData();
    formData.append('org_logo', file);
    formData.append('org_name', nameInput);
    formData.append('days',this.state.org_days)
    formData.append('user_id',user_id)
    console.log("@@@@")
    console.log(this.state.editTarget.organisation_id)
    formData.append('org_id',this.state.editTarget.organisation_id)
    var http = new XMLHttpRequest();
    http.open('PUT', url+'/api/organisation', true);
    http.setRequestHeader("Authorization", "Token " + token);
    console.log(nameInput)
    console.log(fileInput)
    console.log(file)
    http.send(formData);

    http.onreadystatechange = function (){
        if (http.readyState === 4 && http.status === 200) {
            var json = JSON.parse(http.responseText)
            console.log(json)
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            if(json.status === 200){
                var id = ''+global_ref.state.editTarget.organisation_id
                console.log("name"+id)
                document.getElementById("name"+id).innerHTML = json.organisation_name
                // global_ref.setState({editTarget:json.organisation_name})
             
                var count = 0;
                global_ref.state.org_list.forEach(element =>{
                      
                    if(element.organisation_id === global_ref.state.editTarget.organisation_id){
                        console.log("--------")
                        console.log("found the bitch")
                        console.log(global_ref.state.org_list[count])
                        // global_ref.setState({
                        //     ...global_ref.state.org_list[count],
                        //     organization_name:"test"
                        // })
                        global_ref.state.org_list[count].organisation_name = json.organisation_name
                        global_ref.state.org_list[count].organisation_logo = json.organisation_logo
                        global_ref.state.org_list[count].days_to_delete_photos = json.days_to_delete_photos
                        global_ref.forceUpdate()
                    }
                    console.log(count)
                    count++;
                })

                document.getElementById("logo"+id).setAttribute("src",media_url+json.organisation_logo)
                global_ref.setState({loading:false})
            }
            else{
                global_ref.setState({
                    loading:false,
                    message_title:"Error",
                    message_body:"Organization could not be updated",
                    message_type:2,
                    message_box_open:true
                })
            }
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

    delete_organization = () =>{
        var id = ""+this.state.deleteTarget.organisation_id
        // document.getElementById(id).outerHTML = "";
        this.setState({
            loading:true,deleteModalOpen:false
        })
        var cookies = new Cookies();
        var http = new XMLHttpRequest();
        var global_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        http.open('DELETE', url+'/api/organisation?user_id='+user_id+'&org_id='+id, true);
        http.setRequestHeader("Authorization", "Token "+token);
        http.send()
        http.onreadystatechange = function(){
            if (http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)
                if(json.status === 204){
                    document.getElementById(id).outerHTML = "";
                    global_ref.setState({
                        loading:false
                    })
                }
                else{
                    global_ref.setState({
                        loading:false,
                        message_title:"Error",
                        message_body:"Organization could not be deleted",
                        message_type:2,
                        message_box_open:true
                    })
                }

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

   hasExtension = (inputID, exts) => {
    var fileName = document.getElementById(inputID).value;
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }
   
   search_target_organization = (id) =>{
    console.log(id)
    this.state.org_list.forEach(element =>{
        if(''+element.organisation_id === id){
            console.log("*****")
            console.log(element)
            
            this.setState({
                editTarget:element,
                editModalOpen:true,
                org_name:element.organisation_name,
                org_days:element.days_to_delete_photos
            })
        }
    })
   }

   triggerOrgDeletion = (id) =>{
    this.state.org_list.forEach(element =>{
        if(''+element.organisation_id === id){
            this.setState({
                deleteTarget:element,
                deleteModalOpen:true,
                message_title:"Delete Organization",
                message_body:"Are you sure you want to delete "+element.organisation_name+"?"
            })
        }
    })
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
        console.log('selected')
        var input = document.getElementById('logo')
        if(!this.hasExtension('logo',['.jpg','.png','.bmp','.JPG','jpeg','JPEG','.PNG','.BMP'])){
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
            var reader = new FileReader();
    
            reader.onload = function (e) {
                console.log(e.target.result)
                document.getElementById('logoThumbnail').setAttribute('src',e.target.result)
            };
            this.setState({
                editImageChanged:true
            })
            reader.readAsDataURL(input.files[0]);
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
           if(this.state.super_admin === 'true'){
            return(
                <div>
                    <Loader loading={this.state.loading} fullPage={true} />
                    <Modal isOpen={this.state.message_box_open}>
                    <ModalHeader>{this.state.message_title}</ModalHeader>
                    <ModalBody>{this.state.message_body}</ModalBody>
                    <ModalFooter><Button color="primary" onClick={this.close_message_box_modal}>Close</Button></ModalFooter>
                    </Modal>
                    {/* question edit modal */}
                    <Modal isOpen={this.state.editModalOpen}>
                        <ModalHeader>Edit Organization</ModalHeader>
                        <ModalBody>
                        <form id="orgData">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"><h3>Organization Name</h3></label>
                                        <input type="text" class="form-control" id="org_name" value={this.state.org_name} placeholder="Enter organization name" onChange={this.handleNameInputChange}></input>
                                    </div>
                                    <div class="form-group">
                                        <label><h3>Days To Delete Photos After</h3></label>
                                        <input type="number" class="form-control" id="org_days" value={this.state.org_days} placeholder="Specify number of days after which photos will be delete from the device" onChange={this.handleDaysInputChange}></input>
                                    </div>
                                    <label for="exampleInputFile"><h3>Logo</h3></label>
                                    <div class="form-group ">
                                        {/* <input type="file" id="logofile"></input> */}
                                        <div class="thumbnail">
                                        <img id='logoThumbnail' src={media_url+this.state.editTarget.organisation_logo}></img>
                                        <h3 onClick={this.OpenFileBrowser}>Update</h3>
                                        <input type="file" id="logo" hidden={true} onChange={this.changePreviewImg}/>
                                    </div>
                                    <p class="isa_error" hidden={this.state.FileErrorHidden}><i class="fa fa-times-circle"></i>{this.state.message_body}</p>
                                    </div>
                                    
                                </form>
                        </ModalBody>
                        <ModalFooter>
                        <Button onClick={this.close_edit_modal} >Cancel</Button>
                        <Button color="primary" onClick={this.update_organization}>Update</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.deleteModalOpen}>
                    <ModalHeader>{this.state.message_title}</ModalHeader>
                    <ModalBody>{this.state.message_body}</ModalBody>
                    <ModalFooter>
                        <Button onClick={this.close_delete_modal}>Cancel</Button>
                        <Button color="primary" onClick={this.delete_organization}>Delete</Button>
                    </ModalFooter>
                    </Modal>
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
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                    <h2 style={{textAlign:"center"}}> Organizations</h2>
                    </div>
                    <div className="col-md-4">
    
                    <a  class="create-org-btn" onClick={this.create_organization}>
                    <span class="fa fa-plus" style={{color:"white"}}></span><b onClick={this.create_organization}>Create Organization</b>
                        </a>
                    <a href={"/list-revoked-organizations/"} class="notification" hidden={this.state.inactive_count === 0}>
                        <span>Inactive Organizations</span>
                        <span class="badge">{this.state.inactive_count}</span>
                        </a>
                    </div>
                   </div>
                               
                        <div className="row" style={{marginTop:30}}>
                        
                        {this.state.org_list.map((org,i)=><OrganizationViewPanel key={i} data={org} triggerEdit={this.search_target_organization} triggerDelete={this.triggerOrgDeletion} userType='super'/>)}
                        </div>
                    </div>
                                </div>
                   
                           </div>
                    
                 </div>
            )
           }
           if(this.state.org_admin === 'true'){
            return(
                <div>
                    <Loader loading={this.state.loading} fullPage={true} />
                    <Modal isOpen={this.state.message_box_open}>
                    <ModalHeader>{this.state.message_title}</ModalHeader>
                    <ModalBody>{this.state.message_body}</ModalBody>
                    <ModalFooter><Button color="primary" onClick={this.close_message_box_modal}>Close</Button></ModalFooter>
                    </Modal>
                    {/* question edit modal */}
                    <Modal isOpen={this.state.editModalOpen}>
                        <ModalHeader>Edit Organization</ModalHeader>
                        <ModalBody>
                        <form id="orgData">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"><h3>Organization Name</h3></label>
                                        <input type="text" class="form-control" id="org_name" value={this.state.org_name} placeholder="Enter organization name" onChange={this.handleNameInputChange}></input>
                                    </div>
                                    <label for="exampleInputFile"><h3>Logo</h3></label>
                                    <div class="form-group ">
                                        {/* <input type="file" id="logofile"></input> */}
                                        <div class="thumbnail">
                                        <img id='logoThumbnail' src={media_url+this.state.editTarget.org_logo}></img>
                                        <h3 onClick={this.OpenFileBrowser}>Update</h3>
                                        <input type="file" id="logo" hidden={true} onChange={this.changePreviewImg}/>
                                    </div>
                                    <p class="isa_error" hidden={this.state.FileErrorHidden}><i class="fa fa-times-circle"></i>{this.state.message_body}</p>
                                    </div>
                                    
                                </form>
                        </ModalBody>
                        <ModalFooter>
                        <Button onClick={this.close_edit_modal} >Cancel</Button>
                        <Button color="primary" onClick={this.update_organization}>Update</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.deleteModalOpen}>
                    <ModalHeader>{this.state.message_title}</ModalHeader>
                    <ModalBody>{this.state.message_body}</ModalBody>
                    <ModalFooter>
                        <Button onClick={this.close_delete_modal}>Cancel</Button>
                        <Button color="primary" onClick={this.delete_organization}>Delete</Button>
                    </ModalFooter>
                    </Modal>
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
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                    <h2 style={{textAlign:"center"}}>Organizations</h2>
                    </div>
                    <div className="col-md-4"></div>
                   </div>
                        <div className="row" style={{marginTop:30}}>
                        
                        {this.state.org_list.map((org,i)=><OrganizationViewPanel key={i} data={org} triggerEdit={this.search_target_organization} triggerDelete={this.triggerOrgDeletion} userType='org'/>)}
                        </div>
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
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                    <h3 style={{textAlign:"center"}}>No Organizations</h3>
                    </div>
                    <div className="col-md-4">
    
                    <a  class="create-org-btn" onClick={this.create_organization}>
                    <span class="fa fa-plus" style={{color:"white"}}></span><b onClick={this.create_organization}>Create Organization</b>
                        </a>
                    <a href={"/list-revoked-organizations/"} class="notification" hidden={this.state.inactive_count === 0}>
                        <span>Inactive Organizations</span>
                        <span class="badge">{this.state.inactive_count}</span>
                        </a>
                    </div>
                   </div>
                   </div>
               </div>
               </div>
               </div>
           )
        }
    }
}

export default OrganizationList