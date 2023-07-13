import React from 'react';
import { Header, Image, Container, Grid, Statistic, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Auth from '../utils/auth';
import '../App.css';
import Footer from '../components/Footer';
import { useQuery, gql } from '@apollo/client';
import { GET_USER_PRODUCTS } from '../utils/queries';

const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER_PRODUCTS);

  if (Auth.loggedIn()) {
    const { username } = Auth.getProfile();

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      console.error('Error:', error);
      console.log('GraphQLErrors:', error.graphQLErrors);
      console.log('NetworkError:', error.networkError);
      return <p>Error: {error.message}</p>;
    }

    const { userProducts } = data;
    console.log(userProducts)
    
    return (
      <div className="profile-page">
           <Container text>
            <Header as="h1">Welcome, {username}!</Header>
             <Grid columns={2} stackable>
               <Grid.Row>
                 <Grid.Column width={10}>
                  <div className="statistics-row">
                    <div className="statistic">
                      <Statistic>
                        <Statistic.Value className="number">100</Statistic.Value>
                         <Statistic.Label className="social-text">Followers</Statistic.Label>
                       </Statistic>
                     </div>
                     <div className="statistic">
                     <Statistic>
                       <Statistic.Value className="number">50</Statistic.Value>
                         <Statistic.Label className="social-text">Following</Statistic.Label>
                       </Statistic>
                    </div>
                    <div className="statistic">
                      <Statistic>
                        <Statistic.Value className="number">500</Statistic.Value>
                        <Statistic.Label className="social-text">Likes</Statistic.Label>
                       </Statistic>
                     </div>
                  </div>
                 </Grid.Column>
              </Grid.Row>
             </Grid>
                 <Segment className="image-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <div className="image-grid">
                {userProducts.map((product) => (
                  <div key={product._id} className="image-item">
                    <Image src={product.imageURL} size="small" style={{ margin: '25px', opacity: 0.85, 
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'}} alt="Product" />
                  </div>
                ))}
               </div>
             </Segment>
          </Container>
          <Footer />
         </div>
       );
  } else {
    // User is not logged in, redirect to login page
    window.location.href = '/login';
    return null;
  }
};

export default Profile;
