import React, { Component } from 'react';
import { connect } from 'react-redux';

// Ant Design
import { Input, Row, Col, Table, Avatar, Button, Select, Popconfirm, Divider } from 'antd';

const { Search } = Input;


const { Option } = Select;

class TeamManager extends Component {
    state = { 
        newName: this.props.team[0].name,
        newTag: this.props.team[0].tag
    }

    componentDidMount() {
        this.setMemberInformation()
    }

    setMemberInformation = () => {
        for (const index of this.props.member) {
            this.setState({
                [index.user_id]: {
                    is_leader: index.is_leader,
                    main: index.main,
                    class: index.class,
                }
            })
        }
    }

    changeState = (event) => {
        this.setState({
            newName: event.target.value
        })
    }

    changeTagState = (event) => {
        this.setState({
            newTag: event.target.value
        })
    }

    changeMemberState = (value, target, id) => {
        this.setState({
            [id]: {
                ...this.state[id],
                [target]: value
            }
        })
        if (target === 'class') {
            this.props.dispatch({ type: 'SET_MEMBER_CLASS', payload: { value, id, target: this.props.team[0].id } });
        } else if (target === 'main') {
            this.props.dispatch({ type: 'SET_MEMBER_MAIN', payload: { value, id, target: this.props.team[0].id } });
        }
    }

    promoteMember = (id, is_user) => {
        this.props.dispatch({ type: 'PROMOTE_TO_LEADER', payload: { id, team: this.props.team[0].id } });
        if (is_user) {
            this.props.resetLeadership()
        }
    }

    removeMember = (id) => {
        this.props.dispatch({ type: 'REMOVE_MEMBER', payload: { id, team: this.props.team[0].id } });
    }

    render() { 
        return ( 
            <>
                <Row>
                    <Col span={1}></Col>
                    <Col span={10}>
                        <Search
                            value={this.state.newName}
                            enterButton="Save Name"
                            size="large"
                            onChange={event => this.changeState(event)}
                            onSearch={value => this.props.saveName(value)}
                        />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10}>
                        <Search
                            value={this.state.newTag}
                            enterButton="Save Tag"
                            size="large"
                            onChange={event => this.changeTagState(event)}
                            onSearch={value => this.props.saveTag(value)}
                        />
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <Divider orientation="center">Members</Divider>
                <Row>
                    <Col span={24}>
                        <Table columns={[
                            {
                                title: 'Name',
                                dataIndex: 'displayname',
                                key: 'displayname',
                                render: (text, record) => <a href={`/#/player/${record.user_id}`}><Avatar className="avatar" shape="square" src={record.avatar} />   {text}</a>
                            },
                            {
                                title: 'Class',
                                dataIndex: 'class',
                                key: 'class',
                                render: (text, record) => <>
                                        <Select defaultValue={text} dropdownMatchSelectWidth={false} onChange={(value) => this.changeMemberState(value, 'class', record.user_id)}>
                                            <Option value={1}>Scout</Option>
                                            <Option value={2}>Soldier</Option>
                                            <Option value={3}>Pyro</Option>
                                            <Option value={4}>Demoman</Option>
                                            <Option value={5}>Heavy</Option>
                                            <Option value={6}>Engineer</Option>
                                            <Option value={7}>Medic</Option>
                                            <Option value={8}>Sniper</Option>
                                            <Option value={9}>Spy</Option>
                                        </Select>
                                    </>
                            },
                            {
                                title: 'Role',
                                dataIndex: 'main',
                                key: 'main',
                                render: (text, record) => <>
                                        <Select defaultValue={text} onChange={(value) => this.changeMemberState(value, 'main', record.user_id)}>
                                            <Option value={true}>Main</Option>
                                            <Option value={false}>Sub</Option>
                                        </Select>
                                    </>
                            },
                            {
                                title: '',
                                dataIndex: 'is_leader',
                                key: 'is_leader',
                                render: (text, record) => <>{text ? 'LEADER' : 
                                    <Popconfirm
                                        title={`Promote ${record.displayname} to leader?`}
                                        onConfirm={() => this.promoteMember(record.user_id)}
                                        onCancel={console.log('nope')}
                                        okText="Yes, Promote"
                                        cancelText="No"
                                    >
                                        <Button type="primary">PROMOTE</Button>
                                    </Popconfirm>
                                }</>
                            },
                            {
                                title: 'Remove',
                                dataIndex: 'is_leader',
                                key: 'is_leader',
                                render: (text, record) => { 
                                    if (record.user_id === this.props.user[0].id){
                                        return (<Popconfirm
                                                title={`Leave ${this.props.team[0].name}?`}
                                                    onConfirm={() => this.removeMember(record.user_id, true)}
                                                    onCancel={console.log('nope')}
                                                    okText="Yes, Leave"
                                                    cancelText="No"
                                                >
                                                    <Button type="primary" danger>LEAVE</Button>
                                                </Popconfirm>)
                                    }
                                    return (<> {text || <Popconfirm
                                                            title={`Remove ${record.displayname} from ${this.props.team[0].name}?`}
                                                            onConfirm={() => this.removeMember(record.user_id)}
                                                            onCancel={console.log('nope')}
                                                            okText="Yes, Remove"
                                                            cancelText="No"
                                                        >
                                                            <Button type="primary" danger>REMOVE</Button>
                                                        </Popconfirm>}
                                                    </>)
                                }
                            }
                        ]} dataSource={this.props.member} />
                    </Col>
                </Row>
            </>
         );
    }
}
 

const mapStateToProps = ({ team, member, user }) => ({ team, member, user });


export default connect(mapStateToProps)(TeamManager);