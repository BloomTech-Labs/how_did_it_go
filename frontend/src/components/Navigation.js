import React from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './css/navigation.css';


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
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
    if (this.props.authenticated === false) {
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

export default Navigation;