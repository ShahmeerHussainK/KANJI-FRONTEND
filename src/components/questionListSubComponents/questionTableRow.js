import React, {Component} from 'react';



class TableRow extends Component{
   

    constructor(props){
        super(props)
        this.state={
            viewModal:false
        }
        this.handle_view_click = this.handle_view_click.bind(this)
        this.handle_edit_click = this.handle_edit_click.bind(this)
        this.handle_delete_click = this.handle_delete_click.bind(this)
    }

    handle_view_click = (e) =>{
        e.preventDefault()
        //(e.target.id+" clicked")
        this.props.viewClickHandle(e.target.id)
    }

    handle_edit_click = (e) =>{
        e.preventDefault()
        //(e.target.id+" clicked")
        this.props.editClickHandle(e.target.id)
    }

    handle_delete_click = (e) =>{
        e.preventDefault()
        this.props.handleDeleteClick(e.target.id)
    }

    search_question = (id) =>{
        this.props.data.forEach(element => {
            if(element.id === id){
                alert("found")
            }
        });
    }
   
    render(){
        //(this.props.data)
        if(this.props.data){
            return(

                
                <tr id={this.props.data.question_id}>
                <td>{this.props.data.sequence}</td>
                <td>{this.props.data.text}</td>
                <td>{this.props.data.customer_code}</td>
                <td>{this.props.data.section}</td>
                <td >

                    <a class="btn  btn-xs font-back " style={{backgroundColor:'#B388FF', color:'white',marginRight:5}} id={this.props.data.question_id} onClick={this.handle_view_click}>View</a>

                    {this.props.hideCTA ? null : <button class="btn btn-xs font-back " style={{backgroundColor:'#4CAF50', color:'white',marginRight:5}} id={this.props.data.question_id} onClick={this.handle_edit_click} disabled={!this.props.data.is_editable}>Edit</button>}

                    {this.props.hideCTA ? null : <button class="btn btn-xs font-back " style={{backgroundColor:'#F44336', color:'white',marginRight:5}} id={this.props.data.question_id} onClick={this.handle_delete_click} disabled={!this.props.data.is_editable}>Delete</button>}
                </td>
                </tr>
               
        );
        }
        else{
           return(
            <tr>
            <td><b>Table is empty</b></td>
            </tr>
           )
        }
    }
}

export default TableRow;