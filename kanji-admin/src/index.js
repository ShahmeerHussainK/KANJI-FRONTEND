import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import loginReducer from './reducers/LoginReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import '../src/CSS/assets-minified/all-demo.css'
// import App from './App';
import Splash from './components/splash'
import Login from './components/Login'
import Dashboard from './components/dashbord'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ForgotPassword from './components/forgotPasswordComponents/forgotpassword';
import OrganizationList from './components/organizationView'
import CreateQuestionPageOne from '../src/components/createQuestionP1'
import Questions from '../src/components/questions'
import CreateOrganization from '../src/components/OrganizationViewSubComponents/createOrganization'
import BranchView from '../src/components/AllbranchesView'
import CreateBranch from '../src/components/viewBranchSubComponents/createBranch'
import ListBranches from '../src/components/listOrgBranches'
import CreateUser from '../src/components/createUser'
import CreateBranchAdmin from '../src/components/createBranchAdminUser'
import DeviceRegisterationRequests from '../src/components/deviceRegisterationsRequests'
import ViewAllDevices from '../src/components/AllDevicesView'
import ListBranchDevices from '../src/components/deviceViewSubComponents/listDevicesByBranch'
import ListBranchRevokedDevices from '../src/components/deviceViewSubComponents/listBranchRevokedDevices'
import RevokedOrganizationList from '../src/components/OrganizationViewSubComponents/listRevokedOrganizations'
import RevokedOrganizationViewPanel from '../src/components/viewBranchSubComponents/listRevokedBranches'
import QuestionResponseList from '../src/components/questionResponseList'
import RoleManagement from '../src/components/roleManagement'
import NotFound from '../src/components/404NotFound'
//creating redux store
const store = createStore(loginReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Router>
        <Provider store={store}>
        <div>
        
          <Route exact path="/" component={Splash} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/view-organization" component={OrganizationList} />
          <Route path="/create-question" component={CreateQuestionPageOne} />
          <Route path="/questions" component={Questions} />
          <Route path="/create-organization" component={CreateOrganization} />
          <Route path="/view-all-branches" component={BranchView} />
          <Route path="/create-branch" component={CreateBranch} />
          <Route path="/list-branches/" component={ListBranches} />
          <Route path="/create-user/" component={CreateUser} />
          <Route path="/create-branch-admin/" component={CreateBranchAdmin} />
          <Route path="/device-registeration-requests/" component={DeviceRegisterationRequests} />
          <Route path="/view-all-devices/" component={ViewAllDevices} />
          <Route path="/list-devices/" component={ListBranchDevices} />
          <Route path="/list-revoked-devices/" component={ListBranchRevokedDevices} />
          <Route path="/list-revoked-organizations/" component={RevokedOrganizationList} />
          <Route path="/list-revoked-branches/" component={RevokedOrganizationViewPanel} />
          <Route path="/response-listing/" component={QuestionResponseList} />
          <Route path="/role-management/" component={RoleManagement} />
          {/* <Route exact insecure component={NotFound}/> */}
          
        </div>
        </Provider>
    </Router>,
    document.getElementById('page-wrapper')
  )

// ReactDOM.render(
// <BrowserRouter>
// <Provider store={store}>
// <Splash />
// </Provider></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();

