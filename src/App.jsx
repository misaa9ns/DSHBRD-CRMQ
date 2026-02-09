import { useState, useEffect } from 'react';
import ChartDisplay from './components/ChartDisplay';
import ChartControl from './components/ChartControl';
import { parseExcelFile, fetchDefaultExcel } from './utils/excelParser';
import { LayoutDashboard } from 'lucide-react';

function App() {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [loading, setLoading] = useState(true);

  // Load default data on mount
  useEffect(() => {
    const loadDefaultData = async () => {
      try {
        const jsonData = await fetchDefaultExcel('/data.xlsx');
        if (jsonData && jsonData.length > 0) {
          setData(jsonData);
        }
      } catch (error) {
        console.error("Failed to load default data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDefaultData();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const jsonData = await parseExcelFile(file);
        setData(jsonData);
      } catch (error) {
        console.error("Error parsing file:", error);
        alert("Error parsing Excel file. Please ensure it's a valid .xlsx file.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Determine keys for charts dynamically (assuming first key is Category/X-axis and second is Value/Y-axis)
  // This is a basic heuristic. In a real app, we might want a column selector.
  const getKeys = () => {
    if (data.length === 0) return { xAxisKey: '', dataKey: '' };
    const keys = Object.keys(data[0]);
    return { xAxisKey: keys[0], dataKey: keys[1] };
  };

  const { xAxisKey, dataKey } = getKeys();

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
              <LayoutDashboard className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Nexus Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              GitHub Integration Active
            </a>
          </div>
        </header>

        <main className="space-y-8">
          <section className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Visualize Your Data <br />
              <span className="text-blue-500">Instantly</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Upload your Excel file or use the default dataset to generate stunning, interactive visualizations in seconds.
            </p>
          </section>

          <ChartControl
            onFileUpload={handleFileUpload}
            chartType={chartType}
            setChartType={setChartType}
          />

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ChartDisplay
              data={data}
              chartType={chartType}
              xAxisKey={xAxisKey}
              dataKey={dataKey}
            />
          )}

          {data.length > 0 && (
            <div className="mt-8 text-center text-sm text-gray-500">
              Showing data for <span className="text-white font-medium">{data.length}</span> records.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
