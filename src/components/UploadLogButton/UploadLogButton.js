import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Select, Row, Col, Alert } from 'antd';
import { withRouter } from 'react-router-dom'

import './UploadLogButton.css'


const { Option } = Select;

class UploadLogButton extends Component {
    state = { 
        visible: false,
        warningVisible: false,
        teamColor: 'red',
        match: true,
        URL: ''
     };

    showModal = () => {
        this.setState({
            visible: true,
            warningVisible: false,
        });
    };

    handleOk = () => {
        if (this.state.teamName !== '') {
            this.props.dispatch({ type: 'UPLOAD_LOG', payload: { 
                    teamID: this.props.team[0].id,
                    teamColor: this.state.teamColor, 
                    match: this.state.match,
                    URL: this.state.URL.replace('.tf/', '.tf/json/')
                } 
            })
            this.setState({
                visible: false,
                URL: ''
            });
        } else {
            this.setState({
                warningVisible: true,
            });
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleMatchChange = (value) => {
        this.setState({
            match: value
        })
    }

    handleTeamChange = (value) => {
        this.setState({
            teamColor: value
        })
    }

    handleUrlChange = (event) => {
        this.setState({
            URL: event.target.value
        })
    }

    render() { 
        return ( 
            <div>
                <Button type="primary" style={{float: "right"}} onClick={this.showModal}>
                    Upload Log
                </Button>
                <Modal
                    title="Upload Log"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText='Upload'
                >
                    {this.state.warningVisible && <Alert message="Logs.tf URL is required" type="error" style={{ marginBottom: "25px" }} />}
                    <Row style={{ marginBottom: "15px" }}>
                        <Col span={6}><h4 className="label" style={{ marginTop: "5px" }} >Logs.tf URL</h4></Col>
                        <Col span={1}><h4 style={{ marginTop: "5px", textAlign: "center" }} >:</h4></Col>
                        <Col span={17}>
                            <Input placeholder="logs.tf" value={this.state.URL} onChange={this.handleUrlChange} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "15px" }}>
                        <Col span={6}><h4 className="label" style={{ marginTop: "5px" }} >Log Type</h4></Col>
                        <Col span={1}><h4 style={{ marginTop: "5px", textAlign: "center" }} >:</h4></Col>
                        <Col span={17}>
                            <Select defaultValue={true} value={this.state.match} style={{ width: "100%" }} onChange={this.handleMatchChange}>
                                <Option value={true}>Match</Option>
                                <Option value={false}>Scrim</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}><h4 className="label" style={{ marginTop: "5px" }} >Team</h4></Col>
                        <Col span={1}><h4 style={{ marginTop: "5px", textAlign: "center" }} >:</h4></Col>
                        <Col span={17}>
                            <Select defaultValue={'red'} value={this.state.teamColor} style={{ width: "100%" }} onChange={this.handleTeamChange}>
                                <Option value={'red'}>Red</Option>
                                <Option value={'blu'}>Blu</Option>
                            </Select>
                        </Col>
                    </Row>
                </Modal>
            </div>
         );
    }
}

const mapStateToProps = ({ user, team }) => ({ user, team });

export default withRouter(connect(mapStateToProps)(UploadLogButton));