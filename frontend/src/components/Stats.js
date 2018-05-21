import React, {Component} from 'react';
import axios from 'axios';

import ROOT_URL from '../utils/config.js';


let company = {};
class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      userid: '',
      companyId: '',
      companyName: '',
      data: [],
      invitationsSent: 0,
      totalClicks: 0,
      details: false
    };
  }

  componentDidMount() {
    axios.get(ROOT_URL + 'users/' + this.state.user)
    .then(response => {
        this.setState({ userid: response.data.id });
        this.getCompanyData();  
    })
    .catch(error => {
        console.log(error);
    });
  }

  getCompanyData = () => {
    axios.get(ROOT_URL + 'companies/userid/' + this.state.userid)
    .then(response => {
        company = response.data;
        this.getTotalClicks();
    })
    .catch(error => {
        console.log('error finding company: ', error);
    })   
}
  
  getTotalClicks = () => {
    // axios get total clicks number
    axios.get(ROOT_URL + 'platForms/' + company.id + '/shortURLs/clicks')
      .then(response => {
        const clicksList = response.data;
        let count = 0;
        const updatedData = [];
        clicksList.forEach(item => {
          count += item[0].global_clicks;
          updatedData.push({ url: item[0].short_url, clicks: item[0].global_clicks });
        });
        this.setState({ totalClicks: count, data: updatedData });
        this.getInvitationsByCompany();
      })
      .catch(error => {
        console.log(error);
      });
  }

  getInvitationsByCompany = () => {
    axios.get(ROOT_URL + 'invitations/companyid/' + company.id)
      .then(response => {
        this.setState({ invitationsSent: response.data.length });
      })
      .catch(error => {
        console.log('error finding invitations by company id: ', error);
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