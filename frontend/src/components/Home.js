import React, { Component } from 'react';
import meetingImg from '../images/brooke-cagleText.jpg';
import surveyImg from '../images/azat-satlykovText.jpg';
import signupWmImg from '../images/thought-catalogText.jpg';

let interval;
let intervalTime = 3000;
class Home extends Component {
  constructor() {
    super();
    this.state = {
      display: 1,
    };
  }

  componentDidMount() {
    interval = setInterval(this.changeImage, intervalTime);
  }


  resetInterval = () => {
    clearInterval(interval);
    interval = setInterval(this.changeImage, intervalTime);

  }

  changeImage = () => {
    if (this.state.display < 3) {
      const display = this.state.display + 1;
      this.setState({ display });
    } else {
      this.setState({ display: 1 });
    }
    this.resetInterval();

  }

  render() {
    return (
      <div className='component'>
        <div className='title'>What We Do</div>
        <div className='header'>How'd It Go is an innovative new platform, designed to help you boost your online social media presence.</div>
        <img id='img1' className= {this.state.display === 1 ? 'image--visible': 'image--hidden'} src={signupWmImg} alt='by Bench Accounting' onClick={() => this.changeImage()} />
        <img id='img2' className= {this.state.display === 2 ? 'image--visible': 'image--hidden'} src={surveyImg}   alt='by Azat Satlykov'    onClick={() => this.changeImage()} />
        <img id='img3' className= {this.state.display === 3 ? 'image--visible': 'image--hidden'} src={meetingImg}  alt='by Brooke Cagle'     onClick={() => this.changeImage()}/>
        <div className='header'>Here's how it works:</div>
        <div className='content'>
          <div>Tell us which review sites you'd like more reviews on, and we'll send a personalized message to your customers asking them to leave you a review.</div>
          <div>We'll also give you up-to-the-minute statistics to help you stay on top of your online presence.</div>
          <div>And just like that, you've simplified your business and increased your customer engagement.</div>
        </div>
        <div className='header'>Sign up today, and find out: How'd It Go?</div>
      </div> 
    );
  }
} 


export default Home;
