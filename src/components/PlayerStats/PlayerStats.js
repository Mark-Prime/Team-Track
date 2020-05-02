import React, { Component } from 'react';
import { connect } from 'react-redux';

// Ant Design
import { Row, Col, Statistic } from 'antd';

class PlayerStats extends Component {
    state = {  }
    render() { 
        return ( 
            <>
                <Row>
                    <Col span={3}>
                        <Statistic title="Favorite Class" value={this.props.stats.favorite_class} />
                    </Col>
                    <Col span={3}>
                        <Statistic title="Teams" value={this.props.stats.team_count} />
                    </Col>
                </Row>
                {JSON.stringify(this.props.stats)}
            </>
         );
    }
}

const mapStateToProps = ({ player, team, stats }) => ({ player, team, stats });
 
export default connect(mapStateToProps)(PlayerStats);