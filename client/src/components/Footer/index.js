import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Container, Input } from 'semantic-ui-react';
import { FaHome, FaUser, FaShoppingCart, FaHeart, FaList, FaPalette, FaPaypal } from 'react-icons/fa';
import Auth from '../../utils/auth';

const Footer = () => {

  return (
    <footer className="footer">
      <Container text textAlign="center">
        <div className="footer-buttons">
          <Button.Group className="footer-button-group" fluid>
            <Button as={Link} to="/" basic inverted>
              <FaHome size={30}/>
            </Button>
            
            <Button as={Link} to="/profile" basic inverted>
              <FaUser size={30}/>
            </Button>
            
            {/* <Button as={Link} to="/cart" basic inverted>
              <FaShoppingCart />
            </Button> */}
            
            {Auth.loggedIn() ? (
              <Button as={Link} to="/artwork" basic inverted>
                <FaPalette size={30}/>
              </Button>
            ) : (
              <></>
            )}

            {/* {Auth.loggedIn() ? (
              <Button as={Link} to="/favorites" basic inverted>
                <FaHeart size={30}/>
              </Button>
            ) : (
              <></>
            )} */}
            
            {Auth.loggedIn() ? (
              <Button basic inverted onClick={Auth.logout} className='logout-footer'>
                Logout
              </Button>
            ) : (
              <>
                {/* <Button as={Link} to="/list" basic inverted>
                  <FaList size={30}/>
                </Button> */}
                
                <Button basic inverted onClick={() => window.location.assign('/login')} className='login-footer'>
                  Login
                </Button>
              </>
            )}
          </Button.Group>
        </div>
        <div className="footer-footnote">
          <h4 id="footnote">Created by the Robo-art team.
          <Button as={Link} to="/" basic inverted className="inline">
                <FaPaypal size={15}/>
              </Button>
              </h4>
        </div>             
      </Container>
    </footer>
  );
};

export default Footer;
