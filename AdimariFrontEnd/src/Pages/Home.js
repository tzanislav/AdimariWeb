import './Home.css';
import { useState, useEffect } from 'react';
import DynamicContent from '../components/DynamicContent';
import HeroComponent from '../components/HeroComponent';
import axios from '../axiosConfig';


function Home() {

  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/');
        if (res.data) {
          setTest(res.data);
        }
      } catch (err) {
        if (err.response && err.response.data) {
          console.log("Error");
          console.error(err.response.data);
        } else {
          console.error(err);
        }
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="home-container">

      <HeroComponent />
      {test ? <p> Database connected</p> : <p>No Database....</p>}
    </div>
  );
}

export default Home;
