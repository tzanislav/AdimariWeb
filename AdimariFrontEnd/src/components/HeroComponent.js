import { Link } from 'react-router-dom';
import fallbackImage from '../Assets/fallback.jpg'; // Replace with your fallback image path
import React, { useState } from 'react';
import './HeroComponent.css';
import useSmoothScroll from '../hooks/useSmoothScroll';


function HeroComponent() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const targetRef = useSmoothScroll(isVideoLoaded);

    return (
        <div className='hero-image' ref={targetRef}>
        {!isVideoLoaded && <img src={fallbackImage} alt="Fallback" className="fallback-image" />}
        <div className={`video-background ${isVideoLoaded ? 'loaded' : ''}`}>
          <video
            autoPlay
            muted
            loop
            onLoadedData={() => setIsVideoLoaded(true)}
            className="video-element"
          >
            <source src="https://adimariweb.s3.eu-west-1.amazonaws.com/ArchWebAssets/Videos/BerberovVid_prob4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="overlay"></div>
          <div className="centered-text">
            <h1>Welcome home</h1>
            <button className="center-button">
                <Link to="/about">Learn more</Link>
            </button>
          </div>


        </div>
      </div>
    );
    }

export default HeroComponent;