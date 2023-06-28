import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Welcome to the Home page!'
    };
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Home;
