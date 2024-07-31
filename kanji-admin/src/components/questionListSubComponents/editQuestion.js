import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import SelectList from '../createQuestionSubComponents/dropdownSelect'
import Header from '../dashboardSubComponents/header'
import SideBar from '../dashboardSubComponents/sideBarNav'
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import SequenceTable from '../createQuestionSubComponents/sequenceTable'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {url,logout} from '../helper'

class EditQuestion extends Component {

    constructor(props) {
        super(props)
        this.state = {
            "superuser":'',
            "organization_admin":"",
            "branch_admin":"",
            "options_organization": [],
            "options_branch": [],
            "options_customers": [],
            "options_sections": [],
            "sequences": [],
            "action_types": [{ value: 'Button', label: 'Button', id: 1 }],
            "organization": null,
            "branch": null,
            "customer": "",
            "section": null,
            "action": null,
            "action_text": "",
            "btn_is_disabled": true,
            "btn_s2_next_disabled": true,
            "btn_next_s3_disabled": true,
            "current_section": 5,
            "loading": true,
            "already_mounted": false,
            "section_two_mounted": false,
            "input_sequence": null,
            "true_log": false,
            "true_log_slected_type": null,
            "true_log_list": [],
            true_log_selected_option: null,
            "true_log_text": null,
            "true_log_date": false,
            "true_log_GPS": false,
            "true_log_package": false,
            "true_log_driver_name": false,
            "true_log_customer_name": false,
            "true_block": false,
            "true_block_text": null,
            "true_status_list": [],
            "true_status": false,
            "true_selected_status": null,
            "true_record": false,
            "true_take_photo": false,
            "true_take_signature": false,
            "true_No_Action": false,
            "false_log": false,
            "false_log_slected_type": null,
            "false_log_list": [],
            false_log_selected_option: null,
            "false_log_text": "",
            "false_log_date": false,
            "false_log_GPS": false,
            "false_log_package": false,
            "false_log_driver_name": false,
            "false_log_customer_name": false,
            "false_block": false,
            "false_block_text": null,
            "false_status_list": [],
            "false_status": false,
            "false_selected_status": null,
            "false_record": false,
            "false_take_photo": false,
            "false_take_signature": false,
            "false_No_Action": false,
            "false_No_Action_disabled":false,
            run_status_list:[],
            drop_status_list:[],
            status_type:[
                {"value":"Drop","label":"Drop", "id":0},{"label":"Run","value":"Run", "id":1}
            ],
            true_selected_status_type:null,
            false_selected_status_type:null,
            true_log_modal: false,
            true_block_modal: false,
            true_status_modal: false,
            false_log_modal: false,
            false_block_modal: false,
            false_status_modal: false,
            message_box_modal: false,
            message_title: "",
            msg_type: '',
            message_body: "",
            onclose_target_url: ''
        }

        this.handleOrganizationSelect = this.handleOrganizationSelect.bind(this)
        this.handleBranchSelectSelect = this.handleBranchSelectSelect.bind(this)
        this.handleCustomerSelect = this.handleCustomerSelect.bind(this)
        this.handleSectionSelect = this.handleSectionSelect.bind(this)
        this.handleActionSelect = this.handleActionSelect.bind(this)
        this.enable_btn = this.enable_btn.bind(this)
        this.enable_next_s3_btn = this.enable_next_s3_btn.bind(this)
        this.next_section_two = this.next_section_two.bind(this)
        this.handle_btn_next_s3_click = this.handle_btn_next_s3_click.bind(this)
        this.back_to_section_two = this.back_to_section_two.bind(this)
        this.handleSequenceInput = this.handleSequenceInput.bind(this)
        this.handle_question_text_input = this.handle_question_text_input.bind(this)
        this.section_two_next_btn_handle = this.section_two_next_btn_handle.bind(this)
        this.handle_true_log_checkbox_click = this.handle_true_log_checkbox_click.bind(this)
        this.handleLogTypeSelect = this.handleLogTypeSelect.bind(this)
        this.true_log_text_area = this.true_log_text_area.bind(this)
        this.handle_true_log_date_checkbox_click = this.handle_true_log_date_checkbox_click.bind(this)
        this.handle_true_log_GPS_checkbox_click = this.handle_true_log_GPS_checkbox_click.bind(this)
        this.handle_true_log_package_checkbox_click = this.handle_true_log_package_checkbox_click.bind(this)
        this.handle_true_log_driver_name_checkbox_click = this.handle_true_log_driver_name_checkbox_click.bind(this)
        this.handle_true_log_customer_name_checkbox_click = this.handle_true_log_customer_name_checkbox_click.bind(this)
        this.handle_true_block_checkbox_click = this.handle_true_block_checkbox_click.bind(this)
        this.handle_true_record_checkbox_click = this.handle_true_record_checkbox_click.bind(this)
        this.handle_true_status_status_checkbox_click = this.handle_true_status_status_checkbox_click.bind(this)
        this.handleStatusSelect = this.handleStatusSelect.bind(this)
        this.handle_true_take_photo_checkbox_click = this.handle_true_take_photo_checkbox_click.bind(this)
        this.handle_true_take_signature_checkbox_click = this.handle_true_take_signature_checkbox_click.bind(this)
        this.handle_true_No_Action_checkbox_click = this.handle_true_No_Action_checkbox_click.bind(this)
        this.handle_block_text_input3 = this.handle_block_text_input3.bind(this)

        this.handle_false_log_checkbox_click = this.handle_false_log_checkbox_click.bind(this)
        this.FalsehandleLogTypeSelect = this.FalsehandleLogTypeSelect.bind(this)
        this.false_log_text_area = this.false_log_text_area.bind(this)
        this.handle_false_log_date_checkbox_click = this.handle_false_log_date_checkbox_click.bind(this)
        this.handle_false_log_GPS_checkbox_click = this.handle_false_log_GPS_checkbox_click.bind(this)
        this.handle_false_log_package_checkbox_click = this.handle_false_log_package_checkbox_click.bind(this)
        this.handle_false_log_driver_name_checkbox_click = this.handle_false_log_driver_name_checkbox_click.bind(this)
        this.handle_false_log_customer_name_checkbox_click = this.handle_false_log_customer_name_checkbox_click.bind(this)
        this.handle_false_block_checkbox_click = this.handle_false_block_checkbox_click.bind(this)
        this.handle_false_record_checkbox_click = this.handle_false_record_checkbox_click.bind(this)
        this.handle_false_status_status_checkbox_click = this.handle_false_status_status_checkbox_click.bind(this)
        this.FalsehandleStatusSelect = this.FalsehandleStatusSelect.bind(this)
        this.handle_false_take_photo_checkbox_click = this.handle_false_take_photo_checkbox_click.bind(this)
        this.handle_false_take_signature_checkbox_click = this.handle_false_take_signature_checkbox_click.bind(this)
        this.handle_false_No_Action_checkbox_click = this.handle_false_No_Action_checkbox_click.bind(this)
        this.back_section_3_btn = this.back_section_3_btn.bind(this)
        this.section_three_next_btn_handle = this.section_three_next_btn_handle.bind(this)
        this.back_section_4_btn = this.back_section_4_btn.bind(this)
        this.update_question = this.update_question.bind(this)
        this.handle_false_block_text_input = this.handle_false_block_text_input.bind(this)
        this.back_section_5_btn = this.back_section_5_btn.bind(this)
        this.handle_true_log_text_input = this.handle_true_log_text_input.bind(this)
        this.handle_false_log_text_input = this.handle_false_log_text_input.bind(this)
        this.toggle_true_log_modal = this.toggle_true_log_modal.bind(this)
        this.toggle_true_block_modal = this.toggle_true_block_modal.bind(this)
        this.toggle_true_status_modal = this.toggle_true_status_modal.bind(this)
        this.toggle_false_log_modal = this.toggle_false_log_modal.bind(this)
        this.toggle_false_block_modal = this.toggle_false_block_modal.bind(this)
        this.toggle_false_status_modal = this.toggle_false_status_modal.bind(this)
        this.close_message_box_modal = this.close_message_box_modal.bind(this)
        this.reset_state = this.reset_state.bind(this)
        this.close_on_success = this.close_on_success.bind(this)
        this.handleStatusTypeSelect = this.handleStatusTypeSelect.bind(this)
        this.FalsehandleStatusTypeSelect = this.FalsehandleStatusTypeSelect.bind(this)


    }


    reset_state = () => {
        this.setState(
            {
                "options_branch": [],
                "sequences": [],
                "organization": null,
                "branch": null,
                "customer": "",
                "section": null,
                "action": null,
                "action_text": "",
                "btn_is_disabled": true,
                "btn_s2_next_disabled": true,
                "btn_next_s3_disabled": true,
                "current_section": 1,
                "loading": false,
                "already_mounted": false,
                "section_two_mounted": false,
                "input_sequence": null,
                "true_log": false,
                "true_log_slected_type": null,
                true_log_selected_option: null,
                "true_log_text": null,
                "true_log_date": false,
                "true_log_GPS": false,
                "true_log_package": false,
                "true_log_driver_name": false,
                "true_log_customer_name": false,
                "true_block": false,
                "true_block_text": null,
                "true_status": false,
                "true_selected_status": null,
                "true_record": false,
                "true_take_photo": false,
                "true_take_signature": false,
                "true_No_Action": false,
                "false_log": false,
                "false_log_slected_type": null,
                false_log_selected_option: null,
                "false_log_text": "",
                "false_log_date": false,
                "false_log_GPS": false,
                "false_log_package": false,
                "false_log_driver_name": false,
                "false_log_customer_name": false,
                "false_block": false,
                "false_block_text": null,
                "false_status": false,
                "false_selected_status": null,
                "false_record": false,
                "false_take_photo": false,
                "false_take_signature": false,
                "false_No_Action": false,
                true_log_modal: false,
                true_block_modal: false,
                true_status_modal: false,
                false_log_modal: false,
                false_block_modal: false,
                false_status_modal: false,
                message_box_modal: false,
                message_title: "",
                message_body: "",
                onclose_target_url: ''
            }
        )
    }

    toggle_true_log_modal = () => {
        this.setState({
            true_log_modal: !this.state.true_log_modal
        });
    }

    toggle_true_block_modal = () => {
        this.setState({
            true_block_modal: !this.state.true_block_modal
        })
    }

    toggle_true_status_modal = () => {
        this.setState({
            true_status_modal: !this.state.true_status_modal
        })
    }

    toggle_false_log_modal = () => {
        this.setState({
            false_log_modal: !this.state.false_log_modal
        })
    }

    toggle_false_block_modal = () => {
        this.setState({
            false_block_modal: !this.state.false_block_modal
        })
    }

    toggle_false_status_modal = () => {
        this.setState({
            false_status_modal: !this.state.false_status_modal
        })
    }

    close_on_success = () => {
        this.setState({
            message_box_modal: !this.state.message_box_modal
        })
        if(this.state.branch_admin === 'true'){
            console.log("true before resetting state")
            var temp = this.state.options_branch
            this.reset_state()
            this.setState({options_branch:temp})
          
        }
        else{
            this.reset_state()
        }
        
    }
    close_message_box_modal = () => {

        this.setState({
            message_box_modal: !this.state.message_box_modal,
            loading: false
        })
        
        if (this.state.msg_type === 'success' & this.state.msg_type !='') {
            if(this.state.branch_admin === 'true'){
                console.log("true before resetting state")
                var temp = this.state.options_branch
                this.reset_state()
                this.setState({options_branch:temp,organization:{ value: 'all', label: 'all', id: -1}})
                console.log(this.props)
                this.props.fetch()
                this.props.close()
            }
            else{
                console.log(this.props)
                this.props.fetch()
                this.props.close()
                this.reset_state()
            }
        }
    }

    componentWillMount = () => {
        console.log("props are")
        console.log(this.props)
        const cookies = new Cookies();
        var superuser = cookies.get('superuser')
            var organization_admin = cookies.get('organization-admin')
            var branch_admin = cookies.get('branch-admin')
            var http = new XMLHttpRequest();
        if (this.state.already_mounted === false) {
            
            var loginStatus = cookies.get('loggedIn')
            console.log(loginStatus)
            if (loginStatus === undefined) {
                window.location = '/login'
            } else {
                this.setState({ current_section: 1,
                    superuser:superuser,
                    organization_admin:organization_admin,
                    branch_admin:branch_admin })
            }
            
            var dashboar_ref = this
            var user_id = cookies.get('user_id')
            var token = cookies.get('token')
            console.log(url+'/api/questions/wizard/organisation?user_id=' + user_id)
            console.log('Token ' + token)
            if(this.state.branch_admin === 'true'){
                http.open('GET', url+'/api/questions/wizard/branch?user_id=' + user_id, true);
            }
            else{
                http.open('GET', url+'/api/questions/wizard/organisation?user_id=' + user_id, true);
            }
            http.setRequestHeader("Authorization", "Token " + token);

            http.send()
            // http.setRequestHeader('Authorization','Token '+token)
            http.onreadystatechange = function () {
                console.log(http.responseText)
                if (http.readyState === 4 && http.status === 200) {
                    var json = JSON.parse(http.responseText)
                        if (json.status === 200) {
                            if(dashboar_ref.state.branch_admin === 'true'){
                                console.log(" B admin")
                                var branches = []
                                var branches = dashboar_ref.props.branches
                            // var branches = []
                            var section = []
                            var types = []
                            var log_types = []
                            var run_status_codes = []
                            var drop_status_codes = []
                            console.log(json.branches)
                            branches.forEach(element =>{
                                if(element.value === dashboar_ref.props.data.branch){
                                    dashboar_ref.setState({
                                        branch:element
                                    })
                                }
                            })

                        

                            json.question_types.forEach(element => {
                                var temp = {
                                    value: element.question_type, label: element.question_type, id: element.question_type_id
                                }
                                if(element.question_type === dashboar_ref.props.data.type){
                                    dashboar_ref.setState({
                                        action:temp,
                                        btn_next_s3_disabled: false
                                    })
                                }
                                types.push(temp)
                                console.log(types)
                            });
                            // json.question_statuses.forEach(element =>{
                            //     var temp ={ value: element.status, label: element.status, id: element.status}
                            //     console.log("appending "+element.status)
                            //     if(element.status === dashboar_ref.props.data.true_action_select_status){
                            //         dashboar_ref.setState({
                            //             true_selected_status:temp,
                            //             true_status:dashboar_ref.props.data.true_action_status
                            //         })
                            //     }
                            //     if(element.status === dashboar_ref.props.data.false_action_select_status){
                            //         dashboar_ref.setState({
                            //             false_selected_status:temp,
                            //             false_status:dashboar_ref.props.data.false_action_status
                            //         })
                            //     }
                            //     status_codes.push(temp)
                            // })
                            json.run_statuses.forEach(element =>{
                                var temp ={ value: element.status_name, label: element.status_name, id: element.status_id}
                                if(element.status_id === dashboar_ref.props.data.true_action_run_status_id){
                                    dashboar_ref.setState({
                                        true_selected_status:temp,
                                        true_selected_status_type:{"label":"Run","value":"Run", "id":1}
                                    })
                                }
                                if(element.status_id === dashboar_ref.props.data.false_action_run_status_id){
                                    dashboar_ref.setState({
                                        false_selected_status:temp,
                                        false_selected_status_type:{"label":"Run","value":"Run", "id":1}
                                    })
                                }
                                run_status_codes.push(temp)
                            })
                            json.drop_statuses.forEach(element =>{
                                var temp ={ value: element.status_name, label: element.status_name, id: element.status_id}
                                if(element.status_id === dashboar_ref.props.data.true_action_drop_status_id){
                                    dashboar_ref.setState({
                                        true_selected_status:temp,
                                        true_selected_status_type:{"label":"Drop","value":"Drop", "id":0}
                                    })
                                }
                                if(element.status_id === dashboar_ref.props.data.false_action_drop_status_id){
                                    dashboar_ref.setState({
                                        false_selected_status:temp,
                                        false_selected_status_type:{"label":"Drop","value":"Drop", "id":0}
                                    })
                                }
                                drop_status_codes.push(temp)
                            })
                            if(dashboar_ref.props.data.true_action_status === true){
                                var true_list = dashboar_ref.state.true_selected_status_type.id === 0 ? drop_status_codes :run_status_codes
                            }
                            
                            if(dashboar_ref.props.data.false_selected_status_type){
                                var false_list = dashboar_ref.state.false_selected_status_type.id === 0 ? drop_status_codes :run_status_codes
                            }
                            json.question_sections.forEach(element => {
                                var temp = {
                                    value: element.question_section_type, label: element.question_section_type, id: element.question_section_id
                                }
                                if(element.question_section_type === dashboar_ref.props.data.section){
                                    dashboar_ref.setState({
                                        section:temp
                                    },this.enable_btn)
                                }
                                section.push(temp)
                                console.log(section)
                            });
                            json.question_log_types.forEach(element =>{
                                var temp = { value: element.log_type, label: element.log_type, id: element.log_type_id }
                                if(element.log_type_id === dashboar_ref.props.data.true_action_log_type){
                                    dashboar_ref.setState({
                                        true_log_slected_type:temp,
                                        true_log_text:dashboar_ref.props.data.true_action_log_text
                                    })
                                }
                                if(element.log_type_id === dashboar_ref.props.data.false_action_log_type){
                                    dashboar_ref.setState({
                                        false_log_slected_type:temp,
                                        false_log_text:dashboar_ref.props.data.false_action_log_text
                                    })
                                }
                                log_types.push(temp)
                            })
                            

    
                            dashboar_ref.setState({
                                organization:{ value: 'all', label: 'all', id: -1},
                                action_types: types,
                                options_branch:branches,
                                options_sections: section,
                                input_sequence:dashboar_ref.props.data.sequence,
                                customer:dashboar_ref.props.data.customer_code,
                                btn_s2_next_disabled: false,
                                action_text:dashboar_ref.props.data.text,
                                loading: false,
                                already_mounted: true,
                                true_status_list:true_list,
                                false_status_list:false_list,
                                true_status:dashboar_ref.props.data.true_action_status,
                                false_status:dashboar_ref.props.data.false_action_status,
                                drop_status_list:drop_status_codes,
                                run_status_list:run_status_codes,
                                true_log:dashboar_ref.props.data.true_action_log,
                                true_log_customer_name:dashboar_ref.props.data.true_action_log_customer_name,
                                true_log_date:dashboar_ref.props.data.true_action_log_date_time,
                                true_log_GPS:dashboar_ref.props.data.true_action_log_driver_gps,
                                true_log_driver_name:dashboar_ref.props.data.true_action_log_driver_name,
                                true_log_package:dashboar_ref.props.data.true_action_log_no_of_packages,
                                true_block:dashboar_ref.props.data.true_action_block,
                                true_block_text:dashboar_ref.props.data.true_action_block_text,
                                true_record:dashboar_ref.props.data.true_action_record,
                                true_take_photo:dashboar_ref.props.data.true_action_take_photo,
                                true_take_signature:dashboar_ref.props.data.true_action_signature,
                                true_No_Action:dashboar_ref.props.data.true_action_no_action,
                                false_block:dashboar_ref.props.data.false_action_block,
                                false_block_text:dashboar_ref.props.data.false_action_block_text,
                                false_record:dashboar_ref.props.data.false_action_record,
                                false_take_photo:dashboar_ref.props.data.false_action_take_photo,
                                false_take_signature:dashboar_ref.props.data.false_action_signature,
                                false_No_Action:dashboar_ref.props.data.false_action_no_action,
                                false_log:dashboar_ref.props.data.false_action_log,
                                false_log_customer_name:dashboar_ref.props.data.false_action_log_customer_name,
                                false_log_date:dashboar_ref.props.data.false_action_log_date_time,
                                false_log_GPS:dashboar_ref.props.data.false_action_log_driver_gps,
                                false_log_driver_name:dashboar_ref.props.data.false_action_log_driver_name,
                                false_log_package:dashboar_ref.props.data.false_action_log_no_of_packages,
                                true_log_list:log_types,
                                false_log_list:log_types
    
                            })
                            }
                            else{
                                var orgs = dashboar_ref.props.orgs
                            var branches = dashboar_ref.props.branches
                            var customer = []
                            var section = []
                            var types = []
                            var log_types = []
                            var status_codes = []
                            var run_status_codes = []
                            var drop_status_codes = []

                            orgs.forEach(element =>{
                                if(element.value === dashboar_ref.props.data.organisation){
                                    dashboar_ref.setState({
                                        organization:element
                                    },this.enable_btn)
                                    }
                            })
                      
                            branches.forEach(element =>{
                                if(element.value === dashboar_ref.props.data.branch){
                                    dashboar_ref.setState({
                                        branch:element
                                    },this.enable_btn)
                                }
                            })
                            
                            json.question_types.forEach(element => {
                                var temp = {
                                    value: element.question_type, label: element.question_type, id: element.question_type_id
                                }
                                if(element.question_type === dashboar_ref.props.data.type){
                                    dashboar_ref.setState({
                                        action:temp,
                                        btn_next_s3_disabled: false
                                    })
                                }
                                types.push(temp)
                                console.log(types)
                            });
                            console.log(json.question_statuses)
                            // json.question_statuses.forEach(element =>{
                            //     var temp ={ value: element.status, label: element.status, id: element.status}
                            //     // console.log("appending "+element.status)
                            //     if(element.status === dashboar_ref.props.data.true_action_select_status){
                            //         dashboar_ref.setState({
                            //             true_selected_status:temp,
                            //             true_status:dashboar_ref.props.data.true_action_status
                            //         })
                            //     }
                            //     if(element.status === dashboar_ref.props.data.false_action_select_status){
                            //         dashboar_ref.setState({
                            //             false_selected_status:temp,
                            //             false_status:dashboar_ref.props.data.false_action_status
                            //         })
                            //     }
                            //     status_codes.push(temp)
                            // })
                            json.run_statuses.forEach(element =>{
                                var temp ={ value: element.status_name, label: element.status_name, id: element.status_id}
                                if(element.status_id === dashboar_ref.props.data.true_action_run_status_id){
                                    dashboar_ref.setState({
                                        true_selected_status:temp,
                                        true_selected_status_type:{"label":"Run","value":"Run", "id":1}
                                    })
                                }
                                if(element.status_id === dashboar_ref.props.data.false_action_run_status_id){
                                    dashboar_ref.setState({
                                        false_selected_status:temp,
                                        false_selected_status_type:{"label":"Run","value":"Run", "id":1}
                                    })
                                }
                                run_status_codes.push(temp)
                            })
                            console.log(json.drop_statuses)
                            json.drop_statuses.forEach(element =>{
                                var temp ={ value: element.status_name, label: element.status_name, id: element.status_id}
                                if(element.status_id === dashboar_ref.props.data.true_action_drop_status_id){
                                    dashboar_ref.setState({
                                        true_selected_status:temp,
                                        true_selected_status_type:{"label":"Drop","value":"Drop", "id":0}
                                    })
                                }
                                if(element.status_id === dashboar_ref.props.data.false_action_drop_status_id){
                                    dashboar_ref.setState({
                                        false_selected_status:temp,
                                        false_selected_status_type:{"label":"Drop","value":"Drop", "id":0}
                                    })
                                }
                                console.log(temp.value)
                                drop_status_codes.push(temp)
                            })
                            console.log(dashboar_ref.state.true_selected_status_type)
                            if(dashboar_ref.props.data.true_action_status === true){
                                var true_list = dashboar_ref.state.true_selected_status_type.id === 0 ? drop_status_codes :run_status_codes
                            }
                            
                            if(dashboar_ref.props.data.false_selected_status_type){
                                var false_list = dashboar_ref.state.false_selected_status_type.id === 0 ? drop_status_codes :run_status_codes
                            }
                            console.log("------------------")
                            console.log(drop_status_codes)
                            console.log(run_status_codes)
                            json.question_sections.forEach(element => {
                                var temp = {
                                    value: element.question_section_type, label: element.question_section_type, id: element.question_section_id
                                }
                                if(element.question_section_type === dashboar_ref.props.data.section){
                                    dashboar_ref.setState({
                                        section:temp
                                    },this.enable_btn)
                                }
                                section.push(temp)
                                console.log(section)
                            });
                            console.log("Log****************")
                            json.question_log_types.forEach(element =>{
                                var temp = { value: element.log_type, label: element.log_type, id: element.log_type_id }
                                if(element.log_type_id === dashboar_ref.props.data.true_action_log_type){
                                    console.log("equaled")
                                    dashboar_ref.setState({
                                        true_log_slected_type:temp,
                                        true_log_text:dashboar_ref.props.data.true_action_log_text
                                    })
                                }
                                if(element.log_type_id === dashboar_ref.props.data.false_action_log_type){
                                    dashboar_ref.setState({
                                        false_log_slected_type:temp,
                                        false_log_text:dashboar_ref.props.data.false_action_log_text
                                    })
                                }
                                console.log(element.log_type_id)
                                console.log(dashboar_ref.props.data.true_action_log_type)
                                log_types.push(temp)
                            })
                            console.log("*************************")
                            console.log(run_status_codes)
                            console.log(drop_status_codes)
                            dashboar_ref.setState({
                                options_organization: orgs,
                                action_types: types,
                                options_branch:branches,
                                options_sections: section,
                                input_sequence:dashboar_ref.props.data.sequence,
                                customer:dashboar_ref.props.data.customer_code,
                                btn_s2_next_disabled: false,
                                action_text:dashboar_ref.props.data.text,
                                loading: false,
                                already_mounted: true,
                                true_status_list:true_list,
                                false_status_list:false_list,
                                true_status:dashboar_ref.props.data.true_action_status,
                                false_status:dashboar_ref.props.data.false_action_status,
                                drop_status_list:drop_status_codes,
                                run_status_list:run_status_codes,
                                true_log:dashboar_ref.props.data.true_action_log,
                                true_log_customer_name:dashboar_ref.props.data.true_action_log_customer_name,
                                true_log_date:dashboar_ref.props.data.true_action_log_date_time,
                                true_log_GPS:dashboar_ref.props.data.true_action_log_driver_gps,
                                true_log_driver_name:dashboar_ref.props.data.true_action_log_driver_name,
                                true_log_package:dashboar_ref.props.data.true_action_log_no_of_packages,
                                true_block:dashboar_ref.props.data.true_action_block,
                                true_block_text:dashboar_ref.props.data.true_action_block_text,
                                true_record:dashboar_ref.props.data.true_action_record,
                                true_take_photo:dashboar_ref.props.data.true_action_take_photo,
                                true_take_signature:dashboar_ref.props.data.true_action_signature,
                                true_No_Action:dashboar_ref.props.data.true_action_no_action,
                                false_block:dashboar_ref.props.data.false_action_block,
                                false_block_text:dashboar_ref.props.data.false_action_block_text,
                                false_record:dashboar_ref.props.data.false_action_record,
                                false_take_photo:dashboar_ref.props.data.false_action_take_photo,
                                false_take_signature:dashboar_ref.props.data.false_action_signature,
                                false_No_Action:dashboar_ref.props.data.false_action_no_action,
                                false_log:dashboar_ref.props.data.false_action_log,
                                false_log_customer_name:dashboar_ref.props.data.false_action_log_customer_name,
                                false_log_date:dashboar_ref.props.data.false_action_log_date_time,
                                false_log_GPS:dashboar_ref.props.data.false_action_log_driver_gps,
                                false_log_driver_name:dashboar_ref.props.data.false_action_log_driver_name,
                                false_log_package:dashboar_ref.props.data.false_action_log_no_of_packages,
                                true_log_list:log_types,
                                false_log_list:log_types
    
                            })
                            console.log("^^^^^^^^^^^^")
                            console.log(dashboar_ref.state.drop_status_list)
                            console.log(dashboar_ref.state.run_status_list)
                            }
                        }
                        else{
                            dashboar_ref.setState({
                                message_title:"Connection Error",
                                message_body:"could not contact server. Please try again by refreshing page out else",
                                message_box_modal:true
                            })
                        }
                }
                
            }
            http.onerror = function (){
                dashboar_ref.setState({
                    message_box_modal:true,
                    message_title:"Could not load data",
                    message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
                 })
            }
        }

    }

    handleStatusTypeSelect = (true_selected_status_type) =>{
        // true_status_list
        var list = []
        console.log(true_selected_status_type)
        if(true_selected_status_type.id === 0){
            list= this.state.drop_status_list
        }
        else{
            list=this.state.run_status_list
        }
        this.setState({true_selected_status_type})
        console.log(list)
        this.setState({
            true_status_list:list,
            true_selected_status:null
        })
    }
    
    FalsehandleStatusTypeSelect = (false_selected_status_type) =>{
        
        var list = []
        if(false_selected_status_type.id === 0){
            list= this.state.drop_status_list
        }
        else{
            list=this.state.run_status_list
        }
        console.log(list)
        this.setState({false_selected_status_type})
        this.setState({
            false_status_list:list,
            false_selected_status:null
        })
    }

    handleOrganizationSelect = (organization) => {
        this.setState({ organization, loading: true }, this.enable_btn);
        if (organization.id != 0) {
            const cookies = new Cookies();
            var http = new XMLHttpRequest();
            var dashboar_ref = this
            var user_id = cookies.get('user_id')
            var token = cookies.get('token')
            console.log('Token ' + token)
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
                        if(branches.length>=2){
                            branches.unshift({
                                value: 'all', label: 'all', id: 0
                            })
                        }
                        dashboar_ref.setState({
                            options_branch: branches,
                            loading: false
                        })
                    }
                    else{
                        dashboar_ref.setState({
                            message_title:"Connection Error",
                            message_body:"could not contact server. Please try again by refreshing page",
                            message_box_modal:true
                        })
                    }
                }
            }
            http.onerror = function (){
                dashboar_ref.setState({
                    message_box_modal:true,
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
            })
        }

    }

    handleBranchSelectSelect = (branch) => {
        this.setState({ branch }, this.enable_btn);

        console.log(`Option selected:`, branch);
    }

    handleCustomerSelect = () => {
        var input = document.getElementById("cust_code_edit").value
        console.log(input)
        this.setState({
            customer:input
        })
    }
    handleSectionSelect = (section) => {
        this.setState({ section }, this.enable_btn);
        
        console.log(`Option selected:`, section.label);
    }

    handleActionSelect = (action) => {
        this.setState({ action,
         }, this.enable_next_s3_btn)
        console.log(action.label)
        if(action.label === 'text'){
            this.setState({
                false_No_Action:true,
                false_log:false,
                false_block:false,
                false_status:false,
                false_record:false,
                false_take_photo:false,
                false_take_signature:false,
                false_No_Action_disabled:true
            })
        }
        if(action.label === 'page'){
            this.setState({
                true_No_Action:true,
                false_No_Action:true
            })
        }
    }

    enable_btn = () => {
        // alert(this.state.organization)
        if (this.state.organization != null & this.state.branch != null & this.state.section != null) {
            this.setState({
                "btn_is_disabled": false
            })
        }
    }

    next_section_two = () => {
        this.setState({
            current_section: 2,
            loading: true
        })
        const cookies = new Cookies();
        var http = new XMLHttpRequest();
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        console.log('Token ' + token)
        var base_url = url+'/api/questions/wizard/sequence?user_id=' + user_id
        if (this.state.organization.id != 0) {
            base_url = base_url + '' + '&org_id=' + this.state.organization.id
        }
        if (this.state.branch.id != 0) {
            base_url = base_url + '' + '&branch_id=' + this.state.branch.id
        }
        base_url = base_url + '' + '&customer_code=' + this.state.customer
        base_url = base_url + '&section_id=' + this.state.section.id
        console.log(base_url)
        http.open('GET', base_url, true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.send()
        console.log(http.response)
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)
                if (json.status === 200) {

                    dashboar_ref.setState({
                        loading: false,
                        sequences: json.sequences
                    })
                }
                else {

                        dashboar_ref.setState({
                            message_title:"Connection Error",
                            message_body:"could not contact server. Please try again by refreshing page out else",
                            message_box_modal:true,
                            loading: false
                        })
                    
                }
            }
            
            
        }
        http.onerror = function (){
            dashboar_ref.setState({
                message_box_modal:true,
                message_title:"Could not load data",
                message_body:"Server did not respond in time. Try refreshing page or contact your service provider"
             })
        }


    }

    handleSequenceInput = () => {
        var input_sequence_local = document.getElementById('sequence_input').value
        console.log(input_sequence_local)
        var isNotDecimal = (parseFloat(input_sequence_local) - Math.floor(parseFloat(input_sequence_local))) !== 0; 
        console.log("is decimal "+isNotDecimal)
        if (input_sequence_local > 0 & input_sequence_local < 100 & !isNotDecimal) {
            this.setState({
                btn_s2_next_disabled: false,
                input_sequence: input_sequence_local
            })
        }
        else {
            this.setState({
                btn_s2_next_disabled: true,
                input_sequence: input_sequence_local
            })
        }
    }

    back_to_section_two = () => {
        this.setState({
            current_section: 1
        })
    }

    section_two_next_btn_handle = () => {
        this.setState({
            current_section: 3
        })
    }

    //Section III Handles

    handle_true_log_checkbox_click = () => {
        if (this.state.true_No_Action === false) {
            var current_state = this.state.true_log
            var modal = current_state === true ? false : true
            this.setState({
                true_log: !current_state,
                true_log_modal: modal
            })
        }
    }

    handleLogTypeSelect = (true_log_slected_type) => {

        this.setState({ true_log_slected_type });

        console.log(`Option selected:`, true_log_slected_type);
    }

    true_log_text_area = () => {
        var value = document.getElementById('true_log_text').value
        console.log("called " + value)
        this.setState({
            true_log_text: value
        })
    }

    handle_true_log_date_checkbox_click = () => {
        var current = this.state.true_log_date
        this.setState({
            true_log_date: !current
        })
    }

    handle_true_log_GPS_checkbox_click = () => {
        var current = this.state.true_log_GPS
        this.setState({
            true_log_GPS: !current
        })
    }

    handle_true_log_package_checkbox_click = () => {
        var current = this.state.true_log_package
        this.setState({
            true_log_package: !current
        })
    }

    handle_true_log_driver_name_checkbox_click = () => {
        var current = this.state.true_log_driver_name
        this.setState({
            true_log_driver_name: !current
        })
    }

    handle_true_log_customer_name_checkbox_click = () => {
        var current = this.state.true_log_customer_name
        this.setState({
            true_log_customer_name: !current
        })
    }

    handle_true_block_checkbox_click = () => {
        if (this.state.true_No_Action === false) {
            var current = this.state.true_block
            var modal = current === true ? false : true
            this.setState({
                true_block: !current,
                true_block_modal: modal
            })
        }
    }

    handle_true_record_checkbox_click = () => {
        if (this.state.true_No_Action === false) {
            var current = this.state.true_record
            this.setState({
                true_record: !current
            })
        }
    }

    handle_true_status_status_checkbox_click = () => {
        if (this.state.true_No_Action === false) {
            var current = this.state.true_status
            var modal = current === true ? false : true
            this.setState({
                true_status: !current,
                true_status_modal: modal
            })
        }
    }

    handleStatusSelect = (true_selected_status) => {
        this.setState({ true_selected_status })
    }

    handle_true_take_photo_checkbox_click = () => {
        if (this.state.true_No_Action === false) {
            var current = this.state.true_take_photo
            this.setState({
                true_take_photo: !current
            })
        }
    }

    handle_true_take_signature_checkbox_click = () => {
        if (this.state.true_No_Action === false) {
            var current = this.state.true_take_signature
            this.setState({
                true_take_signature: !current
            })
        }
    }

    handle_true_No_Action_checkbox_click = () => {
        var current = this.state.true_No_Action
        this.setState({
            true_log: false,
            true_block: false,
            true_status: false,
            true_record: false,
            true_take_photo: false,
            true_take_signature: false,
            true_No_Action: !current
        })
    }

    handle_question_text_input = () => {
        var input = document.getElementById('q_text_input').value
        this.setState({
            action_text: input
        }, this.enable_next_s3_btn)
        console.log(input)
    }

    enable_next_s3_btn = () => {
        if (this.state.action !== null) {

            this.setState({
                btn_next_s3_disabled: false
            })
        }
        else {
            this.setState({
                btn_next_s3_disabled: true
            })
        }
    }

    handle_btn_next_s3_click = () => {
        this.setState({
            current_section: 4
        })
    }

    // section 4 handles

    handle_false_log_checkbox_click = () => {
        if (this.state.false_No_Action === false) {
            var current_state = this.state.false_log
            var modal = current_state === true ? false : true
            this.setState({
                false_log: !current_state,
                false_log_modal: modal
            })
        }
    }

    FalsehandleLogTypeSelect = (false_log_slected_type) => {
        this.setState({ false_log_slected_type });

        console.log(`Option selected:`, false_log_slected_type);
    }

    false_log_text_area = () => {
        var value = document.getElementById('false_log_text').value
        console.log("called " + value)
        this.setState({
            false_log_text: value
        })
    }

    handle_false_log_date_checkbox_click = () => {
        var current = this.state.false_log_date
        this.setState({
            false_log_date: !current
        })
    }

    handle_false_log_GPS_checkbox_click = () => {
        var current = this.state.false_log_GPS
        this.setState({
            false_log_GPS: !current
        })
    }

    handle_false_log_package_checkbox_click = () => {
        var current = this.state.false_log_package
        this.setState({
            false_log_package: !current
        })
    }

    handle_false_log_driver_name_checkbox_click = () => {
        var current = this.state.false_log_driver_name
        this.setState({
            false_log_driver_name: !current
        })
    }

    handle_false_log_customer_name_checkbox_click = () => {
        var current = this.state.false_log_customer_name
        this.setState({
            false_log_customer_name: !current
        })
    }

    handle_false_block_checkbox_click = () => {
        if (this.state.false_No_Action === false) {
            var current = this.state.false_block
            var modal = current === true ? false : true
            this.setState({
                false_block: !current,
                false_block_modal: modal
            })
        }
    }

    handle_false_record_checkbox_click = () => {
        if (this.state.false_No_Action === false) {
            var current = this.state.false_record
            this.setState({
                false_record: !current
            })
        }
    }

    handle_false_status_status_checkbox_click = () => {
        if (this.state.false_No_Action === false) {
            var current = this.state.false_status
            var modal = current === true ? false : true
            this.setState({
                false_status: !current,
                false_status_modal: modal
            })
        }
    }


    FalsehandleStatusSelect = (false_selected_status) => {
        this.setState({ false_selected_status })
    }

    handle_false_take_photo_checkbox_click = () => {
        if (this.state.false_No_Action === false) {
            var current = this.state.false_take_photo
            this.setState({
                false_take_photo: !current
            })
        }
    }

    handle_false_take_signature_checkbox_click = () => {
        if (this.state.false_No_Action === false) {
            var current = this.state.false_take_signature
            this.setState({
                false_take_signature: !current
            })
        }
    }

    handle_true_log_text_input = () => {
        var input = document.getElementById('t_log_text').value
        this.setState({
            true_log_text: input
        })
    }

    handle_false_log_text_input = () => {
        var input = document.getElementById('f_log_text').value
        this.setState({
            false_log_text: input
        })
    }

    handle_false_No_Action_checkbox_click = () => {
        console.log(this.state.action_text.label)
        if(this.state.action.label === 'text'){
            console.log("should have returned "+this.state.action_text.label)
            return
        }
        var current = this.state.false_No_Action
        this.setState({
            false_log: false,
            false_block: false,
            false_status: false,
            false_record: false,
            false_take_photo: false,
            false_take_signature: false,
            false_No_Action: !current
        })
    }
    handle_block_text_input3 = () => {
        var input = document.getElementById('block_text_input').value
        this.setState({ true_block_text: input })
    }

    section_three_next_btn_handle = () => {
        if (this.state.true_log === false & this.state.true_block === false & this.state.true_status === false & this.state.true_record === false
            & this.state.true_take_photo === false & this.state.true_take_signature === false & this.state.true_No_Action === false) {
            alert("No False Actions have been specified kindly specify atleast one action or check 'No Action' to continue")
            return
        }
        if (this.state.true_log === true & this.state.true_log_slected_type === null) {
            alert("You have checked log option. Please also select type of log")
            return
        }

        if (this.state.true_block === true & this.state.true_block_text === null) {
            alert("You have checked block option. Please also Enter block text")
            return
        }
        if (this.state.true_status === true & this.state.true_selected_status === null) {
            alert("You have checked Status option. Please also select status code")
            return
        }
        else {
            console.log(this.state.true_log_text)
            console.log(this.state.false_log_text)
            this.setState(
                { current_section: 5 }
            )
        }
    }

    back_section_3_btn = () => {
        // console.log(this.state.input_sequence)
        // document.getElementById('sequence_input').value=this.state.input_sequence

        this.setState({ current_section: 2 })
    }
    back_section_4_btn = () => {
        this.setState({ current_section: 3 })
    }

    back_section_5_btn = () => {
        this.setState({ current_section: 4 })
    }

    update_question = () => {
        console.log(this.state.msg_type)
        this.setState({ loading: true })
        if (this.state.true_log === false & this.state.true_block === false & this.state.true_status === false & this.state.true_record === false
            & this.state.true_take_photo === false & this.state.true_take_signature === false & this.state.true_No_Action === false) {
            this.setState({
                message_title: "No True Action Specified",
                message_body: "No True Actions have been specified kindly specify atleast one action or check 'No Action' to continue",
                message_box_modal: true
            })
            return
        }
        if (this.state.true_log === true & this.state.true_log_slected_type === null) {

            this.setState({
                message_title: "Type of log unselected",
                message_body: "You have checked log option for True action. Please also select type of log",
                message_box_modal: true
            })
            return
        }

        if (this.state.true_block === true & this.state.true_block_text === null) {
            this.setState({
                message_title: "No Block Text",
                message_body: "You have checked block option for true action. Please also Enter block text",
                message_box_modal: true
            })
            return
        }
        if (this.state.true_status === true & this.state.true_selected_status === null) {

            this.setState({
                message_title: "No Status Code",
                message_body: "You have checked status option for true action. Please also select status code",
                message_box_modal: true
            })

            return
        }
        if (this.state.false_log === false & this.state.false_block === false & this.state.false_status === false & this.state.false_record === false
            & this.state.false_take_photo === false & this.state.false_take_signature === false & this.state.false_No_Action === false) {

            this.setState({
                message_title: "No False Action Specified",
                message_body: "No False Actions have been specified kindly specify atleast one action or check 'No Action' to continue",
                message_box_modal: true
            })
            return
        }
        if (this.state.false_log === true & this.state.false_log_slected_type === null) {

            this.setState({
                message_title: "No Log Type Selected",
                message_body: "You have checked log option for false action. Please also select type of log",
                message_box_modal: true
            })
            return
        }

        if (this.state.false_block === true & this.state.false_block_text === null) {

            this.setState({
                message_title: "No Block Text",
                message_body: "You have checked block option for false action. Please also Enter block text",
                message_box_modal: true
            })
            return
        }
        if (this.state.false_status === true & this.state.false_selected_status === null) {
            this.setState({
                message_title: "No Status Code Selected",
                message_body: "You have checked status option for false action. Please also select status code",
                message_box_modal: true
            })
            return
        }
        var arg_list ='&org_id=' + this.state.organization.id+ '&question_id='+this.props.data.question_id+ '&branch_id=' + this.state.branch.id + '&section_id=' + this.state.section.id + '&sequence=' + this.state.input_sequence + '&true_log=' + this.state.true_log +  '&question_type=' + this.state.action.id + '&question_text=' + this.state.action_text + '&false_log=' + this.state.false_log
        arg_list = this.state.customer === 'all' ? arg_list+'&customer_code=' : arg_list+'&customer_code=' + this.state.customer
        arg_list = this.state.true_log ? arg_list + '&true_log_type_id=' + this.state.true_log_slected_type.id : arg_list
        arg_list = this.state.true_log ? arg_list + '&true_log_GPS=' + this.state.true_log_GPS : arg_list
        arg_list = this.state.true_log ? arg_list + '&true_log_text=' + this.state.true_log_text : arg_list
        arg_list = this.state.true_log ? arg_list + '&true_log_no_packages=' + this.state.true_log_package : arg_list
        arg_list = this.state.true_log ? arg_list + '&true_log_dateTime=' + this.state.true_log_date : arg_list
        arg_list = this.state.true_log ? arg_list + '&true_log_driver_name=' + this.state.true_log_driver_name : arg_list
        arg_list = this.state.true_log ? arg_list + '&true_log_customer_name=' + this.state.true_log_customer_name : arg_list
        //apend true block option selection
        arg_list = arg_list + '&true_block=' + this.state.true_block
        arg_list = this.state.true_block ? arg_list + '&true_block_text=' + this.state.true_block_text : arg_list
        // true status option
        arg_list = arg_list + '&true_status=' + this.state.true_status
        if(this.state.true_status){
            arg_list = this.state.true_status ? arg_list + '&true_status_id=' + this.state.true_selected_status.id : arg_list
        arg_list = this.state.true_selected_status_type.id === 0 ? arg_list + '&true_drop_status=true&true_run_status=false' :arg_list +  '&true_drop_status=false&true_run_status=true'
        }

        //append true record option
        arg_list = arg_list + '&true_record=' + this.state.true_record
        //append true take photo
        arg_list = arg_list + '&true_take_photo=' + this.state.true_take_photo
        //append true take signature option
        arg_list = arg_list + '&true_take_signature=' + this.state.true_take_signature
        // append no action option
        arg_list = this.state.true_No_Action ? arg_list + '&true_no_action=' + this.state.true_No_Action : arg_list

        //append false action choices
        // arg_list = this.state.false_log ? arg_list+'&false_log='+this.state.false_log : arg_list
        arg_list = this.state.false_log ? arg_list + '&false_log_type_id=' + this.state.false_log_slected_type.id : arg_list
        arg_list = this.state.false_log ? arg_list + '&false_log_GPS=' + this.state.false_log_GPS : arg_list
        arg_list = this.state.false_log ? arg_list + '&false_log_text=' + this.state.false_log_text : arg_list
        arg_list = this.state.false_log ? arg_list + '&false_log_no_packages=' + this.state.false_log_package : arg_list
        arg_list = this.state.false_log ? arg_list + '&false_log_dateTime=' + this.state.false_log_date : arg_list
        arg_list = this.state.false_log ? arg_list + '&false_log_driver_name=' + this.state.false_log_driver_name : arg_list
        arg_list = this.state.false_log ? arg_list + '&false_log_customer_name=' + this.state.false_log_customer_name : arg_list
        arg_list = this.state.false_log ? arg_list + '&false_log_no_packages=' + this.state.false_log_customer_name : arg_list
        //apend false block option selection
        arg_list = arg_list + '&false_block=' + this.state.false_block
        arg_list = this.state.false_block ? arg_list + '&false_block_text=' + this.state.false_block_text : arg_list
        // false status option
        arg_list = arg_list + '&false_status=' + this.state.false_status
        if(this.state.false_status === true){

            arg_list = this.state.false_status ? arg_list + '&false_status_id=' + this.state.false_selected_status.id : arg_list
            arg_list =  this.state.false_selected_status_type.id === 0 ? arg_list +'&false_drop_status=true&false_run_status=false' : arg_list + '&false_drop_status=false&false_run_status=true'
        }

        //append false record option
        arg_list = arg_list + '&false_record=' + this.state.false_record
        //append false take photo
        arg_list = arg_list + '&false_take_photo=' + this.state.false_take_photo
        //append false take signature option
        arg_list = arg_list + '&false_take_signature=' + this.state.false_take_signature
        // append no action option
        arg_list = this.state.false_No_Action ? arg_list + '&false_no_action=' + this.state.false_No_Action : arg_list

        // console.log(arg_list)
        const cookies = new Cookies();
        var http = new XMLHttpRequest();
        var wizard_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        console.log('Token ' + token)
        http.open('PUT', url+'/api/questions/update', true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        console.log('user_id=' + user_id + '' + arg_list)
        http.send('user_id=' + user_id + '' + arg_list)
        http.onreadystatechange = function () {
            console.log(http.responseText)
            if (http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)
                if (json.status === 200) {
                    wizard_ref.setState({ loading: false })
                    wizard_ref.setState({
                        message_title: "Success",
                        message_body: "Question has been updated successfully",
                        message_box_modal: true,
                        msg_type: 'success',
                        onclose_target_url: '/create-organization'
                    })


                }
                else {
                    wizard_ref.setState({ loading: false })
                    wizard_ref.setState({
                        message_title: "Failure",
                        message_body: "Question could not be updated",
                        message_box_modal: true,
                        onclose_target_url: ""
                    })
                }
            }
            else {
                wizard_ref.setState({ loading: false })
                wizard_ref.setState({
                    message_title: "Failure",
                    message_body: "Question could not be updated",
                    message_box_modal: true,
                    onclose_target_url: ""
                })
            }
            if(http.readyState === 4 && http.status === 401){
                logout()
            }
        }

    }

    handle_false_block_text_input = () => {
        var input = document.getElementById('false_block_text_input').value
        this.setState({
            false_block_text: input
        })
    }

    render() {


        if (this.state.current_section === 1) {
            if(this.state.branch_admin === 'true'){
                return (

                    <div>
                        <div>
                            <Modal isOpen={this.state.message_box_modal}>
                                <ModalHeader>
                                    <h3>{this.state.message_title}</h3>
                                </ModalHeader>
                                <ModalBody>
                                    <b>{this.state.message_body}</b>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.close_message_box_modal}>Close</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <Loader loading={this.state.loading} />

                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3>Edit Question-Section I</h3>
                                    </div>
                                    <div className="col-md-4">
                                    <a href="" onClick={this.props.back} style={{float:"right"}}><i class="fa fa-times" style={{fontSize:25}}></i></a>
                                    </div>
                                </div>
                                {/* <div className='middle-loader'>
                            
                            </div> */}
                                <div className="row" style={{ marginTop: 30 }}>
    
                                    <div className="col-md-3">
                                    </div>
                                    <div className="col-md-6">
                                    <div className="right_side_selects">
    
                                    <h3>Select Branch</h3>
                                    <SelectList options={this.state.options_branch} actionHandler={this.handleBranchSelectSelect} selectedOption={this.state.branch} />
                                    </div>
                                    </div>
                                    <div className="col-md-3">

                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: 100 }}>
                                    <div className="col-md-5">
                                        <div className="org_select">
                                            <h3>Enter Customer Codes</h3>
                                            {/* <SelectList options={this.state.options_customers} actionHandler={this.handleCustomerSelect} selectedOption={this.state.customer} /> */}
                                            <input class="form-control" placeholder="Customer_Code,Customer_Code,Customer_code" id="cust_code_edit" value={this.state.customer} onChange={this.handleCustomerSelect} maxLength={300}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                    </div>
                                    <div className="col-md-5">
                                        <div className="right_side_selects">
                                            <h3>Select Section</h3>
                                            <SelectList options={this.state.options_sections} actionHandler={this.handleSectionSelect} selectedOption={this.state.section} />
                                            <button class="btn btn-blue-alt middle-next-btn" id="btn" onClick={this.next_section_two}><b>Next</b></button>
                                        </div>
    
                                    </div>
                                </div>
    
                       
                        
                    </div>
                )
            }
            else{
                return (

                    <div>
                        <div>
                            <Modal isOpen={this.state.message_box_modal}>
                                <ModalHeader>
                                    <h3>{this.state.message_title}</h3>
                                </ModalHeader>
                                <ModalBody>
                                    <b>{this.state.message_body}</b>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.close_message_box_modal}>Close</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <Loader loading={this.state.loading} />      
                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3>Edit Question-Section I</h3>
                                    </div>
                                    <div className="col-md-4">
                                    <a href="" onClick={this.props.back} style={{float:"right"}}><i class="fa fa-times" style={{fontSize:25}}></i></a>
                                    </div>
                                </div>
                                {/* <div className='middle-loader'>
                            
                            </div> */}
                                <div className="row" style={{ marginTop: 30 }}>
    
                                    <div className="col-md-5">
                                        <div className="org_select">
                                            <h3>Select Organization</h3>
    
                                            <SelectList options={this.state.options_organization} actionHandler={this.handleOrganizationSelect} selectedOption={this.state.organization} />
                                        </div>
    
    
                                    </div>
                                    <div className="col-md-2">
    
                                    </div>
                                    <div className="col-md-5">
                                        <div className="right_side_selects">
    
                                            <h3>Select Branch</h3>
                                            <SelectList options={this.state.options_branch} actionHandler={this.handleBranchSelectSelect} selectedOption={this.state.branch} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: 100 }}>
                                    <div className="col-md-5">
                                        <div className="org_select">
                                            <h3>Enter Customer Codes</h3>
                                            {/* <SelectList options={this.state.options_customers} actionHandler={this.handleCustomerSelect} selectedOption={this.state.customer} /> */}
                                            <input class="form-control" placeholder="Customer_Code,Customer_Code,Customer_code" id="cust_code_edit" value={this.state.customer} onChange={this.handleCustomerSelect} maxLength={300}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
    
    
    
    
                                    </div>
                                    <div className="col-md-5">
                                        <div className="right_side_selects">
                                            <h3>Select Section</h3>
                                            <SelectList options={this.state.options_sections} actionHandler={this.handleSectionSelect} selectedOption={this.state.section} />
                                            <button class="btn btn-blue-alt middle-next-btn" id="btn" onClick={this.next_section_two}><b>Next</b></button>
                                        </div>
    
                                    </div>
                                </div>
    
                        
                    </div>
                )
            }
        }
        if (this.state.current_section === 2) {
            return (
                <div>
                    <div>
                        <Modal isOpen={this.state.message_box_modal}>
                            <ModalHeader>
                                <h3>{this.state.message_title}</h3>
                            </ModalHeader>
                            <ModalBody>
                                <b>{this.state.message_body}</b>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.close_message_box_modal}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div>
                        <Loader loading={this.state.loading} />

                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3 className="s2_heading_text">Edit Question-Section II</h3>
                                    </div>
                                    <div className="col-md-4">
                                    <a href="" onClick={this.props.back} style={{float:"right"}}><i class="fa fa-times" style={{fontSize:25}}></i></a>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: 30 }}>

                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <SequenceTable sequences={this.state.sequences} />
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <div className="row" style={{ marginTop: 30 }}>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3>*Sequence Number</h3>
                                        <input type='number' className="form-control" placeholder='Enter Sequence Number (1-99)' value={this.state.input_sequence} id="sequence_input" onChange={this.handleSequenceInput}></input>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <div className="row ">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4" >
                                        <button class="btn btn-blue-alt s2_next_btn" onClick={this.section_two_next_btn_handle} disabled={this.state.btn_s2_next_disabled}>Next</button>
                                        <button onClick={this.back_to_section_two} class="btn btn-blue-alt s2_back_btn">Back</button>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                          
                    </div>
                </div>
            )
        }

        if (this.state.current_section === 3) {
            return (
                <div>
                    <div>
                        <Modal isOpen={this.state.message_box_modal}>
                            <ModalHeader>
                                <h3>{this.state.message_title}</h3>
                            </ModalHeader>
                            <ModalBody>
                                <b>{this.state.message_body}</b>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.close_message_box_modal}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div>
                        <Loader loading={this.state.loading} />

                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3 style={{ paddingLeft: 40 }}>Edit Question-Section III</h3>
                                    </div>
                                    <div className="col-md-4">
                                    <a href="" onClick={this.props.back} style={{float:"right"}}><i class="fa fa-times" style={{fontSize:25}}></i></a>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: 30 }}>

                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                    <h3>Question Type</h3>
                                        <SelectList options={this.state.action_types} actionHandler={this.handleActionSelect} selectedOption={this.state.action} />
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <div className="row" style={{ marginTop: 90 }}>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3>Question Text</h3>
                                        <input type='text' className="form-control" placeholder='Enter Question Text' value={this.state.action_text} id="q_text_input" onChange={this.handle_question_text_input} maxLength={300}></input>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <div className="row ">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4 " >
                                        <button onClick={this.back_section_3_btn} class="btn btn-blue-alt s2_back_btn">Back</button>
                                        <button class="btn btn-blue-alt s2_next_btn" onClick={this.handle_btn_next_s3_click} disabled={this.state.btn_next_s3_disabled}>Next</button>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>

                    </div>
                </div>
            )
        }
        if (this.state.current_section === 4) {
            return (
                <div>
                    <div>
                        <Modal isOpen={this.state.message_box_modal}>
                            <ModalHeader>
                                <h3>{this.state.message_title}</h3>
                            </ModalHeader>
                            <ModalBody>
                                <b>{this.state.message_body}</b>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.close_message_box_modal}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div>
                        <Loader loading={this.state.loading} />

                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3>Edit Question-Section IV</h3>
                                    </div>
                                    <div className="col-md-4">
                                    <a href="" onClick={this.props.back} style={{float:"right"}}><i class="fa fa-times" style={{fontSize:25}}></i></a>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">

                                        <h3>True Action</h3>
                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_true_log_checkbox_click}>
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_log} onClick={this.handle_true_log_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Log</b>
                                                    </label>
                                                </div>

                                            </div>
                                            <div>
                                                <Modal isOpen={this.state.true_log_modal}>
                                                    <ModalHeader>
                                                        <h3>True Action: Log Options</h3>
                                                    </ModalHeader>
                                                    <ModalBody>

                                                        <div>
                                                            <h3>Select log Type</h3>
                                                            <SelectList options={this.state.true_log_list} actionHandler={this.handleLogTypeSelect} selectedOption={this.state.true_log_slected_type} />
                                                        </div>

                                                        <div style={{ marginTop: 30, height: 'auto' }}>
                                                            <h3>Enter Log Text</h3>
                                                            <textarea type='text' className="form-control " placeholder='Enter Enter Log Text' id="t_log_text" value={this.state.true_log_text} onChange={this.handle_true_log_text_input}></textarea>
                                                        </div>

                                                        <div style={{ marginTop: 30, height: 'auto' }}>
                                                            <h3>Log Options Checklist</h3>
                                                            <div style={{ marginLeft: 20, height: 'auto' }}>
                                                                <div className="row">
                                                                    <label>
                                                                        <input type="checkbox" id="true_log_checkbox" checked={this.state.true_log_date} onClick={this.handle_true_log_date_checkbox_click} class="custom-checkbox"></input>
                                                                        <b className="label-text">Date/Time</b>

                                                                    </label>
                                                                </div>
                                                                <div className="row">
                                                                    <label>
                                                                        <input type="checkbox" id="true_log_checkbox" checked={this.state.true_log_GPS} onClick={this.handle_true_log_GPS_checkbox_click} class="custom-checkbox"></input>
                                                                        <b className="label-text">GPS Cordinates</b>

                                                                    </label>
                                                                </div>
                                                                <div className="row">
                                                                    <label>
                                                                        <input type="checkbox" id="true_log_checkbox" checked={this.state.true_log_package} onClick={this.handle_true_log_package_checkbox_click} class="custom-checkbox"></input>
                                                                        <b className="label-text">No. of Packages</b>

                                                                    </label>
                                                                </div>
                                                                <div className="row">
                                                                    <label>
                                                                        <input type="checkbox" id="true_log_checkbox" checked={this.state.true_log_driver_name} onClick={this.handle_true_log_driver_name_checkbox_click} class="custom-checkbox"></input>
                                                                        <b className="label-text">Driver Name</b>

                                                                    </label>
                                                                </div>
                                                                <div className="row">
                                                                    <label>
                                                                        <input type="checkbox" id="true_log_checkbox" checked={this.state.true_log_customer_name} onClick={this.handle_true_log_customer_name_checkbox_click} class="custom-checkbox"></input>
                                                                        <b className="label-text">Customer Name</b>

                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" onClick={this.toggle_true_log_modal}>Done</Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </div>



                                        </div>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_true_block_checkbox_click}>
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_block} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Block</b>

                                                    </label>
                                                </div>

                                            </div>
                                            <div>
                                                <Modal isOpen={this.state.true_block_modal}>
                                                    <ModalHeader>
                                                        <h3>True Action:Block Text</h3>

                                                    </ModalHeader>
                                                    <ModalBody>
                                                        <h3>Enter Block Text</h3>
                                                        <input type='text' className="form-control" placeholder='Enter Block Text' onChange={this.handle_block_text_input3} value={this.state.true_block_text} id="block_text_input" maxLength={300}></input>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" onClick={this.toggle_true_block_modal}>Done</Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </div>
                                        </div>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_true_status_status_checkbox_click}>
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_status} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Status</b>

                                                    </label>
                                                </div>


                                                <div>
                                                    <Modal isOpen={this.state.true_status_modal}>
                                                        <ModalHeader>
                                                            <h3>True Action: Status</h3>

                                                        </ModalHeader>
                                                        <ModalBody>

                                                            <h3>Status Type</h3>    
                                                        <SelectList options={this.state.status_type} actionHandler={this.handleStatusTypeSelect} selectedOption={this.state.true_selected_status_type} />
                                                        <h3>Status Code</h3> 
                                                            <SelectList options={this.state.true_status_list} actionHandler={this.handleStatusSelect} selectedOption={this.state.true_selected_status} />

                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="primary" onClick={this.toggle_true_status_modal}>Done</Button>
                                                        </ModalFooter>
                                                    </Modal>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_true_record_checkbox_click}>
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_record} onClick={this.handle_true_record_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Record</b>

                                                    </label>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_true_take_photo_checkbox_click}>
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_take_photo} onClick={this.handle_true_take_photo_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Take Photo</b>

                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_true_take_signature_checkbox_click}>
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_take_signature} onClick={this.handle_true_take_signature_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Take Signature</b>

                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_true_No_Action_checkbox_click}>
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_No_Action} onClick={this.handle_true_No_Action_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">No Action</b>

                                                    </label>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="col-md-2">

                                        <div className="vl">

                                        </div>

                                    </div>
                                    <div className="col-md-5">
                                        <h3>False Action</h3>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_false_log_checkbox_click}>
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.false_log} onClick={this.handle_false_log_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Log</b>
                                                    </label>
                                                </div>

                                                <div>
                                                    <Modal isOpen={this.state.false_log_modal}>
                                                        <ModalHeader>False Action-Log: Specify Options</ModalHeader>
                                                        <ModalBody>
                                                            <h3>Select Log Type</h3>
                                                            <SelectList options={this.state.false_log_list} actionHandler={this.FalsehandleLogTypeSelect} selectedOption={this.state.false_log_slected_type} />
                                                            <div style={{ marginTop: 50, height: 'auto' }}>
                                                                <h3>Enter Log Text</h3>
                                                                <textarea type='text' className="form-control " placeholder='Enter Enter Log Text' id="f_log_text" value={this.state.false_log_text} onChange={this.handle_false_log_text_input}  ></textarea>
                                                            </div>
                                                            <div style={{ marginTop: 50, height: 'auto' }}>
                                                                <h3>Log Options Checklist</h3>
                                                                <div style={{ marginLeft: 10, height: 'auto' }}>
                                                                    <div className="row">
                                                                        <label>
                                                                            <input type="checkbox" id="true_log_checkbox" checked={this.state.false_log_date} onClick={this.handle_false_log_date_checkbox_click} class="custom-checkbox"></input>
                                                                            <b className="label-text">Date/Time</b>

                                                                        </label>
                                                                    </div>
                                                                    <div className="row">
                                                                        <label>
                                                                            <input type="checkbox" id="true_log_checkbox" checked={this.state.false_log_GPS} onClick={this.handle_false_log_GPS_checkbox_click} class="custom-checkbox"></input>
                                                                            <b className="label-text">GPS Cordinates</b>

                                                                        </label>
                                                                    </div>
                                                                    <div className="row">
                                                                        <label>
                                                                            <input type="checkbox" id="true_log_checkbox" checked={this.state.false_log_package} onClick={this.handle_false_log_package_checkbox_click} class="custom-checkbox"></input>
                                                                            <b className="label-text">No. of Packages</b>

                                                                        </label>
                                                                    </div>
                                                                    <div className="row">
                                                                        <label>
                                                                            <input type="checkbox" id="true_log_checkbox" checked={this.state.false_log_driver_name} onClick={this.handle_false_log_driver_name_checkbox_click} class="custom-checkbox"></input>
                                                                            <b className="label-text">Driver Name</b>

                                                                        </label>
                                                                    </div>
                                                                    <div className="row">
                                                                        <label>
                                                                            <input type="checkbox" id="true_log_checkbox" checked={this.state.false_log_customer_name} onClick={this.handle_false_log_customer_name_checkbox_click} class="custom-checkbox"></input>
                                                                            <b className="label-text">Customer Name</b>

                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </ModalBody>
                                                        <ModalFooter>

                                                            <Button color="primary" onClick={this.toggle_false_log_modal}>Done</Button>

                                                        </ModalFooter>
                                                    </Modal>
                                                </div>

                                            </div>


                                        </div>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_false_block_checkbox_click}>
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.false_block} onClick={this.handle_false_block_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Block</b>
                                                    </label>
                                                </div>
                                                <div>
                                                    <Modal isOpen={this.state.false_block_modal}>
                                                        <ModalHeader>
                                                            <h3>False Action:Block Text</h3>
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            <h3>Enter Block Text</h3>
                                                            <input type='text' className="form-control" placeholder='Enter Block Text' onChange={this.handle_false_block_text_input} value={this.state.false_block_text} id="false_block_text_input" maxLength={300}></input>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="primary" onClick={this.toggle_false_block_modal}>Done</Button>
                                                        </ModalFooter>
                                                    </Modal>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_false_status_status_checkbox_click}>
                                                    <input type="checkbox" id="false_log_checkbox" checked={this.state.false_status} onClick={this.handle_false_status_status_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Status</b>
                                                    </label>
                                                </div>

                                            </div>
                                            <div>
                                                <Modal isOpen={this.state.false_status_modal}>
                                                    <ModalHeader>
                                                        <h3>False Action: Select Status</h3>
                                                    </ModalHeader>
                                                    <ModalBody>
                                                    <h3>Status Type</h3>    
                                                        <SelectList options={this.state.status_type} actionHandler={this.FalsehandleStatusTypeSelect} selectedOption={this.state.false_selected_status_type} />
                                                        <h3>Select Status Code</h3>
                                                        <SelectList options={this.state.false_status_list} actionHandler={this.FalsehandleStatusSelect} selectedOption={this.state.false_selected_status} />
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" onClick={this.toggle_false_status_modal}>Done</Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </div>



                                        </div>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_false_record_checkbox_click}>
                                                    <input type="checkbox" id="false_log_checkbox" checked={this.state.false_record} onClick={this.handle_false_record_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Reord</b>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_false_take_photo_checkbox_click}>
                                                    <input type="checkbox" id="false_log_checkbox" checked={this.state.false_take_photo} onClick={this.handle_false_take_photo_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Take Photo</b>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_false_take_signature_checkbox_click}>
                                                    <input type="checkbox" id="false_log_checkbox" checked={this.state.false_take_signature} onClick={this.handle_false_take_signature_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Take Signature</b>
                                                    </label>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_false_No_Action_checkbox_click}>
                                                    <input type="checkbox" id="false_log_checkbox" checked={this.state.false_No_Action} onClick={this.handle_false_No_Action_checkbox_click} class="custom-checkbox" ></input>
                                                    <label>
                                                        <b className="label-text">No Action</b>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button onClick={this.back_section_4_btn} class="btn btn-blue-alt final_back_btn"><b>Back</b></button>
                                        <button class="btn btn-blue-alt final_next_btn" onClick={this.update_question}  ><b>Update Question</b></button>
                                    </div>
                                    {/* <div className="col-md-4"></div>
                        <div className="col-md-4">
                        
                        </div> */}
                                </div>

                    </div>
                </div>
            )
        }

        //Specify false action section
        if (this.state.current_section === 5) {
            <div>
                <Loader loading={this.state.loading} />
            </div>
        }
    }
}

export default EditQuestion