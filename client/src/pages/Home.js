import React, { useState, useEffect } from 'react';
import { Header, Image } from 'semantic-ui-react';
import '../App.css';
import Footer from '../components/Footer';
import { useQuery, gql } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/queries'

// const Home = () => {
//   const [randomImages, setRandomImages] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(''); // Replace with the actual API endpoint
//         const data = await response.json();
//         const images = data.products.map((product) => product.imageUrl);
//         setRandomImages(images);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="home-page">
//       <Header as="h1">Robo-Art</Header>
//       <div className="image-container">
//         {randomImages.length === 0 ? (
//           <p>No images found.</p>
//         ) : (
//           <div>
//             {randomImages.map((image, index) => (
//               <Image key={index} src={image} />
//             ))}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

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
  
  const randomImages = products.map((product) => product.imageURL);
  
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