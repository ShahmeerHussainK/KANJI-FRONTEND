import React, { Component } from 'react';
import Cookies from 'universal-cookie';
// import LogoutPanel from './logout_panal'
// import ProfileImage from '../../assets/dummy-images/slav.jpg'
// import ProfileImage from '../../CSS/dummy-images/people/logo.png'
// import Collapsible from 'react-collapsible';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class RightHeader extends Component{

    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
        this.toggleRightDropDown = this.toggleRightDropDown.bind(this)
        this.handlePassChangeClick = this.handlePassChangeClick.bind(this)
        this.state={
            "dropdownhidden":false,
            "dropdownclass":"glyph-icon icon-chevron-down logout"

        }
    }
    componentWillMount = () =>{
        // document.getElementByI   d("drop-down").style.display="none"
    }
    logout = () =>{
        const cookies = new Cookies();
        cookies.remove('loggedIn',{ path: '/' })

        window.location = '/login'
    }
    toggleRightDropDown = () =>{
        this.setState({
            dropdownhidden:!this.state.dropdownhidden,
            dropdownclass: this.state.dropdownhidden ? "glyph-icon icon-chevron-down logout" : "glyph-icon icon-chevron-up logout"
        })
    }

    handlePassChangeClick = () =>{
        window.location = "/reset-password/"
    }
   

    render(){
        return(
           
            <Dropdown isOpen={this.state.dropdownhidden} size="lg" toggle={this.toggleRightDropDown} style={{marginTop:15,marginRight:10, fontSize:14}}>
             <DropdownToggle tag="span" >
       
             <a href="#" title="" className="user-ico clearfix" onClick={this.toggleRightDropDown} style={{marginTop:90, color:"white"}}>
                    <span>Welcome {this.props.firstname}</span>
                    <i  className={this.state.dropdownclass} ></i>
                    {/* <i class="glyphicon glyphicon-log-out"></i> */}
                </a>
             
            </DropdownToggle>

        <DropdownMenu  style={{backgroundColor:"#455A64", width:150}} >
          <DropdownItem header><a href="" title="" style={{color:"white"}} onClick={this.handlePassChangeClick}>Change Password</a></DropdownItem>
          <DropdownItem divider />
          <DropdownItem header><a href="#" title="" style={{color:"white"}} className="dropdown_logout_panel" onClick={this.logout}>Logout</a></DropdownItem>
        </DropdownMenu>

            </Dropdown>
        )
    }
}

export default RightHeader;