import React, { Component } from "react";
import axios from "axios";
import { Chart } from "chart.js";

export default class ChartBox extends Component {
  state = {
    data: [],
    chart: "",
  };

  componentDidMount = async () => {
    try {
      const downloadedData = await axios.get(
        "http://api.coindesk.com/v1/bpi/historical/close.json"
      );
      this.setState({ data: downloadedData.data.bpi });
      this.renderGraphic();
      console.log(this.state.data);
    } catch (err) {
      console.error(err);
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.chart !== this.state.chart) {
      this.renderGraphic();
    }
  };

  renderGraphic = () => {
    let ctx = document.getElementById("myChart");
    let myChart = new Chart (ctx, {
      type: "bar",
      data: {
        labels: [1, 2, 3],
        datasets: [
          {
            label: "Transactions in the period",
            data: [1, 2, 3],
            backgroundColor: "#5EBA7D",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    this.setState({ chart: myChart });
  };

  render() {
    console.log(this.state.chart);
    return (
      <canvas
        id="myChart"
        style={{ width: "400px", backgroundColor: "black" }}
      ></canvas>
    );
  }
}