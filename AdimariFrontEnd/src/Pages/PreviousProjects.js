import React from "react";
import Banner from "../components/Banner";
import PreviousProject from "../components/PreviousProject";
import "./PreviousProjects.css";

function PreviousProjects() {

    return (
        <div className="previous-projects-wrapper">
            <Banner title="Previous Projects" subtitle="Here are some of the projects I have worked on." />
            
            <div className="previous-projects-container">
                <div className="previous-projects-scroll">
                    <PreviousProject title="Project_1" address="Sofia Center, Slavyanska St 29, 1421 Sofia" />
                    <PreviousProject title="Project_2" address="g.k. Lozenets, ul. Sveti Teodosiy Tarnovski 14" />
                    <PreviousProject title="Project_3" address="6075 Pastren" />
                    <PreviousProject title="Project_2" address="g.k. Lozenets, ul. Sveti Teodosiy Tarnovski 14" />
                    <PreviousProject title="Project_3" address="Kremikovtsi, ul. 'Ilinden', 1849" />
                    <PreviousProject title="Project_1" address="Sofia Center, Slavyanska St 29, 1421 Sofia" />
                    <PreviousProject title="Project_2" address="g.k. Lozenets, ul. Sveti Teodosiy Tarnovski 14" />
                    <PreviousProject title="Project_3" address="6075 Pastren" />
                </div>
                <div className="previous-projects-overlay"></div>
            </div>
        </div>
    );
}

export default PreviousProjects;
