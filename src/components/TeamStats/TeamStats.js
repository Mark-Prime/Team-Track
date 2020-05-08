import React, { Component } from 'react';
import { connect } from 'react-redux';

import './TeamStats.css'

import PlayerBarGraph from '../PlayerBarGraph/PlayerBarGraph';
import PlayerLineGraph from '../PlayerLineGraph/PlayerLineGraph';

// Ant Design
import { Divider, Row, Col, Statistic } from 'antd';


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

    parseClasses = (obj, index, stat_start, stat_end) => {
        obj.scout = obj.scout + Number(index[stat_start + 'scout' + stat_end]) || Number(index[stat_start + 'scout' + stat_end])
        obj.soldier = obj.soldier + Number(index[stat_start + 'soldier' + stat_end]) || Number(index[stat_start + 'soldier' + stat_end])
        obj.pyro = obj.pyro + Number(index[stat_start + 'pyro' + stat_end]) || Number(index[stat_start + 'pyro' + stat_end])
        obj.demoman = obj.demoman + Number(index[stat_start + 'demoman' + stat_end]) || Number(index[stat_start + 'demoman' + stat_end])
        obj.heavy = obj.heavy + Number(index[stat_start + 'heavy' + stat_end]) || Number(index[stat_start + 'heavy' + stat_end])
        obj.engineer = obj.engineer + Number(index[stat_start + 'engineer' + stat_end]) || Number(index[stat_start + 'engineer' + stat_end])
        obj.medic = obj.medic + Number(index[stat_start + 'medic' + stat_end]) || Number(index[stat_start + 'medic' + stat_end])
        obj.sniper = obj.sniper + Number(index[stat_start + 'sniper' + stat_end]) || Number(index[stat_start + 'sniper' + stat_end])
        obj.spy = obj.spy + Number(index[stat_start + 'spy' + stat_end]) || Number(index[stat_start + 'spy' + stat_end])
        return obj;
    }

    parseResponse = () => {
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

            kills = kills + Number(index.kills)

            deaths = deaths + Number(index.deaths)
            damage = damage + Number(index.damage)
            damage_taken = damage_taken + Number(index.damage_taken)
            charges = charges + Number(index.charges)
            drops = drops + Number(index.drops)
            teams.push(index.color)

            classKills = this.parseClasses(classKills, index, '', '');
            classDeaths = this.parseClasses(classDeaths, index, '', '_deaths');
            teamClassKills = this.parseClasses(teamClassKills, index, 'team_', '_kills');
            teamClassDeaths = this.parseClasses(teamClassDeaths, index, 'team_', '_deaths');
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

    componentDidMount() {
        this.parseResponse()
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
                        <PlayerLineGraph
                            title1="Kills"
                            title2="Deaths"
                            lineName1="Kills/Min"
                            lineName2="Deaths/Min"
                            datakey1="kpm"
                            datakey2="depm"
                            displaykey1="kills"
                            displaykey2="deaths"
                            data={this.props.log}
                        />
                        <PlayerLineGraph
                            title1="Damage/Min"
                            title2="Damage Taken/Min"
                            datakey1="dpm"
                            datakey2="dtpm"
                            displaykey1="damage"
                            displaykey2="damage_taken"
                            data={this.props.log}
                        />
                        <PlayerBarGraph
                            title1="Kills"
                            title2="Deaths"
                            datakey1="kills"
                            datakey2="deaths"
                            data={this.state.teamClassKills}
                        />
                        <PlayerBarGraph
                            title1="Killed"
                            title2="Killed By"
                            datakey1="killed"
                            datakey2="killed_by"
                            data={this.state.classKills}
                        />
                    </Col>
                </Row>
            </>
         );
    }
}

const mapStateToProps = ({ team, user, member, log, class_log }) => ({ team, user, member, log, class_log });

export default connect(mapStateToProps)(TeamStats);