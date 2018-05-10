import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import './css/navigation.css';


const URL = "http://localhost:5000/";

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      username: null,
    };
  }

  componentDidUpdate() {
    // axios.get(URL + 'user')
    //     .then((response) => {
    //       const user = response.data;
    //       console.log(user);
    //       console.log(this.state.username);
    //       this.setState({ username: user.username });
    //       console.log(this.state.username);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    this.setState({ username: localStorage.token });
    console.log(this.state.username);
  }
  
  // itemsToggle = () => {
  //   console.log('test');
  //   const visible = !this.state.visible;
  //   this.setState({ visible });
  // }

  // hideNav = () => {
  //   if (this.state.visible) {
  //     this.setState({ visible: false });
  //   }
  // }

  dynamicLinks() {
    if (this.state.username === null || this.state.username === undefined) {
      return [
        <Link key={1} to=''>Home</Link>,
        <Link key={3} to="/signin">Sign In</Link>,
        <Link key={2} to="/signup">Sign Up</Link>,
        <Link key={4} to='/team'>Team</Link>,   
      ];
    } else {
      return [
        <Link key={1} to=''>Home</Link>,
        <Link key={2} to='/invitations'>Invitations</Link>,
        <Link key={3} to='/stats'>Stats</Link>,
        <Link key={4} to='/settings'>Settings</Link>,
        <Link key={5} to='/team'>Team</Link>,
        <Link key={6} to="/signout">Sign Out</Link>,
      ];
    } 
  }
  

  render() {
    return (
      <div className='nav' onClick={() => this.hideNav()}>

        <div id = 'navWideScreen' className='wideLinks'>
          {this.dynamicLinks()}
        </div>

        <div className = 'narrowLinks'>
          <i className=' fa fa-bars bars' onClick = {() => this.itemsToggle()} />
          <div className = {this.state.visible ? 'narrowLinks--visible' : 'narrowLinks--hidden'}>
            <Link to='' className = 'narrowLinks__item'>Home</Link>
            <Link to='/invitations' className = 'narrowLinks__item'>Invitations</Link>
            <Link to='/stats' className = 'narrowLinks__item'>Stats</Link>
            <Link to='/settings' className = 'narrowLinks__item'>Settings</Link>
            <Link to='/team' className = 'narrowLinks__item'>Team</Link>
          </div>
        </div>
      </div>
    );
  }
}



export default Navigation;