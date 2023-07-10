import React, { useState } from 'react';
import { Header, Input, Button, Container } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import Auth from '../utils/auth';
import Footer from '../components/Footer';
import { LOGIN } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const Login = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { username: formState.username, password: formState.password },
      });
    const token = mutationResponse.data.login.token;
    Auth.login(token);
    // Redirect to the profile page
    window.location.assign('/profile');
  } catch (e) {
    console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="login-page">
      <Container text>
        <Header as="h1">Login</Header>
        <form onSubmit={handleFormSubmit}>
          <div className="form-field">
            <label htmlFor="username">Username:</label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="login-btn">
            Login
          </Button>
        </form>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;
