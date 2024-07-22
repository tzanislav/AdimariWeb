// src/hooks/useSmoothScroll.js
import { useEffect, useRef } from 'react';

const useSmoothScroll = (dependency) => {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!dependency) return;

    // Function to perform the scroll if needed
    const handleScroll = () => {
      if (!targetRef.current) return;

      const { innerHeight, innerWidth } = window;

      // Check if the screen height is greater than the width
      if (innerHeight / innerWidth > 1) {
        // Smooth scroll to the target div
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
        console.log('scroll to target');
      }
    };

    // Run the scroll check after content is loaded
    handleScroll();

    // Optional: Add a resize event listener to handle changes in screen size
    window.addEventListener('resize', handleScroll);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleScroll);
  }, [dependency]);

  return targetRef;
};

export default useSmoothScroll;
