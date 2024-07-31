  {/* <div className="row" style={{ marginTop:30,height:'auto'}}>
                <div className="col-md-5 example-box-wrapper">
                <div className="row form">
                    <div className="col-md-12">
                    <div class="inputGroup" onClick={this.handle_false_log_checkbox_click}>
                    <input type="checkbox" id="true_log_checkbox"  checked={this.state.false_log} onClick={this.handle_false_log_checkbox_click} class="custom-checkbox"></input>
                    <label>
                        <b className="label-text">Log</b>
                    </label>
                </div>
                    
                    <div>
                    <Modal isOpen={this.state.false_log_modal}>
                    <ModalHeader>False Action-Log: Specify Options</ModalHeader>
                    <ModalBody>
                    <h3>Select Log Type</h3>
                    <SelectList options={this.state.false_log_list} actionHandler={this.FalsehandleLogTypeSelect} selectedOption={this.state.false_log_slected_type}/> 
                    <div style={{ marginTop:50,height:'auto'}}>
                    <h3>Enter Log Text</h3>
                    <textarea type='text'  className="form-control " placeholder='Enter Enter Log Text' id="f_log_text" value={this.state.false_log_text} onChange={this.handle_false_log_text_input}  ></textarea>
                    </div>
                    <div style={{ marginTop:50,height:'auto'}}>
                    <h3>Log Options Checklist</h3>
                    <div style={{ marginLeft:10,height:'auto'}}>
                    <div className="row">
                    <label>
                        <input type="checkbox" id="true_log_checkbox"  checked={this.state.false_log_date} onClick={this.handle_false_log_date_checkbox_click} class="custom-checkbox"></input>
                        <b className="label-text">Date/Time</b>
                    
                    </label>
                    </div>
                    <div className="row">
                    <label>
                        <input type="checkbox" id="true_log_checkbox"  checked={this.state.false_log_GPS} onClick={this.handle_false_log_GPS_checkbox_click} class="custom-checkbox"></input>
                        <b className="label-text">GPS Cordinates</b>
                    
                    </label>
                    </div>
                    <div className="row">
                    <label>
                        <input type="checkbox" id="true_log_checkbox"  checked={this.state.false_log_package} onClick={this.handle_false_log_package_checkbox_click} class="custom-checkbox"></input>
                        <b className="label-text">No. of Packages</b>
                    
                    </label>
                    </div>
                    <div className="row">
                    <label>
                        <input type="checkbox" id="true_log_checkbox"  checked={this.state.false_log_driver_name} onClick={this.handle_false_log_driver_name_checkbox_click} class="custom-checkbox"></input>
                        <b className="label-text">Driver Name</b>
                    
                    </label>
                    </div>
                    <div className="row">
                    <label>
                        <input type="checkbox" id="true_log_checkbox"  checked={this.state.false_log_customer_name} onClick={this.handle_false_log_customer_name_checkbox_click} class="custom-checkbox"></input>
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
                
                </div>
                    </div> 
                    <div class="row">
                    <div className="col-md-5 example-box-wrapper">
                <div className="row form">
                    <div className="col-md-12">
                    <div class="inputGroup" onClick={this.handle_false_block_checkbox_click}>
                    <input type="checkbox" id="true_log_checkbox"  checked={this.state.false_block} onClick={this.handle_false_block_checkbox_click} class="custom-checkbox"></input>
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
                                    <input type='text' className="form-control" placeholder='Enter Block Text' onChange={this.handle_false_block_text_input} value={this.state.false_block_text} id="false_block_text_input"></input>
                                </ModalBody>
                                <ModalFooter>
                                <Button color="primary" onClick={this.toggle_false_block_modal}>Done</Button>
                                </ModalFooter>
                                </Modal>
                        </div>
                    </div>
                    
                
                </div>
                
                </div>
                    </div>
                    
                    {/* status check */}
                     <div class="row" style={{ marginTop:5}}>
                    <div className="col-md-4 example-box-wrapper">
                <div className="row">
                    <div className="col-md-4">
                    <div class="checkbox-inline">
                    <label>
                        <input type="checkbox" id="false_log_checkbox"  checked={this.state.false_status} onClick={this.handle_false_status_status_checkbox_click} class="custom-checkbox"></input>
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
                                <h3>Select Status Code</h3>
                                <SelectList options={this.state.false_status_list} actionHandler={this.FalsehandleStatusSelect} selectedOption={this.state.false_selected_status}/>
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={this.toggle_false_status_modal}>Done</Button>
                            </ModalFooter>
                        </Modal>
                        </div>
                    
                </div>
                
                </div>
                    </div>

                    {/* //Record check */}
                    <div class="row" style={{ marginTop:5}}>
                    <div className="col-md-4 example-box-wrapper">
                <div className="row">
                    <div className="col-md-4">
                    <div class="checkbox-inline">
                    <label>
                        <input type="checkbox" id="false_log_checkbox"  checked={this.state.false_record} onClick={this.handle_false_record_checkbox_click} class="custom-checkbox"></input>
                        <b className="label-text">Reord</b>
                    
                    </label>
                </div>
                
                    </div>
                    <div className="col-md-4">
                    <div class="checkbox-inline">
                    <label>
                        <input type="checkbox" id="false_log_checkbox"  checked={this.state.false_take_photo} onClick={this.handle_false_take_photo_checkbox_click} class="custom-checkbox"></input>
                        <b className="label-text">Take Photo</b>
                    
                    </label>
                </div>
                
                    </div>
                    
                </div>
                <div className="row" style={{ marginTop:5}}>
                    <div className="col-md-4">
                    <div class="checkbox-inline">
                    <label>
                        <input type="checkbox" id="false_log_checkbox"  checked={this.state.false_take_signature} onClick={this.handle_false_take_signature_checkbox_click} class="custom-checkbox"></input>
                        <b className="label-text">Take Signature</b>
                    
                    </label>
                </div>
                
                    </div>
                    <div className="col-md-4">
                    <div class="checkbox-inline">
                    <label>
                        <input type="checkbox" id="false_log_checkbox"  checked={this.state.false_No_Action} onClick={this.handle_false_No_Action_checkbox_click} class="custom-checkbox"></input>
                        <b className="label-text">No Action</b>
                    
                    </label>
                </div>
                
                    </div>
                    
                </div>
                </div>
                
                    </div>
                    <div className="row ">
                <div className="col-md-4"></div>
                <div className="col-md-4 back_next_btns" >
                
                <button onClick={this.back_section_5_btn} class="btn btn-blue-alt back_btn">Back</button>
                <button class="btn btn-blue-alt next_btn" onClick={this.create_question}  >Create Question</button>
                </div>
                <div className="col-md-4"></div>
                </div> 
                </div> */}