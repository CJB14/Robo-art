import React from 'react';
import { Header, Image, Container, Grid, Statistic, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Auth from '../utils/auth';
import '../App.css';
import Footer from '../components/Footer';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoggedIn: false,
      favorites: [],
      randomImages: [],
    };
  }

  handleLogin = (username) => {
    this.setState({ username, isLoggedIn: true }, () => {
      window.location.href = '/profile';
    });
  };

  handleLogout = () => {
    this.setState({ username: '', isLoggedIn: false, favorites: [], randomImages: [] });
  };

  componentDidMount() {
    console.log(Auth.loggedIn());
    if (Auth.loggedIn()) {
      const profile = Auth.getProfile();
      this.setState({ username: profile.username, isLoggedIn: true });
    }

    // Simulate fetching profile images
    const profileImages = [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
      'image4.jpg',
      'image5.jpg',
    ];

    this.setState({ randomImages: profileImages });
  }

  render() {
    const { username, randomImages } = this.state;

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
                {randomImages.map((image, index) => (
                  <div key={index} className="image-item">
                    <Image src={image} size="small" />
                  </div>
                ))}
              </div>
            </Segment>
          </Container>
          <Footer />
        </div>
      );
    } else {
      window.location.href = '/login';
      return null;
    }
  }
}

export default Profile;
