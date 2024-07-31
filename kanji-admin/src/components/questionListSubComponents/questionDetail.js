import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import SelectList from '../createQuestionSubComponents/dropdownSelect'

class QuestionDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            org_hidden:true
        }
        this.toggle_organization_field = this.toggle_organization_field.bind(this)
    }

    componentWillMount = () =>{
        var cookie = new Cookies();
        var loginStatus = cookie.get('loggedIn')
        if(loginStatus === undefined){
            window.location = '/login'
        }
    }

    toggle_organization_field = () =>{
        this.setState({
            org_hidden : !this.state.org_hidden
        })
    }
    render(){
        console.log("hjkdhsakhdksajhd")
        console.log(this.props)
        return(
            <div className='QDBorder'>
                <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4"><b className="question_view_bold">Question Details</b></div>
                    <div className="col-md-4">
                    <a href="" onClick={this.props.back} style={{float:"right"}}><i class="fa fa-times" style={{fontSize:25}}></i></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    
                    </div>
                </div>
                <div className="row" style={{marginTop:70,backgroundColor:'#F2F2F2'}} >
                                <div className="col-md-6">
                                    <b className="question_view_bold QDBorder">Organization</b><p className="question_view_para" >{this.props.data.organisation}</p>  
                                </div>
                                <div className="col-md-6">
                                    <b className="question_view_bold">Branch</b><p className="question_view_para">{this.props.data.branch}</p>
                                </div>
                            </div>
                <div className="row" >
                    <div className="col-md-6">
                        <b className="question_view_bold QDBorder">Section</b><p className="question_view_para">{this.props.data.section}</p>
                    </div>
                    <div className="col-md-6">
                        <b className="question_view_bold">Sequence</b><p className="question_view_para">{this.props.data.sequence}</p>
                    </div>
                </div>

                <div className="row" style={{backgroundColor:'#F2F2F2'}}>
                    <div className="col-md-6">
                        <b className="question_view_bold QDBorder">Question Type</b><p className="question_view_para">{this.props.data.type}</p>
                    </div>
                    <div className="col-md-6">
                        <b className="question_view_bold">Question Text</b><p className="question_view_para">{this.props.data.text}</p>
                    </div>
                </div>
                <div className="row" style={{marginTop:30}}>
                   <div className="col-md-6">
                   <h2>True Action</h2>
                    <table cellPadding="0" cellSpacing="0" border="0" className="table table-striped" id="dynamic-table-example-1">
                    <thead>
                   <tr>
                   <th>Action</th>
                   <th>Action Data</th>
                   </tr>
                   </thead>
                    <tbody>
                        <tr hidden={!this.props.data.true_action_log}>
                            <td ><b className="question_view_bold">Log</b></td>
                            <td hidden={!this.props.data.true_action_log}>
                                    <b className="question_view_bold">Type:{this.props.data.true_action_log_type_name}</b><br/>
                                    <b className="question_view_bold">Text:{this.props.data.true_action_log_text}</b><br/>
                                    <b className="question_view_bold">Log Options:</b>
                                    <ul>
                                        <li hidden={!this.props.data.true_action_log_driver_gps}>GPS Co-ordinates</li>
                                        <li hidden={!this.props.data.true_action_log_no_of_packages}>No. of Packages</li>
                                        <li hidden={!this.props.data.true_action_log_date_time}>Date/Time</li>
                                        <li hidden={!this.props.data.true_action_log_driver_name}>Driver Name</li>
                                        <li hidden={!this.props.data.true_action_log_customer_name}>Customer Name</li>

                                    </ul>

                            </td>
                            </tr>
                            <tr hidden={!this.props.data.true_action_block}>
                                <td>
                                <b className="question_view_bold">Block</b>
                                </td>
                                <td>
                                <b className="question_view_bold">{this.props.data.true_action_block_text}</b>
                                </td>
                            </tr>

                            <tr hidden={!this.props.data.true_action_drop_status}>
                                <td><b className="question_view_bold">Drop Status</b></td>
                                <td><b className="question_view_bold">{this.props.data.true_action_drop_status_name}({this.props.data.true_action_drop_status_id})</b></td>
                            </tr>

                            <tr hidden={!this.props.data.true_action_run_status}>
                                <td><b className="question_view_bold">Run Status</b></td>
                                <td><b className="question_view_bold">{this.props.data.true_action_run_status_name}({this.props.data.true_action_run_status_id})</b></td>
                            </tr>

                            <tr hidden={!this.props.data.true_action_record}>
                                <td><b className="question_view_bold">Record</b></td>
                                <td></td>
                            </tr>
                            <tr hidden={!this.props.data.true_action_take_photo}>
                                <td><b className="question_view_bold">Take Photo</b></td>
                                <td></td>
                            </tr>
                            <tr hidden={!this.props.data.true_action_signature}>
                                <td><b className="question_view_bold">Take Signature</b></td>
                                <td></td>
                            </tr>
                            <tr hidden={!this.props.data.true_action_no_action}>
                                <td><b className="question_view_bold">No Action</b></td>
                                <td></td>
                            </tr>

                    </tbody>
                    </table>
                    
                   </div>
                   <div className="col-md-6">
                   <h2>False Action</h2>
                <table cellPadding="0" cellSpacing="0" border="0" className="table table-striped" id="dynamic-table-example-1">
                    <thead>
                   <tr>
                   <th>Action</th>
                   <th>Action Data</th>
                   </tr>
                   </thead>
                    <tbody>
                        <tr hidden={!this.props.data.false_action_log}>
                            <td ><b className="question_view_bold">Log</b></td>
                            <td hidden={!this.props.data.false_action_log}>
                                    <b className="question_view_bold">Type:{this.props.data.false_action_log_type_name}</b><br/>
                                    <b className="question_view_bold">Text:{this.props.data.false_action_log_text}</b><br/>
                                    <b className="question_view_bold">Log Options:</b>
                                    <ul>
                                        <li hidden={!this.props.data.false_action_log_driver_gps}>GPS Co-ordinates</li>
                                        <li hidden={!this.props.data.false_action_log_no_of_packages}>No. of Packages</li>
                                        <li hidden={!this.props.data.false_action_log_date_time}>Date/Time</li>
                                        <li hidden={!this.props.data.false_action_log_driver_name}>Driver Name</li>
                                        <li hidden={!this.props.data.false_action_log_customer_name}>Customer Name</li>

                                    </ul>

                            </td>
                            </tr>
                            <tr hidden={!this.props.data.false_action_block}>
                                <td>
                                <b className="question_view_bold">Block</b>
                                </td>
                                <td>
                                <b className="question_view_bold">{this.props.data.false_action_block_text}</b></td>
                            </tr>

                            <tr hidden={!this.props.data.false_action_drop_status}>
                                <td><b className="question_view_bold">Drop Status</b></td>
                                <td><b className="question_view_bold">{this.props.data.false_action_drop_status_name}({this.props.data.false_action_drop_status_id})</b></td>
                            </tr>
                            <tr hidden={!this.props.data.false_action_run_status}>
                                <td><b className="question_view_bold">Run Status</b></td>
                                <td><b className="question_view_bold">{this.props.data.false_action_run_status_name}({this.props.data.false_action_run_status_id})</b></td>
                            </tr>
                            <tr hidden={!this.props.data.false_action_record}>
                                <td><b className="question_view_bold">Record</b></td>
                                <td></td>
                            </tr>
                            <tr hidden={!this.props.data.false_action_take_photo}>
                                <td><b className="question_view_bold">Take Photo</b></td>
                                <td></td>
                            </tr>
                            <tr hidden={!this.props.data.false_action_signature}>
                                <td><b className="question_view_bold">Take Signature</b></td>
                                <td></td>
                            </tr>
                            <tr hidden={!this.props.data.false_action_no_action}>
                                <td><b className="question_view_bold">No Action</b></td>
                                <td></td>
                            </tr>

                    </tbody>
                    </table>
                   </div>
                   
                </div>
                {/* <div className="row">
                <div className="col-md-4">
                <button className="btn btn-primary" onClick={this.props.back} style={{width:100,marginLeft:0}}>Back</button>
                </div>
                    <div className="col-md-4 ">
                    </div>
                    <div className="col-md-4"></div>
                </div> */}
            </div>
        )
    }

}

export default QuestionDetails;