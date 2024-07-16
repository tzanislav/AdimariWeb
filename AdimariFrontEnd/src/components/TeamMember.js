import React from 'react';
import './TeamMember.css';

function TeamMember({ name, role, image }) {
    return (
        <div className="team-member">
            <img src={image} alt={name} />
            <div className='team-member-info'>
                <h3>{name}</h3>
                <p>{role}</p>
            </div>
        </div>
    );


}

export default TeamMember;

