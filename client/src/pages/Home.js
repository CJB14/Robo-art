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
  console.log(products);

  const randomImages = products.map((product) => product.imageURL).slice(0, 4);

  return (
    <div className="home-page">
      <Header as="h1">Robo-Art</Header>
      <Segment className="image-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <div className="image-grid">
          {randomImages.map((image, index) => (
            <div key={index} className="image-item">
              <Image src={image} size="small" />
            </div>
          ))}
        </div>
      </Segment>
      <Footer />
    </div>
  );
};

export default Home;
