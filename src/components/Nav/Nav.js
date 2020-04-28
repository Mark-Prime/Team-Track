import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">eSports Manager</h2>
    </Link>
    <div className="nav-right">
      {props.user.id ? 
        <>
          <a className="nav-link" href="http://localhost:5000/logout">
            Log out of steam
          </a>
        </> : 
        <a className="nav-link" href="http://localhost:5000/auth/steam">Log In with Steam</a>
      }
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/info">
            Info Page
          </Link>
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
        About
      </Link>
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Nav);
