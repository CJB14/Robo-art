import React, { useState, useEffect } from 'react';
import { Header, Image } from 'semantic-ui-react';
import '../App.css';
import Footer from '../components/Footer';

const Home = () => {
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(''); // Replace with the actual API endpoint
        const data = await response.json();
        const images = data.products.map((product) => product.imageUrl);
        setRandomImages(images);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <Header as="h1">Robo-Art</Header>
      <div className="image-container">
        {randomImages.length === 0 ? (
          <p>No images found.</p>
        ) : (
          <div>
            {randomImages.map((image, index) => (
              <Image key={index} src={image} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
