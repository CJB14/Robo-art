import React, { useState, useEffect } from 'react';
import { Header, Image, Container, Grid, Statistic, Segment } from 'semantic-ui-react';
import '../App.css';
import Footer from '../components/Footer';
import { useQuery, gql } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/queries';

const Home = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) {
    return <p>Loading...</p>; // Render a loading state while the data is being fetched
  }

  if (error) {
    console.error('Error:', error);
    return <p>Error: {error.message}</p>; // Render an error message if there's an error
  }

  const { products } = data;

return (
  <div className="home-page">
    <Header as="h1">Robo-Art</Header>
    <Container className="image-container">
      {products.map((product) => (
        <div key={product._id}>
          <Image style={{ height: '400px', margin: '25px' }} src={product.imageURL} alt="Product" />
        </div>
      ))}
    </Container>
    <Footer />
  </div>
);
};

export default Home;
