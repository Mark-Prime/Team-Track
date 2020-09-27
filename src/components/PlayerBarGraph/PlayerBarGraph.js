import React, { Component } from 'react';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

class PlayerBarGraph extends Component {
    state = {}

    componentDidUpdate = () => {
        if (!this.state.total1) {
            if (this.props.data) {
                let total1 = 0;
                let total2 = 0;
                for (let item of this.props.data) {
                    total1 += item[this.props.datakey1];
                    total2 += item[this.props.datakey2];
                }
                this.setState({total1, total2})
            }
        }
    }

    render() {
        return (
          <>
            <h2 className="graph-title">
              {this.props.title1}/{this.props.title2} Spread
            </h2>
            <ResponsiveContainer height={350} width="100%">
              <BarChart
                data={this.props.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 50,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="class_name"
                  domain={[0, (dataMax) => Math.ceil(dataMax * 1.1)]}
                />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => (
                    <div className="tooltip">
                      <p className="label">{label}</p>
                      <p className="intro blue">
                        {this.props.title1}:{" "}
                        {active && payload[0].payload[this.props.datakey1]} (
                        {active &&
                          (
                            (payload[0].payload[this.props.datakey1] /
                              this.state.total1) *
                            100
                          ).toFixed(2)}
                        % of total)
                      </p>
                      <p className="intro red">
                        {this.props.title2}:{" "}
                        {active && payload[0].payload[this.props.datakey2]} (
                        {active &&
                          (
                            (payload[0].payload[this.props.datakey2] /
                              this.state.total2) *
                            100
                          ).toFixed(2)}
                        % of total)
                      </p>
                    </div>
                  )}
                />
                <Bar
                  dataKey={this.props.datakey1}
                  fill="#1890ff"
                  name={this.props.title1}
                />
                <Bar
                  dataKey={this.props.datakey2}
                  fill="#fa541c"
                  name={this.props.title2}
                />

                <Legend verticalAlign={'top'} />
              </BarChart>
            </ResponsiveContainer>
          </>
        );
    }
}

export default PlayerBarGraph;