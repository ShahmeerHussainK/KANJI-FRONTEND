import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import BranchViewPanel from './branchViewPanel'

class BranchPanelGroup extends Component{

    constructor(props){
        super(props)
        this.state = {
            isAdmin:'',
            isOrgAdmin:'',
            isBranchAdmin:'',
        }
    }

    componentWillMount = () =>{
        var cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        if (loginStatus === undefined) {
            window.location = '/login'
        }
        var branch_admin = cookies.get('branch-admin')
        var organization_admin = cookies.get('organization-admin')
        var superuser = cookies.get('superuser')
        this.setState({
            isAdmin:superuser,
            isOrgAdmin:organization_admin,
            isBranchAdmin:branch_admin
        })
    }



    render(){
       if(this.state.isAdmin === 'true' | this.state.isOrgAdmin === 'true'){
           //(this.props.data.org_name)
        return(
            <div>
                <div className="row">
                    <div className="col-md-6"><h1>{this.props.data.org_name}</h1></div>
                    <div className="col-md-6">
                    </div>
                </div>
                <div className="row">
               
                {this.props.data.branches.map((branch,i)=> <BranchViewPanel key={i} data={branch} isBranchAdmin={false} orgName={this.props.data.org_name}/>)}
                </div>
            </div>
        )
       }
       if(this.state.isBranchAdmin === 'true'){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12"><h1>{this.props.data.org_name}</h1></div>
                </div>
                <div className="row">
                    {this.props.data.branches.map((branch,i)=> <BranchViewPanel key={i} data={branch} isBranchAdmin={true}/>)}
                </div>
            </div>
        )
       }
    }

}

export default BranchPanelGroup