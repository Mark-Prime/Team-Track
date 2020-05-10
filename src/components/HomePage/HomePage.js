import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import './HomePage.css'

// Components
import NewTeamButton from '../NewTeamButton/NewTeamButton'


// Ant Design
import { Row, Col, Table, Avatar, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';


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
                                render: (text, record) => <a href={`/#/team/${record.trueid}`}>{text}</a>
                            },
                            {
                                title: 'Gamemode',
                                dataIndex: 'title',
                                key: 'title'
                            },
                            {
                                title: 'Active',
                                dataIndex: 'active',
                                key: 'active',
                                render: text => <>
                                    {text ? 
                                        <CheckCircleOutlined className="active" style={{ fontSize: '30px' }} /> : 
                                        <CloseCircleOutlined className="inactive" style={{ fontSize: '30px' }} />
                                    } 
                                </>
                            }
                        ]} dataSource={this.props.team} />
                        {this.props.user[0] &&
                            <NewTeamButton />}
                        </> :
                        <div className="spin" ><Spin size="large" /></div> }
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                    {this.props.player[0] ?
                    <Table columns={[
                        {
                            title: 'Name',
                            dataIndex: 'displayname',
                            key: 'displayname',
                            render: (text, record) => <a href={`/#/player/${record.id}`}><Avatar className="avatar" shape="square" src={record.avatar} />   {text}</a>
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
                        <div className="spin" ><Spin size="large" /></div> }
                </Col>
                <Col span={1}></Col>
            </Row>
         );
    }
}
 
const mapStateToProps = ({ player, team, user }) => ({ player, team, user });

export default connect(mapStateToProps)(HomePage);