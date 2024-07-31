import React, {Component} from 'react';
import TableRow from './DeviceTableRow'


class DeviceTable extends Component{

    constructor(props){
        super(props)
        this.state={
            devices :[
                {
                    "id":1,
                    "make":"2016",
                    "model":"E-61",
                    "last_check_in":"02:45:22",
                    "last_driver":"John Doe",
                    "imei":"324712345677890"
                },
                {
                    "id":1,
                    "make":"2016",
                    "model":"E-61",
                    "last_check_in":"02:45:22",
                    "last_driver":"John Doe",
                    "imei":"324712345677890"
                },
                {
                    "id":1,
                    "make":"2016",
                    "model":"E-61",
                    "last_check_in":"02:45:22",
                    "last_driver":"John Doe",
                    "imei":"324712345677890"
                }
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
                
                <th>Make</th>
                <th>Model</th>
                <th>Last Check In</th>
                <th>Last Driver To Use Device</th>
                <th>IMEI No.</th>
                <th>Action</th>
                </tr>
                </thead>
            <tbody>
            {this.props.devices.map((device,i)=><TableRow key={i} data={device} serialNo={i} />)}
            </tbody>
            </table>
            </div>
            </div>
            
        );

    }
}




export default DeviceTable;



