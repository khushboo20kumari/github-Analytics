import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReposChart = ({ repos }) => {
  // Transforming the data for the chart
  const chartData = repos.map((repo) => ({
    name: repo.name,
    stars: repo.stargazers_count,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="stars" fill="#8884d8" name="Stars" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReposChart;
