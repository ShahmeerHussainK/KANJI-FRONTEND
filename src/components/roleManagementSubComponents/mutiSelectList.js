import React, { Component } from 'react';
import Select from 'react-select'


  class MultiSelectList extends Component{


      render(){
          return(
              <div>
                  <Select options={this.props.options} value={this.props.selectedOption} onChange={this.props.actionHandler}  multi={true}/>
                  
              </div>
          )
      }
  }

  export default MultiSelectList