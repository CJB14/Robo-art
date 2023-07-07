import React, { useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Icon, Button, Container, Grid } from 'semantic-ui-react';
import { faHome, faUser, faShoppingCart, faHeart, faList } from 'react-icons/fa';

const Footer = () => {
  const location = useLocation();
  const history = useHistory();

  const isLoggedIn = true; // Replace with your authentication state
  const handleLogout = () => {
    // Implement your logout logic here
  };

  const goBack = () => {
    history.goBack();
  };

  const ref = useRef();

  return (
    <footer className="w-100 mt-auto bg-secondary p-4 fixed-bottom">
      <Container text textAlign="center" className="mb-5">
        {location.pathname !== '/' && (
          <Button basic inverted color="black" onClick={goBack}>
            &larr; Go Back
          </Button>
        )}
        <div className="footer-buttons" ref={ref}>
          <Button.Group widths="5" fluid>
            <Button icon basic inverted>
              <Icon name="home" className="fa fa-home" />
            </Button>
            <Button icon basic inverted>
              <Icon name="user" className="fa fa-user" />
            </Button>
            <Button icon basic inverted>
              <Icon name="cart" className="fa fa-shopping-cart" />
            </Button>
            <Button icon basic inverted>
              <Icon name="heart" className="fa fa-heart" />
            </Button>
            {isLoggedIn ? (
              <Button basic inverted onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button icon basic inverted>
                <Icon name="list" className="fa fa-list" />
              </Button>
            )}
          </Button.Group>
        </div>
        <h4>Created by the Robo-art team.</h4>
      </Container>
    </footer>
  );
};

export default Footer;
