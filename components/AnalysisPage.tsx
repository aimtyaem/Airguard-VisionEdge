
import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import Sidebar from './Sidebar';

const chartData = [
  { name: 'Week 1', value: 109 }, { name: 'Week 2', value: 21 },
  { name: 'Week 3', value: 93 }, { name: 'Week 4', value: 45 },
];

const AnalysisPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('AI Inference');
    const tabs = ['AI Inference', 'Time Series', 'Correlations', 'Ground Data'];

    return (
        <div className="flex min-h-screen bg-background-dark">
            <Sidebar />
            <div className="flex-1 bg-background-darker/50">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-surface-accent px-10 py-3">
                    <h1 className="text-white text-lg font-bold">Analysis Panel</h1>
                    <div className="flex items-center gap-4">
                        <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold hover:bg-primary/80 transition-colors">
                            Open in Colab
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-L3B8Q4Z2iFhq3U9TIcZcorNrIeIoN6x71tmWbZjmEvpXpdlYWOV2gqONYBig7NXwgw-o1cQBhNPWZ1M_Kae228Zfni7pYC4CsrpRAyiiTIf121kdnW1rqv7snNRGMwUd7l-305dNqK_7WSFtCR8NyMBUyP33BKbUwEIZ6nc_1qX58wRjlpx_-SAltx1LLGd64ncUel2q56vmFHkK0aaa02uykkz_Jun4YhFtgrjCPgQX5qxbaVjmO4oD_mJNUPFrQXSO1UUfWlbJ")` }}></div>
                            <div>
                                <h1 className="text-white text-base font-medium">Dr. Evelyn Reed</h1>
                                <p className="text-text-secondary text-sm">Environmental Scientist</p>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="p-10">
                    <div className="flex flex-col gap-6">
                        <div className="border-b border-surface-accent">
                            <div className="flex gap-8">
                                {tabs.map(tab => (
                                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 pt-4 text-sm font-bold tracking-[0.015em] transition-colors border-b-[3px] ${activeTab === tab ? 'border-primary text-white' : 'border-transparent text-text-secondary hover:border-primary/50 hover:text-white'}`}>
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <button className="flex h-8 items-center justify-center gap-x-2 rounded-lg bg-surface-accent px-4 hover:bg-surface-accent/70 transition-colors">
                                <p className="text-white text-sm font-medium">Date Range</p>
                                <span className="material-symbols-outlined text-white text-base">expand_more</span>
                            </button>
                            <button className="flex h-8 items-center justify-center gap-x-2 rounded-lg bg-surface-accent px-4 hover:bg-surface-accent/70 transition-colors">
                                <p className="text-white text-sm font-medium">Location</p>
                                <span className="material-symbols-outlined text-white text-base">expand_more</span>
                            </button>
                            <button className="flex h-8 items-center justify-center gap-x-2 rounded-lg bg-surface-accent px-4 hover:bg-surface-accent/70 transition-colors">
                                <p className="text-white text-sm font-medium">Gas Type</p>
                                <span className="material-symbols-outlined text-white text-base">expand_more</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 flex flex-col gap-4 p-6 bg-surface rounded-xl">
                                <p className="text-white text-base font-medium">AI Inference Analysis - Anomaly Hotspots</p>
                                <img alt="Map showing anomaly hotspots" className="w-full h-[400px] object-cover rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0uYqAhgUj1VlP2T0JvUQZqsRBPI17CSUJQtI4sc5PngAFXGr4CC9biIoEmKoe7aljwNPqWSZFRFdcTNpBcCjdc67IBOBwr5pVJyhSBuDTsunj_D10UKQCmrSaS0ElpJYZ0sE0yF9x0EzUe6Rhfv06C2vebMwDJ-HyPdFIjwKy9kOWjM6mAdY9MyrESGagkE-SPDNt1mGNHQXY1fiabm_HmltP9jeLBEY_gCkfeMkkeR9xDOqQqMPbm5pLn8DerEY7cy1t9a8Fsf7a" />
                            </div>
                            <div className="flex flex-col gap-4 p-6 bg-surface rounded-xl">
                                <div className="flex flex-col gap-2">
                                    <p className="text-white text-base font-medium">CO2 Concentration</p>
                                    <p className="text-primary text-3xl font-bold">450 ppm</p>
                                    <div className="flex gap-1">
                                        <p className="text-text-secondary text-base">Last 30 Days</p>
                                        <p className="text-positive text-base font-medium">+5%</p>
                                    </div>
                                </div>
                                <div className="h-48 mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                            <defs>
                                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#13ecb6" stopOpacity={0.4}/>
                                                    <stop offset="95%" stopColor="#13ecb6" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" stroke="#9db9b2" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ backgroundColor: '#111816', border: '1px solid #13ecb6' }} />
                                            <Area type="monotone" dataKey="value" stroke="#13ecb6" strokeWidth={3} fill="url(#chartGradient)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AnalysisPage;
