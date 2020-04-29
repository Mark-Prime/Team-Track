import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import './TeamPage.css'


// Ant Design
import { Row, Col } from 'antd';

class PlayerPage extends Component {

    componentDidMount() {
        console.log('ID:', this.props.match.params.id);
        this.props.dispatch({ type: 'FETCH_TEAM', payload: this.props.match.params.id })

    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3} className="player-info">
                        {this.props.team[0] ?
                            <>
                                <h1 id="welcome">
                                    {this.props.team[0].name}
                                </h1>
                                <p>Team ID: {this.props.team[0].id}</p>
                            </> :
                            <p>User not found</p>
                        }
                    </Col>
                    <Col span={19}>
                        {/* Soon to be graphs */}
                    </Col>
                    <Col span={1}></Col>
                </Row>
                
            </div>
        );
    }
}

const mapStateToProps = ({ team }) => ({ team });

export default connect(mapStateToProps)(PlayerPage);
