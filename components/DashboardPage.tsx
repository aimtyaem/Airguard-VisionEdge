
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VisionEdgeLogoIcon } from './icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const chartData = [
  { name: 'Jan', value: 109 }, { name: 'Feb', value: 21 }, { name: 'Mar', value: 41 },
  { name: 'Apr', value: 93 }, { name: 'May', value: 33 }, { name: 'Jun', value: 101 },
  { name: 'Jul', value: 61 }, { name: 'Aug', value: 45 }, { name: 'Sep', value: 121 },
  { name: 'Oct', value: 149 }, { name: 'Nov', value: 81 }, { name: 'Dec', value: 129 },
];

const anomalyData = [
    { location: 'Amazon Rainforest, Brazil', timestamp: '2023-10-27 10:00', value: '495 ppm', confidence: '98%' },
    { location: 'Siberian Tundra, Russia', timestamp: '2023-10-27 10:05', value: '510 ppm', confidence: '96%' },
    { location: 'Industrial Zone, China', timestamp: '2023-10-27 10:10', value: '550 ppm', confidence: '99%' },
    { location: 'Oil Sands, Canada', timestamp: '2023-10-27 10:15', value: '480 ppm', confidence: '95%' },
];

type GasType = 'GHG' | 'NO₂' | 'Temperature';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [activeGas, setActiveGas] = useState<GasType>('GHG');

    const toggleDetails = () => setIsDetailsVisible(!isDetailsVisible);

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-darker text-text-primary">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-surface-accent px-10 py-3">
                <div className="flex items-center gap-4 text-white cursor-pointer" onClick={() => navigate('/analysis')}>
                    <VisionEdgeLogoIcon className="size-6 text-primary" />
                    <h2 className="text-white text-xl font-bold">VisionEdge</h2>
                </div>
                <div className="flex items-center gap-4">
                    <select className="form-select bg-surface/80 border border-primary/50 text-text-primary rounded-lg focus:ring-primary focus:border-primary">
                        <option>Region</option>
                    </select>
                    <select className="form-select bg-surface/80 border border-primary/50 text-text-primary rounded-lg focus:ring-primary focus:border-primary">
                        <option>Model</option>
                    </select>
                    <select className="form-select bg-surface/80 border border-primary/50 text-text-primary rounded-lg focus:ring-primary focus:border-primary">
                        <option>Timeframe</option>
                    </select>
                </div>
            </header>

            <main className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-10">
                <div className="bg-cover bg-center flex min-h-[420px] flex-1 flex-col justify-between rounded-lg" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAEkBQc3bVnQn5F-FN99S6IlFgkcOgG-Z0RqBjNNpgSQN-12V6zpT00nxdkEHsd5hx492qaRljJi_c0x6JD6haA7_mcTI3kniPkk2fhkybBFtOYoucXBWEGYCwzTQzLUzG5r2tZZ3gL9qBhtSmNdig8guVgau8Un3geIdCMiyCsdxTK3sAE-pdXPhDrYjIrIxOpy4-J_oSrcz15ZC9XRI5tncpZVupOp6zY5x-QvpSw7DMeiydzbZY9WDM4rQr_3F3xZpMwXkHS_-h')` }}>
                     <div className="flex h-full w-full flex-col justify-between p-4 bg-black/50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 rounded-lg bg-surface-accent/50 p-1">
                                {(['GHG', 'NO₂', 'Temperature'] as GasType[]).map((gas) => (
                                    <button key={gas} onClick={() => setActiveGas(gas)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeGas === gas ? 'bg-surface text-white' : 'bg-transparent text-white hover:bg-surface/50'}`}>{gas}</button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-end justify-end">
                            <div className="flex flex-col gap-px rounded-lg overflow-hidden">
                                <button className="flex size-10 items-center justify-center bg-surface-accent/80 hover:bg-surface-accent">
                                    <span className="material-symbols-outlined text-white">add</span>
                                </button>
                                <button className="flex size-10 items-center justify-center bg-surface-accent/80 hover:bg-surface-accent">
                                    <span className="material-symbols-outlined text-white">remove</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 lg:p-10">
                 <div className={`bg-surface/80 backdrop-blur-sm border border-primary/30 rounded-xl shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isDetailsVisible ? 'max-h-screen' : 'max-h-48'}`}>
                    <div className="flex items-center justify-between p-4 cursor-pointer" onClick={toggleDetails}>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            <div className="flex min-w-[158px] flex-1 flex-col gap-1">
                                <p className="text-text-primary text-sm font-medium">Emission Index</p>
                                <p className="text-white text-2xl font-bold">482.5</p>
                                <p className="text-positive text-sm font-medium">+2.1%</p>
                            </div>
                            <div className="flex min-w-[158px] flex-1 flex-col gap-1">
                                <p className="text-text-primary text-sm font-medium">Confidence Level</p>
                                <p className="text-white text-2xl font-bold">97.3%</p>
                                <p className="text-positive text-sm font-medium">+0.5%</p>
                            </div>
                            <div className="flex min-w-[158px] flex-1 flex-col gap-1">
                                <p className="text-text-primary text-sm font-medium">Anomaly Count</p>
                                <p className="text-white text-2xl font-bold">14</p>
                                <p className="text-negative text-sm font-medium">-3</p>
                            </div>
                        </div>
                        <button className="text-white">
                            <span className="material-symbols-outlined transform transition-transform duration-300">{isDetailsVisible ? 'expand_more' : 'expand_less'}</span>
                        </button>
                    </div>

                    <div className={`transition-all duration-300 ${isDetailsVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="border-t border-primary/30 p-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2 p-4 bg-background-dark/50 rounded-lg">
                                    <p className="text-white text-base font-medium">Metric Trends Over Time</p>
                                    <p className="text-white text-3xl font-bold">482.5</p>
                                    <div className="flex gap-1">
                                        <p className="text-text-secondary text-base">Last 30 Days</p>
                                        <p className="text-positive text-base font-medium">+2.1%</p>
                                    </div>
                                    <div className="h-48 mt-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.5}/>
                                                        <stop offset="95%" stopColor="#39FF14" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="name" stroke="#9db9b2" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#9db9b2" fontSize={12} tickLine={false} axisLine={false} />
                                                <Tooltip contentStyle={{ backgroundColor: '#1A2C27', border: '1px solid #13ecb6' }} />
                                                <Area type="monotone" dataKey="value" stroke="#13ecb6" strokeWidth={2} fill="url(#colorUv)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto rounded-lg border border-surface-accent bg-background-darker">
                                        <table className="min-w-full">
                                            <thead className="bg-surface">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-white text-sm font-medium">Location</th>
                                                    <th className="px-4 py-3 text-left text-white text-sm font-medium">Timestamp</th>
                                                    <th className="px-4 py-3 text-left text-white text-sm font-medium">GHG Value</th>
                                                    <th className="px-4 py-3 text-left text-white text-sm font-medium">Confidence</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-surface-accent">
                                                {anomalyData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-4 py-3 text-text-secondary text-sm">{item.location}</td>
                                                        <td className="px-4 py-3 text-text-secondary text-sm">{item.timestamp}</td>
                                                        <td className="px-4 py-3 text-text-secondary text-sm">{item.value}</td>
                                                        <td className="px-4 py-3 text-text-secondary text-sm">{item.confidence}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
