import React, { Component } from 'react';
import { Modal, Button, Input, Select, Row, Col, Alert } from 'antd';

import './NewTeamButton.css'


const { Option } = Select;

class NewTeamButton extends Component {
    state = { 
        visible: false,
        warningVisible: false,
        teamName: '',
        gamemode: 1
     };

    showModal = () => {
        this.setState({
            visible: true,
            warningVisible: false,
        });
    };

    handleOk = () => {
        if (this.state.teamName !== '') {
            this.setState({
                visible: false,
            });
            console.log(this.state)
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

    handleGamemodeChange = (value) => {
        console.log(value);
        this.setState({
            gamemode: value
        })
    }

    handleNameChange = (event) => {
        console.log(event.target.value);
        this.setState({
            teamName: event.target.value
        })
    }

    render() { 
        return ( 
            <div>
                <Button type="primary" onClick={this.showModal}>
                    New Team
                </Button>
                <Modal
                    title="New Team"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText='Create Team'
                >
                    {this.state.warningVisible && <Alert message="Team Name is required" type="error"  style={{marginBottom: "25px"}}/>}
                    <Row style={{ marginBottom: "15px" }}>
                        <Col span={6}><h4 className="label" style={{ marginTop: "5px" }} >Team Name</h4></Col>
                        <Col span={1}><h4 style={{ marginTop: "5px" , textAlign: "center"}} >:</h4></Col>
                        <Col span={17}>
                            <Input placeholder="Team Name" onChange={this.handleNameChange} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}><h4 className="label" style={{ marginTop: "5px" }} >Gamemode: </h4></Col>
                        <Col span={1}><h4 style={{ marginTop: "5px", textAlign: "center" }} >:</h4></Col>
                        <Col span={17}>
                            <Select defaultValue={1} style={{ width: "100%" }} onChange={this.handleGamemodeChange}>
                                <Option value={1}>Highlander</Option>
                                <Option value={2}>Prolander</Option>
                                <Option value={3}>Sixes</Option>
                                <Option value={4}>No Restriction 6s</Option>
                                <Option value={5}>Fours</Option>
                                <Option value={6}>Ultitrio</Option>
                                <Option value={7}>Ultiduo</Option>
                            </Select>
                        </Col>
                    </Row>
                </Modal>
            </div>
         );
    }
}
 
export default NewTeamButton;