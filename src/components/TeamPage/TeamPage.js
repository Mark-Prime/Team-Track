import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import './TeamPage.css'


// Ant Design
import { Row, Col, Tabs } from 'antd';
const { TabPane } = Tabs;

class PlayerPage extends Component {
    state = {
        isLeader: false
    }

    componentDidMount() {
        console.log('ID:', this.props.match.params.id);
        this.props.dispatch({ type: 'FETCH_TEAM', payload: this.props.match.params.id })

    }

    render() {
        return (
            <div>
                {this.props.team[0] ?
                    <>
                        <Row>
                            <Col span={24}>
                                <h1 id="welcome" className="team-name">
                                {this.props.team[0].name}
                                </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={20}>
                                <Tabs defaultActiveKey="1" type="card" size="large">
                                    <TabPane tab="Players" key="1">
                                        PLAYER TABLE
                                    </TabPane>
                                    <TabPane tab="Stats" key="2">
                                        STATS
                                    </TabPane>
                                    {this.state.isLeader &&
                                        <TabPane tab="Manage" key="3">
                                            MANAGEMENT TOOLS
                                        </TabPane>
                                    }
                                    
                                </Tabs>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </> :
                    <p>User not found</p>
                }
                
                
            </div>
        );
    }
}

const mapStateToProps = ({ team, user }) => ({ team, user });

export default connect(mapStateToProps)(PlayerPage);
