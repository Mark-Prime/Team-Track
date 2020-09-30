import React, { Component } from "react";
import { Slider } from "antd";

// CSS
import "./PlayerBarSplit.css";

class PlayerBarSplit extends Component {
  state = {
    total: 0,
    slider: 100, 
  };

  componentDidMount = () => {};

  componentDidUpdate = () => {
    if (!this.state.data) {
      if (this.props.data) {
        let total = 0;
        let cutoff = []
        for (let index = 0; index < this.props.data.length; index++) {
          const item = this.props.data[index];
          total += item[this.props.datakey];
          cutoff.push(total)
        }
        this.setState({
          lowerCutoff: 0,
          upperCutoff: total,
          total,
          cutoff,
          data: this.props.data,
        });
      }
    }
  };

  onChange = (value) => {

    let lowerCutoff = (value[0]/100) * this.state.total;
    let upperCutoff = (value[1]/100) * this.state.total;

    this.setState({
      lowerCutoff,
      upperCutoff,
      slider: value[1] - value[0]
    })
  };

  render() {
    return (
      <>
        <h2 className="graph-title">{this.props.title} Spread</h2>
        <div className="bar">
          {this.state.data &&
            this.state.data.map((item, index, array) => {
              let value = item[this.props.datakey];
              let percent = value / this.state.total;

              // console.log({
              //   index,
              //   cutoff: this.state.cutoff[index],
              //   upperlimit: this.state.upperCutoff,
              // });
              if (this.state.cutoff[index] < this.state.lowerCutoff) {
                return null;
              } else if (this.state.cutoff[index - 1] < this.state.lowerCutoff) {
                  value = this.state.cutoff[index] - this.state.lowerCutoff
              } else {
                if (this.state.cutoff[index - 1] > this.state.upperCutoff) {
                  return null;
                } 
                else if (this.state.cutoff[index] > this.state.upperCutoff) {
                  value =
                    this.state.upperCutoff -
                    this.state.cutoff[index - 1];
                } else {
                  if (index === 0) {
                    value =
                      (this.state.cutoff[index] - this.state.lowerCutoff)
                  }
                }
              }

              let width =
                value / (this.state.upperCutoff - this.state.lowerCutoff);

              // if (this.state.cutoff[index] < this.state.lowerCutoff) {
              //   return null;
              // } else if (this.state.cutoff[index - 1]) {
              //   if (this.state.cutoff[index - 1] < this.state.lowerCutoff) {
              //     width =
              //       (this.state.cutoff[index] - this.state.lowerCutoff) / (this.state.upperCutoff - this.state.lowerCutoff);
              //   }
              // } else {
              //   width =
              //     (value - this.state.lowerCutoff) /
              //     (this.state.upperCutoff - this.state.lowerCutoff);
              // }

              // if (this.state.cutoff[index] - value > this.state.upperCutoff) {
              //   return null;
              // } else if (this.state.cutoff[index + 1]) {
              //   if (this.state.cutoff[index + 1] > this.state.lowerCutoff) {
              //     console.log(
              //       this.state.upperCutoff - (this.state.cutoff[index] - value)
              //     );
              //     width =
              //       (this.state.upperCutoff -
              //         (this.state.cutoff[index] - value)) /
              //       (this.state.upperCutoff - this.state.lowerCutoff);
              //   }
              // } else {
              //   width =
              //     (this.state.upperCutoff -
              //     (this.state.cutoff[index] - value)) /
              //       (this.state.upperCutoff - this.state.lowerCutoff);
              // }

              if (width > 100) {
                width = 100;
              } else if (width < 0) {
                return null;
              }

              return (
                <div
                  className={`bar__item ${this.props.red && "bar__item--red"}`}
                  style={{
                    width: `${width * 100}%`,
                    backgroundColor: `rgba(${
                      this.props.red ? "250, 84, 28" : "24, 144, 255"
                    }, ${percent + percent + 0.2})`,
                  }}
                >
                  <div
                    className={`bar__fill ${
                      this.props.red && "bar__fill--red"
                    }`}
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
        <Slider
          range
          defaultValue={[0, 100]}
          onChange={this.onChange}
          onAfterChange={this.onAfterChange}
        />
      </>
    );
  }
}

export default PlayerBarSplit;
