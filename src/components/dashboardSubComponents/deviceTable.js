import React, {Component} from 'react';
import { Loader } from 'react-overlay-loader';
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
        const { onSearchChange, deviceSearchKeyword, isSearching} =  this.props;
        return(
            <React.Fragment>
                <div className="form-group">
                        <div className="input-group input-group-lg">
                        <input type="text" id="search" placeholder="Search devices..." className="form-control" value={deviceSearchKeyword} onChange={(e)=>{onSearchChange(e)}} class="form-control"></input>
                        </div>
                    </div> 
            <div className="adjust example-box-wrapper">
            <Loader loading={isSearching} />
            <div id="dynamic-table-example-1_wrapper">
                
            <table cellPadding="0" cellSpacing="0" border="0" className="table table table-striped" id="dynamic-table-example-1">
            <thead>
                <tr>
                
                <th>Make</th>
                <th>Model</th>
                <th>Last Check In</th>
                <th>Last Driver To Use Device</th>
                <th>IMEI No.</th>
                <th>Branch Name</th>
                <th>Action</th>
                </tr>
                </thead>
            <tbody>
            {this.props.devices.map((device,i)=><TableRow key={i} data={device} serialNo={i} />)}
            </tbody>
            </table>
            </div>
            </div>
            </React.Fragment>
            
        );

    }
}




export default DeviceTable;



