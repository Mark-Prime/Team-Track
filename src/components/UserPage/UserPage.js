import React, { Component } from 'react';
import { connect } from 'react-redux';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class UserPage extends Component {

  componentDidMount() {
    console.log('ID:', this.props.match.params.id);
    
  }

  render() { 
    return ( 
      <div>
        <h1 id="welcome">
          Welcome, {this.props.user.displayName}!
        </h1>
        <p>Your ID is: {this.props.user.id}</p>
      </div>
     );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = ({user}) => ({user});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
