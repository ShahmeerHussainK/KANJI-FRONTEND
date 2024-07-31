import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import Pagination from "react-js-pagination";
import { Loader } from 'react-overlay-loader';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {url} from '../helper'
import TableRow from './responseTableRow'

class ResponseTable extends Component{


    constructor(props){
        super(props)
        this.state={
            activePage: 1,
            loading:false,
            section:1,
        }
        this.handlePageSizeChange.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    componentDidMount(){
        // alert("mounting")
        this.setState({
            section:this.props.section
        })
        if(this.props.data === undefined || this.props.data.length == 0){
            console.log("always here")
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

    handlePageSizeChange = () =>{
        var size = document.getElementById("sizeList").value
        this.props.handlePageSizeChange(size)
    }

    handlePageChange(pageNumber) {
        console.log(this.props)
        console.log(`active page is ${pageNumber}`)
        var page = pageNumber
        console.log(page)
        this.props.fetch(page)
        this.setState({activePage: pageNumber})
        
      }


    render(){
        if(this.state.section === 2){
            if(this.props.data === undefined || this.props.data.length == 0){
                return(
                    <div className="row">

  
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                        <h3>No Responses Found</h3>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                )
            }
        }
        else{
            return(
                <div>
                    <Loader loading={this.props.loading} />
                    <div className="adjust example-box-wrapper">
                    <div id="dynamic-table-example-1_wrapper">
                    <table cellPadding="0" cellSpacing="0" border="0" className="table table-striped" id="dynamic-table-example-1">
                    
                    <thead>
                           <tr>
                           <th>Run ID</th>
                           <th>Drop ID</th>
                           <th>Question</th>
                           <th>Question section</th>
                           <th>Answer
                           <select style={{marginRight:5,float:"right"}} onChange={this.handlePageSizeChange} value={this.props.page_size} title="Adjust Page Size" id="sizeList">
                                <option value="50" >50</option>
                                <option value="100" >100</option>
                                <option value="150">150</option>
                                <option value="200">200</option>
                                </select>
                           </th>
                           </tr>
                           </thead>
                           <tbody>
                               {this.props.data.map((record, i)=><TableRow data={record}/>)}
                           </tbody>
                    </table>
                    </div>
                    </div>
                    <div style={{float:"right", marginRight:35}}>
                       <Pagination
                       activePage={this.props.activePage}
                       itemsCountPerPage={this.props.page_size}
                       totalItemsCount={this.props.record}
                       pageRangeDisplayed={5}
                       onChange={this.handlePageChange}
                       />
                   </div>
                    </div>
            )
        }
    }
}

export default ResponseTable;