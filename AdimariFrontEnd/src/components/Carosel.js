import React from "react";
import "./Carosel.css";
import ImageGallery from "react-image-gallery";

function handleImageClick(event) {

    const index = event.target.getAttribute('currentIndex');
}




function Carosel({imageData}) {

    const images = imageData.map((image) => {   
        return {
            original: image,
            thumbnail: image,
        }
    });

    return (
        <div>
            <div className="gallery-container">
                <ImageGallery
                    items={images}
                    onClick={handleImageClick}
                />
            </div>
        </div>
    );
}

export default Carosel;

