import React, { Component } from 'react';
import { connect } from 'react-redux';

import './TeamStats.css'


// Ant Design
import { Divider, Row, Col, Statistic } from 'antd';

import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function mode(arr) {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length
        - arr.filter(v => v === b).length
    ).pop();
}

class TeamStats extends Component {

    state = {
        kills: 0,
        deaths: 0,
        damage: 0,
        damage_taken: 0,
        charges: 0,
        drops: 0,
        med_kills: 0,
        favorite_team: '',
        classKills: [],
        teamClassKills: []
    }

    componentDidMount() {
        let kills = 0,
            deaths = 0,
            damage = 0,
            damage_taken = 0,
            charges = 0,
            drops = 0,
            med_kills: 0,
            teams = [],
            classKills = {},
            classDeaths = {},
            teamClassKills = {},
            teamClassDeaths = {}

        for (const index of this.props.log) {
            console.log(index)
            kills = kills + Number(index.kills)
            deaths = deaths + Number(index.deaths)
            damage = damage + Number(index.damage)
            damage_taken = damage_taken + Number(index.damage_taken)
            charges = charges + Number(index.charges)
            drops = drops + Number(index.drops)
            teams.push(index.color)

            classKills.scout = classKills.scout + Number(index.scout) || Number(index.scout)
            classKills.soldier = classKills.soldier + Number(index.soldier) || Number(index.soldier)
            classKills.pyro = classKills.pyro + Number(index.pyro) || Number(index.pyro)
            classKills.demoman = classKills.demoman + Number(index.demoman) || Number(index.demoman)
            classKills.heavy = classKills.heavy + Number(index.heavy) || Number(index.heavy)
            classKills.engineer = classKills.engineer + Number(index.engineer) || Number(index.engineer)
            classKills.medic = classKills.medic + Number(index.medic) || Number(index.medic)
            classKills.sniper = classKills.sniper + Number(index.sniper) || Number(index.sniper)
            classKills.spy = classKills.spy + Number(index.spy)|| Number(index.spy)

            classDeaths.scout = classDeaths.scout_deaths + Number(index.scout_deaths) || Number(index.scout_deaths)
            classDeaths.soldier = classDeaths.soldier + Number(index.soldier_deaths) || Number(index.soldier_deaths)
            classDeaths.pyro = classDeaths.pyro + Number(index.pyro_deaths) || Number(index.pyro_deaths)
            classDeaths.demoman = classDeaths.demoman + Number(index.demoman_deaths) || Number(index.demoman_deaths)
            classDeaths.heavy = classDeaths.heavy + Number(index.heavy_deaths) || Number(index.heavy_deaths)
            classDeaths.engineer = classDeaths.engineer + Number(index.engineer_deaths) || Number(index.engineer_deaths)
            classDeaths.medic = classDeaths.medic + Number(index.medic_deaths) || Number(index.medic_deaths)
            classDeaths.sniper = classDeaths.sniper + Number(index.sniper_deaths) || Number(index.sniper_deaths)
            classDeaths.spy = classDeaths.spy + Number(index.spy_deaths) || Number(index.spy_deaths)

            teamClassKills.scout = teamClassKills.scout + Number(index.team_scout_kills) || Number(index.team_scout_kills)
            teamClassKills.soldier = teamClassKills.soldier + Number(index.team_soldier_kills) || Number(index.team_soldier_kills)
            teamClassKills.pyro = teamClassKills.pyro + Number(index.team_pyro_kills) || Number(index.team_pyro_kills)
            teamClassKills.demoman = teamClassKills.demoman + Number(index.team_demoman_kills) || Number(index.team_demoman_kills)
            teamClassKills.heavy = teamClassKills.heavy + Number(index.team_heavy_kills) || Number(index.team_heavy_kills)
            teamClassKills.engineer = teamClassKills.engineer + Number(index.team_engineer_kills) || Number(index.team_engineer_kills)
            teamClassKills.medic = teamClassKills.medic + Number(index.team_medic_kills) || Number(index.team_medic_kills)
            teamClassKills.sniper = teamClassKills.sniper + Number(index.team_sniper_kills) || Number(index.team_sniper_kills)
            teamClassKills.spy = teamClassKills.spy + Number(index.team_spy_kills) || Number(index.team_spy_kills)

            teamClassDeaths.scout = teamClassDeaths.scout_deaths + Number(index.team_scout_deaths) || Number(index.team_scout_deaths)
            teamClassDeaths.soldier = teamClassDeaths.soldier + Number(index.team_soldier_deaths) || Number(index.team_soldier_deaths)
            teamClassDeaths.pyro = teamClassDeaths.pyro + Number(index.team_pyro_deaths) || Number(index.team_pyro_deaths)
            teamClassDeaths.demoman = teamClassDeaths.demoman + Number(index.team_demoman_deaths) || Number(index.team_demoman_deaths)
            teamClassDeaths.heavy = teamClassDeaths.heavy + Number(index.team_heavy_deaths) || Number(index.team_heavy_deaths)
            teamClassDeaths.engineer = teamClassDeaths.engineer + Number(index.team_engineer_deaths) || Number(index.team_engineer_deaths)
            teamClassDeaths.medic = teamClassDeaths.medic + Number(index.team_medic_deaths) || Number(index.team_medic_deaths)
            teamClassDeaths.sniper = teamClassDeaths.sniper + Number(index.team_sniper_deaths) || Number(index.team_sniper_deaths)
            teamClassDeaths.spy = teamClassDeaths.spy + Number(index.team_spy_deaths) || Number(index.team_spy_deaths)
        }

        med_kills = classKills.medic;

        let classKillsArray = [];
        let teamClassKillsArray = [];
        for (const class_name in classKills) {
            if (classKills.hasOwnProperty(class_name)) {
                classKillsArray.push({ 
                    class_name: class_name.charAt(0).toUpperCase() + class_name.slice(1), 
                    killed: classKills[class_name],
                    killed_by: classDeaths[class_name],
                })

                teamClassKillsArray.push({
                    class_name: class_name.charAt(0).toUpperCase() + class_name.slice(1),
                    kills: teamClassKills[class_name],
                    deaths: teamClassDeaths[class_name],
                })
                
            }
        }

        this.setState({
            kills, deaths, damage, damage_taken, charges, drops, med_kills,
            favorite_team: mode(teams),
            classKills: classKillsArray,
            teamClassKills: teamClassKillsArray
        })
    }
    
    render() { 
        return ( 
            <>
                <Row className="stats">
                    <Col span={3}>
                        <Statistic title="Kills" value={this.state.kills} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Deaths" value={this.state.deaths} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Favorite Team" value={this.state.favorite_team} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Medic Kills" value={this.state.med_kills} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Charges" value={this.state.charges} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Drops" value={this.state.drops} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Damage" value={this.state.damage} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Damage Taken" value={this.state.damage_taken} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Divider orientation="center">Details</Divider>
                        <h2 className="graph-title">Kills/Deaths</h2>
                        <ResponsiveContainer height={300} width='100%'>
                            <LineChart
                                data={this.props.log}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 60,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" hide={true} label="Time"/>
                                <YAxis scale='linear' domain={[0, dataMax => (Math.floor(dataMax + 2))]}/>
                                <Tooltip content={({ active, payload, label }) => 
                                    <div className="tooltip">
                                        <p className="label">{new Date(label * 1000).toDateString()}</p>
                                        <p className="intro blue">Kills: {active && payload[0].payload.kills} ({active && Math.round((payload[0].payload.kills / (payload[0].payload.length / 60)) * 100) / 100}/min)</p>
                                        <p className="intro red">Deaths: {active && payload[0].payload.deaths} ({active && Math.round((payload[0].payload.deaths / (payload[0].payload.length / 60)) * 100) / 100}/min)</p>
                                    </div>}/>
                                <Legend />
                                <Line type="monotone" dataKey="kpm" stroke="#1890ff" name="Kills/Min"/>
                                <Line type="monotone" dataKey="depm" stroke="#fa541c" name="Deaths/Min"/>
                            </LineChart>  
                        </ResponsiveContainer>
                        <h2 className="graph-title">Damage/Damage Taken</h2>
                        <ResponsiveContainer height={300} width='100%'>
                            <LineChart
                                data={this.props.log}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 60,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" hide={true} label="Time" />
                                <YAxis type="number" scale='linear' domain={[dataMin => (Math.floor(dataMin * 0.9)), dataMax => (Math.floor(dataMax * 1.1))]} />
                                <Tooltip content={({ active, payload, label }) =>
                                    <div className="tooltip">
                                        <p className="label">{new Date(label * 1000).toDateString()}</p>
                                        <p className="intro blue">Damage: {active && payload[0].payload.damage} ({active && Math.round((payload[0].payload.damage / (payload[0].payload.length/60))*100)/100}/min)</p>
                                        <p className="intro red">Damage Taken: {active && payload[0].payload.damage_taken} ({active && Math.round((payload[0].payload.damage_taken / (payload[0].payload.length / 60)) * 100) / 100}/min)</p>
                                    </div>} />
                                <Legend />
                                <Line type="monotone" dataKey="dpm" stroke="#1890ff" name="Damage/Min"/>
                                <Line type="monotone" dataKey="dtpm" stroke="#fa541c" name="Damage Taken/Min"/>
                            </LineChart>
                        </ResponsiveContainer>
                        <h2 className="graph-title">Kills/Deaths Spread</h2>
                        <ResponsiveContainer height={350} width='100%'>
                            <BarChart
                                data={this.state.teamClassKills}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 50,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="class_name" />
                                <YAxis />
                                <Tooltip content={({ active, payload, label }) =>
                                    <div className="tooltip">
                                        <p className="label">{label}</p>
                                        <p className="intro blue">Kills: {active && payload[0].payload.kills}</p>
                                        <p className="intro red">Deaths: {active && payload[0].payload.deaths}</p>
                                    </div>} />
                                <Legend />
                                <Bar dataKey="kills" fill="#1890ff" name="Kills" />
                                <Bar dataKey="deaths" fill="#fa541c" name="Deaths" />
                            </BarChart>
                        </ResponsiveContainer>
                        <h2 className="graph-title">Killed/Killed by Spread</h2>
                        <ResponsiveContainer height={350} width='100%'>
                            <BarChart
                                data={this.state.classKills}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 50,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="class_name" />
                                <YAxis />
                                <Tooltip content={({ active, payload, label }) =>
                                    <div className="tooltip">
                                        <p className="label">{label}</p>
                                        <p className="intro blue">Killed: {active && payload[0].payload.killed}</p>
                                        <p className="intro red">Killed by: {active && payload[0].payload.killed_by}</p>
                                    </div>} />
                                <Legend />
                                <Bar dataKey="killed" fill="#1890ff" name="Killed"/>
                                <Bar dataKey="killed_by" fill="#fa541c" name="Killed By"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </>
         );
    }
}

const mapStateToProps = ({ team, user, member, log }) => ({ team, user, member, log});

export default connect(mapStateToProps)(TeamStats);