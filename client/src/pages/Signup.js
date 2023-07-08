import React from 'react';
import { Header, Input, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../App.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    // Perform signup logic here, e.g., send API request, validate inputs, etc.
    // You can access the username, email, and password entered by the user using `username`, `email`, and `password` variables.
    // You can also update the state or perform any necessary actions based on the signup result.
  };

  render() {
    return (
      <div className='signup-page'>
        <Container text>
          <Header as="h1">Sign Up</Header>
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
              <label htmlFor="email">Email:</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
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
            <Button type="submit">Sign Up</Button>
          </form>
          <div className="login-link">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </Container>
      </div>
    );
  }
}

export default Signup;
