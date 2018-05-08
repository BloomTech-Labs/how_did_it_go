import React from 'react';
import meetingImg from '../brooke-cagle.jpg';

const Home = () => {
  return (
    <div className='component'>
      <div className='title'>What We Do</div>
      <img className= 'image' src={meetingImg} alt='by Brooke Cagle'/>
    </div> 
  );
}

export default Home;
