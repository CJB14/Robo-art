import React, { useEffect, useState } from 'react';
import { Header, Container } from 'semantic-ui-react';
import Text2ImgComponent from '../components/Text2Img';
import jwtDecode from 'jwt-decode';
import '../App.css';
import Footer from '../components/Footer';

const ArtworkPage = () => {
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
    <div className="artwork-page">
      <Container text>
        <Header as="h1">Artwork</Header>        
        <Text2ImgComponent userId={userId} />
      </Container>
      <Footer />
    </div>
  );
};

export default ArtworkPage;
