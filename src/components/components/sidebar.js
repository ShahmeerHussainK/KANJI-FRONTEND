import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

class Sidebar extends React.Component {
  render() {
    const { pathname } = this.props.location;
    console.log('current path', pathname);
    const role = window.localStorage.getItem('role');
    return (
      <React.Fragment>
        <div class="dashboard-sidebar">
          <div class="dashboard-sidebar-inner" data-simplebar>
            <div class="dashboard-nav-container">
              <a href="#" class="dashboard-responsive-nav-trigger">
                <span class="hamburger hamburger--collapse">
                  <span class="hamburger-box">
                    <span class="hamburger-inner" />
                  </span>
                </span>
                <span class="trigger-title">Dashboard Navigation</span>
              </a>

              <div class="dashboard-nav">
                <div class="dashboard-nav-inner">
                  <ul>
                    <li
                      className={
                        pathname === '/dashboard' ||
                        pathname === '/' ||
                        pathname.includes('/inventory/')
                          ? 'active'
                          : ''
                      }
                    >
                      <NavLink to={`/dashboard`} activeClassName="active">
                        <i class="icon-material-outline-dashboard" />
                        Dashboard
                      </NavLink>
                    </li>
                    <li
                      className={
                        pathname === '/addFacility' ||
                        pathname === '/FacilityList'
                          ? 'active'
                          : ''
                      }
                      hidden={role !== 'ROLE_USER' ? false : true}
                    >
                      <a>
                        <i class="icon-material-outline-assignment" />{' '}
                        Facilities List
                      </a>
                      <ul>
                        <li>
                          <NavLink
                            to={`/FacilityList`}
                            activeClassName="active"
                          >
                            View Facility
                          </NavLink>
                        </li>
                        <li>
                          {/* <a id="add-facility" onClick={this.handleItemClick}>
                            Add Fcailities
                          </a> */}
                          <NavLink to={`/addFacility`} activeClassName="active">
                            Add Facility
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    <li
                      className={pathname === '/addInventory' ? 'active' : ''}
                    >
                      <NavLink to={`/addInventory`}>
                        <i class="icon-feather-file-plus" /> Add Inventory
                      </NavLink>
                    </li>

                    <li
                      className={
                        pathname === '/addUser' || pathname === '/users'
                          ? 'active'
                          : ''
                      }
                      hidden={role !== 'ROLE_USER' ? false : true}
                    >
                      <a to={`/users`}>
                        <i class="icon-line-awesome-users" /> User List
                      </a>
                      <ul>
                        <li>
                          <NavLink to={`/users`}>User List</NavLink>
                        </li>
                        <li>
                          <NavLink to={`/addUser`} activeClassName="active">
                            Add User
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    {/* <li className={pathname === '/reports' ? 'active' : ''}>
                      <NavLink to={`/reports`}>
                        <i class="icon-line-awesome-file-text" /> Reports
                      </NavLink>
                    </li> */}

                    <li
                      className={
                        pathname === '/reports' ||
                        pathname === '/automatic-reports'
                          ? 'active'
                          : ''
                      }
                      hidden={role !== 'ROLE_USER' ? false : true}
                    >
                      <a to={`/reports`}>
                        <i class="icon-line-awesome-file-text" /> Reports
                      </a>
                      <ul>
                        <li>
                          <NavLink to={`/reports`}>Reports</NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={`/automatic-reports`}
                            activeClassName="active"
                          >
                            Manage Reports
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    {/* <li>
                      <a href="report.html">
                        <i class="icon-line-awesome-file-text" /> Reports
                      </a>
                    </li> */}
                    {/* <li>
                      <a href="resport-list.html">
                        <i class="icon-material-outline-file-copy" /> Manage
                        Automatic Reports
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Sidebar);
