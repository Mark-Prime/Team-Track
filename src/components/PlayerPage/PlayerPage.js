import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import './PlayerPage.css'

// Components
import PlayerStats from '../PlayerStats/PlayerStats'


// Ant Design
import { Row, Col, Avatar, Menu, Dropdown, Table, Tabs, Tag, Space, Tooltip } from 'antd';
import { DownOutlined, CheckCircleTwoTone } from '@ant-design/icons';
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
        this.props.dispatch({ type: 'UNSET_TEAMS' })
        this.props.dispatch({ type: 'UNSET_PLAYERS' })
        this.props.dispatch({ type: 'FETCH_PLAYER', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_USER_TEAMS', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_PLAYER_STATS', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'UNSET_LOGS' })
        this.props.dispatch({ type: 'FETCH_PLAYER_LOGS', payload: this.props.match.params.id })
    }

    logTags = (gamecount) => {
        console.log(gamecount)
        if (5 <= gamecount && gamecount < 10) { 
            return <Tag color={"orange"} key={gamecount}>5+ Logs</Tag> 
        } else if (10 <= gamecount && gamecount < 25){
            return <Tag color={"orange"} key={gamecount}>10+ Logs</Tag>
        } else if (25 <= gamecount && gamecount < 50){
            return <Tag color={"volcano"} key={gamecount}>25+ Logs</Tag>
        } else if (50 <= gamecount && gamecount < 100){
            return <Tag color={"volcano"} key={gamecount}>50+ Logs</Tag>
        } else if (100 <= gamecount && gamecount < 250){
            return <Tag color={"magenta"} key={gamecount}>100+ Logs</Tag>
        } else if (250 <= gamecount && gamecount < 500){
            return <Tag color={"magenta"} key={gamecount}>250+ Logs</Tag>
        } else if (500 <= gamecount && gamecount < 1000){
            return <Tag color={"purple"} key={gamecount}>500+ Logs</Tag>
        } else if (1000 <= gamecount && gamecount < 2500){
            return <Tag color={"purple"} key={gamecount}>1000+ Logs</Tag>
        } else if (2500 <= gamecount && gamecount < 5000){
            return <Tag color={"gold"} key={gamecount}>2500+ Logs</Tag>
        } else {
            return <></>
        }
        
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={4} className="player-info">
                        {this.props.player[0] ?
                            <>
                                <Avatar shape="square" size={128} src={this.props.player[0].avatar} />
                                <h1 id="welcome">
                                    
                                    <Space>
                                        {this.props.player[0].displayname}
                                        {this.props.player[0].verified && 
                                            <Tooltip title="Verified!">
                                                <CheckCircleTwoTone />
                                            </Tooltip>}
                                    </Space>
                                </h1>
                                {this.props.stats.leader_mode &&
                                    <Tag color={"orange"} key={`LEADER`}>
                                        TEAM LEADER
                                    </Tag>
                                }
                                {this.props.stats.main_mode &&
                                    <Tag color={"blue"} key={`MAIN`}>
                                        OFTEN MAINS
                                    </Tag>
                                }
                                {this.props.log[0] && this.logTags(this.props.log.length)}

                                <p>Player ID: {this.props.player[0].id}</p>

                                <Dropdown overlay={<Menu>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://steamcommunity.com/profiles/${this.props.player[0].id}`}>
                                            Steam
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://rgl.gg//public/PlayerProfile.aspx?p=${this.props.player[0].id}`}>
                                            RGL.gg
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://www.ugcleague.com/players_page.cfm?player_id=${this.props.player[0].id}`}>
                                            UGC
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`http://etf2l.org/search/${this.props.player[0].id}`}>
                                            ETF2L
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://ozfortress.com/users?q=${this.props.player[0].id}`}>
                                            OZFortress
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://logs.tf/profile/${this.props.player[0].id}`}>
                                            Logs.tf
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://demos.tf/profiles/${this.props.player[0].id}`}>
                                            Demos.tf
                                        </a>
                                    </Menu.Item>
                                </Menu>}>
                                    <h4 className="dropdown">
                                        External Links <DownOutlined />
                                    </h4>
                                </Dropdown>
                            </> :

                            <p>User not found</p>
                        }
                    </Col>
                    <Col span={1}></Col>
                    <Col span={17}>
                        <Tabs defaultActiveKey="1" type="card" size="large">
                            <TabPane tab="Teams" key="1">
                                {this.props.player[0] &&
                                    <Table columns={[
                                        {
                                            title: 'Name',
                                            dataIndex: 'name',
                                            key: 'name',
                                            render: (text, record) => <>
                                                {record.active ?
                                                    <a href={`/#/team/${record.team_id}`}>{text}</a> :
                                                    <span className="strike">
                                                        <a href={`/#/team/${record.team_id}`}>{text}</a>
                                                    </span>
                                                }

                                            </>
                                        },
                                        {
                                            title: 'Gamemode',
                                            dataIndex: 'title',
                                            key: 'title'
                                        },
                                        {
                                            title: 'Class',
                                            dataIndex: 'class_name',
                                            key: 'class_name'
                                        },
                                        {
                                            title: '',
                                            key: 'is_leader',
                                            dataIndex: 'is_leader',
                                            render: (leader, record) => (
                                                <span>
                                                    {leader &&
                                                        <Tag color={"orange"} key={`${record.user_id}_LEADER`}>
                                                            LEADER
                                                        </Tag>
                                                    }
                                                    {record.main ?
                                                        <Tag color={"blue"} key={`${record.user_id}_MAIN`}>
                                                            MAIN
                                                        </Tag> :
                                                        <Tag color={"cyan"} key={`${record.user_id}_SUB`}>
                                                            SUB
                                                        </Tag>
                                                    }
                                                </span>
                                            ),
                                        }
                                    ]} dataSource={this.props.team} />
                                }
                            </TabPane>
                            <TabPane tab="Stats" key="2">
                                {this.props.log[0] ? 
                                <PlayerStats /> :
                                <h2>This Player has no Game Data</h2>}
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                
            </div>
        );
    }
}

const mapStateToProps = ({ player, team, stats, log }) => ({ player, team, stats, log });

export default connect(mapStateToProps)(PlayerPage);
