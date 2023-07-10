import React from 'react';
import { Header, Image, Container, Grid, Statistic, Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../App.css';
import Footer from '../components/Footer';
import Auth from '../utils/auth';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoggedIn: false,
      favorites: [],
    };
  }

  render() {
    const { username,  } = this.state;

    if (Auth.loggedIn()) {
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
                        <Statistic.Value>100</Statistic.Value>
                        <Statistic.Label>Followers</Statistic.Label>
                      </Statistic>
                    </div>
                    <div className="statistic">
                      <Statistic>
                        <Statistic.Value>50</Statistic.Value>
                        <Statistic.Label>Following</Statistic.Label>
                      </Statistic>
                    </div>
                    <div className="statistic">
                      <Statistic>
                        <Statistic.Value>500</Statistic.Value>
                        <Statistic.Label>Likes</Statistic.Label>
                      </Statistic>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column width={6}>
                  <div className="search-container">
                    <Input icon="search" placeholder="Search..." fluid />
                    <Button primary>Submit</Button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
          <Footer />
        </div>
      );
    } else {
      // User is not logged in, redirect to login page
      window.location.href = '/login';
      return null; // or render a loading state or redirect component
    }
  }
}

export default Profile;
