import React, {Component} from 'react';



class TableRow extends Component{
   

 
   
    render(){
        if(this.props.data){
            return(

                
                <tr id={this.props.data.response_id}>
                <td>{this.props.data.run_id}</td>
                <td>{this.props.data.drop_id}</td>
                <td>{this.props.data.question_text}</td>
                <td>{this.props.data.question_section}</td>
                
               
                <td hidden={this.props.data.question_answer === true ? false:true}><span class="bs-label bg-blue" title="">Yes</span></td>
                <td hidden={this.props.data.question_answer === false ? false:true}><span class="bs-label bg-red" title="">No</span></td>
                
                </tr>
               
        );
        }
        else{
            <tr>
                <td><b>Table is empty</b></td>
            </tr>
        }
    }
}

export default TableRow;