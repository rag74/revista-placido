import React from 'react';
import { useHistory } from 'react-router-dom';
import { useUserAuth } from '../Context/UserAuthContext';

export const ProtectedRoute = ({ children }) => {

  const localuser = JSON.parse(localStorage.getItem('localuser'));
  console.log(localuser);


  const history = useHistory();

  if (!localuser) {
    history.push('/login');
  }

  return children;
}
