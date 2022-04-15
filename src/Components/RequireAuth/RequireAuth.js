import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
    useLocation,
    Navigate,
  } from "react-router-dom";
import auth from '../../Firebase/Firebase.init';



const RequireAuth = ({children}) => {

  const [user, setUser] = useState({});
  // console.log(user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        setUser(user); 
    });
  }, [])
  const location = useLocation();

        if (!user) {
          return <Navigate to="/login" state={{ from: location }} replace />;
        }
      
        return children;

};

export default RequireAuth;