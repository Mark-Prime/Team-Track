import React, { Component } from 'react';
import { connect } from 'react-redux';

// Ant Design
import {  Divider } from 'antd';

class TeamStats extends Component {
    
    render() { 
        return ( 
            <>
                <Divider orientation="left">member</Divider>
                {JSON.stringify(this.props.member)}

                <Divider orientation="left">team</Divider>
                {JSON.stringify(this.props.team[0])}

                <Divider orientation="left">user</Divider>
                {JSON.stringify(this.props.user[0])}

                <Divider orientation="left">log</Divider>
                {JSON.stringify(this.props.log)}
            </>
         );
    }
}

const mapStateToProps = ({ team, user, member, log }) => ({ team, user, member, log});

export default connect(mapStateToProps)(TeamStats);