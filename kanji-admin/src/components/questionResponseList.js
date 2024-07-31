import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../CSS/assets-minified/all-demo.css'
import '../CSS/assets-minified/css/bootstrap.min.css'
import Header from './dashboardSubComponents/header'
import SideBar from './dashboardSubComponents/sideBarNav'
import { Loader } from 'react-overlay-loader';
import { url,logout } from './helper'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Calendar from 'react-calendar';
// import { Calendar } from 'react-native-calendars';
import ResponseTable from './responseListSubComponenets/responseTable'


class QuestionResponseList extends Component{

    constructor(props){
        super(props)
        this.state = {
            
            total_records:10,
            responses:[],
            loading: true,
            tableLoading:false,
            activePage:1,
            page_size:20,
            section:0,
            search_param:"",
            search_info_hidden:true,
            local_search_message:"",
            resultMessage:"",
            response_backup:[],
            SelectDateModalOpen:false,
            FromDate : new Date(),
            ToDate : new Date(),
        }
        this.handlePageSizeChange.bind(this)
        this.fetch_with_page_size.bind(this)
        this.toggleTableLoader.bind(this)
        this.next_page.bind(this)
        this.search.bind(this)
        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
        this.tableSearch = this.tableSearch.bind(this)
        this.resultsMessageHack = this.resultsMessageHack.bind(this)
        this.refreshAfterSearch = this.refreshAfterSearch.bind(this)
        this.handleEnterPressOnSearch = this.handleEnterPressOnSearch.bind(this)
        this.HandleFromDateSelect = this.HandleFromDateSelect.bind(this)
        this.openSelectDateModal = this.openSelectDateModal.bind(this)
        this.HandleToDateSelect = this.HandleToDateSelect.bind(this)
    }

    componentWillMount = () =>{
    const cookies = new Cookies();
    var loginStatus = cookies.get('loggedIn')
    if (loginStatus === undefined) {
        window.location = "/login"
    }
    var http = new XMLHttpRequest()
    var dashboar_ref = this
    var user_id = cookies.get('user_id')
    var token = cookies.get('token')
    http.open('GET', url+'/api/questions/responses?user_id='+user_id, true);
    http.setRequestHeader("Authorization", "Token "+token);
    http.onreadystatechange = function(){
        if(http.readyState === 4 && http.status === 200){
            var json = JSON.parse(http.responseText)
            if(json.status === 200){
                if(json.question_responses.length !==0){
                    dashboar_ref.setState({
                        responses:json.question_responses,
                        response_backup:json.question_responses,
                        total_records:json.total_responses,
                        section:1
                    })
                }
                else{
                    dashboar_ref.setState({
                        section:2
                    })
                }
            }
            else{
                dashboar_ref.setState({
                    section:2
                })
            }
        }
        if(http.readyState === 4 && http.status === 401){
            logout()
        }
        
    }
    http.onerror =  function(){
        dashboar_ref.setState({
            section:2
        })
    }
    http.ontimeout = function(){
        dashboar_ref.setState({
            section:2
        })
    }
    console.log("sending")
    http.send()
    }

    resultsMessageHack = () =>{
        this.setState({resultMessage:"showing results for : "+" "+this.state.search_param})
    }

    fetch_with_page_size = (pageSize) =>{
        const cookies = new Cookies();
        this.setState({tableLoading:true})
        var http = new XMLHttpRequest()
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        if(this.state.search_param !== ""){
            console.log("search param present")
            
            http.open('GET', url+'/api/questions/responses?user_id='+user_id+'&page='+1+'&page_size='+pageSize+"&q="+this.state.search_param, true);
        }
        else{
            http.open('GET', url+'/api/questions/responses?user_id='+user_id+'&page='+1+'&page_size='+pageSize, true);
        }
        
        http.setRequestHeader("Authorization", "Token "+token);
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    if(json.question_responses.length !==0){
                        dashboar_ref.setState({
                            responses:json.question_responses,
                            response_backup:json.question_responses,
                            total_records:json.total_responses,
                            tableLoading:false,
                            activePage:1,
                            section:1
                        })
                    }
                    else{
                        dashboar_ref.setState({
                            tableLoading:false,
                            section:2
                        })
                    }
                }
                else{
                    dashboar_ref.setState({
                        section:2
                    })
                }
            }
            http.onerror =  function(){
                dashboar_ref.setState({
                    section:2
                })
            }
            http.ontimeout = function(){
                dashboar_ref.setState({
                    section:2
                })
            }
        }
        http.send()
    }

    next_page = (page) =>{
        const cookies = new Cookies();
        this.setState({tableLoading:true})
        var http = new XMLHttpRequest()
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        
        if(this.state.search_param !== ""){
            http.open('GET', url+'/api/questions/responses?user_id='+user_id+'&page='+page+'&page_size='+this.state.page_size+"&q="+this.state.search_param, true);
        }
        else{

            http.open('GET', url+'/api/questions/responses?user_id='+user_id+'&page='+page+'&page_size='+this.state.page_size, true);
        }
        http.setRequestHeader("Authorization", "Token "+token);
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    if(json.question_responses !== 0){
                        dashboar_ref.setState({
                            responses:json.question_responses,
                            response_backup:json.question_responses,
                            total_records:json.total_responses,
                            tableLoading:false,
                            activePage:page,
                            section:1,
                        })
                    }
                    else{
                        dashboar_ref.setState({
                            tableLoading:false,
                            section:2,
                        })
                    }
                }
                else{
                    dashboar_ref.setState({
                        section:2
                    })
                }
            }
            http.onerror =  function(){
                dashboar_ref.setState({
                    section:2
                })
            }
            http.ontimeout = function(){
                dashboar_ref.setState({
                    section:2
                })
            }
        }
        http.send()
    }

    refreshAfterSearch = () =>{
        const cookies = new Cookies();
        this.setState({tableLoading:true})
        var http = new XMLHttpRequest()
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        
        http.open('GET', url+'api/user/forgot_password?user_id='+user_id+'&page='+1+'&page_size='+this.state.page_size, true);
        http.setRequestHeader("Authorization", "Token "+token);
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    if(json.question_responses !== 0){
                        dashboar_ref.setState({
                            responses:json.question_responses,
                            response_backup:json.question_responses,
                            total_records:json.total_responses,
                            tableLoading:false,
                            activePage:1,
                            section:1,
                            search_info_hidden:true
                        })
                    }
                    else{
                        dashboar_ref.setState({
                            tableLoading:false,
                            section:2,
                        })
                    }
                }
                else{
                    dashboar_ref.setState({
                        section:2
                    })
                }
            }
            http.onerror =  function(){
                dashboar_ref.setState({
                    section:2
                })
            }
            http.ontimeout = function(){
                dashboar_ref.setState({
                    section:2
                })
            }
        }
        http.send()
    }

    handlePageSizeChange = (pageSize) =>{
        
            this.setState({page_size:pageSize},this.fetch_with_page_size(pageSize))
            // this.setState({page_size:pageSize})
        
    }

    toggleTableLoader = () =>{
        this.setState({
            tableLoading:!this.state.tableLoading
        })
    }
    handleSearchFieldChange = () =>{
        var input = document.getElementById("search").value
        if(input === ""){
            this.refreshAfterSearch()
        }
        this.setState({
            search_param:input
        })
        console.log(input)
        console.log("voot zee fook")
    }

    handleEnterPressOnSearch = (e) =>{
        if(e.key === 'Enter'){
            this.search()
        }
    }
    search = () =>{
        const cookies = new Cookies();
        this.setState({tableLoading:true})
        var http = new XMLHttpRequest()
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        http.open('GET', url+'/api/questions/responses?user_id='+user_id+'&page='+1+'&page_size='+this.state.page_size+"&q="+this.state.search_param, true);
        http.setRequestHeader("Authorization", "Token "+token);
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                if(json.status === 200){
                    if(json.question_responses !== 0){
                        dashboar_ref.resultsMessageHack()
                        dashboar_ref.setState({
                            responses:json.question_responses,
                            response_backup:json.question_responses,
                            total_records:json.total_responses,
                            tableLoading:false,
                            activePage:1,
                            section:1,
                            search_info_hidden:false
                        })
                    }
                    else{
                        dashboar_ref.resultsMessageHack()
                        dashboar_ref.setState({
                            tableLoading:false,
                            section:2,
                        })
                    }
                }
                else{
                    dashboar_ref.setState({
                        section:2
                    })
                }
            }
            http.onerror =  function(){
                dashboar_ref.setState({
                    section:2
                })
            }
            http.ontimeout = function(){
                dashboar_ref.setState({
                    section:2
                })
            }
        }
        http.send()
    }

    tableSearch = () =>{
        var input = document.getElementById("local_search").value
        console.log("--->>"+input)
        if(input === ""){
            this.setState({
                responses:this.state.response_backup,
                local_search_message:""
            })
        }
        else{
            //searching
            var result = this.state.response_backup.filter(element =>{
                return element.run_id.includes(input) === true || element.drop_id.includes(input) === true || element.question_section.includes(input) === true || element.question_text.includes(input) === true 
            })
            if(result.length !== 0){
                this.setState({
                    responses:result,
                    local_search_message:result.length+" matches found"
                })
            }
            else{
                this.setState({
                    local_search_message:result.length+" matches found"
                })
            }
            console.log("results")
            console.log(result)
        }

    }

    closeSelectDateModal = () =>{
        this.setState({
            SelectDateModalOpen:false
        })
    }

    HandleFromDateSelect = (FromDate) =>{
        this.setState({FromDate},function(){
            console.log(this.state.FromDate)
        })
        
    }

    HandleToDateSelect = (toDate) =>{
        this.setState({
            toDate
        })
    }

    openSelectDateModal = () =>{
        this.setState({
            SelectDateModalOpen:true
        })
    }
    

    render(){
       if(this.state.section === 0){
            return(
                <Loader loading={true} fullPage={true} />
            )
       }
       if(this.state.section === 1){
        return(
            <div>
                <div className="clearfix"  id="page-header">
                        <div>
                           <Header />
                           </div>
                    </div>
                              
                    <div >
                        <SideBar />
                    </div>
                    <div id="page-content-wrapper" className="rm-transition">
                    <div id="page-content">
                    <Modal size="lg" isOpen={this.state.SelectDateModalOpen}>
                        <ModalHeader>
                            Download Response Record
                        </ModalHeader>
                        <ModalBody>
                            <div className="row" >

                                <div className="container">
                                <div className="col-md-6">
                                <h4>From:</h4>
                                <Calendar
                                    onChange={this.HandleFromDateSelect}
                                    value={this.state.FromDate}
                                    nextLabel="Next Month"
                                    prevLabel="Previous Month"

                                    />
                                </div>
                                <div className="col-md-6">
                                <h4>To:</h4>
                                <Calendar
                                    style={{height:1000}}
                                    onChange={this.HandleToDateSelect}
                                    value={this.state.ToDate}
                                    nextLabel="Next Month"
                                    prevLabel="Previous Month"
                                    maxDate = {new Date()}

                                    />
                                </div>
                                
                                </div>
                                    </div>
                            
                            {/* <div className="row" >
                                <div className="container">
                                
                                    </div>
                            </div> */}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.closeSelectDateModal}>Done</Button>
                        </ModalFooter>
                    </Modal>
                    <div className="row">
                    <div className="col-md-12">
                    <h2 style={{textAlign:"center"}}>Question Responses</h2>
                    </div>
                    </div>
                    <div className="row">
                        <div className="container">
                        {/* <div className="input-group input-group-lg">
                        <input type="text" id="search" placeholder="Search responses here..." className="form-control" value={this.state.search_param} onChange={this.handleSearchFieldChange} onKeyPress={this.handleEnterPressOnSearch} class="form-control"></input>
                        <i class="glyph-icon icon-search passviewicon"></i>
                        <i class="fas fa-download passviewicon" onClick={this.openSelectDateModal} title="Dowmload Response Record"></i>
                        <div class="input-group-btn">
                        
                            <button type="button" class="btn btn-default" tabindex="-1" onClick={this.search}>
                                <i class="glyph-icon icon-search passviewicon"></i>
                            </button>
                            
                        </div>
                    </div> */}
                    <div className="form-group">
                        <div className="input-group input-group-lg">
                        <input type="text" id="search" placeholder="Search responses here..." className="form-control" value={this.state.search_param} onChange={this.handleSearchFieldChange} onKeyPress={this.handleEnterPressOnSearch} class="form-control"></input>
                        <i class="glyph-icon icon-search searchIcon"  onClick={this.search}></i>
                        <i class="fas fa-download downloadIcon" onClick={this.openSelectDateModal} title="Dowmload Response Record"></i>
                        </div>
                    </div>

                <div className="row" style={{marginTop:100}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                            <h5 hidden={this.state.search_info_hidden}>{this.state.resultMessage}</h5>
                            </div>
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                            <div >
                            <label className="local_label" style={{float:"right", marginRight:35}}>{this.state.local_search_message}</label>
                            </div>
                            <div>
                            <input type="text" id="local_search" placeholder="Filter Results..."  onChange={this.tableSearch}  class="form-control local_field" style={{float:"right", marginRight:35}}></input>
                            </div>
                            
                            </div>
                        </div>

                        <ResponseTable data={this.state.responses} record={this.state.total_records} activePage={this.state.activePage} page_size={this.state.page_size} handlePageSizeChange={this.handlePageSizeChange} loading={this.state.tableLoading} toggleTableLoader={this.toggleTableLoader} fetch={this.next_page}/>
                    </div>
                    </div>
                        </div>
                    </div>

                    </div>
                    </div>
            </div>
        )
       }
       if(this.state.section === 2){
        return(
            <div>
                <div className="clearfix"  id="page-header">
                        <div>
                           <Header />
                           </div>
                    </div>
                              
                    <div >
                        <SideBar />
                    </div>
                    <div id="page-content-wrapper" className="rm-transition">
                    <div id="page-content">
                    <div className="row">
                    <div className="col-md-12">
                    <h2 style={{textAlign:"center"}}>Question Responses</h2>
                    </div>
                    </div>
                    <div className="row" style={{marginTop:100}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                           
                            </div>
                            <div className="col-md-4">
                            <h3 style={{textAlign:"center"}}>No Record Found</h3>
                            </div>
                            <div className="col-md-4">
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
            </div>
        )
       }
    }
}

export default QuestionResponseList;