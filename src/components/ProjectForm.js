import { collection, addDoc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';

function ProjectForm() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleAddProject = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Split string of images into an array
        const imagesArray = images.split(',').map(img => img.trim());

        try {
            await addDoc(collection(db, "Adimari"), {
                name,
                address,
                description,
                images: imagesArray
            });
            alert('Project added successfully!');
            // Clear form
            setName('');
            setAddress('');
            setDescription('');
            setImages('');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Error adding project!');
        }
        setSubmitting(false);
    };


    const [projects, getProjects] = useState([]);

    const fetchProjects = async () => {
        await getDoc(collection(db, "Adimari"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ id: doc.id, ...doc.data() }));
                getProjects(newData);
                console.log(newData);
            });
    }

    useEffect(() => {
        fetchProjects();
    }
        , []);

    return (
        <div>
            <form onSubmit={handleAddProject}>
                <h3>Add New Project</h3>
                <label>
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </label>
                <label>
                    Address:
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                </label>
                <label>
                    Image URLs (comma-separated):
                    <input type="text" value={images} onChange={e => setImages(e.target.value)} />
                </label>
                <button type="submit" disabled={submitting}>Add Project</button>
            </form>

            <h3>Projects</h3>
            
        </div>
    );
}

export default ProjectForm;
