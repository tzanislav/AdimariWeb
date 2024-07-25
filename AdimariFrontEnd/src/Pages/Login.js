import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase-config'; // Ensure this path matches your firebase-config file's location
import Banner from '../components/Banner';
import './Login.css';
import LoginForm from '../components/LoginForm';
import { useAuthState } from 'react-firebase-hooks/auth';




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, loading, errorUser] = useAuthState(auth);


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
      {user ?  <Banner title={'Login'} subtitle={"Logged in as " + user.email} /> 
      : <Banner title={'Login'} subtitle={'Please log in'} /> }
      <div className='login-container'>
      {error && <p style={{ color: 'red' }}>{error}</p>}     
      {!user ? <LoginForm /> : <button onClick={handleLogOut}>Log Out</button>}
      </div>
    </div>
  );
};

export default Login;
