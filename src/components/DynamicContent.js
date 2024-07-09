// src/components/DynamicContent.js
import React, { useEffect, useState } from 'react';
import { useProjectName } from '../ProjectNameContext';
import './DynamicContent.css';

function DynamicContent({ contentName }) {
  const { projectName } = useProjectName();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('Fetching content:', projectName, contentName); // Debug log
        const response = await fetch(`/${projectName}/${contentName}.json`);
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
  }, [projectName, contentName]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dynamic-content">
      <h1>{content.title}</h1>
      <div className='dynamic-content-body'>
        <p>{content.body}</p>
        <img src={`/${projectName}/${contentName}.jpg`} alt={content.title} />
      </div>
    </div>
  );
}

export default DynamicContent;
