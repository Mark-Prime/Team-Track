import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import './HomePage.css'

// Components
import NewTeamButton from '../NewTeamButton/NewTeamButton'


// Ant Design
import { Table, Avatar, Space, Tooltip, Input } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons';

const { Search } = Input;

class HomePage extends Component {
    
    componentDidMount() {
        this.props.dispatch({ type: 'UNSET_TEAMS' })
        this.props.dispatch({ type: 'UNSET_PLAYERS' })

        this.props.dispatch({ type: 'FETCH_TEAMS' })
        this.props.dispatch({ type: 'FETCH_PLAYERS' })
    }

    onSearch = (value) => {
      this.props.dispatch({ type: "UNSET_TEAMS" });
      this.props.dispatch({ type: "UNSET_PLAYERS" });
      if (value === ''){
        this.props.dispatch({ type: "FETCH_TEAMS" });
        this.props.dispatch({ type: "FETCH_PLAYERS" });
      } else {
        this.props.dispatch({ type: "SEARCH_TEAMS", payload: value });
        this.props.dispatch({ type: "SEARCH_PLAYERS", payload: value });
      }
    }

    render() { 
        return (
          <>
            <div className="search-container">
              <Search
                placeholder="Search Teams and Players"
                onSearch={(value) => this.onSearch(value)}
                enterButton
              />
            </div>
            <div className="homepage-container">
              <div className="homepage-table">
                {this.props.team[0] !== "None" ? (
                  <>
                    <Table
                      columns={[
                        {
                          title: "Name",
                          dataIndex: "name",
                          key: "name",
                          render: (text, record) => (
                            <a href={`/#/team/${record.trueid}`}>
                              <Space size="small">
                                {text}
                                {record.active ? (
                                  <Tooltip title="Active">
                                    <CheckCircleOutlined className="active check" />
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="Inactive">
                                    <CloseCircleOutlined className="inactive check" />
                                  </Tooltip>
                                )}{" "}
                              </Space>
                            </a>
                          ),
                        },
                        {
                          title: "Gamemode",
                          dataIndex: "title",
                          key: "title",
                        },
                      ]}
                      dataSource={this.props.team}
                      rowKey={(record) => record.trueid}
                    />
                    {this.props.user[0] && (
                      <div className="desktop-team-button">
                        <NewTeamButton />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="loader">
                    <img
                      src={require("../../images/TeamTracker_Logo.svg")}
                      alt="Loading"
                    />
                  </div>
                )}
              </div>
              <div className="homepage-table">
                {this.props.player[0] !== "None" ? (
                  <Table
                    columns={[
                      {
                        title: "Name",
                        dataIndex: "displayname",
                        key: "displayname",
                        render: (text, record) => (
                          <a href={`/#/player/${record.id}`}>
                            <Space size="small">
                              <Avatar
                                className="avatar"
                                shape="square"
                                src={record.avatar}
                              />
                              {record.donator ? (
                                <div className="donatorName">{text}</div>
                              ) : (
                                <>{text}</>
                              )}
                              {record.verified && (
                                <Tooltip title="Verified!">
                                  <CheckCircleTwoTone />
                                </Tooltip>
                              )}
                            </Space>
                          </a>
                        ),
                      },
                      {
                        title: "SteamID64",
                        dataIndex: "id",
                        key: "id",
                      },
                    ]}
                    dataSource={this.props.player}
                    rowKey={(record) => record.id}
                  />
                ) : (
                  <div className="loader">
                    <img
                      src={require("../../images/TeamTracker_Logo.svg")}
                      alt="Loading"
                    />
                  </div>
                )}
              </div>
            </div>
            {this.props.user[0] && (
              <div className="mobile-team-button">
                <NewTeamButton />
              </div>
            )}
          </>
        );
    }
}
 
const mapStateToProps = ({ player, team, user }) => ({ player, team, user });

export default connect(mapStateToProps)(HomePage);