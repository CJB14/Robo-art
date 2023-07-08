import React from 'react';
import { Header, Input, Button } from 'semantic-ui-react';
import '../App.css';
import Footer from '../components/Footer';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      randomImages: []
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearchSubmit = () => {
    // Perform search logic using the searchTerm
    // and update the randomImages state with the results
  };

  render() {
    return (
      <div className="home-page">
        <Header as="h1">Robo-Art</Header>
        <div className="search-container">
          <Input
            placeholder="Search images..."
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
          />
          <Button primary onClick={this.handleSearchSubmit}>
            Search
          </Button>
        </div>
        <div className="image-container">
          {this.state.randomImages.length === 0 ? (
            <p>No images found.</p>
          ) : (
            <div>
              {/* Render images */}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
