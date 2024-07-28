import React from "react";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
  
    const handleLogin = (event) => {
      event.preventDefault(); // Prevent the form from refreshing the page
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Login successful, userCredential.user contains the signed in user info
          console.log("User logged in:", userCredential.user);
          // Reload the page
          navigate(0);
        })
        .catch((error) => {
          // Handle errors here
          setError("Failed to log in: " + error.message);
          console.error("Login error:", error);
        });
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
};

export default LoginForm;