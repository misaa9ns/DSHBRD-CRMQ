import React from 'react';
import { Upload, BarChart2, PieChart, Activity, Layers } from 'lucide-react';

const ChartControl = ({ onFileUpload, chartType, setChartType }) => {
    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto mb-8">
            {/* File Upload Area */}
            <div className="relative group">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={onFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="flex items-center justify-center w-full p-8 border-2 border-dashed border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-all duration-300">
                    <div className="text-center">
                        <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                        <p className="text-lg font-medium text-white">Drag & drop your Excel file here</p>
                        <p className="text-sm text-gray-400 mt-1">or click to browse</p>
                    </div>
                </div>
            </div>

            {/* Chart Type Selector */}
            <div className="flex justify-center gap-4 bg-white/5 p-2 rounded-xl backdrop-blur-md border border-white/10">
                <button
                    onClick={() => setChartType('bar')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${chartType === 'bar' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <BarChart2 size={20} />
                    <span className="font-medium">Bar</span>
                </button>
                <button
                    onClick={() => setChartType('line')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${chartType === 'line' ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <Activity size={20} />
                    <span className="font-medium">Line</span>
                </button>
                <button
                    onClick={() => setChartType('area')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${chartType === 'area' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <Layers size={20} />
                    <span className="font-medium">Area</span>
                </button>
                <button
                    onClick={() => setChartType('pie')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${chartType === 'pie' ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <PieChart size={20} />
                    <span className="font-medium">Pie</span>
                </button>
            </div>
        </div>
    );
};

export default ChartControl;
