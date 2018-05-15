import React, { Component } from 'react';
//import axios from 'axios';


class PlatForms extends Component {
  constructor() {
    super();

    this.state = {
      url: '',
      resource: '',
    };
  }

  // componentDidMount() {
  //   axios.get
  // }

  handleInputChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}


  render() {
    return (
      <div>
          <div className='title'>Review Sites</div>
          <form>
              <div><input className='form--item' type='text' placeholder='Platform URL' name='url' value={this.state.url} onChange={this.handleInputChange} /></div>
              <div><input className='form--item' type='text' placeholder='Resource' name='resource' value={this.state.resource} onChange={this.handleInputChange} /></div>
              <button className='button'type='button' name='platFormInfo' onClick={this.handleSubmit}>Add</button>
          </form>
      </div>
    ) 
  };  
}

export default PlatForms;