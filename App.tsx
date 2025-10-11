
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import AnalysisPage from './components/AnalysisPage';
import IngestionPage from './components/IngestionPage';
import CopilotWidget from './components/CopilotWidget';
import { VisionEdgeIcon } from './components/icons';

function App() {
    const [isCopilotOpen, setIsCopilotOpen] = useState(false);

    return (
        <HashRouter>
            <div className="bg-background-dark text-text-primary min-h-screen">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/analysis" element={<AnalysisPage />} />
                    <Route path="/ingestion" element={<IngestionPage />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>

                <div className="fixed bottom-8 left-8">
                     <button onClick={() => setIsCopilotOpen(true)} className="flex items-center gap-2 group">
                        <VisionEdgeIcon className="text-copilot-text-secondary text-2xl group-hover:text-copilot-primary transition-colors" />
                        <span className="text-lg font-semibold text-copilot-text-secondary group-hover:text-copilot-primary transition-colors">VisionEdge</span>
                    </button>
                </div>
               
                <CopilotWidget isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
            </div>
        </HashRouter>
    );
}

export default App;
