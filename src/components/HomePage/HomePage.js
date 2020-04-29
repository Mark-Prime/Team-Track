import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import './HomePage.css'


// Ant Design
import { Row, Col, Table, Avatar } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';


class HomePage extends Component {
    
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PLAYERS' })
        this.props.dispatch({ type: 'FETCH_TEAMS' })
    }

    render() { 
        return ( 
            <Row>
                <Col span={1}></Col>
                <Col span={10}>
                    <Table columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                            render: (text, record) => <a href={`/#/team/${record.id}`}>{text}</a>
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
                                    <CheckCircleOutlined className="active" /> : 
                                    <CloseCircleOutlined className="inactive" />
                                } 
                            </>
                        }
                    ]} dataSource={this.props.team} />
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <Table columns={[
                        {
                            title: '',
                            dataIndex: 'avatar',
                            key: 'avatar',
                            render: text => <Avatar className="avatar" shape="square" src={text} />
                        },
                        {
                            title: 'Name',
                            dataIndex: 'displayname',
                            key: 'displayname',
                            render: (text, record) => <a href={`/#/player/${record.id}`}>{text}</a>
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
                    ]} dataSource={this.props.player} />
                </Col>
                <Col span={1}></Col>
                {/* <Avatar className="avatar" shape="square" size={16} src={user.avatar} /> */}
            </Row>
         );
    }
}
 

// [
// {
//     title: 'Name',
//         dataIndex: 'name',
//             key: 'name',
//                 render: text => <a>{text}</a>,
//   },
// {
//     title: 'Age',
//         dataIndex: 'age',
//             key: 'age',
//   },
// {
//     title: 'Address',
//         dataIndex: 'address',
//             key: 'address',
//   },
// {
//     title: 'Tags',
//         key: 'tags',
//             dataIndex: 'tags',
//                 render: tags => (
//                     <span>
//                         {tags.map(tag => {
//                             let color = tag.length > 5 ? 'geekblue' : 'green';
//                             if (tag === 'loser') {
//                                 color = 'volcano';
//                             }
//                             return (
//                                 <Tag color={color} key={tag}>
//                                     {tag.toUpperCase()}
//                                 </Tag>
//                             );
//                         })}
//                     </span>
//                 ),
//   },
// {
//     title: 'Action',
//         key: 'action',
//             render: (text, record) => (
//                 <span>
//                     <a style={{ marginRight: 16 }}>Invite {record.name}</a>
//                     <a>Delete</a>
//                 </span>
//             ),
//   },
// ];
const mapStateToProps = ({ player, team }) => ({ player, team });

export default connect(mapStateToProps)(HomePage);