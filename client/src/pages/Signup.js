import React, { useState } from 'react';
import { Header, Input, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../App.css';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Footer from '../components/Footer';

function Signup(props) {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: formState,
      });
      console.log(formState);
      const token = data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      alert('An account with that username or email already exists!');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
    <Container>
        <Link to="/login" className="go-back-link">← Go Back</Link>
        <Header as="h1" className="signup-header">Signup</Header>
        <form onSubmit={handleFormSubmit}>
          <div className="form-field">
            <label htmlFor="username" className="form-label">Username:</label>
            <Input
              placeholder="Enter username"
              name="username"
              type="text"
              id="username"
              value={formState.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email" className="form-label">Email:</label>
            <Input
              placeholder="Enter email"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password" className="form-label">Password:</label>
            <Input
              placeholder="Enter password"
              name="password"
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="login-btn">Submit</Button>
        </form>
    </Container>
      </div>
    <Footer />
    </div>
  );
}

export default Signup;