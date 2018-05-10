import React from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './css/navigation.css';

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      user: null,
    };
  }
  componentDidMount() {
  }
  
  itemsToggle = () => {
    console.log('test');
    const visible = !this.state.visible;
    this.setState({ visible });
  }

  hideNav = () => {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  }

  dynamicLinks() {
    if (true) {
      return [
        <Link key={1} to=''>Home</Link>,
        <Link key={2} to="/signup">Sign Up</Link>,
        <Link key={3} to="/signin">Sign In</Link>,
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
          {this.dynamicLinks().map((item, key) => {
            return <div key={key} className='narrowLinks__item'>{item}</div>
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

/* Links for the narrow option
            <Link to='' className = 'narrowLinks__item'>Home</Link>
            <Link to='/invitations' className = 'narrowLinks__item'>Invitations</Link>
            <Link to='/stats' className = 'narrowLinks__item'>Stats</Link>
            <Link to='/settings' className = 'narrowLinks__item'>Settings</Link>
            <Link to='/team' className = 'narrowLinks__item'>Team</Link>
            */



export default Navigation;