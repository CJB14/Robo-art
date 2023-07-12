import React from 'react';
import { Header, Image, Container, Grid, Statistic, Input, Button } from 'semantic-ui-react';
import Auth from '../utils/auth'
import '../App.css';
import Footer from '../components/Footer';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoggedIn: false,
      favorites: [],
    };
  }

  handleLogin = (username) => {
    this.setState({ username, isLoggedIn: true }, () => {
      
      window.location.href = '/profile';
    });
  };

  handleLogout = () => {
    this.setState({ username: '', isLoggedIn: false, favorites: [] });
  };

  componentDidMount() {
    // Check authentication status when component mounts
    console.log(Auth.loggedIn()); // Add this console.log statement
    if (Auth.loggedIn()) {
      const profile = Auth.getProfile();
      this.setState({ username: profile.username, isLoggedIn: true });
    }
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
                        <Statistic.Value className='number'>100</Statistic.Value>
                        <Statistic.Label className='social-text'>Followers</Statistic.Label>
                      </Statistic>
                    </div>
                    <div className="statistic">
                      <Statistic>
                        <Statistic.Value className='number'>50</Statistic.Value>
                        <Statistic.Label className='social-text'>Following</Statistic.Label>
                      </Statistic>
                    </div>
                    <div className="statistic">
                      <Statistic>
                        <Statistic.Value className='number'>500</Statistic.Value>
                        <Statistic.Label className='social-text'>Likes</Statistic.Label>
                      </Statistic>
                    </div>
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

