import React from 'react';
import { Header, Image, Container, Grid, Statistic, Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../App.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoggedIn: false
    };
  }

  handleLogin = (username) => {
    this.setState({ username, isLoggedIn: true });
  };

  handleLogout = () => {
    this.setState({ username: '', isLoggedIn: false });
  };

  render() {
    const { username, isLoggedIn } = this.state;

    if (isLoggedIn) {
      return (
        <div className="profile-page">
          <Container text>
            <Header as="h1">Welcome, {username}!</Header>
            <Grid columns={2} stackable>
              <Grid.Row>
                <Grid.Column width={10}>
                  <Grid columns={3}>
                    <Grid.Column>
                      <Statistic>
                        <Statistic.Value>100</Statistic.Value>
                        <Statistic.Label>Followers</Statistic.Label>
                      </Statistic>
                    </Grid.Column>
                    <Grid.Column>
                      <Statistic>
                        <Statistic.Value>50</Statistic.Value>
                        <Statistic.Label>Following</Statistic.Label>
                      </Statistic>
                    </Grid.Column>
                    <Grid.Column>
                      <Statistic>
                        <Statistic.Value>500</Statistic.Value>
                        <Statistic.Label>Likes</Statistic.Label>
                      </Statistic>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={6}>
                <div className="search-container">
          <Input
            placeholder="Search images..."
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
          />
          <Button primary onClick={this.handleSearchSubmit}>
            Search
          </Button>
        </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      );
    } else {
      return (
        <div className='login-page'>
          <div className='login-box'>
            <Header as="h1">Please login to view your profile</Header>
            <Login onLogin={this.handleLogin} />
            <div className="signup-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    // Perform login logic here, e.g., send API request, validate credentials, etc.
    // You can access the username and password entered by the user using `username` and `password` variables.
    // You can also update the state or perform any necessary actions based on the login result.
    this.props.onLogin(username);
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>
        <Button type="submit" className='login-btn'>Login</Button>
      </form>
    );
  }
}

export default Profile;
