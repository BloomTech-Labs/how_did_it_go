import React, {Component} from 'react';
import axios from 'axios';

import ROOT_URL from '../utils/config.js';
import './css/listStyle.css';


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
      platForms: [],
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
        this.getPlatForms();
        this.getTotalClicks();
    })
    .catch(error => {
        console.log('error finding company: ', error);
    })   
  }

  getPlatForms = () => {
    axios
      .get(ROOT_URL + "companies/" + company.id + "/platforms")
      .then(result => {
        const detail = result.data;
        this.setState({ platForms: detail.platForms });
        console.log(this.state.platForms);
        console.log("Retrieve platForms successfully!");
      })
      .catch(error => {
        console.log("Errors while getting company platForms infomation");
      });
  };
  
  getTotalClicks = () => {
    // axios get total clicks number
    axios.get(ROOT_URL + 'platForms/' + company.id + '/shortURLs/clicks')
      .then(response => {
        const clicksList = response.data;
        let count = 0;
        const updatedData = [];
        console.log(clicksList);
        clicksList.forEach((item, index) => {
          count += item[0].global_clicks;
          updatedData.push({ url: this.state.platForms[index].url, clicks: item[0].global_clicks });
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
        <ul>
          {/* { this.state.data.map((item, index) => 
            <div key = {index}>{ item.firstName  + ' ' + item.lastName } : Clicked the Link? { item.requestSent.clicked ? 'Yes' : 'No' }</div>
            ) 
          } */}
          {this.state.data.map((item, index) => {
            return (
              <li className="list_items" key={index}>
                <span className="list_item">{item.url} :</span>
                <span className="list_item">{item.clicks}</span>  
              </li>
            );
          })}
        </ul>
        : 'Click Here for More Details' } </div>
    </div> 
    );
  }
}

export default Stats;