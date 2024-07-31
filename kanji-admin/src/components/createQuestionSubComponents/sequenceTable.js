import React, {Component} from 'react';
import TableRow from './sequenceTableRow'


class SequenceTable extends Component{

    constructor(props){
        super(props)
        this.state={
            sequences :[
                {
                    "sequence":50,
                    "text":"How you doin",
                    "type":"Question",
                    
                },
                {
                    "sequence":55,
                    "text":"How you doin 1",
                    "type":"Button",
                    
                },
                {
                    "sequence":60,
                    "text":"How you doin 2",
                    "type":"Page",
                    
                },
            ]
        }
    }
    
    render(){

        return(
             
            <div className="adjust example-box-wrapper">
            <div id="dynamic-table-example-1_wrapper">
                
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
            </div>
            
        );

    }
}




export default SequenceTable;



