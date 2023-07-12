import React, { useEffect, useState } from 'react';
import { Header, Container, Grid, Card, Image } from 'semantic-ui-react';
import axios from 'axios';
import '../App.css';
import Footer from '../components/Footer';

const Favorites = () => {
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Make an API request to fetch the user's favorite artwork
        const response = await axios.get('/api/favorites'); // Update the endpoint URL based on your backend implementation
        setUserFavorites(response.data); // Assuming the response data is an array of favorite artwork objects
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites-page">
      <Container text>
        <Header as="h1">Favorites Page</Header>
        <Grid columns={3} stackable>
          <Grid.Row>
            {userFavorites.map((artwork) => (
              <Grid.Column key={artwork.id}>
                <Card fluid>
                  <Image src={artwork.imageUrl} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{artwork.title}</Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Favorites;
