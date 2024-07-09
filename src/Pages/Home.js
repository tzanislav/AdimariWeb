// src/components/Home.js

import './Home.css';

import DynamicContent from '../components/DynamicContent';
import HeroComponent from '../components/HeroComponent';


function Home() {

  return (
    <div className="home-container">
      <HeroComponent />
      <DynamicContent contentName="overview" />
      <DynamicContent contentName="design" />
    </div>
  );
}

export default Home;
