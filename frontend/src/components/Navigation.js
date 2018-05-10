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

  filterLinks() {
    if (false) {
      return [
        <Link to=''>Home</Link>,
        <Link to="/signup">Sign Up</Link>,
        <Link to="/signin">Sign In</Link>,
        <Link to='/team'>Team</Link>,   
      ];
    } else {
      return [
        <Link to=''>Home</Link>,
        <Link to='/invitations'>Invitations</Link>,
        <Link to='/stats'>Stats</Link>,
        <Link to='/settings'>Settings</Link>,
        <Link to='/team'>Team</Link>,
        <Link to="/signout">Sign Out</Link>,
      ];
    } 
  }
  

  render() {
    return (
      <div className='nav' onClick={() => this.hideNav()}>

        <div id = 'navWideScreen' className='wideLinks'>
          {this.filterLinks()}
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