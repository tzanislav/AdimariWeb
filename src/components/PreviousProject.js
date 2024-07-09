import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import './PreviousProject.css';

const PreviousProject = ({ title, address }) => {
    const [location, setLocation] = useState(null);
    const [content, setContent] = useState(null);


    const geocodeAddress = async (address) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
        const data = await response.json();
        if (data.status === "OK") {
            const { lat, lng } = data.results[0].geometry.location;  // Correct destructuring
            console.log('Geocoding successful:', lat, lng);
            setLocation({ lat, lng });
        } else {
            console.error('Geocoding failed:', data.status);
            setLocation(null); // Set location to null if geocoding fails
        }
    };

    useEffect(() => {
        geocodeAddress(address);
    }, [address]);



    useEffect(() => {
        const fetchContent = async () => {
            try {
                console.log(`Fetching content: /Projects/${title}.json`); // Debug log               
                const response = await fetch(`/Projects/${title}.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setContent(data);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchContent();
    }, []);

    if (!content) {
        return null;
    }


    return (

        <div className="previous-project"
            style={{
                backgroundImage: `url(${content.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="previous-project-overlay">  </div>
                <div className="previous-project-header">
                    <h2>{content.title}</h2>
                    <p>{address}</p>
                </div>
                
                <div className="previous-project-data">
                    {location && (
                        <div className='map-container'>
                            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                                <Map
                                    defaultCenter={location}
                                    defaultZoom={14}
                                    gestureHandling={'greedy'}
                                    disableDefaultUI={true}
                                >
                                    <Marker position={location} />
                                </Map>
                            </APIProvider>
                        </div>
                    )}
                </div>
            </div>

    );
}

export default PreviousProject;
