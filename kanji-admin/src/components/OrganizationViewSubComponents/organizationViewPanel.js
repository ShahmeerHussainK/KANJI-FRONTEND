import React, { Component } from 'react';
import { url,media_url } from '../helper'


class organizationViewPanel extends Component{

    constructor(props){
        super(props)
        this.HandleEditClick = this.HandleEditClick.bind(this)
        this.HandleDeleteClick.bind(this)
    }


    HandleEditClick = (e) =>{
        console.log(e)
        var id = e.target.id
        console.log(id)
        this.props.triggerEdit(id)
    }

    HandleDeleteClick = (e) =>{
        var id = e.target.id
        this.props.triggerDelete(id)
    }
    
    render(){
       if(this.props.userType === 'super'){
        return(
            
            <div class="col-md-6" id={this.props.data.organisation_id}>
           <div class="panel-layout">
               <div class="panel-box col-xs-4 bg-green">
                   <div class="panel-content">
                   <img id={"logo"+this.props.data.organisation_id} src={media_url+this.props.data.organisation_logo} alt="" class="org_logo" ></img>
                   </div>
               </div>
               <div class="panel-box col-xs-8">


                   <div class="panel-content  bg-black">
                       <div class="sparkline-big">
                       <a href={"/list-branches/?id="+this.props.data.organisation_id+"&tag="+this.props.data.organisation_name} className="org_title">
                       <h3 className="organizationName" id={"name"+this.props.data.organisation_id}>{this.props.data.organisation_name}</h3>
                       </a>
                       {/* <h6 className="organizationName">Daft Dimbo</h6> */}
                       </div>
                   </div>
                   <div class="panel-content bg-white">
                       <div class="center-vertical">

                           <ul class="center-content nav nav-justified">
                           
                               <li>
                               
                               <a>
                                       <i class="glyph-icon opacity-60"></i>
                                       <a > <h4 id={this.props.data.organisation_id}  onClick={this.HandleEditClick} class="font-back glyph-icon icon-edit org_opt_btn">Edit</h4></a>
                                   </a>
                               </li>
                               <li>
                                   <a>
                                       <i class="glyph-icon opacity-60"></i>
                                       <a><h4 id={this.props.data.organisation_id} onClick={this.HandleDeleteClick} class="font-back glyph-icon icon-remove org_opt_btn">Delete</h4></a>
                                   </a>
                                   {/* <p class="font-gray">Pending orders</p> */}
                               </li>
                           </ul>

                       </div>
                   </div>

               </div>
           </div>
       </div>
       
   )
       }
       if(this.props.userType === 'org'){
        return(
            
            <div class="col-md-6" id={this.props.data.organisation_id}>
           <div class="panel-layout">
               <div class="panel-box col-xs-4 bg-green">
                   <div class="panel-content">
                   <img src={media_url+this.props.data.organisation_logo} alt="" className="org_logo" ></img>
                   </div>
               </div>
               <div class="panel-box col-xs-8">

                   {/* <div class="panel-content  bg-black">
                       <div class="sparkline-big">
                       <h6>Metrol</h6>
                       </div>
                   </div> */}
                   <div class="panel-content  bg-black">
                       <div class="sparkline-big">
                       <a href={"/list-branches/?id="+this.props.data.organisation_id} className="org_title_0" >
                       <h3 className="organizationName" id={"name"+this.props.data.organisation_id}>{this.props.data.organisation_name}</h3>
                       </a>
                       {/* <h6 className="organizationName">Daft Dimbo</h6> */}
                       </div>
                   </div>
                   <div class="panel-content bg-black">
                       <div class="center-vertical">
                       </div>
                   </div>

               </div>
           </div>
       </div>
       
   )
       }
    }
}

export default organizationViewPanel;