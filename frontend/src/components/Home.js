import React from 'react';
import meetingImg from '../brooke-cagle.jpg';

const Home = () => {
  return (
    <div className='component'>
      <div className='title'>What We Do</div>
      <div className='header'>How'd It Go is an innovative new platform, designed to help you boost your online social media presence.</div>
      <img className= 'image' src={meetingImg} alt='by Brooke Cagle'/>
      <div className='header'>Here's how it works:</div>
      <div className='content'>
        <div>Tell us which review sites you'd like more reviews on, and we'll send a personalized message to your customers asking them to leave you a review.</div>
        <div>We'll also give you up-to-the-minute statistics to help you stay on top of your online presence.</div>
        <div>And just like that, you've simplified your business and increased your customer engagement.</div>
      </div>
      <div className='header'>So sign up today, and find out: How'd It Go?</div>
    </div> 
  );
}

export default Home;
