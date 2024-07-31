import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import SelectList from './createQuestionSubComponents/dropdownSelect'
import Header from './dashboardSubComponents/header'
import SideBar from './dashboardSubComponents/sideBarNav'
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import SequenceTable from './createQuestionSubComponents/sequenceTable'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {url,logout} from './helper'
import Pagination from "react-js-pagination";


class CreateQuestionPageOne extends Component {

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
            "sequenceErrorMessageHidden":true,
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
            onclose_target_url: '',
            true_log_disabled:false,
            true_block_disabled:false,
            true_status_disabled:false,
            true_record_disabled:false,
            true_take_photo_disabled:false,
            true_take_signature_disabled:false,
            true_No_Action_disabled:false,
            false_log_disabled:false,
            false_block_disabled:false,
            false_status_disabled:false,
            false_record_disabled:false,
            false_take_photo_disabled:false,
            false_take_signature_disabled:false,
            activePage:1,
            page_size:10,
            recordSize:0

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
        this.create_question = this.create_question.bind(this)
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
        this.handleFalseStatusTypeSelect = this.handleFalseStatusTypeSelect.bind(this)
        this.FalsehandleStatusTypeSelect = this.FalsehandleStatusTypeSelect.bind(this)
        this.fetch = this.fetch.bind(this)


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
            //("true before resetting state")
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
        console.log("&&&&&&&&&&&&&&&&&&&&&")
        console.log(this.state.msg_type)
        console.log(this.state.msg_type )
        if (this.state.msg_type === 'success' & this.state.msg_type !=='') {
            if(this.state.branch_admin === 'true'){
                //("true before resetting state")
                var temp = this.state.options_branch
                this.reset_state()
                this.setState({options_branch:temp,organization:{ value: 'all', label: 'all', id: -1}})
            }
            else{
                this.reset_state()
            }
        }
    }

    componentWillMount = () => {
        const cookies = new Cookies();
        var superuser = cookies.get('superuser')
            var organization_admin = cookies.get('organization-admin')
            var branch_admin = cookies.get('branch-admin')
            var http = new XMLHttpRequest();
        if(cookies.get('branch-user') === "true"){
            window.location = '/dashboard'
        }
        if (this.state.already_mounted === false) {
            
            var loginStatus = cookies.get('loggedIn')
            //(loginStatus)
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
            //(url+'/api/questions/wizard/organisation?user_id=' + user_id)
            //('Token ' + token)
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
                //(http.responseText)
                if (http.readyState === 4 && http.status === 200) {
                    var json = JSON.parse(http.responseText)
                        if (json.status === 200) {
                            if(dashboar_ref.state.branch_admin === 'true'){
                                //(" B admin")
                            var branches = []
                            // var branches = []
                            var customer = []
                            // var section = []
                            var types = []
                            // var log_types = []
                            // var drop_status_codes = []
                            // var run_status_codes = []
                            //(json.branches)
                        json.branches.forEach(element => {
                            var temp = {
                                value: element.branch_name, label: element.branch_name, id: element.branch_id
                            }
                            branches.push(temp)
                            //(branches)
                        });
                        //('braches lenght '+branches.length)
                        var len = branches.length
                        if(len > 1){
                            branches.unshift({
                                value: 'all', label: 'all', id: 0
                            })
                        }
                       

                            json.question_types.forEach(element => {
                                var temp = {
                                    value: element.question_type, label: element.question_type, id: element.question_type_id
                                }
                                types.push(temp)
                                //(types)
                            });
                            // json.drop_statuses.forEach(element =>{
                            //     var temp ={ value: element.status_name, label: element.status_name, id: element.status_id}
                            //     drop_status_codes.push(temp)
                            // })
                            // json.run_statuses.forEach(element =>{
                            //     var temp ={ value: element.status_name, label: element.status_name, id: element.status_id}
                            //     run_status_codes.push(temp)
                            // })
                            // json.question_sections.forEach(element => {
                            //     var temp = {
                            //         value: element.question_section_type, label: element.question_section_type, id: element.question_section_id
                            //     }
                            //     section.push(temp)
                            //     //(section)
                            // });
                            // json.question_log_types.forEach(element =>{
                            //     var temp = { value: element.log_type, label: element.log_type, id: element.log_type_id }
                            //     log_types.push(temp)
                            // })
                            
                            customer.unshift({
                                value: 'all', label: 'all', id: 0
                            })
    
                            dashboar_ref.setState({
                                organization:{ value: 'all', label: 'all', id: -1},
                                action_types: types,
                                // options_sections: section,
                                loading: false,
                                already_mounted: true,
                                options_branch:branches,
                                // run_status_list:run_status_codes,
                                // drop_status_list:drop_status_codes,
                                // true_log_list:log_types,
                                // false_log_list:log_types
    
                            })
                            }
                            else{
                                var orgs = []
                            // var branches = []
                            var customer = []
                            // var section = []
                            var types = []
                            // var log_types = []
                            // var drop_status_codes = []
                            // var run_status_codes = []
                            
                                json.organisations.forEach(element => {
                                    var temp = {
                                        value: element.org_name, label: element.org_name, id: element.org_id
                                    }
                                    orgs.push(temp)
                                    //(orgs)
                                });
                      

                            
                            json.question_types.forEach(element => {
                                var temp = {
                                    value: element.question_type, label: element.question_type, id: element.question_type_id
                                }
                                types.push(temp)
                                //(types)
                            });
                           
                            // json.drop_statuses.forEach(element =>{
                            //     var temp ={ value: element.status_name, label: element.status_name, id: element.status_id}
                            //     drop_status_codes.push(temp)
                            // })
                            // json.run_statuses.forEach(element =>{
                            //     var temp ={ value: element.status_name, label: element.status_name, id: element.status_id}
                            //     run_status_codes.push(temp)
                            // })
                            // json.question_sections.forEach(element => {
                            //     var temp = {
                            //         value: element.question_section_type, label: element.question_section_type, id: element.question_section_id
                            //     }
                            //     section.push(temp)
                            //     //(section)
                            // });
                            // json.question_log_types.forEach(element =>{
                            //     var temp = { value: element.log_type, label: element.log_type, id: element.log_type_id }
                            //     log_types.push(temp)
                            // })
                           if(orgs.length > 1){
                            orgs.unshift({
                                value: 'all', label: 'all', id: 0
                            })
                           }

                            customer.unshift({
                                value: 'all', label: 'all', id: 0
                            })
    
                            dashboar_ref.setState({
                                options_organization: orgs,
                                action_types: types,
                                // options_branch:branches,
                                options_customers: customer,
                                // options_sections: section,
                                loading: false,
                                already_mounted: true,
                                // run_status_list:run_status_codes,
                                // drop_status_list:drop_status_codes,
                                // true_log_list:log_types,
                                // false_log_list:log_types
    
                            })
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
                if(http.readyState === 4 && http.status === 401){
                    logout()
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

    handleOrganizationSelect = (organization) => {
        this.setState({ organization, loading: true }, this.enable_btn);
        if (organization.id !== 0) {
            this.setState({branch:null})
            this.setState({ organization, loading: true }, this.enable_btn);
            const cookies = new Cookies();
            var http = new XMLHttpRequest();
            var dashboar_ref = this
            var user_id = cookies.get('user_id')
            var token = cookies.get('token')
            //('Token ' + token)
            http.open('GET', url+'/api/questions/wizard/branch?user_id=' + user_id + '&org_id=' + organization.id, true);
            http.setRequestHeader("Authorization", "Token " + token);
            http.send()
            http.onreadystatechange = function () {
                //(http.responseText)
                if (http.readyState === 4 && http.status === 200) {
                    var json = JSON.parse(http.responseText)
                    if (json.status === 200) {
                        var branches = []
                        json.branches.forEach(element => {
                            var temp = {
                                value: element.branch_name, label: element.branch_name, id: element.branch_id
                            }
                            branches.push(temp)
                            //(branches)
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

            //(`Option selected:`, organization.id);
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
            this.handleBranchSelectSelect({ value: 'all', label: 'all', id: 0 })
        }

    }

    handleBranchSelectSelect = (branch) => {
        this.setState({ branch }, this.enable_btn);
        var org_id = 0
        if(this.state.organization != null){
            org_id = this.state.organization.id
        }
        var id = branch.id
        this.setState({loading:true})
        const cookies = new Cookies();
        var http = new XMLHttpRequest();
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        //('Token ' + token)
        http.open('GET', url+'/api/questions/wizard/runsheet?user_id='+ user_id+'&org_id='+org_id+'&branch_id='+id, true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.send()
        http.onreadystatechange = function(){
            if(http.readyState === 4 && http.status === 200){
                var json = JSON.parse(http.responseText)
                console.log(json)
                if(json.status === 200){
                    var section = []
                    var log_types = []
                    var drop_status_codes = []
                    var run_status_codes = []

                   
                    json.drop_statuses.forEach(element =>{
                        var temp ={ value: element.status_name, label: element.status_name, id: element.status_id}
                        drop_status_codes.push(temp)
                    })
                    json.run_statuses.forEach(element =>{
                        var temp ={ value: element.status_name, label: element.status_name, id: element.status_id}
                        run_status_codes.push(temp)
                    })
                    json.question_sections.forEach(element => {
                        var temp = {
                            value: element.question_section_type, label: element.question_section_type, id: element.question_section_id
                        }
                        section.push(temp)
                        //(section)
                    });
                    json.question_log_types.forEach(element =>{
                        var temp = { value: element.log_type, label: element.log_type, id: element.log_type_id }
                        log_types.push(temp)
                    })
                    

                    dashboar_ref.setState({
                        loading: false,
                        // sequences: json.sequences,
                        options_sections: section,
                        already_mounted: true,
                        run_status_list:run_status_codes,
                        drop_status_list:drop_status_codes,
                        true_log_list:log_types,
                        false_log_list:log_types
                    })
                }
                else{
                    dashboar_ref.setState({
                        loading:false
                    })
                }
            }
        }
        // if(this.state.sele)
        // var section = []
        //             var log_types = []
        //             var drop_status_codes = []
        //             var run_status_codes = []

                   
        //             json.drop_statuses.forEach(element =>{
        //                 var temp ={ value: element.status_name, label: element.status_name, id: element.status_id}
        //                 drop_status_codes.push(temp)
        //             })
        //             json.run_statuses.forEach(element =>{
        //                 var temp ={ value: element.status_name, label: element.status_name, id: element.status_id}
        //                 run_status_codes.push(temp)
        //             })
        //             json.question_sections.forEach(element => {
        //                 var temp = {
        //                     value: element.question_section_type, label: element.question_section_type, id: element.question_section_id
        //                 }
        //                 section.push(temp)
        //                 //(section)
        //             });
        //             json.question_log_types.forEach(element =>{
        //                 var temp = { value: element.log_type, label: element.log_type, id: element.log_type_id }
        //                 log_types.push(temp)
        //             })
                    

        //             dashboar_ref.setState({
        //                 loading: false,
        //                 sequences: json.sequences,
        //                 options_sections: section,
        //                 already_mounted: true,
        //                 run_status_list:run_status_codes,
        //                 drop_status_list:drop_status_codes,
        //                 true_log_list:log_types,
        //                 false_log_list:log_types
        //             })
    }

    handleCustomerSelect = () => {
        var input = document.getElementById("cust_code").value
        if(input !== ""){
            //("in "+input)
            this.setState({ customer:input });
            //(this.state.customer)
        }

    }
    handleSectionSelect = (section) => {
        this.setState({ section }, this.enable_btn);
        
        //(`Option selected:`, section.label);
    }

    handleActionSelect = (action) => {
        this.setState({ action,
            true_No_Action:false,
                false_No_Action:false
         }, this.enable_next_s3_btn)
        //(action.label)

        this.setState({
            true_log:false,
            true_block:false,
            true_status:false,
            true_record:false,
            true_take_photo:false,
            true_take_signature:false,
            true_No_Action:false,
            false_log:false,
            false_block:false,
            false_status:false,
            false_record:false,
            false_take_photo:false,
            false_take_signature:false,
            false_No_Action:false,
        })
        if(action.label === 'text'){
            this.setState({
                false_No_Action:true,
                true_No_Action:true,
            })
        }
        if(action.label === 'page'){
            this.setState({
                true_No_Action:true,
                false_No_Action:true,
                true_log_disabled:true,
                true_block_disabled:true,
                true_status_disabled:true,
                true_record_disabled:true,
                true_take_photo_disabled:true,
                true_take_signature_disabled:true,
                true_No_Action_disabled:true,
                false_log_disabled:true,
                false_block_disabled:true,
                false_status_disabled:true,
                false_record_disabled:true,
                false_take_photo_disabled:true,
                false_take_signature_disabled:true,
                false_No_Action_disabled:true
            })
        }
        if(action.label === 'log'){
            this.setState({
                false_No_Action:true,
            })
        }

        if(action.label === 'status'){
            this.setState({
                true_status:true,
                false_No_Action:true,
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
            current_section: 5,
            loading: true
        })
        const cookies = new Cookies();
        var http = new XMLHttpRequest();
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        //('Token ' + token)
        var base_url = url+'/api/questions/wizard/sequence?user_id=' + user_id
        if (this.state.organization.id !== 0) {
            base_url = base_url + '' + '&org_id=' + this.state.organization.id
        }
        if (this.state.branch.id !== 0) {
            base_url = base_url + '' + '&branch_id=' + this.state.branch.id
        }
        base_url = base_url + '' + '&customer_code=' + this.state.customer
        base_url = base_url + '&section_id=' + this.state.section.id + '&page=1'
        console.log(base_url)
        http.open('GET', base_url, true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.send()
        //(http.response)
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)
                //(http.responseText)
                if (json.status === 200) {

                    dashboar_ref.setState({
                        loading: false,
                        current_section:2,
                        sequences: json.sequences,
                        recordSize:json.total_questions,
                        activePage:1
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
        http.ontimeout = () =>{
            dashboar_ref.setState({
                message_title:"Connection Error",
                message_body:"could not contact server. Please try again by refreshing page out else",
                message_box_modal:true,
                loading:false,
                sequences:[]
            })
        }
        http.onerror = () =>{
            dashboar_ref.setState({
                message_title:"Connection Error",
                message_body:"could not contact server. Please try again by refreshing page out else",
                message_box_modal:true,
                loading:false,
                sequences:[]
            })
        }
        
    }

    fetch(page){
        const cookies = new Cookies();
        var http = new XMLHttpRequest();
        var dashboar_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        //('Token ' + token)
        var base_url = url+'/api/questions/wizard/sequence?user_id=' + user_id
        if (this.state.organization.id !== 0) {
            base_url = base_url + '' + '&org_id=' + this.state.organization.id
        }
        if (this.state.branch.id !== 0) {
            base_url = base_url + '' + '&branch_id=' + this.state.branch.id
        }
        base_url = base_url + '' + '&customer_code=' + this.state.customer
        base_url = base_url + '&section_id=' + this.state.section.id
        base_url = base_url + '&page='+page
        //(base_url)
        http.open('GET', base_url, true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.send()
        //(http.response)
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)
                //(http.responseText)
                if (json.status === 200) {

                    dashboar_ref.setState({
                        loading: false,
                        sequences: json.sequences,
                        recordSize:json.total_questions,
                        activePage:page
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
        http.ontimeout = () =>{
            dashboar_ref.setState({
                message_title:"Connection Error",
                message_body:"could not contact server. Please try again by refreshing page out else",
                message_box_modal:true,
                activePage:dashboar_ref.state.activePage
            })
        }
        http.onerror = () =>{
            dashboar_ref.setState({
                message_title:"Connection Error",
                message_body:"could not contact server. Please try again by refreshing page out else",
                message_box_modal:true,
                activePage:dashboar_ref.state.activePage
            })
        }
    }


    handleSequenceInput = () => {
        var input_sequence_local = document.getElementById('sequence_input').value
        //(input_sequence_local)
        var isNotDecimal = (parseFloat(input_sequence_local) - Math.floor(parseFloat(input_sequence_local))) !== 0; 
        //("is decimal "+isNotDecimal)
        if (input_sequence_local > 0 & input_sequence_local < 100 & !isNotDecimal) {
            this.setState({
                btn_s2_next_disabled: false,
                input_sequence: input_sequence_local,
                sequenceErrorMessageHidden:true
            })
        }
        else {
            this.setState({
                btn_s2_next_disabled: true,
                input_sequence: input_sequence_local,
                sequenceErrorMessageHidden:false
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
        if(this.state.action.label === "status" || this.state.action.label === "text" || this.state.action.label === "page" ){
            return
        }
        
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

        //(`Option selected:`, true_log_slected_type);
    }

    true_log_text_area = () => {
        var value = document.getElementById('true_log_text').value
        //("called " + value)
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
        if(this.state.action.label === "status" || this.state.action.label === "text" || this.state.action.label === "page" || this.state.action.label === "log" || this.state.action.label === "button"){
            return
        }
        if (this.state.true_No_Action === false) {
            var current = this.state.true_block
            var modal = current === true ? false : true
            this.setState({
                true_block: !current,
                true_block_modal: modal
            })
        }
        if(!current === true){
            this.setState({
                // true_log:false,
                // true_status:false,
                // true_record:false,
                true_take_photo:false,
                true_take_signature:false,
                true_No_Action:false
            })
        }
    }

    handle_true_record_checkbox_click = () => {
        if(this.state.action.label === "status" || this.state.action.label === "text" || this.state.action.label === "page" || this.state.action.label === "log" ){
            return
        }
        if (this.state.true_No_Action === false) {
            var current = this.state.true_record
            this.setState({
                true_record: !current
            })
        }
    }

    handle_true_status_status_checkbox_click = () => {
        if(this.state.action.label === "text" || this.state.action.label === "page" || this.state.action.label === "log" ){
            return
        }
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

    handleStatusTypeSelect = (true_selected_status_type) =>{
        // true_status_list
        var list = []
        if(true_selected_status_type.id === 0){
            list= this.state.drop_status_list
        }
        else{
            list=this.state.run_status_list
        }
        this.setState({true_selected_status_type})
        this.setState({
            true_status_list:list
        })
    }

    handleFalseStatusTypeSelect = (false_selected_status_type) =>{

        this.setState({false_selected_status_type})
    }
    

    handle_true_take_photo_checkbox_click = () => {
        if(this.state.action.label === "status" || this.state.action.label === "text" || this.state.action.label === "page" || this.state.action.label === "log" || this.state.true_block === true ){
            return
        }
        if (this.state.true_No_Action === false) {
            var current = this.state.true_take_photo
            this.setState({
                true_take_photo: !current,
                true_take_signature:false
            })
        }
    }

    handle_true_take_signature_checkbox_click = () => {
        if(this.state.action.label === "status" || this.state.action.label === "text" || this.state.action.label === "page" || this.state.action.label === "log" || this.state.true_block === true  ){
            return
        }
        if (this.state.true_No_Action === false) {
            var current = this.state.true_take_signature
            this.setState({
                true_take_signature: !current,
                true_take_photo:false
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
        //(input)
    }

    enable_next_s3_btn = () => {
        if (this.state.action !== null &&   this.state.action_text !== "") {

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
        if(this.state.action.label === "status" || this.state.action.label === "text" || this.state.action.label === "page" || this.state.action.label === "log" ){
            return
        }
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

        //(`Option selected:`, false_log_slected_type);
    }

    false_log_text_area = () => {
        var value = document.getElementById('false_log_text').value
        //("called " + value)
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
        if(this.state.action.label === "status" || this.state.action.label === "text" || this.state.action.label === "page" || this.state.action.label === "log"){
            return
        }

        if (this.state.false_No_Action === false) {
            var current = this.state.false_block
            var modal = current === true ? false : true
            this.setState({
                false_block: !current,
                false_block_modal: modal
            })

        }
     
        if(!current === true){
            this.setState({
                // false_log:false,
                // false_status:false,
                // false_record:false,
                false_take_photo:false,
                false_take_signature:false,
                false_No_Action:false
            })
        }
    }

    handle_false_record_checkbox_click = () => {
        if(this.state.action.label === "status" || this.state.action.label === "text" || this.state.action.label === "page" || this.state.action.label === "log" ){
            return
        }
        if (this.state.false_No_Action === false) {
            var current = this.state.false_record
            this.setState({
                false_record: !current
            })
        }
    }

    handle_false_status_status_checkbox_click = () => {
        if(this.state.action.label === "text" || this.state.action.label === "page" || this.state.action.label === "log" ){
            return
        }
        if (this.state.false_No_Action === false) {
            var current = this.state.false_status
            var modal = current === true ? false : true
            this.setState({
                false_status: !current,
                false_status_modal: modal
            })
        }
    }


    FalsehandleStatusTypeSelect = (false_selected_status_type) =>{
        
        var list = []
        if(false_selected_status_type.id === 0){
            list= this.state.drop_status_list
        }
        else{
            list=this.state.run_status_list
        }
        //(list)
        this.setState({false_selected_status_type})
        this.setState({
            false_status_list:list
        })
    }

    FalsehandleStatusSelect = (false_selected_status) => {
        this.setState({ false_selected_status })
    }


    handle_false_take_photo_checkbox_click = () => {
        if(this.state.action.label === "status" || this.state.action.label === "text" || this.state.action.label === "page" || this.state.action.label === "log" || this.state.false_block === true || this.state.action.label === "button"){
            return
        }
        if (this.state.false_No_Action === false) {
            var current = this.state.false_take_photo
            this.setState({
                false_take_photo: !current,
                false_take_signature:false
            })
        }
    }

    handle_false_take_signature_checkbox_click = () => {
        if(this.state.action.label === "status" || this.state.action.label === "text" || this.state.action.label === "page" || this.state.action.label === "log" || this.state.false_block === true || this.state.action.label === "button"){
            return
        }
        if (this.state.false_No_Action === false) {
            var current = this.state.false_take_signature
            this.setState({
                false_take_signature: !current,
                false_take_photo:false
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
        //(this.state.action_text.label)
        if(this.state.action.label === 'text'){
            //("should have returned "+this.state.action_text.label)
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
            //(this.state.true_log_text)
            //(this.state.false_log_text)
            this.setState(
                { current_section: 5 }
            )
        }
    }

    back_section_3_btn = () => {
        // //(this.state.input_sequence)
        // document.getElementById('sequence_input').value=this.state.input_sequence

        this.setState({ current_section: 2 })
    }
    back_section_4_btn = () => {
        this.setState({ current_section: 3 })
    }

    back_section_5_btn = () => {
        this.setState({ current_section: 4 })
    }

    create_question = () => {
        //(this.state.msg_type)
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

        if(this.state.true_block === true && this.state.false_block === true){
            this.setState({
                message_title: "Multiple Block options specified",
                message_body: "You have checked Block option for both true andd false actions. You can not select block option for both actions",
                message_box_modal: true
            })
            return
        }
        // if(this.state.true_take_photo === true && this.state.false_take_photo === true){
        //     this.setState({
        //         message_title: "Multi Take Photo options specified",
        //         message_body: "You have check Take Photo option for both true andd false action. You can not select Take Photo option for both actions",
        //         message_box_modal: true
        //     })
        //     return
        // }
        // if(this.state.true_take_photo === true && this.state.false_take_signature === true){
        //     this.setState({
        //         message_title: "Invalid selection",
        //         message_body: "You can not select Take Photo for true action and Take Signature for false action",
        //         message_box_modal: true
        //     })
        //     return
        // }
        // if(this.state.false_take_photo === true && this.state.true_take_signature === true){
        //     this.setState({
        //         message_title: "Invalid selection",
        //         message_body: "You can not select Take Signature for true action and Take Photo for false action",
        //         message_box_modal: true
        //     })
        //     return
        // }
        // if(this.state.true_take_signature === true && this.state.false_take_signature === true){
        //     this.setState({
        //         message_title: "Multi Take Signature options specified",
        //         message_body: "You have check Take Signature option for both true andd false action. You can not select Take Signature option for both actions",
        //         message_box_modal: true
        //     })
        //     return
        // }
        // if(this.state.true_take_photo === true && this.state.false_take_photo === true && this.state.false_block === false){
        //     this.setState({
        //         message_title: "No Block Action",
        //         message_body: "You have checked take photo for both true and false action. Please also add block action for false action",
        //         message_box_modal: true
        //     })
        //     return
        // }
        // if(this.state.true_take_signature === true && this.state.false_take_signature === true && this.state.false_block === false){
        //     this.setState({
        //         message_title: "No Block Action",
        //         message_body: "You have checked take signature for both true and false action. Please also add block action for false action",
        //         message_box_modal: true
        //     })
        //     return
        // }

        var arg_list = '&org_id=' + this.state.organization.id + '&branch_id=' + this.state.branch.id + '&section_id=' + this.state.section.id + '&sequence=' + this.state.input_sequence + '&true_log=' + this.state.true_log + '&customer_code=' + this.state.customer + '&question_type=' + this.state.action.id + '&question_text=' + this.state.action_text + '&false_log=' + this.state.false_log
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
        //(typeof this.state.true_status)
        if(this.state.true_status){
            //("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
            //(this.state.true_selected_status)
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

        // //(arg_list)
        const cookies = new Cookies();
        var http = new XMLHttpRequest();
        var wizard_ref = this
        var user_id = cookies.get('user_id')
        var token = cookies.get('token')
        //('Token ' + token)
        http.open('POST', url+'/api/questions/create', true);
        http.setRequestHeader("Authorization", "Token " + token);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        //("^^^^^^")
        //(arg_list)
        http.send('user_id=' + user_id + '' + arg_list)
        http.onreadystatechange = function () {
            //(http.responseText)
            if (http.readyState === 4 && http.status === 200) {
                var json = JSON.parse(http.responseText)
                if (json.status === 200) {
                    wizard_ref.setState({ loading: false })
                    wizard_ref.setState({
                        message_title: "Success",
                        message_body: "Question has been created successfully",
                        message_box_modal: true,
                        msg_type: 'success',
                        onclose_target_url: '/create-organization'
                    })


                }
                else {
                    wizard_ref.setState({ loading: false })
                    wizard_ref.setState({
                        message_title: "Failure",
                        message_body: "Question could not be created",
                        message_box_modal: true,
                        onclose_target_url: ""
                    })
                }
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
                        <div className="clearfix" id="page-header">
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
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3>Create Question-Section I</h3>
                                    </div>
                                    <div className="col-md-4"></div>
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
                                            <input class="form-control" placeholder="Customer_Code,Customer_Code,Customer_code" id="cust_code" onBlur={this.handleCustomerSelect} maxLength={300}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
    
    
    
    
                                    </div>
                                    <div className="col-md-5">
                                        <div className="right_side_selects">
                                            <h3>Select Section</h3>
                                            <SelectList options={this.state.options_sections} actionHandler={this.handleSectionSelect} selectedOption={this.state.section} />
                                            <button class="btn btn-blue-alt middle-next-btn" id="btn" disabled={this.state.btn_is_disabled} onClick={this.next_section_two}><b>Next</b></button>
                                        </div>
    
                                    </div>
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
                        <div className="clearfix" id="page-header">
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
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3>Create Question-Section I</h3>
                                    </div>
                                    <div className="col-md-4"></div>
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
                                            <input class="form-control" placeholder="Customer_Code,Customer_Code,Customer_code" id="cust_code" onBlur={this.handleCustomerSelect} maxLength={300}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
    
    
    
    
                                    </div>
                                    <div className="col-md-5">
                                        <div className="right_side_selects">
                                            <h3>Select Section</h3>
                                            <SelectList options={this.state.options_sections} actionHandler={this.handleSectionSelect} selectedOption={this.state.section} />
                                            <button class="btn btn-blue-alt middle-next-btn" id="btn" disabled={this.state.btn_is_disabled} onClick={this.next_section_two}><b>Next</b></button>
                                        </div>
    
                                    </div>
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
                        <div className="clearfix" id="page-header">
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
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3 className="s2_heading_text">Create Question-Section II</h3>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <div className="row" style={{ marginTop: 30 }}>

                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <SequenceTable sequences={this.state.sequences} activePage={this.state.activePage} page_size={this.state.page_size} record={this.state.recordSize} fetch={this.fetch}/>

                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <div className="row" style={{ marginTop: 30 }}>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3>*Sequence Number</h3>
                                        <input type='number' className="form-control" placeholder='Enter Sequence Number (1-99)' value={this.state.input_sequence} id="sequence_input" onChange={this.handleSequenceInput}></input>
                                        
                                        <div class="isa_error" hidden={this.state.sequenceErrorMessageHidden}>
                                        <i class="fa fa-times-circle"></i>
                                        <b >Sequence number must be a number between 1 and 99</b>
                                        </div>
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
                        <div className="clearfix" id="page-header">
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
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3 style={{ paddingLeft: 40 }}>Create Question-Section III-Select Question Type</h3>
                                    </div>
                                    <div className="col-md-4"></div>
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
                        <div className="clearfix" id="page-header">
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
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <h3>Create Question-Section V</h3>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">

                                        <h3>True Action</h3>
                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_true_log_checkbox_click}>
                                                    {/* <input type="checkbox" id="true_log_checkbox" checked={this.state.true_log} disabled={this.state.true_log_disabled} onClick={this.handle_true_log_checkbox_click} class="custom-checkbox"></input> */}
                                                    <input type="checkbox" checked={this.state.true_log}   disabled={this.state.true_log_disabled} onClick={this.handle_true_log_checkbox_click} class="custom-checkbox"></input>
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
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_block} disabled={this.state.true_block_disabled} class="custom-checkbox"></input>
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
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_status} disabled={this.state.true_status_disabled} class="custom-checkbox"></input>
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
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_record} disabled={this.state.true_record_disabled} onClick={this.handle_true_record_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Record</b>

                                                    </label>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_true_take_photo_checkbox_click}>
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_take_photo} disabled={this.state.true_take_photo_disabled} onClick={this.handle_true_take_photo_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Take Photo</b>

                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_true_take_signature_checkbox_click}>
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_take_signature} disabled={this.state.true_take_signature_disabled} onClick={this.handle_true_take_signature_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Take Signature</b>

                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_true_No_Action_checkbox_click}>
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.true_No_Action} disabled={this.state.true_No_Action_disabled} onClick={this.handle_true_No_Action_checkbox_click} class="custom-checkbox"></input>
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
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.false_log} disabled={this.state.false_log_disabled} onClick={this.handle_false_log_checkbox_click} class="custom-checkbox"></input>
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
                                                    <input type="checkbox" id="true_log_checkbox" checked={this.state.false_block} disabled={this.state.false_block_disabled} onClick={this.handle_false_block_checkbox_click} class="custom-checkbox"></input>
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
                                                    <input type="checkbox" id="false_log_checkbox" checked={this.state.false_status} disabled={this.state.false_status_disabled} onClick={this.handle_false_status_status_checkbox_click} class="custom-checkbox"></input>
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
                                                        <h3>Select Status Type</h3>
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
                                                    <input type="checkbox" id="false_log_checkbox" checked={this.state.false_record} disabled={this.state.false_record_disabled} onClick={this.handle_false_record_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Record</b>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_false_take_photo_checkbox_click}>
                                                    <input type="checkbox" id="false_log_checkbox" checked={this.state.false_take_photo} disabled={this.state.false_take_photo_disabled} onClick={this.handle_false_take_photo_checkbox_click} class="custom-checkbox"></input>
                                                    <label>
                                                        <b className="label-text">Take Photo</b>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row form">
                                            <div className="col-md-12">
                                                <div class="inputGroup" onClick={this.handle_false_take_signature_checkbox_click}>
                                                    <input type="checkbox" id="false_log_checkbox" checked={this.state.false_take_signature} disabled={this.state.false_take_signature_disabled} onClick={this.handle_false_take_signature_checkbox_click} class="custom-checkbox"></input>
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
                                        <button class="btn btn-blue-alt final_next_btn" onClick={this.create_question}  ><b>Create Question</b></button>
                                    </div>
                                    {/* <div className="col-md-4"></div>
                        <div className="col-md-4">
                        
                        </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        //Specify false action section
        if (this.state.current_section === 5) {
            
            return(
                <div>
                <Loader loading={this.state.loading} fullPage={true}/>
            </div>
            )
        }
    }
}

export default CreateQuestionPageOne