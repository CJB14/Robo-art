import React, { useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { FaHome, FaUser, FaShoppingCart, FaHeart, FaList } from 'react-icons/fa';
import '../../App.css';

const Footer = () => {
  const history = useHistory();

  const isLoggedIn = true; // Replace with your authentication state
  const handleLogout = () => {
    // Implement your logout logic here
  };

  const ref = useRef();

  return (
    <footer className="footer">
      <Container text textAlign="center">
        <div className="footer-buttons" ref={ref}>
          <Button.Group widths="5" fluid>
            <Button as={Link} to="/" basic inverted>
              <Icon name="home" />
              <FaHome />
            </Button>
            <Button as={Link} to="/profile" basic inverted>
              <Icon name="user" />
              <FaUser />
            </Button>
            <Button as={Link} to="/cart" basic inverted>
              <Icon name="shopping cart" />
              <FaShoppingCart />
            </Button>
            <Button as={Link} to="/favorites" basic inverted>
              <Icon name="heart" />
              <FaHeart />
            </Button>
            {isLoggedIn ? (
              <Button basic inverted onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button as={Link} to="/list" basic inverted>
                <Icon name="list" />
                <FaList />
              </Button>
            )}
          </Button.Group>
        </div>
        <h4 id="footnote">Created by the Robo-art team.</h4>
      </Container>
    </footer>
  );
};

export default Footer;
