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
    favorite_team: "",
    classKills: [],
    teamClassKills: [],
  };

  parseClasses = (obj, index, stat_start, stat_end) => {
    let classes = [
        "scout",
        "soldier",
        "pyro",
        "demoman",
        "heavy",
        "engineer",
        "medic",
        "sniper",
        "spy"
    ];
    console.log(obj, index, stat_start, stat_end);
    
    for (const class_name of classes) {
        if (Number(index[stat_start + class_name + stat_end])) {
          obj[class_name] =
            obj[class_name] +
              Number(index[stat_start + class_name + stat_end]) ||
            Number(index[stat_start + class_name + stat_end]);
        }
    }

    return obj;
  };

  parseResponse = () => {
    let kills = 0,
      deaths = 0,
      damage = 0,
      damage_taken = 0,
      charges = 0,
      drops = 0,
      med_kills = 0,
      teams = [],
      classKills = {},
      classDeaths = {},
      teamClassKills = {},
      teamClassDeaths = {};

    for (const index of this.props.log) {
      kills = kills + Number(index.kills);

      deaths = deaths + Number(index.deaths);
      damage = damage + Number(index.damage);
      damage_taken = damage_taken + Number(index.damage_taken);
      charges = charges + Number(index.charges);
      drops = drops + Number(index.drops);
      teams.push(index.color);

      classKills = this.parseClasses(classKills, index, "", "");
      classDeaths = this.parseClasses(classDeaths, index, "", "_deaths");
      teamClassKills = this.parseClasses(
        teamClassKills,
        index,
        "team_",
        "_kills"
      );
      teamClassDeaths = this.parseClasses(
        teamClassDeaths,
        index,
        "team_",
        "_deaths"
      );
    }

    med_kills = classKills.medic;

    let classKillsArray = [];
    let teamClassKillsArray = [];
    for (const class_name in classKills) {
      classKillsArray.push({
        class_name: class_name.charAt(0).toUpperCase() + class_name.slice(1),
        killed: classKills[class_name] || 0,
        killed_by: classDeaths[class_name] || 0,
      });

      teamClassKillsArray.push({
        class_name: class_name.charAt(0).toUpperCase() + class_name.slice(1),
        kills: teamClassKills[class_name] || 0,
        deaths: teamClassDeaths[class_name] || 0,
      });
    }

    this.setState({
      kills,
      deaths,
      damage,
      damage_taken,
      charges,
      drops,
      med_kills,
      favorite_team: mode(teams),
      classKills: classKillsArray,
      teamClassKills: teamClassKillsArray,
    });
  };

  componentDidMount() {
    this.parseResponse();
  }

  render() {
    return (
      <>
        <div className="statistics-container">
          <div className="stat">
            <Statistic title="Kills" value={this.state.kills} />
          </div>
          <div className="stat">
            <Statistic title="Deaths" value={this.state.deaths} />
          </div>
          <div className="stat">
            <Statistic title="Favorite Team" value={this.state.favorite_team} />
          </div>
          <div className="stat">
            <Statistic title="Medic Kills" value={this.state.med_kills} />
          </div>
          <div className="stat">
            <Statistic title="Charges" value={this.state.charges} />
          </div>
          <div className="stat">
            <Statistic title="Drops" value={this.state.drops} />
          </div>
          <div className="stat">
            <Statistic title="Damage" value={this.state.damage} />
          </div>
          <div className="stat">
            <Statistic title="Damage Taken" value={this.state.damage_taken} />
          </div>
        </div>
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