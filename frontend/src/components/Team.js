import React, { Component } from 'react';

class Team extends Component {
    constructor() {
        super();
        this.state = {
            staff: [
                    {
                    name: 'Abby',
                },
                {
                    name: 'Alif',
                },
                {
                    name: 'Vinnie',
                },
                {
                    name: 'Xiaoping',
                },
            ]
        };
    }
    render() {
        return(
            <div className='component'>
                <div className='title'>Meet The Team</div>
                {this.state.staff.map((person, index) => {
                    return <div className='header' key={index}>{ person.name }</div>
                })}
            </div>
        );
    }
}

export default Team;