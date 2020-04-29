import React, { Component } from 'react';
import { connect } from 'react-redux';


class UserPage extends Component {

  render() { 
    return ( 
      <div>
        {this.props.user[0] &&
          <>
            <h1 id="welcome">
              Welcome, {this.props.user[0].displayname}!
                        </h1>
            <p>Your ID is: {this.props.user[0].id}</p>
          </>
        }
      </div>
     );
  }
}


const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps)(UserPage);
