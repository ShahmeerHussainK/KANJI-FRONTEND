import React, { Component } from 'react';
import LeftHeaderDropdown from './left-header-dropdown'

class LeftHeader extends Component{

    

    render(){
        return(
            <div id="header-left">
                <h3 className="header-tag-line">Kanji Administration</h3>
                <LeftHeaderDropdown />
                <LeftHeaderDropdown />
                <LeftHeaderDropdown />
            </div>
        )
    }

}

export default LeftHeader;