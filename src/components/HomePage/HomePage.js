import React, { Component } from 'react';

class HomePage extends Component {
    
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PLAYERS' })
        this.props.dispatch({ type: 'FETCH_TEAMS' })
    }

    render() { 
        return ( 
            <>

            </>
         );
    }
}
 
const mapStateToProps = ({ player, team }) => ({ player, team });

export default connect(mapStateToProps)(HomePage);