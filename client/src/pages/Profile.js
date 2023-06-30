/*import React from 'react';


const ProfilePage = ({ user }) => {
  return (
    <div className="profile-page">
      <h2>Welcome, {user.name}!</h2>
      <div className="user-details">
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Username:</strong> {user.username}
        </div>
        /* Add more user details as needed */
//       </div>
//       <div className="profile-actions">
//         <button>Logout</button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;*/
// export default ProfilePage;*/

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoggedIn: false
    };
  }

  handleLogin = (username) => {
    this.setState({ username, isLoggedIn: true });
  };

  handleLogout = () => {
    this.setState({ username: '', isLoggedIn: false });
  };

  render() {
    const { username, isLoggedIn } = this.state;

    if (isLoggedIn) {
      return (
        <div>
          <h1>Welcome, {username}!</h1>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Please login to view your profile</h1>
          <Login onLogin={this.handleLogin} />
        </div>
      );
    }
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    // Perform login logic here, e.g., send API request, validate credentials, etc.
    // You can access the username and password entered by the user using `username` and `password` variables.
    // You can also update the state or perform any necessary actions based on the login result.
    this.props.onLogin(username);
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default Profile;

