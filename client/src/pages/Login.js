import React from 'react';
import { Header, Input, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../App.css';

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
  };

  render() {
    return (
      <div className='login-page'>
        <Container text>
          <Header as="h1">Login</Header>
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
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </Container>
      </div>
    );
  }
}

export default Login;
