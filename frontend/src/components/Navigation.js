import React from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './css/navigation.css';

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }
  componentDidMount() {
  }
  
  itemsToggle = () => {
    console.log('test');
    const visible = !this.state.visible;
    this.setState({ visible });
  }
  

  render() {
    return (
      <div className='nav'>

        <div id = 'navWideScreen' className='wideLinks'>
          <Link to='' className='nav--item'>Home</Link>
          <Link to='/invitations' className='nav--item'>Invitations</Link>
          <Link to='/stats' className='nav--item'>Stats</Link>
          <Link to='/settings' className='nav--item'>Settings</Link>
          <Link to='/team' className='nav--item'>Team</Link>
        </div>

        <div>
          <i className=' fa fa-bars bars' onClick = {() => this.itemsToggle()} />
          <div className = {this.state.visible ? 'navNarrowScreen--links__visible' : 'navNarrowScreen--links__hidden'}>
            <Link to='' className = 'navNarrowScreen__item'>Home</Link>
            <Link to='/invitations' className = 'navNarrowScreen__item'>Invitations</Link>
            <Link to='/stats' className = 'navNarrowScreen__item'>Stats</Link>
            <Link to='/settings' className = 'navNarrowScreen__item'>Settings</Link>
            <Link to='/team' className = 'navNarrowScreen__item'>Team</Link>
          </div>
        </div>

      </div>
    );
  }
}



export default Navigation;