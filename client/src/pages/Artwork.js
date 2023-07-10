import React, { useEffect, useState } from 'react';
// import { Header, Image, Container, Grid, Statistic, Input, Button } from 'semantic-ui-react';
import Text2ImgComponent from '../components/Text2Img';
import jwtDecode from 'jwt-decode';

const artworkPage = () => {

  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Retrieve the JWT token from storage (e.g., local storage, session storage)
    const token = localStorage.getItem('jwtToken');

    if (token) {
      // Decode the JWT token to get the user information
      const decodedToken = jwtDecode(token);

      // Extract the userId from the decoded token
      const userId = decodedToken.userId;
      
      setUserId(userId);
    }
  }, []);
  return (
    <div>
      <h1>THIS IS WHERE YOU WILL GENERATE AN IMAGE</h1>
      <Text2ImgComponent userId={userId} />
    </div>
  );
};

export default artworkPage;