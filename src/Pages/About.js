// src/components/Contact.js
import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import TeamMember from '../components/TeamMember';
import './About.css';

function About() {
  return (
    <div>
      <Banner title="About Us" subtitle="We are a team of professionals who are passionate about our work." />
      <div className="team-members">
        <TeamMember name="John Doe" role="CEO" image="/AboutUs/Tzaniasfphi2-scaled.jpg" />
        <TeamMember name="Jane Doe" role="CTO" image="/AboutUs/Photo_TS_Adobe_profile2-scaled.jpg" />
        <TeamMember name="Tom Doe" role="CFO" image="/AboutUs/Marina_Adimari_square-scaled.jpg" />
      </div>
    </div>
  );
}

export default About;