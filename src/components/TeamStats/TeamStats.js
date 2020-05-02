import React, { Component } from 'react';
import { connect } from 'react-redux';

// Ant Design
import {  Divider } from 'antd';

class TeamStats extends Component {
    state = {  }
    render() { 
        return ( 
            <>
                <Divider orientation="left">member</Divider>
                {JSON.stringify(this.props.member)}

                <Divider orientation="left">team</Divider>
                {JSON.stringify(this.props.team[0])}

                <Divider orientation="left">user</Divider>
                {JSON.stringify(this.props.user[0])}
            </>
         );
    }
}

const mapStateToProps = ({ team, user, member }) => ({ team, user, member });

export default connect(mapStateToProps)(TeamStats);