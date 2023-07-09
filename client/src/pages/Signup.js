import React, { useState } from 'react';
import { Header, Input, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../App.css';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: formState,
      });
      const token = data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
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
    <Container>
      <Link to="/login">← Go to Login</Link>
      <Header as="h2">Signup</Header>
      <form onSubmit={handleFormSubmit}>
        <div className="form-field">
          <label htmlFor="username">Username:</label>
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
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="password">Password:</label>
          <Input
            placeholder="Enter password"
            name="password"
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
}

export default Signup;
