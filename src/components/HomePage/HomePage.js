import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import './HomePage.css'

// Components
import NewTeamButton from '../NewTeamButton/NewTeamButton'


// Ant Design
import { Row, Col, Table, Avatar, Spin, Space, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons';


class HomePage extends Component {
    
    componentDidMount() {
        this.props.dispatch({ type: 'UNSET_TEAMS' })
        this.props.dispatch({ type: 'UNSET_PLAYERS' })

        this.props.dispatch({ type: 'FETCH_TEAMS' })
        this.props.dispatch({ type: 'FETCH_PLAYERS' })
    }

    render() { 
        return ( 
            <Row>
                <Col span={1}></Col>
                <Col span={10}>
                    {this.props.team[0] ? 
                    <>
                        <Table columns={[
                            {
                                title: 'Name',
                                dataIndex: 'name',
                                key: 'name',
                                render: (text, record) => <a href={`/#/team/${record.trueid}`}>
                                    <Space size="small">
                                        {text}
                                    {record.active ?
                                        <Tooltip title="Active"><CheckCircleOutlined className="active check" /></Tooltip> :
                                        <Tooltip title="Inactive"><CloseCircleOutlined className="inactive check" /></Tooltip>
                                    } </Space></a>
                            },
                            {
                                title: 'Gamemode',
                                dataIndex: 'title',
                                key: 'title'
                            }
                        ]} dataSource={this.props.team} />
                        {this.props.user[0] &&
                            <NewTeamButton />}
                        </> :
                        <div class="loader">
                            <img src={require('../../images/TeamTracker_Logo.svg')} />
                        </div>  }
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                    {this.props.player[0] ?
                    <Table columns={[
                        {
                            title: 'Name',
                            dataIndex: 'displayname',
                            key: 'displayname',
                            render: (text, record) => <a href={`/#/player/${record.id}`}>
                                <Space size="small">
                                    <Avatar className="avatar" shape="square" src={record.avatar} />
                                    {text}
                                    {record.verified &&
                                        <Tooltip title="Verified!">
                                            <CheckCircleTwoTone />
                                        </Tooltip>}
                                </Space></a>
                        },
                        {
                            title: 'SteamID64',
                            dataIndex: 'id',
                            key: 'id'
                        },
                        {
                            title: 'SteamID3',
                            dataIndex: 'steamid3',
                            key: 'steamid3'
                        }
                        ]} dataSource={this.props.player} /> :
                        <div class="loader">
                            <img src={require('../../images/TeamTracker_Logo.svg')} />
                        </div>  }
                </Col>
                <Col span={1}></Col>
            </Row>
         );
    }
}
 
const mapStateToProps = ({ player, team, user }) => ({ player, team, user });

export default connect(mapStateToProps)(HomePage);