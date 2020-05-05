import React, { Component } from 'react';
import { connect } from 'react-redux';

import './TeamStats.css'


// Ant Design
import {  Divider } from 'antd';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

class TeamStats extends Component {
    
    render() { 
        return ( 
            <>
                <Divider orientation="center">Details</Divider>
                <h2 className="graph-title">Kills/Deaths</h2>
                <ResponsiveContainer height={300} width='100%'>
                    <LineChart
                        data={this.props.log}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" hide={true} label="Time"/>
                        <YAxis scale='linear' domain={[0, dataMax => (Math.floor(dataMax * 1.1))]}/>
                        <Tooltip content={({ active, payload, label }) => 
                            <div className="tooltip">
                                <p className="label">{new Date(label * 1000).toDateString()}</p>
                                <p className="intro">Kills: {active && payload[0].payload.kills}</p>
                                <p className="intro">Deaths: {active && payload[0].payload.deaths}</p>
                            </div>}/>
                        <Legend />
                        <Line type="monotone" dataKey="kills" stroke="#1890ff" />
                        <Line type="monotone" dataKey="deaths" stroke="#fa541c" />
                    </LineChart>  
                </ResponsiveContainer>
                <h2 className="graph-title">Damage/Damage Taken</h2>
                <ResponsiveContainer height={300} width='100%'>
                    <LineChart
                        data={this.props.log}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" hide={true} label="Time" />
                        <YAxis type="number" scale='linear' domain={[dataMin => (Math.floor(dataMin * 0.9)), dataMax => (Math.floor(dataMax * 1.1))]} />
                        <Tooltip content={({ active, payload, label }) =>
                            <div className="tooltip">
                                <p className="label">{new Date(label * 1000).toDateString()}</p>
                                <p className="intro">Damage: {active && payload[0].payload.damage}</p>
                                <p className="intro">Damage Taken: {active && payload[0].payload.damage_taken}</p>
                            </div>} />
                        <Legend />
                        <Line type="monotone" dataKey="damage" stroke="#1890ff" />
                        <Line type="monotone" dataKey="damage_taken" stroke="#fa541c" />
                    </LineChart>
                </ResponsiveContainer>

                <Divider orientation="left">log</Divider>
                {JSON.stringify(this.props.log)}

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

const mapStateToProps = ({ team, user, member, log }) => ({ team, user, member, log});

export default connect(mapStateToProps)(TeamStats);