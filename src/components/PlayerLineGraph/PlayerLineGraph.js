import React, { Component } from 'react';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

class PlayerLineGraph extends Component {

    render() {
        return (
            <>
                <h2 className="graph-title">{this.props.title1}/{this.props.title2}</h2>
                <ResponsiveContainer height={300} width='100%'>
                    <LineChart
                        data={this.props.data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 60,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(tickItem) => new Date(tickItem * 1000).toDateString()} />
                        <YAxis scale='linear' domain={[0, dataMax => (Math.ceil(dataMax * 1.2))]} />
                        <Tooltip content={({ active, payload, label }) =>
                            <div className="tooltip">
                                <p className="label">{new Date(label * 1000).toDateString()}</p>
                                <p className="intro blue">{this.props.title1}: {payload[0] && <>{this.props.displaykey1 ? 
                                    <>{payload[0] && payload[0].payload[this.props.displaykey1]} ({Math.round((payload[0].payload[this.props.displaykey1] / (payload[0].payload.length / 60)) * 100) / 100}/min)</> : 
                                    <>{payload[0] && Math.round(payload[0].payload[this.props.datakey1] * 100) / 100}</>}</>}</p> 
                                <p className="intro red">{this.props.title2}: {payload[0] && <>{this.props.displaykey2 ? 
                                    <>{payload[0] && payload[0].payload[this.props.displaykey2]} ({Math.round((payload[0].payload[this.props.displaykey2] / (payload[0].payload.length / 60)) * 100) / 100}/min)</> :
                                    <>{payload[0] && Math.round(payload[0].payload[this.props.datakey2] * 100) / 100}</>}</>}</p>
                            </div>} />
                        <Legend />
                        <Line type="monotone" dataKey={this.props.datakey1} stroke="#1890ff" name={this.props.lineName1 || this.props.title1} />
                        <Line type="monotone" dataKey={this.props.datakey2} stroke="#fa541c" name={this.props.lineName2 || this.props.title2} />
                    </LineChart>
                </ResponsiveContainer>
            </>
        );
    }
}

export default PlayerLineGraph;