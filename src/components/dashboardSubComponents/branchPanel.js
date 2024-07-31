import React, { Component } from 'react';
// import Cookies from 'universal-cookie';

class BranchPanel extends Component{



    componentWillMount = () =>{
  
    }

    render(){
        return(
            <div class="col-lg-3 tile-box-m">

            <div class="tile-box tile-box-alt bg-blue ">
                <div class="tile-header">
                    {this.props.header}
                </div>
                <div class="tile-content-wrapper">
                    <i class="glyph-icon icon-th"></i>
                    <div class="tile-content">
                            
                        {this.props.title}
                    </div>
                
                </div>
                <a href="/view-all-branches" title="" class="tile-footer">
                    view branches
                    <i class="glyph-icon icon-arrow-right"></i>
                </a>
            </div>
        </div>
        )
    }

}
export default BranchPanel;