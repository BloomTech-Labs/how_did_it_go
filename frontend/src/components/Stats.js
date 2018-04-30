import React, {Component} from 'react';
import axios from 'axios';

const URL = "http://localhost:5000/";

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      invitationsSent: '',
      totalClicks: 0,
      details: false
    };
  }

  componentDidMount() {
    axios.get(URL + 'customers/')
      .then(response => {
        this.setState({ data: response.data});
        this.setState({ invitationsSent: response.data.length });
        this.updateClicks();
      })
      .catch(error => {
        console.log(error.message);
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

  render() {
    return (
    <div>
      <h1>Stats</h1>
      <div>Invitations Sent: {this.state.invitationsSent}</div>
      <div>Total Clicks: {this.state.totalClicks}</div>
      <div>
        { this.state.data.map((item, index) => 
          <div key = {index}>{ item.firstName  + ' ' + item.lastName } Clicked? : { item.requestSent.clicked ? 'TRUE' : 'FALSE' }</div>
          ) 
        }
      </div>
    </div> 
    );
  }
}

export default Stats;