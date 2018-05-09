import React, { Component } from 'react';
import TeamDetails from './TeamDetails';

import abbyImg from '../images/abby.jpg';
import xiaopingImg from '../images/xiaoping.jpg';

class Team extends Component {
    constructor() {
        super();
        this.state = {
            hint: 'hint',
            staff: [
                    {
                    name: 'Abby',
                    github: 'https://github.com/atiffany',
                    linkedin: 'https://www.linkedin.com/in/abbytiffany/',
                    personalSite: 'http://www.abbytiffany.com/',
                    responsibilities: 'Full Stack Developer',
                    img: abbyImg,
                },
                {
                    name: 'Xiaoping',
                    github: 'https://github.com/leelali',
                    linkedin: 'https://www.linkedin.com/in/xiaoping-li-21405594/',
                    personalSite: '',
                    responsibilities: 'Full Stack Developer',
                    img: xiaopingImg,
                },
            ]
        };
    }

    hideHint = (e) => {
        this.setState({
            hint: 'hint disappearingHint'
        });
    }
    render() {
        return(
            <div className='component' onClick={this.hideHint}>
                <div className='title'>Who We Are</div>
                <div className={this.state.hint}>click a team member's name for contact details</div>
                {this.state.staff.map((person, index) => {
                    return <TeamDetails name={person.name} github={person.github} linkedin={person.linkedin} personalSite={person.personalSite} responsibilities={person.responsibilities} image={person.img} />
                })}
            </div>
        );
    }
}

export default Team;