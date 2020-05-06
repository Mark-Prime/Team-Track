import React, { Component } from 'react';
import { connect } from 'react-redux';

// Ant Design
import { Row, Col, Statistic, Divider } from 'antd';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


function mode(arr) {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length
        - arr.filter(v => v === b).length
    ).pop();
}

class PlayerStats extends Component {
    state = {
        favorite_class: '',
        kills: 0,
        deaths: 0,
        damage: 0,
        damage_taken: 0,
        gamecount: this.props.log.length,
        med_kills: 0,
    }

    componentDidMount() {
        let kills = 0,
            deaths = 0,
            damage = 0,
            damage_taken = 0,
            med_kills: 0,
            classes = [],
            classKills = {},
            classDeaths = {},
            playerClassKills = {},
            playerClassDeaths = {}

        for (const index of this.props.log) {
            console.log(index)
            kills = kills + Number(index.total_kills)
            deaths = deaths + Number(index.total_deaths)
            damage = damage + Number(index.damage)
            damage_taken = damage_taken + Number(index.damage_taken)
            classes.push(index.main_class)

            classKills.scout = classKills.scout + Number(index.scout) || Number(index.scout)
            classKills.soldier = classKills.soldier + Number(index.soldier) || Number(index.soldier)
            classKills.pyro = classKills.pyro + Number(index.pyro) || Number(index.pyro)
            classKills.demoman = classKills.demoman + Number(index.demoman) || Number(index.demoman)
            classKills.heavy = classKills.heavy + Number(index.heavy) || Number(index.heavy)
            classKills.engineer = classKills.engineer + Number(index.engineer) || Number(index.engineer)
            classKills.medic = classKills.medic + Number(index.medic) || Number(index.medic)
            classKills.sniper = classKills.sniper + Number(index.sniper) || Number(index.sniper)
            classKills.spy = classKills.spy + Number(index.spy) || Number(index.spy)

            classDeaths.scout = classDeaths.scout_deaths + Number(index.scout_deaths) || Number(index.scout_deaths)
            classDeaths.soldier = classDeaths.soldier + Number(index.soldier_deaths) || Number(index.soldier_deaths)
            classDeaths.pyro = classDeaths.pyro + Number(index.pyro_deaths) || Number(index.pyro_deaths)
            classDeaths.demoman = classDeaths.demoman + Number(index.demoman_deaths) || Number(index.demoman_deaths)
            classDeaths.heavy = classDeaths.heavy + Number(index.heavy_deaths) || Number(index.heavy_deaths)
            classDeaths.engineer = classDeaths.engineer + Number(index.engineer_deaths) || Number(index.engineer_deaths)
            classDeaths.medic = classDeaths.medic + Number(index.medic_deaths) || Number(index.medic_deaths)
            classDeaths.sniper = classDeaths.sniper + Number(index.sniper_deaths) || Number(index.sniper_deaths)
            classDeaths.spy = classDeaths.spy + Number(index.spy_deaths) || Number(index.spy_deaths)

            playerClassKills.scout = playerClassKills.scout + Number(index.kills_as_scout) || Number(index.kills_as_scout)
            playerClassKills.soldier = playerClassKills.soldier + Number(index.kills_as_soldier) || Number(index.kills_as_soldier)
            playerClassKills.pyro = playerClassKills.pyro + Number(index.kills_as_pyro) || Number(index.kills_as_pyro)
            playerClassKills.demoman = playerClassKills.demoman + Number(index.kills_as_demoman) || Number(index.kills_as_demoman)
            playerClassKills.heavy = playerClassKills.heavy + Number(index.kills_as_heavy) || Number(index.kills_as_heavy)
            playerClassKills.engineer = playerClassKills.engineer + Number(index.kills_as_engineer) || Number(index.kills_as_engineer)
            playerClassKills.medic = playerClassKills.medic + Number(index.kills_as_medic) || Number(index.kills_as_medic)
            playerClassKills.sniper = playerClassKills.sniper + Number(index.kills_as_sniper) || Number(index.kills_as_sniper)
            playerClassKills.spy = playerClassKills.spy + Number(index.kills_as_spy) || Number(index.kills_as_spy)

            playerClassDeaths.scout = playerClassDeaths.scout_deaths + Number(index.deaths_as_scout) || Number(index.deaths_as_scout)
            playerClassDeaths.soldier = playerClassDeaths.soldier + Number(index.deaths_as_soldier) || Number(index.deaths_as_soldier)
            playerClassDeaths.pyro = playerClassDeaths.pyro + Number(index.deaths_as_pyro) || Number(index.deaths_as_pyro)
            playerClassDeaths.demoman = playerClassDeaths.demoman + Number(index.deaths_as_demoman) || Number(index.deaths_as_demoman)
            playerClassDeaths.heavy = playerClassDeaths.heavy + Number(index.deaths_as_heavy) || Number(index.deaths_as_heavy)
            playerClassDeaths.engineer = playerClassDeaths.engineer + Number(index.deaths_as_engineer) || Number(index.deaths_as_engineer)
            playerClassDeaths.medic = playerClassDeaths.medic + Number(index.deaths_as_medic) || Number(index.deaths_as_medic)
            playerClassDeaths.sniper = playerClassDeaths.sniper + Number(index.deaths_as_sniper) || Number(index.deaths_as_sniper)
            playerClassDeaths.spy = playerClassDeaths.spy + Number(index.deaths_as_spy) || Number(index.deaths_as_spy)
        }

        med_kills = classKills.medic;

        let classKillsArray = [];
        let playerClassKillsArray = [];
        for (const class_name in classKills) {
            if (classKills.hasOwnProperty(class_name)) {
                classKillsArray.push({
                    class_name: class_name.charAt(0).toUpperCase() + class_name.slice(1),
                    killed: classKills[class_name],
                    killed_by: classDeaths[class_name],
                })

                playerClassKillsArray.push({
                    class_name: class_name.charAt(0).toUpperCase() + class_name.slice(1),
                    kills: playerClassKills[class_name],
                    deaths: playerClassDeaths[class_name],
                })

            }
        }

        this.setState({
            kills, deaths, damage, damage_taken, med_kills,
            favorite_class: mode(classes),
            classKills: classKillsArray,
            playerClassKills: playerClassKillsArray
        })
    }

    render() { 
        return ( 
            <>
                <Row style={{textAlign: 'center'}}>
                    <Col span={3}>
                        <Statistic title="Kills" value={this.state.kills} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Deaths" value={this.state.deaths} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Damage" value={this.state.damage} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Damage Taken" value={this.state.damage_taken} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Teams" value={this.props.stats.team_count} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Total Logs" value={this.state.gamecount} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Most Played" value={this.state.favorite_class === 'heavyweapons' ? 'Heavy' : this.state.favorite_class.charAt(0).toUpperCase() + this.state.favorite_class.slice(1)} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Medic Kills" value={this.state.med_kills} />
                    </Col>
                </Row>
                <Divider orientation="center">Details</Divider>
                <Row>
                    <Col span={24}>
                        <h2 className="graph-title">Kills/Deaths Spread</h2>
                        <ResponsiveContainer height={350} width='100%'>
                            <BarChart
                                data={this.state.playerClassKills}
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
                                <Bar dataKey="killed" fill="#1890ff" name="Killed" />
                                <Bar dataKey="killed_by" fill="#fa541c" name="Killed By" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </>
         );
    }
}

const mapStateToProps = ({ player, team, stats, log }) => ({ player, team, stats, log });
 
export default connect(mapStateToProps)(PlayerStats);