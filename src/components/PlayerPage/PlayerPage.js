import React, { Component } from 'react';
import { connect } from 'react-redux';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class PlayerPage extends Component {

    componentDidMount() {
        console.log('ID:', this.props.match.params.id);

    }

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

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(PlayerPage);
