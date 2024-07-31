import React, { Component } from 'react';
import '../helper'

class OrganizationPanel extends Component{



    constructor(props){
        super(props)
        this.seeOrganizations = this.seeOrganizations.bind(this)
    }

    seeOrganizations = () =>{
        window.location('/view-organization')

    }

    render(){
        return(
            <div class="col-lg-3 tile-box-m">

            <div class="tile-box tile-box-alt bg-blue ">
                <div class="tile-header">
                    {this.props.orgTitle > 1 ? "Organizations":"Organization"}
                </div>
                <div class="tile-content-wrapper">
                    <i class="glyph-icon icon-th-large"></i>
                    <div class="tile-content">
                            {this.props.orgTitle}
                    </div>
                
                </div>
                <a href='/view-organization' title="" class="tile-footer" onClick={this.seeOrganizations}>
                    view organizations
                    <i class="glyph-icon icon-arrow-right"></i>
                </a>
            </div>
    
        </div>
        )
    }

}
export default OrganizationPanel;