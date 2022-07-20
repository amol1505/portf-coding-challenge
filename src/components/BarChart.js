import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import "./BarChart.css";

function BarChart({ beerData }) {
  return (
    <div className="barChart">
      <ResponsiveBar
        data={beerData}
        keys={["sum"]}
        indexBy="first_brewed"
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.4}
        valueScale={{ type: "linear" }}
        colors="#3182CE"
        animate={true}
        enableLabel={false}
        axisTop={null}
        axisBottom={{}}
        axisRight={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Total number brewed",
          legendPosition: "middle",
          legendOffset: -40,
        }}
      />
    </div>
  );
}

export default BarChart;
