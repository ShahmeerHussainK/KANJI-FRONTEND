import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import TableRow from './questionTableRow'
import Pagination from "react-js-pagination";
// import { Loader } from 'react-overlay-loader';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EditQuestion from './editQuestion'
import QuestionDetails from './questionDetail'
import {url} from '../helper'
import Fade from 'react-reveal/Fade';

class QuestionTable extends Component{

    constructor(props){
        super(props)
        this.state={
            activePage: 1,
            loading:false,
            section:1,
            selected_question_for_view:{},
            selected_question_for_edit:{},
            delete_target_id:-1,
            delete_modal_open:false,
            message_title:"Delete Question",
            message_body:"Are you sure you want to delete this question?",
            message_type:1,
            message_box_open:false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.handleViewClick = this.handleViewClick.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.close_delete_modal = this.close_delete_modal.bind(this)
        this.delete_question = this.delete_question.bind(this)
        this.close_message_box = this.close_message_box.bind(this)
        this.back = this.back.bind(this)
        this.close = this.close.bind(this)
        this.handlePageSizeChange.bind(this)
    
    }

    componentDidMount(){
        // alert("mounting")
        //("mounting "+this.props.data)
        this.setState({
            section:this.props.section
        })
        if(this.props.data === undefined || this.props.data.length === 0){
            //("always here")
            this.setState({
                section:1
            })
        }
        else{
            this.setState({
                section:1
            })
        }
    }

    back = (event) =>{
        event.preventDefault()
        this.setState({
            section:1
        })
    }
    close = ()=>{
        this.setState({
            section:1
        })
    }

    handlePageChange(pageNumber) {
        //(`active page is ${pageNumber}`);
        var page = pageNumber
        //(page)
        this.props.fetch(page)
        this.setState({activePage: pageNumber, loading:true});
        
      }

      handlePageSizeChange = () =>{
          var size = document.getElementById("sizeList").value
          this.props.handlePageSizeChange(size)
      }

      handleViewClick = (id) =>{
          //("searching for "+id)
          //(typeof id)
        this.props.data.forEach(element => {           
            if(''+element.question_id === id){
                this.setState({selected_question_for_view:element,section:2})
            }
        });
        //("element "+this.state.selected_question_for_view)
      }
      
      handleEditClick = (id) =>{
        //("searching for "+id)
          //(typeof id)
        this.props.data.forEach(element => {           
            if(''+element.question_id === id){
                this.setState({selected_question_for_edit:element,section:4})
            }
        });
        //("element "+this.state.selected_question_for_edit)
      }


      handleDeleteClick = (id) =>{
          //("asking to delete "+id)
          this.setState({
              delete_modal_open:true,
              delete_target_id:id
          })
      }

      close_delete_modal = () =>{
        this.setState({
            delete_modal_open:false
        })
      }

      close_message_box = () =>{
          //("closing....")
          if(this.state.message_type === 1){
              //("should close")
            this.setState({
                message_box_open:false,
                section:1,
                loading:false
            })
          }
          if(this.state.message_type === 2){
            this.setState({
                message_box_open:false,
                section:1,
                loading:false
            })
            this.props.refresh()
          }
          else{
            this.setState({
                message_box_open:false
            })
          }
      }

      delete_question = () =>{
         var id = this.state.delete_target_id
          //("deleting "+id)
          this.setState({
              loading:true,
              delete_modal_open:false
          })
          var global_ref = this
          const cookies = new Cookies();
          var http = new XMLHttpRequest()
          var user_id = cookies.get('user_id')
          var token = cookies.get('token')
          http.open('DELETE', url+'/api/questions?question_id='+id+'&user_id='+user_id, true);
          http.setRequestHeader("Authorization", "Token " + token);
          http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          http.send('&question_id='+id)
          http.onreadystatechange = function () {
            if(http.readyState === 4 && http.status === 200){
               var json = JSON.parse(http.responseText)
            
                if(json.status === 204){
                    global_ref.setState({
                        message_title:"Question Deleted",
                        message_body:"Question has been deleted successfully",
                        message_box_open:true,
                        message_type:2
                    })
                    
                }
                else{
                    global_ref.setState({
                        message_title:"Failure",
                        message_body:"Could not complete operation",
                        message_box_open:true
                    })
                    // document.getElementById(''+id).style.display = 'none'
                }
            }
            else{
                global_ref.setState({
                    message_title:"Failure",
                    message_body:"Could not complete operation",
                    message_box_open:true
                })
                // document.getElementById(''+id).style.display = 'none'
            }
          }
      }
      
    render(){
        if(this.state.section === 1){
            if(this.props.data === undefined || this.props.data.length === 0){
                return(
                    <div className="row">

  
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                        <h3>No Questions Found</h3>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                )
            }
            else{
                return(
                    <div>
                        <Modal isOpen={this.state.delete_modal_open}>
                            <ModalHeader>
                                <h3>{this.state.message_title}</h3>
                            </ModalHeader>
                            <ModalBody>
                                <b>{this.state.message_body}</b>
                                </ModalBody>
                            <ModalFooter>
                            <Button onClick={this.close_delete_modal}>Cancel</Button>
                            <Button color="primary" onClick={this.delete_question}>Delete</Button>
                            </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.message_box_open}>
                            <ModalHeader><h3>{this.state.message_title}</h3></ModalHeader>
                            <ModalBody>
                                <b>{this.state.message_body}</b>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.close_message_box}>Close</Button>
                                </ModalFooter>
                            </Modal>
                        {/* <Loader loading={this.state.loading} />   */}
                   <div className="adjust example-box-wrapper">
                   <div id="dynamic-table-example-1_wrapper">
                   <Fade left>
                   <table cellPadding="0" cellSpacing="0" border="0" className="table table-striped" id="dynamic-table-example-1">

                   <thead>
                       <tr>
                       
                       <th>

                            Sequence
                       </th>
                       <th>Question Text</th>
                       <th>Customer Code</th>
                       <th>Section</th>
                       <th>Actions
                       <select style={{marginRight:5,float:"right"}} onChange={this.handlePageSizeChange} value={this.props.page_size} title="Adjust Page Size" id="sizeList">
                       
                            <option value="20" >20</option>
                            <option value="50" >50</option>
                            <option value="100">100</option>
                            <option value="150">150</option>
                            <option value="200">200</option>
                            </select>
                       </th>
                       </tr>
                       </thead>
                   <tbody>
                   {this.props.data.map((question,i)=><TableRow key={i} data={question} serialNo={i} viewClickHandle={this.handleViewClick} editClickHandle={this.handleEditClick} handleDeleteClick={this.handleDeleteClick} close_delete_modal={this.close_delete_modal} hideCTA={this.props.hideCTA}/>) }
                   {/* <TableRow />
                   <TableRow />
                   <TableRow /> */}
                   </tbody>
                   </table>
                   
                   <div style={{float:"right", marginRight:35}}>
                       <Pagination
                       activePage={this.props.activePage}
                       itemsCountPerPage={this.props.page_size}
                       totalItemsCount={this.props.record}
                       pageRangeDisplayed={5}
                       onChange={this.handlePageChange}
                       />
                   </div>
                   </Fade>
                   </div>
                   </div>
                   
                   </div>
                   
               );
            }
        }

        if(this.state.section === 2){
            return(
                <div>
                    <Fade left>
                    <QuestionDetails data={this.state.selected_question_for_view} back={this.back} />
                    </Fade>
                </div>
            )
        }
        if(this.state.section === 3){
            return(
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                    <h3>No Questions Found</h3>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            )
        }
        if(this.state.section === 4){
            return(
                <Fade left>
                <EditQuestion data={this.state.selected_question_for_edit} back={this.back} close={this.close} orgs={this.props.orgs} branches={this.props.branches} fetch={this.props.refresh}/>
                </Fade>
            )
        }

    }
}
export default QuestionTable;



