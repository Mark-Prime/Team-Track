import React, { Component } from 'react';
import { connect } from 'react-redux';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class PlayerPage extends Component {

    componentDidMount() {
        console.log('ID:', this.props.match.params.id);
        this.props.dispatch({ type: 'FETCH_PLAYER', payload: this.props.match.params.id })

    }

    render() {
        return (
            <div>
                {this.props.player[0] ?
                    <>
                        <h1 id="welcome">
                        Welcome, {this.props.player[0].displayname}!
                        </h1>
                        <p>Your ID is: {this.props.player[0].id}</p>
                    </> :

                    <p>User not found</p>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ player }) => ({ player });

export default connect(mapStateToProps)(PlayerPage);
