import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../CSS/assets-minified/all-demo.css';
import '../CSS/assets-minified/css/bootstrap.min.css';
import '../CSS/assets-minified/fontawesome/css/fontawesome.css';
import OrganizationPanel from './dashboardSubComponents/oraganizationPanel';
import BranchPanel from './dashboardSubComponents/branchPanel';
import DevicePanel from './dashboardSubComponents/devicePanel';
import Header from './dashboardSubComponents/header';
import SideBar from './dashboardSubComponents/sideBarNav';
import DeviceTable from './dashboardSubComponents/deviceTable';
import { url, logout, getUserInfo } from './helper';
import { Loader } from 'react-overlay-loader';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      firstname: '',
      superuser: '',
      organization_admin: '',
      branch_admin: '',
      branch_user:'',
      organization: '',
      branches: '',
      device_count: null,
      devices: [],
      section: 1,
      pending_device_count: 0,
      SideBarOpen: true,
      deviceSearchKeyword: null,
      isSearching: false,
      deviceBackup: []
    };
    this.fetch = this.fetch.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount = () => {
    const cookies = new Cookies();
    var loginStatus = cookies.get('loggedIn');
    if (loginStatus === undefined) {
      window.location = '/login';
    } else {
      this.fetch();
      var fname = cookies.get('firstname');
      var superuser = cookies.get('superuser');
      var organization_admin = cookies.get('organization-admin');
      var branch_admin = cookies.get('branch-admin');
      var branch_user = cookies.get('branch-user')
      this.setState({
        firstname: fname,
        superuser: superuser,
        organization_admin: organization_admin,
        branch_admin: branch_admin,
        branch_user: branch_user
      });
    }
  };

  fetch = () => {
    const cookies = new Cookies();
    var http = new XMLHttpRequest();
    var dashboar_ref = this;
    var user_id = cookies.get('user_id');
    var token = cookies.get('token');
    http.open('GET', url + '/api/dashboard?user_id=' + user_id, true);

    http.setRequestHeader('Authorization', 'Token ' + token);

    http.send();
    // http.setRequestHeader('Authorization','Token '+token)
    http.onreadystatechange = function() {
      console.log('response', http.responseText);
      if (http.readyState === 4 && http.status === 200) {
        var json = JSON.parse(http.responseText);
        if (json.status === 200) {
          console.log(json);
          var branch = null;
          var device_c = null;
          if (json.total_orgs) {
            var orgs = json.total_orgs;
          } else {
            var orgs = 0;
          }
          if (json.org_name) {
            orgs = json.org_name;
          }

          if (json.total_branches) {
            branch = json.total_branches;
          } else {
            branch = 0;
          }
          if (json.branch_name) {
            branch = json.branch_name;
          }

          if (json.total_devices) {
            device_c = json.total_devices;
          } else {
            device_c = 0;
          }

          dashboar_ref.setState(
            {
              organization: orgs,
              branches: branch,
              devices: json.device_list,
              device_count: device_c,
              pending_device_count: json.pending_device_count,
              section: 2,
              deviceBackup: json.device_list,
            },
            console.log('statae set'),
          );
        }
      }
      if (http.readyState === 4 && http.status === 401) {
        logout();
      }
    };
  };

  logout = () => {
    const cookies = new Cookies();
    cookies.remove('loggedIn');
    window.location = '/';
  };

  toggle = () => {
    this.setState({
      SideBarOpen: !this.state.SideBarOpen,
    });
  };

  onSearchChange = (event) => {
    const value = event.target.value;
    this.setState({
      deviceSearchKeyword:value,
    })
    if(value !== ''){
      const { deviceBackup } = this.state;
      const searchables = deviceBackup;
      console.log("len ", searchables.length)
        // const { deviceSearchKeyword } = this.state;
        const filtered_devices = searchables.filter((device) => {
          return typeof device.device_make === 'string' ? device.device_make.toLowerCase().includes(value.toLowerCase()): false
                  || typeof device.device_model === 'string' ? device.device_model.toLowerCase().includes(value.toLowerCase()) : false 
                  || typeof device.device_imei_no === 'string' ? device.device_imei_no.toLowerCase().includes(value.toLowerCase()) : false 
          
        });
        console.log("filtered ", filtered_devices)
        this.setState({
          devices : filtered_devices
        })
    }
    else{
      this.setState({
        devices: this.state.deviceBackup,
      })
    }
  }


  render() {
    if (this.state.section === 1) {
      return (
        <div>
          <Loader loading={true} fullPage={true} />
        </div>
      );
    }

    if (this.state.section === 2) {
      const { deviceSearchKeyword, isSearching } = this.state;
      if (this.state.superuser === 'true') {
        return (
          <div>
            <div className="clearfix" id="page-header">
              <div>
                <Header toggle={this.toggle} />
              </div>
            </div>

            <div>
              <SideBar
                SideBarOpen={this.state.SideBarOpen}
                device_count={this.state.pending_device_count}
                isActive="dashboard"
              />
            </div>

            <div id="page-content-wrapper" className="rm-transition">
              <div id="page-content">
                <Zoom>
                  <div>
                    <OrganizationPanel orgTitle={this.state.organization} />

                    <BranchPanel
                      title={this.state.branches}
                      header={'Branches'}
                    />

                    <DevicePanel
                      title={this.state.device_count}
                      header={'Devices'}
                    />
                    <DeviceTable 
                    devices={this.state.devices} 
                    onSearchChange={this.onSearchChange}
                    deviceSearchKeyword={deviceSearchKeyword}
                    isSearching={isSearching}
                    />
                  </div>
                </Zoom>
              </div>
            </div>
          </div>
        );
      }

      if (this.state.organization_admin === 'true') {
        return (
          <div>
            <div className="clearfix" id="page-header">
              <Header />
            </div>

            <div>
              <SideBar
                device_count={this.state.pending_device_count}
                isActive="dashboard"
              />
            </div>

            <div id="page-content-wrapper" className="rm-transition">
              <div id="page-content">
                <Zoom>
                  <div>
                    <OrganizationPanel orgTitle={this.state.organization} />
                    <BranchPanel
                      title={this.state.branches}
                      header={'Branches'}
                    />
                    <DevicePanel
                      title={this.state.device_count}
                      header={'Devices'}
                    />
                    <DeviceTable devices={this.state.devices} onSearchChange={this.onSearchChange}
                     deviceSearchKeyword={deviceSearchKeyword} 
                     isSearching={isSearching}
                     />
                  </div>
                </Zoom>
              </div>
            </div>
          </div>
        );
      }

      if (this.state.branch_admin === 'true') {
        return (
          <div>
            <div className="clearfix" id="page-header">
              <Header />
            </div>
            <div>
              <SideBar
                device_count={this.state.pending_device_count}
                isActive="dashboard"
              />
            </div>

            <div id="page-content-wrapper" className="rm-transition">
              <div id="page-content">
                <Zoom>
                  <div>
                    <BranchPanel
                      title={this.state.branches}
                      header={'Branch'}
                    />
                    <DevicePanel
                      title={this.state.device_count}
                      header={'Devices'}
                    />
                    <DeviceTable devices={this.state.devices} onSearchChange={this.onSearchChange}
                     deviceSearchKeyword={deviceSearchKeyword}
                     isSearching={isSearching}
                     />
                  </div>
                </Zoom>
              </div>
            </div>
          </div>
        );
      }
      if(this.state.branch_user === 'true'){
        return (
          <div>
            <div className="clearfix" id="page-header">
              <Header />
            </div>
            <div>
              <SideBar
                device_count={this.state.pending_device_count}
                isActive="dashboard"
              />
            </div>
          </div>
        );
      }
    }
  }
}

export default Dashboard;
