import React from 'react';
import {
    BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ChartDisplay = ({ data, chartType, xAxisKey, dataKey }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-xl h-[400px]">
                <p className="text-gray-400 text-lg">No data available. Please upload a specific file or check the connection.</p>
            </div>
        );
    }

    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                        <XAxis dataKey={xAxisKey} stroke="#CBD5E0" />
                        <YAxis stroke="#CBD5E0" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Bar dataKey={dataKey} fill="#8884d8" radius={[4, 4, 0, 0]} animationDuration={1500} />
                    </BarChart>
                );
            case 'line':
                return (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                        <XAxis dataKey={xAxisKey} stroke="#CBD5E0" />
                        <YAxis stroke="#CBD5E0" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey={dataKey} stroke="#82ca9d" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} animationDuration={1500} />
                    </LineChart>
                );
            case 'area':
                return (
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey={xAxisKey} stroke="#CBD5E0" />
                        <YAxis stroke="#CBD5E0" />
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" animationDuration={1500} />
                    </AreaChart>
                );
            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey={dataKey}
                            nameKey={xAxisKey}
                            animationDuration={1500}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                    </PieChart>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-[500px] bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10">
            <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
            </ResponsiveContainer>
        </div>
    );
};

export default ChartDisplay;
