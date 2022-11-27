import React from "react";
import "./Analytics.scss";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Analytics = ({ analytics }) => {
  console.log([{ name: "Countries", ...analytics.countries }]);
  return (
    <div className="analytics">
      <div className="heading">Analytics</div>{" "}
      <div className="options">
        <div className="option">
          <div className="label">
            Total Visits : <span>{analytics.total_visits}</span>
          </div>
        </div>
        <div className="option">
          <div className="label">Country Analytics</div>
          <div style={{ height: "50vh" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={[{ name: "Countries", ...analytics.countries }]}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                {/* <Tooltip /> */}
                <Legend />
                {Object.keys(analytics.countries).map((k, i) => (
                  <Bar
                    dataKey={k}
                    fill={`#${Math.round(Math.random() * 1000)}`}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
