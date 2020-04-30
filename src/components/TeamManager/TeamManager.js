import React, { Component } from 'react';
import { connect } from 'react-redux';

// Ant Design
import { Input, Row, Col, Table, Avatar, Button, Select, Popconfirm } from 'antd';

const { Option } = Select;

class TeamManager extends Component {
    state = { 
        newName: this.props.team[0].name
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

    changeMemberState = (value, target, id) => {
        this.setState({
            [id]: {
                ...this.state[id],
                [target]: value
            }
        })
    }

    saveName = () => {
        this.props.dispatch({ type: 'SAVE_TEAM_NAME', payload: { newName: this.state.newName, id: this.props.team[0].id } })
        this.props.refreshInformation()
    }

    promoteMember = (id) => {
        
    }

    removeMember = (id) => {

    }

    render() { 
        return ( 
            <>
                <Row>
                    <Col span={7}></Col>
                    <Col span={10}><Input value={this.state.newName} onChange={this.changeState} /></Col><Button type="primary" onClick={this.saveName}>SAVE</Button>
                    <Col span={7}></Col>
                </Row>
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
                                dataIndex: 'class_name',
                                key: 'class_name'
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
                                                    onConfirm={() => this.removeMember(record.user_id)}
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
                {JSON.stringify(this.state)}
            </>
         );
    }
}
 

const mapStateToProps = ({ team, member, user }) => ({ team, member, user });


export default connect(mapStateToProps)(TeamManager);