import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styling
import './PlayerStats.css'

// Components
import PlayerBarGraph from '../PlayerBarGraph/PlayerBarGraph';
import PlayerLineGraph from '../PlayerLineGraph/PlayerLineGraph';

// Ant Design
import { Row, Col, Statistic, Divider, Collapse } from 'antd';

const { Panel } = Collapse;

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
        gamemode_stats: {},
        allRows: []
    }

    arrAvg = arr => {
        let total = 0;
        for (let index of arr) {
            total += Number(index)
        }
        return total/arr.length
    }

    parseDataMax = (rows) => {
        let dpmArray = [];
        let dtpmArray = [];
        
        for (let index of rows) {
            dpmArray.push(index.dpm)
            dtpmArray.push(index.dtpm)
        }

        if (Math.max(...dpmArray) > Math.max(...dtpmArray)) {
            return Math.max(...dpmArray) * 1.1
        } else {
            return Math.max(...dtpmArray) * 1.1
        }
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
            med_kills = 0,
            classes = [],
            classKills = {},
            classDeaths = {},
            playerClassKills = {},
            playerClassDeaths = {},
            gamemode_stats = {},
            allRows = [],
            dpmArray = [],
            dtpmArray = [],
            dpmArrays = {},
            dtpmArrays = {},
            dpmChartMax = 0

        for (let index of this.props.log) {
            gamemode_stats[index.title] = gamemode_stats[index.title] || {};
            gamemode_stats[index.title].rows = gamemode_stats[index.title].rows || [];
            dpmArrays[index.title] = dpmArrays[index.title] || [];
            dtpmArrays[index.title] = dtpmArrays[index.title] || [];

            damage = damage + Number(index.damage)
            damage_taken = damage_taken + Number(index.damage_taken)

            let rows = gamemode_stats[index.title].rows
            classes.push(index.main_class)

            playerClassKills = this.parseClasses(playerClassKills, index, 'kills_as_', '');
            playerClassDeaths = this.parseClasses(playerClassDeaths, index, 'deaths_as_', '');

            gamemode_stats[index.title].playerClassKills = this.parseClasses(gamemode_stats[index.title].playerClassKills || {}, index, 'kills_as_', '');
            gamemode_stats[index.title].playerClassDeaths = this.parseClasses(gamemode_stats[index.title].playerClassDeaths || {}, index, 'deaths_as_', '');

            kills = kills + Number(index.total_kills)
            deaths = deaths + Number(index.total_deaths)

            if (!rows[rows.length - 1] || rows[rows.length - 1].date !== index.date) {
                dpmArray.push(index.dpm)
                dtpmArray.push(index.dtpm)

                index.averageDPM = this.arrAvg(dpmArray)
                index.averageDTPM = this.arrAvg(dtpmArray)

                dpmArrays[index.title].push(index.dpm)
                dtpmArrays[index.title].push(index.dtpm)

                index.gamemodeDPM = this.arrAvg(dpmArrays[index.title])
                index.gamemodeDTPM = this.arrAvg(dtpmArrays[index.title])

                classKills = this.parseClasses(classKills, index, '', '');
                classDeaths = this.parseClasses(classDeaths, index, '', '_deaths');

                gamemode_stats[index.title].id = index.gamemode
                gamemode_stats[index.title].classKills = this.parseClasses(gamemode_stats[index.title].classKills || {}, index, '', '');
                gamemode_stats[index.title].classDeaths = this.parseClasses(gamemode_stats[index.title].classDeaths || {}, index, '', '_deaths');
            
                gamemode_stats[index.title].rows.push(index)
                allRows.push(index)
            }
        }

        if (Math.max(...dpmArray) > Math.max(...dtpmArray)) {
            dpmChartMax = Math.max(...dpmArray) * 1.1
        } else {
            dpmChartMax = Math.max(...dtpmArray) * 1.1
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

        for (const gamemode in gamemode_stats) {
            if (gamemode_stats.hasOwnProperty(gamemode)) {

                gamemode_stats[gamemode].classKillsArray = [];
                gamemode_stats[gamemode].playerClassKillsArray = [];

                for (const class_name in gamemode_stats[gamemode].classKills) {
                    if (gamemode_stats[gamemode].classKills.hasOwnProperty(class_name)) {

                        gamemode_stats[gamemode].classKillsArray.push({
                            class_name: class_name.charAt(0).toUpperCase() + class_name.slice(1),
                            killed: gamemode_stats[gamemode].classKills[class_name],
                            killed_by: gamemode_stats[gamemode].classDeaths[class_name],
                        })

                        gamemode_stats[gamemode].playerClassKillsArray.push({
                            class_name: class_name.charAt(0).toUpperCase() + class_name.slice(1),
                            kills: gamemode_stats[gamemode].playerClassKills[class_name],
                            deaths: gamemode_stats[gamemode].playerClassDeaths[class_name],
                        })
                    }
                }

            }
        }

        this.setState({
            kills, deaths, damage, damage_taken, med_kills,
            gamemode_stats, allRows,
            favorite_class: mode(classes),
            classKills: classKillsArray,
            playerClassKills: playerClassKillsArray,
            dpmChartMax
        })
    }

    componentDidMount() {
        this.parseResponse()
    }

    render() { 
        return ( 
            <>
                <div className="statistics-container">
                    <div className="stat"><Statistic title="Kills" value={this.state.kills} /></div>
                    <div className="stat"><Statistic title="Deaths" value={this.state.deaths} /></div>
                    <div className="stat"><Statistic title="Damage" value={this.state.damage} /></div>
                    <div className="stat"><Statistic title="Damage Taken" value={this.state.damage_taken} /></div>
                    <div className="stat"><Statistic title="Teams" value={this.props.stats.team_count} /></div>
                    <div className="stat"><Statistic title="Total Logs" value={this.state.gamecount} /></div>
                    <div className="stat"><Statistic title="Most Played" value={this.state.favorite_class === 'heavyweapons' ? 'Heavy' : this.state.favorite_class.charAt(0).toUpperCase() + this.state.favorite_class.slice(1)} className="stat" /></div>
                    <div className="stat"><Statistic title="Medic Kills" value={this.state.med_kills} /></div>
                </div>
                <Divider orientation="center">Details</Divider>
                <Row>
                    <Col span={24}>
                        <Collapse defaultActiveKey={['0']}>
                            <Panel header="All Gamemodes" key="0">
                                <PlayerLineGraph
                                    title1="Damage"
                                    title2="Damage Taken"
                                    datakey1="dpm"
                                    datakey2="dtpm"
                                    displaykey1="damage"
                                    displaykey2="damage_taken"
                                    lineName1="Damage/Min"
                                    lineName2="Damage Taken/Min"
                                    data={this.state.allRows}
                                    dataMax={this.state.dpmChartMax}
                                />

                                <PlayerLineGraph
                                    title1="Avg Damage"
                                    title2="Avg Damage Taken"
                                    datakey1="averageDPM"
                                    datakey2="averageDTPM"
                                    lineName1="Avg Damage/Min"
                                    lineName2="Avg Damage Taken/Min"
                                    data={this.state.allRows}
                                />

                                <PlayerBarGraph
                                    title1="Kills"
                                    title2="Deaths"
                                    datakey1="kills"
                                    datakey2="deaths"
                                    data={this.state.playerClassKills}
                                />

                                <PlayerBarGraph 
                                    title1="Killed" 
                                    title2="Killed By" 
                                    datakey1="killed" 
                                    datakey2="killed_by"
                                    data={this.state.classKills}
                                />
                            </Panel>
                            {Object.keys(this.state.gamemode_stats).map(gamemode => {
                                return (
                                    <Panel header={gamemode} key={this.state.gamemode_stats[gamemode].id}>
                                        <PlayerLineGraph
                                            title1="Damage"
                                            title2="Damage Taken"
                                            datakey1="dpm"
                                            datakey2="dtpm"
                                            displaykey1="damage"
                                            displaykey2="damage_taken"
                                            lineName1="Damage/Min"
                                            lineName2="Damage Taken/Min"
                                            data={this.state.gamemode_stats[gamemode].rows}
                                            dataMax={this.parseDataMax(this.state.gamemode_stats[gamemode].rows)}
                                        />

                                        <PlayerLineGraph
                                            title1="Avg Damage"
                                            title2="Avg Damage Taken"
                                            datakey1="gamemodeDPM"
                                            datakey2="gamemodeDTPM"
                                            lineName1="Avg Damage/Min"
                                            lineName2="Avg Damage Taken/Min"
                                            data={this.state.gamemode_stats[gamemode].rows}
                                        />

                                        <PlayerBarGraph
                                            title1="Kills"
                                            title2="Deaths"
                                            datakey1="kills"
                                            datakey2="deaths"
                                            data={this.state.gamemode_stats[gamemode].playerClassKillsArray}
                                        />

                                        <PlayerBarGraph
                                            title1="Killed"
                                            title2="Killed By"
                                            datakey1="killed"
                                            datakey2="killed_by"
                                            data={this.state.gamemode_stats[gamemode].classKillsArray}
                                        />
                                    </Panel> 
                                    )
                            })}
                        </Collapse>
                    </Col>
                </Row>
            </>
         );
    }
}

const mapStateToProps = ({ player, team, stats, log }) => ({ player, team, stats, log });
 
export default connect(mapStateToProps)(PlayerStats);