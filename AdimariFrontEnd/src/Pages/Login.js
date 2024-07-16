import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase-config'; // Ensure this path matches your firebase-config file's location
import Banner from '../components/Banner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful, userCredential.user contains the signed in user info
        console.log("User logged in:", userCredential.user);
        // Rediret to home
        window.location.href = '/';
      })
      .catch((error) => {
        // Handle errors here
        setError("Failed to log in: " + error.message);
        console.error("Login error:", error);
      });
  };

  const handleLogOut = (event) => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("User signed out");
    }).catch((error) => {
      // An error happened.
      console.error("Sign out error:", error);
    });
  }

  return (
    <div>
    <Banner title={'Login'} subtitle={"asda"} />
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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

        <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default Login;
