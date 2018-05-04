import React, {Component} from 'react';
import axios from 'axios';

const URL = "http://localhost:5000/";
let companyName = "Bubba's Road House"; // testing purposes
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
    // find the company's name -- needs to be linked with sign up/sign in data
    // use company name to get list of customers
        // axios request to get list of affiliated customers
    //axios.get(URL + 'customers/companyname/' + this.state.companyName)
    axios.get(URL + 'companies/name/' + companyName)
      .then(response => {
        const companyId = response.data[0]._id;
        axios.get(URL + 'customers/companyid/' + companyId)
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
  
  updateClicks() {
    let count = 0;
    this.state.data.map(item => {
      count = item.requestSent.clicked ? count+1 : count;
      return null;
    })
    this.setState({ totalClicks: count });
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
          { this.state.data.map((item, index) => 
            <div key = {index}>{ item.firstName  + ' ' + item.lastName } : Clicked the Link? { item.requestSent.clicked ? 'Yes' : 'No' }</div>
            ) 
          }
        </div>
        : 'Click Here for More Details' } </div>
    </div> 
    );
  }
}

export default Stats;