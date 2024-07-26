import './Home.css';
import { useState, useEffect } from 'react';
import DynamicContent from '../components/DynamicContent';
import HeroComponent from '../components/HeroComponent';
import axios from '../axiosConfig';




function Home() {

  const [message, setMessage] = useState('');

  useEffect(() => {
      axios.get('/api/test')
          .then(response => {
              setMessage(response.data.message);
          })
          .catch(error => {
              console.error('There was an error!', error);
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
