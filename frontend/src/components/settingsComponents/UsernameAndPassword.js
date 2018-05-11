import React, { Component } from 'react';

class UsernameAndPassword extends Component {
    constructor () {
        super();
        this.state = {
          oldPW: '',
          newPW: '',
        };
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // const oldPass = this.state.oldPW;
        // company.password = this.state.newPW;
        // axios request to update the username and password, as needed
    }

    render() {
        return (
            <div>
                {/* CHANGE USERNAME AND PASSWORD */}
                <div className='header'>Change UserName and Password</div>
                <form>
                    <div><input className='form--item' type='password' placeholder='Old Password' name='oldPW' value={this.state.oldPW} onChange={this.handleInputChange} /></div>
                    <div><input className='form--item' type='password' placeholder='New Password' name='newPW' value={this.state.newPW} onChange={this.handleInputChange} /></div>
                    <button className='button'type='button' name='updateUsernameAndPasswordVisible' onClick={this.handleSubmit}>Update</button>
                </form>
            </div>
        );
    }
}

export default UsernameAndPassword;