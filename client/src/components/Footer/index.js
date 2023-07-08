import React, { useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';
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
            <Button as={Link} to="/" icon basic inverted>
              <FaHome />
            </Button>
            <Button as={Link} to="/profile" icon basic inverted>
              <FaUser />
            </Button>
            <Button as={Link} to="/cart" icon basic inverted>
              <FaShoppingCart />
            </Button>
            <Button as={Link} to="/favorites" icon basic inverted>
              <FaHeart />
            </Button>
            {isLoggedIn ? (
              <Button basic inverted onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button as={Link} to="/list" icon basic inverted>
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
