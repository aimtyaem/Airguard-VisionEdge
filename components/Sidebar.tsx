
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Co2AILogoIcon } from './icons';

interface NavItemProps {
    to: string;
    icon: string;
    label: string;
    isFilled?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isFilled }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <NavLink to={to} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-surface-accent' : 'hover:bg-surface-accent'}`}>
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: (isActive && isFilled) ? `'FILL' 1` : `'FILL' 0` }}>{icon}</span>
            <p className="text-white text-sm font-medium">{label}</p>
        </NavLink>
    );
};


const Sidebar: React.FC = () => {
    return (
        <div className="flex-shrink-0 w-64 bg-background-dark p-4 border-r border-surface-accent">
            <div className="flex h-full min-h-[700px] flex-col justify-between">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3 pl-3">
                        <Co2AILogoIcon className="size-8" />
                        <h2 className="text-white text-xl font-bold">CO2-AI</h2>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <NavItem to="/dashboard" icon="dashboard" label="Dashboard" />
                        <NavItem to="/analysis" icon="pie_chart" label="Analysis" isFilled={true} />
                        <NavItem to="/ingestion" icon="upload" label="Ingestion" />
                        <NavItem to="/reports" icon="folder" label="Reports" />
                        <NavItem to="/settings" icon="settings" label="Settings" />
                    </nav>
                </div>
                <div className="flex flex-col gap-1">
                    <NavItem to="/help" icon="help" label="Help" />
                    <NavItem to="/login" icon="logout" label="Logout" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
