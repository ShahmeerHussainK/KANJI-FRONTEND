import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import SelectList from './createQuestionSubComponents/dropdownSelect'
import Header from './dashboardSubComponents/header'
import SideBar from './dashboardSubComponents/sideBarNav'
import { Loader } from 'react-overlay-loader';
import QuestionTable from './questionListSubComponents/questionTable'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {url,logout} from './helper'

class Questions extends Component{


    constructor(props){
        super(props)
        this.state = {
            "superuser":'',
            "organization_admin":"",
            "branch_admin":"",
            "options_organization": [],
            "options_branch": [],
            "options_customers": "",
            "options_sections": [],
            "total_records":0,
            "questions":[],
            "organization": null,
            "branch": null,
            "customer": "",
            "loading": true,
            "tableHidden":true,
            "tableLoading":false,
            "activePage":1,
            "message_title":"",
            "message_body":"",
            "error_modal_open":false,
            "fetch_btn_disabled":true,
            page_size:20
        }
        this.handleOrganizationSelect = this.handleOrganizationSelect.bind(this)
        this.handleBranchSelectSelect = this.handleBranchSelectSelect.bind(this)
        this.handleCustomerSelect = this.handleCustomerSelect.bind(this)
        this.fetch = this.fetch.bind(this)
        this.next_page= this.next_page.bind(this)
        this.create_question_click_handle = this.create_question_click_handle.bind(this)
        this.close_error_model = this.close_error_model.bind(this)
        this.enable_btn = this.enable_btn.bind(this)
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this)
        this.fetch_with_page_size.bind(this)
    }


    componentWillMount = () =>{
        const cookies = new Cookies();
        var loginStatus = cookies.get('loggedIn')
        console.log(loginStatus)
        if (loginStatus === undefined) {
            window.location = '/login'
        } else {
            this.setState({ current_section: 1 })
        }
        var superuser = cookies.get('superuser')
        var organization_admin = cookies.get('organization-admin')
        var branch_admin = cookies.get('branch-admin')
        this.setState({
            "superuser":superuser,
            "organization_admin":organization_admin,
            "branch_admin":branch_admin,
        })
        var http = new XMLHttpRequest();
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        console.log('Token ' + token)
        if(this.state.branch_admin === 'true'){
            http.open('GET', url+'/api/questions/wizard/branch?user_id=' + user_id, true);
        }
        else{
            http.open('GET', url+'/api/questions/wizard/organisation?user_id=' + user_id, true);
        }
        
        http.setRequestHeader("Authorization", "Token " + token);
        http.send()
        http.onreadystatechange = function (){
            if (http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)
                        console.log(http.responseText)
                        if(dashboar_ref.state.branch_admin === 'true'){
                            if (json.status === 200) {
                                console.log(json.branches)
                              var branches = []
                              var customer = []
                              
                                  console.log('never here')
                                json.branches.forEach(element => {
                                    var temp = {
                                        value: element.branch_name, label: element.branch_name, id: element.branch_id
                                    }
                                    console.log(temp)
                                    branches.push(temp)
                                    // console.log(orgs)
                                });
                             
                              console.log(orgs)
                              if(branches){
                                branches.unshift({
                                    value: 'all', label: 'all', id: 0
                                })
                              }
                           
                            dashboar_ref.setState({options_branch:branches, loading:false,organization:{ value: 'all', label: 'all', id: -1}
                            })
                            }
                            else{
                                dashboar_ref.setState({
                                   error_modal_open:true,
                                   message_title:"Could not load data",
                                   message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
                                })
                            }
                        }
                        else{
                            if (json.status === 200) {
                                console.log(json.organisations)
                              var orgs = []
                              var customer = []
                              
                                  console.log('never here')
                                json.organisations.forEach(element => {
                                    var temp = {
                                        value: element.org_name, label: element.org_name, id: element.org_id
                                    }
                                    console.log(temp)
                                    orgs.push(temp)
                                    console.log(orgs)
                                });
                             
                              console.log(orgs)
                            if(orgs){
                                orgs.unshift({
                                    value: 'all', label: 'all', id: 0
                                })
                            }
                            console.log(orgs)

                            dashboar_ref.setState({options_organization:orgs, loading:false,
                                options_customers: customer
                            },function(){
                                console.log(dashboar_ref.state.options_organization)
                            })
                            }
                            else{
                                dashboar_ref.setState({
                                   error_modal_open:true,
                                   message_title:"Could not load data",
                                   message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
                                })
                            }
                        }
                      
                        
                }
                if(http.readyState === 4 && http.status === 401){
                    logout()
                }
                
            }
            http.onerror = function (){
                dashboar_ref.setState({
                    error_modal_open:true,
                    message_title:"Could not load data",
                    message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
                 })
            }
        }

        handleOrganizationSelect = (organization) => {
            this.setState({ organization})
            if (organization.id != 0) {
                this.setState({loading:true})
                const cookies = new Cookies();
                var http = new XMLHttpRequest();
                var dashboar_ref = this
                var user_id = cookies.get('user_id')
                var token = cookies.get('token')
                http.open('GET', url+'/api/questions/wizard/branch?user_id=' + user_id + '&org_id=' + organization.id, true);
                http.setRequestHeader("Authorization", "Token " + token);
                http.send()
                http.onreadystatechange = function () {
                    console.log(http.responseText)
                    if (http.readyState === 4 && http.status === 200) {
                        var json = JSON.parse(http.responseText)
                        if (json.status === 200) {
                            var branches = []
                            json.branches.forEach(element => {
                                var temp = {
                                    value: element.branch_name, label: element.branch_name, id: element.branch_id
                                }
                                branches.push(temp)
                                console.log(branches)
                            });
                            branches.unshift({
                                value: 'all', label: 'all', id: 0
                            })
                            dashboar_ref.setState({
                                options_branch: branches,
                                loading: false
                            },this.enable_btn)
                        }
                        else{
                            dashboar_ref.setState({
                               error_modal_open:true,
                               message_title:"Could not load data",
                               message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
                            })
                        }
                    }
                    
                }
                http.onerror = function (){
                    dashboar_ref.setState({
                        error_modal_open:true,
                        message_title:"Could not load data",
                        message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
                     })
                }
    
                console.log(`Option selected:`, organization.id);
            }
            else {
                var branches = []
                branches.push({
                    value: 'all', label: 'all', id: 0
                })
                this.setState({
                    options_branch: branches,
                    branch: { value: 'all', label: 'all', id: 0 },
                    loading: false
                },this.enable_btn)
            }
    
        }
        handleBranchSelectSelect = (branch) => {
            this.setState({ branch }, this.enable_btn);
    
            console.log(`Option selected:`, branch);
        }
    
        handleCustomerSelect = (customer) => {
            var input = document.getElementById("cust_code").value
        if(input!==""){
            console.log("in "+input)
            this.setState({ customer:input });
            console.log(this.state.customer)
        }
        else{
            console.log("in "+input)
            this.setState({ customer:input });
            console.log(this.state.customer)
        }
        }
        enable_btn = () =>{
            if(this.state.organization !== null & this.state.branch !== null ){
                this.setState({
                    fetch_btn_disabled:false
                })
            }
            else{
                this.setState({
                    fetch_btn_disabled:true
                })
            }
        }

        fetch = () =>{
            this.setState({loading:true})
            console.log(this.state.page_size)
            console.log('fetching now')
            const cookies = new Cookies();
                var http = new XMLHttpRequest();
                var dashboar_ref = this
                var user_id = cookies.get('user_id')
                var token = cookies.get('token')
                console.log(user_id)
                console.log(this.state.organization.id)
                console.log(this.state.branch.id)
                console.log(this.state.customer.id)
                var local_url = url+'/api/questions?user_id='+user_id+'&org_id='+this.state.organization.id+'&branch_id='+this.state.branch.id+'&customer_code='+this.state.customer+'&page='+1+'&page_size='+this.state.page_size
                console.log(url)
                http.open('GET',local_url, true)
                http.setRequestHeader("Authorization", "Token " + token);
            http.send()
            http.onreadystatechange = function () {
                console.log(http.responseText)
                if (http.readyState === 4 && http.status === 200) {
                    console.log("this guilty"+http.responseText)
                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    console.log(json.view_questions)
                    var question = []
                    json.view_questions.forEach(element => {
                        question.push(element)
                    })
                    console.log("count "+json.total_questions)
                    dashboar_ref.setState({questions:question,
                    total_records:json.total_questions,tableHidden:false,loading:false,activePage:1,tableLoading:false})
                }
                else{
                    dashboar_ref.setState({
                       error_modal_open:true,
                       message_title:"Could not load data",
                       message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
                    })
                }
                }
                
            }
            http.onerror = function (){
                dashboar_ref.setState({
                    error_modal_open:true,
                    message_title:"Could not load data",
                    message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
                 })
            }
        }


        fetch_with_page_size = (pageSize) =>{
            this.setState({tableLoading:true})
            console.log(pageSize)
            console.log('fetching now')
            const cookies = new Cookies();
                var http = new XMLHttpRequest();
                var dashboar_ref = this
                var user_id = cookies.get('user_id')
                var token = cookies.get('token')
                console.log(user_id)
                console.log(this.state.organization.id)
                console.log(this.state.branch.id)
                console.log(this.state.customer.id)
                var local_url = url+'/api/questions?user_id='+user_id+'&org_id='+this.state.organization.id+'&branch_id='+this.state.branch.id+'&customer_code='+this.state.customer+'&page='+1+'&page_size='+pageSize
                console.log(url)
                http.open('GET',local_url, true)
                http.setRequestHeader("Authorization", "Token " + token);
            http.send()
            http.onreadystatechange = function () {
                console.log(http.responseText)
                if (http.readyState === 4 && http.status === 200) {
                    console.log("this guilty"+http.responseText)
                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    console.log(json.view_questions)
                    var question = []
                    json.view_questions.forEach(element => {
                        question.push(element)
                    })
                    console.log("count "+json.total_questions)
                    dashboar_ref.setState({questions:question,
                    total_records:json.total_questions,tableHidden:false,loading:false,activePage:1,tableLoading:false})
                }
                else{
                    dashboar_ref.setState({
                       error_modal_open:true,
                       message_title:"Could not load data",
                       message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
                    })
                }
                }
                
            }
            http.onerror = function (){
                dashboar_ref.setState({
                    error_modal_open:true,
                    message_title:"Could not load data",
                    message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
                 })
            }
        }

        handlePageSizeChange = (pageSize) =>{
            console.log("adjusting")
            this.setState({page_size:pageSize},this.fetch_with_page_size(pageSize))
        }

        next_page = (page) =>{
            this.setState({tableLoading:true})
            const cookies = new Cookies();
            var http = new XMLHttpRequest();
            var dashboar_ref = this
            var user_id = cookies.get('user_id')
            var token = cookies.get('token')
            console.log(user_id)
            console.log(this.state.organization.id)
            console.log(this.state.branch.id)
            console.log(this.state.customer.id)
            var local_url = url+'/api/questions?user_id='+user_id+'&org_id='+this.state.organization.id+'&branch_id='+this.state.branch.id+'&customer_code='+this.state.customer+'&page='+page+'&page_size='+this.state.page_size
            console.log(local_url)
            http.open('GET',local_url, true)
            http.setRequestHeader("Authorization", "Token " + token);
        http.send()
        http.onreadystatechange = function () {
            console.log(http.responseText)
            if (http.readyState === 4 && http.status === 200) {
            var json = JSON.parse(http.responseText)
            if(json.status === 200){
                dashboar_ref.setState({questions:[]})
                console.log(json.view_questions)
                var question = []
                json.view_questions.forEach(element => {
                    question.push(element)
                })
                console.log("count "+json.total_questions)
                dashboar_ref.setState({questions:question,
                total_records:json.total_questions,tableHidden:false,tableLoading:false,activePage:page,loading:false})
            }
            else{
                dashboar_ref.setState({
                    error_modal_open:true,
                    message_title:"Could not load data",
                    message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
                 })
            }
            }
            
        }
        http.onerror = function (){
            dashboar_ref.setState({
                error_modal_open:true,
                message_title:"Could not load data",
                message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
             })
        }
        }

        create_question_click_handle = () =>{
            window.location = '/create-question'
        }

        close_error_model = () =>{
            this.setState({error_modal_open:false,loading:false,tableLoading:false})
        }

    render(){
       if(this.state.branch_admin === 'true'){
        return(
            <div>

                <div>
                    <Modal isOpen={this.state.error_modal_open}>
                        <ModalHeader><h3>{this.state.message_title}</h3></ModalHeader>
                        <ModalBody>
                            <h6>{this.state.message_body}</h6>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='primary' onClick={this.close_error_model}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>

                <Loader loading={this.state.loading} fullPage={true}/>
                <div className="clearfix"  id="page-header">
                <div>
                    <Header />
                </div>
                </div>
                <div>
                    <SideBar />
                </div>
                <div id="page-content-wrapper" className="rm-transition">
                <div id="page-content">
                
                <div className="row">
                <div className="col-md-4">
                <button class="btn btn-blue-alt fetch_questions" id="btn" style={{margin:0, width:150}} onClick={this.create_question_click_handle}><i class="fa fa-plus" style={{marginRight:5}}></i><b>Create Questions</b></button>
                </div>
                <div className="col-md-4"> <h3>Questions</h3> </div>
                <div className="col-md-4">
                </div>
                </div>
                <div className="row" style={{paddingTop:30}}>
                <div className="col-md-4"> 
                <h3>Select Branch</h3>
                <SelectList options={this.state.options_branch} actionHandler={this.handleBranchSelectSelect} selectedOption={this.state.branch} />
                </div>
                <div className="col-md-4">
                <h3>Customer Code</h3>
                <input class="form-control" placeholder="Customer_Code,Customer_Code,Customer_code" id="cust_code" onBlur={this.handleCustomerSelect}></input>
                </div>
                <div className="col-md-3" >
                <button class="btn btn-blue-alt fetch_questions" id="btn" onClick={this.fetch} disabled={this.state.fetch_btn_disabled}><b>Fetch Questions</b></button>
                </div>
                </div>
                <div className="container" style={{marginTop:140}} hidden={this.state.tableHidden}>
                <Loader loading={this.state.tableLoading} />
                <ReactCSSTransitionGroup
                        transitionName="example"
                     transitionEnterTimeout={5000}
                        transitionLeaveTimeout={3000}>
                <QuestionTable data={this.state.questions} record={this.state.total_records} fetch={this.next_page} activePage={this.state.activePage} orgs={this.state.options_organization} branches={this.state.options_branch} section={1} refresh={this.fetch}/>
                </ReactCSSTransitionGroup>
                </div>
                </div>
                </div>
                </div>
        )
       }
       else{
        return(
            <div>

                <div>
                    <Modal isOpen={this.state.error_modal_open}>
                        <ModalHeader>{this.state.message_title}</ModalHeader>
                        <ModalBody>
                            <h6>{this.state.message_body}</h6>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='primary' onClick={this.close_error_model}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>

                <Loader loading={this.state.loading} fullPage={true}/>
                <div className="clearfix"  id="page-header">
                <div>
                    <Header />
                </div>
                </div>
                <div>
                    <SideBar />
                </div>
                <div id="page-content-wrapper" className="rm-transition">
                <div id="page-content">
                
                <div className="row">
                <div className="col-md-4">
                <button class="btn btn-blue-alt fetch_questions" id="btn" style={{margin:0, width:150}} onClick={this.create_question_click_handle}><i class="fa fa-plus" style={{marginRight:5}}></i><b>Create Questions</b></button>
                </div>
                <div className="col-md-4"> <h3>Questions</h3> </div>
                <div className="col-md-4">
                </div>
                </div>
                <div className="row" style={{paddingTop:30}}>
                <div className="col-md-3">
                <h3>Select Organization</h3>
                <SelectList options={this.state.options_organization} actionHandler={this.handleOrganizationSelect} selectedOption={this.state.organization} />
                </div>
                <div className="col-md-3"> 
                <h3>Select Branch</h3>
                <SelectList options={this.state.options_branch} actionHandler={this.handleBranchSelectSelect} selectedOption={this.state.branch} />
                </div>
                <div className="col-md-3">
                <h3>Customer Code</h3>
                <input class="form-control" placeholder="Customer_Code,Customer_Code,Customer_code" id="cust_code" onBlur={this.handleCustomerSelect}></input>
                </div>
                <div className="col-md-3 " >
                <button class="btn btn-blue-alt fetch_questions" id="btn" onClick={this.fetch} disabled={this.state.fetch_btn_disabled}><b>Fetch Questions</b></button>
                </div>
                </div>
                <div className="container" style={{marginTop:140}} hidden={this.state.tableHidden}>
                <Loader loading={this.state.tableLoading} />
                <ReactCSSTransitionGroup
                        transitionName="example"
                     transitionEnterTimeout={5000}
                        transitionLeaveTimeout={3000}>
                <QuestionTable data={this.state.questions} record={this.state.total_records} fetch={this.next_page} activePage={this.state.activePage} orgs={this.state.options_organization} branches={this.state.options_branch} refresh={this.fetch} page_size={this.state.page_size} handlePageSizeChange={this.handlePageSizeChange}/>
                </ReactCSSTransitionGroup>
                </div>
                </div>
                </div>
                </div>
        )
       }
    }
}

export default Questions