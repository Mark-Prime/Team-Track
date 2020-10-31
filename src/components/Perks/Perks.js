import React, { Component } from 'react';
import { connect } from "react-redux";

import './Perks.css'

// Ant Design
import {
  Row,
  Col,
  Card,
  Divider,
} from "antd";


class Perks extends Component {
  state = {
    id: 0,
  };

  componentDidUpdate() {
    if (this.props.user[0]) {
        if (this.props.user[0].id !== this.state.id) {
          this.setState({ id: this.props.user[0].id });
          this.refreshInformation();
        }
    }
  }

  componentDidMount() {
    this.refreshInformation();
  }

  refreshInformation = () => {
    if (this.props.user[0]) {
        this.props.dispatch({ type: "SET_TEAMS", payload: [] });
        this.props.dispatch({ type: "SET_PLAYERS", payload: [] });
        this.props.dispatch({
        type: "FETCH_PLAYER",
        payload: this.props.user[0].id,
        });
        this.props.dispatch({
        type: "FETCH_USER_TEAMS",
        payload: this.props.user[0].id,
        });
        this.props.dispatch({
        type: "FETCH_PLAYER_STATS",
        payload: this.props.user[0].id,
        });
        this.props.dispatch({ type: "UNSET_LOGS" });
        this.props.dispatch({
        type: "FETCH_PLAYER_LOGS",
        payload: this.props.user[0].id,
        });
    }
  };

  
  render() {
    if (this.props.user[0]) {
      return (
        <div>
          <h1 className="center">My Perks</h1>
          <Row>
            <Col span={2}></Col>
            <Col span={20}>
              <Divider></Divider>
              <div className="cardBox">
                {this.props.user[0].verified && (
                  <Card
                    title="Verification Check"
                    size="small"
                    className="cardBox--item"
                  >
                    <p>
                      This checkmark shows you are a well known and trusted
                      member of the community.
                    </p>
                    <p>(or I liked your pfp/name)</p>
                  </Card>
                )}
                {this.props.stats.main_mode ? (
                  <Card
                    title="Often Mains Tag"
                    size="small"
                    className="cardBox--item"
                  >
                    <p>
                      You have been listed as a Main player on more than 50% of
                      the teams on your profile.
                    </p>
                  </Card>
                ) : (
                  <Card
                    title="Often Subs Tag"
                    size="small"
                    className="cardBox--item"
                  >
                    <p>
                      You have been listed as a Sub player on more than 50% of
                      the teams on your profile.
                    </p>
                  </Card>
                )}
                {this.props.stats.leader_mode && (
                  <Card
                    title="Team Leader Tag"
                    size="small"
                    className="cardBox--item"
                  >
                    <p>
                      You have been listed as a Team Leader on more than 50% of
                      the teams on your profile.
                    </p>
                  </Card>
                )}
                {this.props.user[0].donator && (
                  <>
                    <Card
                      title="Donator Green"
                      size="small"
                      className="cardBox--item"
                    >
                      <p>
                        This changes the color of your name in various places
                        across the site as well as adding a tag on your profile
                        that shows you are a donator to TeamTrack.
                      </p>
                      <p>Thank you for helping keep this project alive.</p>
                    </Card>
                  </>
                )}
              </div>
              {this.props.user[0].donator || (
                <>
                  <Divider></Divider>
                  <h2 className="center">You are not a Donator.</h2>
                  <h4 className="center">
                    To get donator perks and keep this website running please
                    <a href="https://www.patreon.com/ryuktf2">
                      {" "}
                      Support me on Patreon{" "}
                    </a>
                    or
                    <a href="https://paypal.me/Ryuktf2"> Donate Directly.</a>
                  </h4>
                  <h4 className="center">
                    Let me know after you've donated and I can enable perks.
                  </h4>
                </>
              )}
            </Col>
            <Col span={2}></Col>
          </Row>
        </div>
      );
    } else {
        return null
    }
  }
}
 
const mapStateToProps = ({ user, player, team, stats, log }) => ({
  user,
  player,
  team,
  stats,
  log,
});

export default connect(mapStateToProps)(Perks);