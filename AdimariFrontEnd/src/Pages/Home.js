import './Home.css';
import { useState, useEffect } from 'react';
import DynamicContent from '../components/DynamicContent';
import HeroComponent from '../components/HeroComponent';
import axios from 'axios';




function Home() {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => {
        if (response.ok) {
          setMessage('Database connected');
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log('Data:', data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div className="home-container">

      <HeroComponent />
      {message ? <p> Database connected</p> : <p>No Database....</p>}
    </div>
  );
}

export default Home;
