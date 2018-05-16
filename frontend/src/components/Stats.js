import React, {Component} from 'react';
import axios from 'axios';

import ROOT_URL from '../utils/config.js';
let companyName = "Second Company"; // testing purposes
class Stats extends Component {
  constructor() {
    super();
    this.state = {
      companyId: '',
      companyName: '',
      data: [],
      invitationsSent: 0,
      totalClicks: 0,
      details: false
    };
  }

  componentDidMount() {
    // axios get total clicks number
    const companyID = 2;
    axios.get(ROOT_URL + 'platForms/' + companyID + '/shortURLs/clicks')
      .then(response => {
        const clicksList = response.data;
        let count = 0;
        const updatedData = [];
        clicksList.forEach(item => {
          count += item[0].global_clicks;
          updatedData.push({ url: item[0].short_url, clicks: item[0].global_clicks });
        });
        
        this.setState({ totalClicks: count, data: updatedData });

        console.log(this.state.data);
      })
      .catch(error => {
        console.log(error);
      });

    // find the company's name -- needs to be linked with sign up/sign in data
    axios.get(ROOT_URL + 'companies/name/' + companyName)
      .then(response => {
        const companyId = response.data[0]._id;
        // this needs to be rewritten 
        axios.get(ROOT_URL + 'customers/companyid/' + companyId)
        .then(response => {
          this.setState({ data: response.data});
          this.setState({ invitationsSent: response.data.length });
          this.updateClicks();
        })
        .catch(error => {
          console.log(error.message);
        })
      })
      .catch(error => {
        console.log(error);
      });
 
  
  }
  

  toggle = (e) => {
    const details = !this.state.details;
    this.setState({ details });
  }

  render() {
    return (
    <div className='component'>
      <div className='title'>Stats</div>
      <div className='content'>Invitations Sent: {this.state.invitationsSent}</div>
      <div className='content'>Total Clicks: {this.state.totalClicks}</div>
      <div className='content customerStats' onClick={this.toggle}>{ this.state.details ? 
        <div>
          {/* { this.state.data.map((item, index) => 
            <div key = {index}>{ item.firstName  + ' ' + item.lastName } : Clicked the Link? { item.requestSent.clicked ? 'Yes' : 'No' }</div>
            ) 
          } */}
          {this.state.data.map((item, index) => {
            return (
              <div key={index}>
                {item.url}:{item.clicks}
              </div>
            );
          })}
        </div>
        : 'Click Here for More Details' } </div>
    </div> 
    );
  }
}

export default Stats;