import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Container, Input } from 'semantic-ui-react';
import { FaHome, FaUser, FaShoppingCart, FaHeart, FaList } from 'react-icons/fa';
import Auth from '../../utils/auth';

const Footer = () => {

  return (
    <footer className="footer">
      <Container text textAlign="center">
        <div className="footer-buttons">
          <Button.Group widths="6" fluid>
            <Button as={Link} to="/" basic inverted>
              <FaHome />
            </Button>
            <Button as={Link} to="/profile" basic inverted>
              <FaUser />
            </Button>
            {/* <Button as={Link} to="/cart" basic inverted>
              <FaShoppingCart />
            </Button> */}
            {Auth.loggedIn() ? (
            <Button as={Link} to="/favorites" basic inverted>
              <FaHeart />
            </Button>
            ) : ( <></>)  }
            {Auth.loggedIn() ? (
              <Button basic inverted onClick={Auth.logout} className='logout-footer'>
                Logout
              </Button>
            ) : (
              <>
                {/* <Button as={Link} to="/list" basic inverted>
                  <FaList />
                </Button> */}
                <Button basic inverted onClick={() => window.location.assign('/login')} className='login-footer'>
                  Login
                </Button>
              </>
            )}
          </Button.Group>
        </div>
        <h4 id="footnote">Created by the Robo-art team.</h4>        
      </Container>
    </footer>
  );
};

export default Footer;