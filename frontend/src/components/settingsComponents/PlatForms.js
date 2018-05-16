import React, { Component } from 'react';
import axios from 'axios';

import ROOT_URL from '../../utils/config.js';


class PlatForms extends Component {
  constructor() {
    super();

    this.state = {
      url: '',
      resource: '',
      platForms: [],
    };
  }

  componentDidMount() {
    const companyID = 1; // hard code 1 here; will receive as props later
    axios.get(ROOT_URL + 'companies/' + companyID + '/platforms')
      .then(result => {
        const detail = result.data;
        this.setState({ platForms: detail.platForms });
        console.log("Retrive platForms successfully!");
      })
      .catch(error => {
        console.log("Errors while getting company platForms infomation");
      });
  }

  handleInputChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleAddChange = (e) => {
    e.preventDefault();

    axios.post(ROOT_URL + 'platForms', {url: this.state.url, resource: this.state.resource, companyID: 1 })
      .then((response) => {
        const companyID = '1'; // test will receive as props later
        axios.get(ROOT_URL + 'companies/' + companyID + '/platforms')
          .then(result => {
            const detail = result.data;
            this.setState({ platForms: detail.platForms });
            console.log("Successfully retrive platForms after update!");
          })
          .catch(error => {
            console.log("Errors while getting updated company platForms infomation");
          });
        console.log('Successfully add new platForm!');
      })
      .catch((error) => {
        alert('Failed to add new platForm!');
        console.log(error);
      });

      this.setState({
        url: '',
        resource: '',
      });
  }

  deletePlatForm = (id) => {
    axios.delete(ROOT_URL + 'platForms/' + id)
      .then((response) => {
        const companyID = '1'; // test will receive as props later
        axios.get(ROOT_URL + 'companies/' + companyID + '/platforms')
          .then(result => {
            const detail = result.data;
            this.setState({ platForms: detail.platForms });
            console.log("Successfully retrive platForms after update!");
          })
          .catch(error => {
            console.log("Errors while getting updated company platForms infomation");
          });
        console.log('Successfully delete platForm!');
      })
      .catch(error => {
        alert('Failed to delete platForm!');
        console.log(error);
      });
  }


  render() {
    return (
      <div>
          <div className='title'>Review Sites</div>
          <form>
              <div><input className='form--item' type='text' placeholder='Platform URL' name='url' value={this.state.url} onChange={this.handleInputChange} /></div>
              <div><input className='form--item' type='text' placeholder='Resource' name='resource' value={this.state.resource} onChange={this.handleInputChange} /></div>
              <button className='button'type='button' name='platFormInfo' onClick={this.handleAddChange}>Add</button>
          </form>
          <ul>
            {this.state.platForms ? this.state.platForms.map((platForm, index) => {
              return (
                <li key={index}>
                  {platForm.resource} {platForm.url}
                  <button onClick={() => this.deletePlatForm(platForm.id)}>X</button>
                </li>
              );
            }): ''}
          </ul>
      </div>
    ) 
  };  
}

export default PlatForms;