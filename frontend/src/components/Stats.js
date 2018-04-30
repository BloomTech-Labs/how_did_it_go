import React, {Component} from 'react';
import axios from 'axios';

const URL = "http://localhost:5000/";

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios.get(URL + 'customers/')
      .then(response => {
        //console.log(response.data);
        this.setState({ data: response.data });
        console.log(this.state.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  render() {
    console.log(this.state.data);
    return (
    <div>
      <h1>Stats</h1>
      <h2>Invitations Sent</h2>
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