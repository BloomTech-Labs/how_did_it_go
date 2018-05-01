import React, { Component } from 'react';

class TeamDetails extends Component {
    constructor() {
        super();
        this.state = {
            toggled: false,
        }
    }
    toggle = (e) => {
        const toggled = !this.state.toggled;
        this.setState({
            toggled
        });
    }
    render() {
        return(
            <div className='header' key={this.props.name} onClick={this.toggle}>
                <div onClick={this.toggle}>{ this.props.name }</div>
                <div>{ this.props.responsibilities }</div> 
                { this.state.toggled ? 
                    <div>
                        <div> { this.props.github }</div>
                        <div> { this.props.linkedin }</div>
                        <div> { this.props.personalSite }</div>
                    </div>
                    : ''
                }
            </div>
        );
    }

}

export default TeamDetails;