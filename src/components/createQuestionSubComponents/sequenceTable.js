import React, {Component} from 'react';
import TableRow from './sequenceTableRow'
import Pagination from "react-js-pagination";
import { Loader } from 'react-overlay-loader';


class SequenceTable extends Component{

    constructor(props){
        super(props)
        this.state={
            section:1,
            fetching:false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    componentWillMount = () =>{
        if(this.props.sequences.length === 0){
            this.setState({
                section:0
            })
        }
    }
    handlePageChange(pageNumber) {
        //(`active page is ${pageNumber}`);
        var page = pageNumber
        console.log(page)

        this.props.fetch(page)
        this.setState({fetching:true});
        
      }
      componentWillReceiveProps = () =>{
        this.setState({fetching:false});
      }
    
    render(){

        if(this.state.section === 1){
            return(
             
                <div className="adjust example-box-wrapper">
                <div id="dynamic-table-example-1_wrapper">
                <Loader loading={this.state.fetching}/>
                <table cellPadding="0" cellSpacing="0" border="0" className="table table table-striped" id="dynamic-table-example-1">
                <thead>
                    <tr>
                    
                    <th>Sequence</th>
                    <th>Question Text</th>
                    <th>Question Type</th>
                    <th>Customer Code</th>
                    </tr>
                    </thead>
                <tbody>
                {this.props.sequences.map((device,i)=><TableRow key={i} data={device} serialNo={i} />)}
                </tbody>
                </table>
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
                
            );
        }
        if(this.state.section === 0){
            return(
                <div>
                    <h4 style={{textAlign:"center"}}>There are no question matching selected filter</h4>
                </div>
            )
        }

    }
}




export default SequenceTable;



