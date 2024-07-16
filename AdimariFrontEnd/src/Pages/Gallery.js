import React from "react";
import "./Gallery.css";
import Banner from '../components/Banner';
import ImageGallery from "react-image-gallery";


const images = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
];

function handleImageClick(event) {

    const index = event.target.getAttribute('currentIndex');
    console.log(index);

    
}

function Gallery() {
    return (
        <div>
            <Banner title="Gallery" subtitle="Our projects" />
            <div className="gallery-container">
                <ImageGallery

                    items={images}
                    onClick={handleImageClick}
                />
            </div>
        </div>
    );
}

export default Gallery;
