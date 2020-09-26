import React, { Component } from "react";

// CSS
import "./PlayerBarSplit.css";

class PlayerBarSplit extends Component {
    state = {
        total: 0,
    };

    componentDidMount = () => {
    }

    componentDidUpdate = () => {
        if (!this.state.data) {
            if (this.props.data) {
                let total = 0;
                for (const item of this.props.data) {
                    total += item[this.props.datakey];
                }
                this.setState({
                    total,
                    data: this.props.data
                })
            }
        }
    }
  render() {
    return (
      <>
        <h2 className="graph-title">{this.props.title} Spread</h2>
        <div className="bar">
          {this.state.data && this.state.data.map((item) => {
            let percent = item[this.props.datakey] / this.state.total;
            return (
              <div
                className={`bar__item ${this.props.red && "bar__item--red"}`}
                style={{
                  width: `${percent * 100}%`,
                  backgroundColor: `rgba(${
                    this.props.red ? "250, 84, 28" : "24, 144, 255"
                  }, ${percent + percent + 0.2})`,
                }}
              >
                <div
                  className={`bar__fill ${this.props.red && "bar__fill--red"}`}
                >
                  <div className="bar__label">
                    {item.class_name} {this.props.datakey}:{" "}
                    {item[this.props.datakey]}
                  </div>
                  <div className="bar__percentage">
                    {(percent * 100).toFixed(2)}% of the total{" "}
                    {this.props.datakey}
                  </div>
                  <div className="hover-prevent"> </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default PlayerBarSplit;
