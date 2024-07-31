import React, {Component} from 'react';

class TableRow extends Component{
   
    constructor(props){
        super(props)
        this.state = {
            "count":0
        }
    }
    componentWillMount = () =>{
        var temp = this.state.count
        this.setState({
            "count" : temp+1
        })
    }
   
    render(){

        return(

                <tr>
                <td>{this.props.data.sequence}</td>
                <td>{this.props.data.text}</td>
                <td>{this.props.data.type}</td>
                <td>{this.props.data.customer_code}</td>
                </tr>
               
        );
    }
}

export default TableRow;