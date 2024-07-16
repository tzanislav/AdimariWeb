import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import axios from 'axios';

const UserList = () => {

  const users = [
    { id: 1, name: 'Alice', email: 'adsa@asda.com"'},
  ];

  <div>
    <Banner title={'Login'} subtitle={"asda"} />
    <h1>Users List</h1>
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
      </div>
  </div>
 
};

export default UserList;
