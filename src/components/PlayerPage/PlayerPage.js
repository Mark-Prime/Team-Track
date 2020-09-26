import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import './PlayerPage.css'

// Components
import PlayerStats from '../PlayerStats/PlayerStats'


// Ant Design
import { Avatar, Menu, Dropdown, Table, Tabs, Tag, Space, Tooltip, BackTop } from 'antd';
import { DownOutlined, CheckCircleTwoTone, VerticalAlignTopOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

class PlayerPage extends Component {
    state = {
        id: this.props.match.params.id
    }

    componentDidUpdate() {
        if (this.props.match.params.id !== this.state.id){
            this.setState({ id: this.props.match.params.id })

            this.refreshInformation()
        }
    }

    componentDidMount() {

        this.refreshInformation()
    }

    refreshInformation = () => {
        this.props.dispatch({ type: 'SET_TEAMS', payload: []})
        this.props.dispatch({ type: 'SET_PLAYERS', payload: []})
        this.props.dispatch({ type: 'FETCH_PLAYER', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_USER_TEAMS', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_PLAYER_STATS', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'UNSET_LOGS' })
        this.props.dispatch({ type: 'FETCH_PLAYER_LOGS', payload: this.props.match.params.id })
    }

    render() {
        let logTags = null
        const gamecount = this.props.log.length;
        if (2500 <= gamecount) {
            logTags = <Tag color={"gold"} key={gamecount} style={{ margin: "5px" }}>2500+ Logs</Tag>
        } else if (1000 <= gamecount) {
            logTags = <Tag color={"purple"} key={gamecount} style={{ margin: "5px" }}>1000+ Logs</Tag>
        } else if (500 <= gamecount) {
            logTags = <Tag color={"purple"} key={gamecount} style={{ margin: "5px" }}>500+ Logs</Tag>
        } else if (250 <= gamecount) {
            logTags = <Tag color={"magenta"} key={gamecount} style={{ margin: "5px" }}>250+ Logs</Tag>
        } else if (100 <= gamecount) {
            logTags = <Tag color={"magenta"} key={gamecount} style={{ margin: "5px" }}>100+ Logs</Tag>
        } else if (50 <= gamecount) {
            logTags = <Tag color={"volcano"} key={gamecount} style={{ margin: "5px" }}>50+ Logs</Tag>
        } else if (25 <= gamecount) {
            logTags = <Tag color={"volcano"} key={gamecount} style={{ margin: "5px" }}>25+ Logs</Tag>
        } else if (10 <= gamecount) {
            logTags = <Tag color={"orange"} key={gamecount} style={{ margin: "5px" }}>10+ Logs</Tag>
        } else if (5 <= gamecount) {
            logTags = <Tag color={"orange"} key={gamecount} style={{ margin: "5px" }}>5+ Logs</Tag> 
        }

        const style = {
          height: 40,
          width: 40,
          lineHeight: "40px",
          borderRadius: 4,
          backgroundColor: "#1087e990",
          color: "#fff",
          textAlign: "center",
          fontSize: 35,
        };

        let matchLogs = this.props.log.filter((log) => {
          return log.Match;
        });

        let scrimLogs = this.props.log.filter((log) => {
          return !log.Match;
        });
        
        return (
          <div>
            <BackTop>
              <div style={style}>
                <VerticalAlignTopOutlined />
              </div>
            </BackTop>
            {this.props.player[0] ? (
              <div className="flex-container">
                <div className="profile-info">
                  <Avatar
                    shape="square"
                    size={128}
                    src={this.props.player[0].avatar}
                  />
                  <h1 id="welcome">
                    <Space>
                      {this.props.player[0].displayname}
                      {this.props.player[0].verified && (
                        <Tooltip title="Verified!">
                          <CheckCircleTwoTone />
                        </Tooltip>
                      )}
                    </Space>
                  </h1>
                  {this.props.stats.leader_mode && (
                    <Tag
                      color={"orange"}
                      key={`LEADER`}
                      style={{ margin: "5px" }}
                    >
                      TEAM LEADER
                    </Tag>
                  )}
                  {this.props.stats.main_mode && (
                    <Tag color={"blue"} key={`MAIN`} style={{ margin: "5px" }}>
                      OFTEN MAINS
                    </Tag>
                  )}
                  {this.props.player[0].donator && (
                    <Tag
                      color={"green"}
                      key={`DONATOR`}
                      style={{ margin: "5px" }}
                    >
                      DONATOR
                    </Tag>
                  )}
                  {logTags}

                  <p>Player ID: {this.props.player[0].id}</p>

                  <Dropdown
                    className="dropdown-component"
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://steamcommunity.com/profiles/${this.props.player[0].id}`}
                          >
                            Steam
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://rgl.gg//public/PlayerProfile.aspx?p=${this.props.player[0].id}`}
                          >
                            RGL.gg
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://www.ugcleague.com/players_page.cfm?player_id=${this.props.player[0].id}`}
                          >
                            UGC
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`http://etf2l.org/search/${this.props.player[0].id}`}
                          >
                            ETF2L
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://ozfortress.com/users?q=${this.props.player[0].id}`}
                          >
                            OZFortress
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://logs.tf/profile/${this.props.player[0].id}`}
                          >
                            Logs.tf
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://demos.tf/profiles/${this.props.player[0].id}`}
                          >
                            Demos.tf
                          </a>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <h4 className="dropdown">
                      External Links <DownOutlined />
                    </h4>
                  </Dropdown>
                </div>
                <div className="player-tables">
                  <Tabs defaultActiveKey="1" type="card" size="large">
                    <TabPane tab="Teams" key="1">
                      {this.props.player[0] && (
                        <Table
                          columns={[
                            {
                              title: "Name",
                              dataIndex: "name",
                              key: "name",
                              render: (text, record) => (
                                <>
                                  {record.active ? (
                                    <a href={`/#/team/${record.team_id}`}>
                                      {text}
                                    </a>
                                  ) : (
                                    <span className="strike">
                                      <a href={`/#/team/${record.team_id}`}>
                                        {text}
                                      </a>
                                    </span>
                                  )}
                                </>
                              ),
                            },
                            {
                              title: "Gamemode",
                              dataIndex: "title",
                              key: "title",
                            },
                            {
                              title: "Class",
                              dataIndex: "class_name",
                              key: "class_name",
                            },
                            {
                              title: "",
                              key: "is_leader",
                              dataIndex: "is_leader",
                              render: (leader, record) => (
                                <span>
                                  {leader && (
                                    <Tag
                                      color={"orange"}
                                      key={`${record.user_id}_LEADER`}
                                    >
                                      LEADER
                                    </Tag>
                                  )}
                                  {record.main ? (
                                    <Tag
                                      color={"blue"}
                                      key={`${record.user_id}_MAIN`}
                                    >
                                      MAIN
                                    </Tag>
                                  ) : (
                                    <Tag
                                      color={"cyan"}
                                      key={`${record.user_id}_SUB`}
                                    >
                                      SUB
                                    </Tag>
                                  )}
                                </span>
                              ),
                            },
                          ]}
                          dataSource={this.props.team}
                          rowKey={(record) => record.team_id}
                        />
                      )}
                    </TabPane>
                    <TabPane tab="Match Stats" key="2">
                      {matchLogs[0] ? (
                        <PlayerStats log={matchLogs} />
                      ) : (
                        <h2>This Player has no match data</h2>
                      )}
                    </TabPane>
                    <TabPane tab="Scrim Stats" key="3">
                      {scrimLogs[0] ? (
                        <PlayerStats log={scrimLogs} />
                      ) : (
                        <h2>This Player has no scrim data</h2>
                      )}
                    </TabPane>
                    <TabPane tab="All Stats" key="4">
                      {this.props.log[0] ? (
                        <PlayerStats log={this.props.log} />
                      ) : (
                        <h2>This Player has no game data</h2>
                      )}
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            ) : (
              <p>User not found</p>
            )}
          </div>
        );
    }
}

const mapStateToProps = ({ player, team, stats, log }) => ({ player, team, stats, log });

export default connect(mapStateToProps)(PlayerPage);
