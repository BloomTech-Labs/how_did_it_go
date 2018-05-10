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
            <div className='header' key={this.props.name}>
                <div onClick={this.toggle}>{ this.props.name }</div>
                <img onClick={this.toggle} className='image--smallCircle' src={ this.props.image } alt='developer image'/>
                <div onClick={this.toggle}>{ this.props.responsibilities }</div> 
                { this.state.toggled ? 
                    <div>
                        <div><a href={ this.props.github }> { this.props.github }</a></div>
                        <div><a href={ this.props.linkedin }> { this.props.linkedin }</a></div>
                        <div><a href={ this.props.personalSite }> { this.props.personalSite }</a></div>
                    </div>
                    : ''
                }
            </div>
        );
    }

}

export default TeamDetails;