import React from 'react';
import { Header, Input, Button, Image } from 'semantic-ui-react';
import '../App.css';


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
    const { searchTerm } = this.state;
    const apiKey = process.env.DEEPART_API_KEY;
    fetch('https://api.deepai.org/api/text2img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        text: searchTerm,
        num_images: 6
      })
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the randomImages state with the fetched images
        this.setState({ randomImages: data.images });
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        // Handle any error that occurred during the image fetch
      });
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
