
import React, { useState, useRef, useEffect } from 'react';
import { VisionEdgeIcon } from './icons';
import { Message } from '../types';

interface CopilotWidgetProps {
    isOpen: boolean;
    onClose: () => void;
}

const CopilotWidget: React.FC<CopilotWidgetProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'copilot', text: "Welcome! How can I help you analyze environmental data today? Try asking: 'Explain today's emission spike in Cairo region.'" },
        { sender: 'user', text: "Explain today’s emission spike in Cairo region." },
        { sender: 'copilot', text: "The emission spike in the Cairo region today is primarily attributed to a significant increase in industrial activity, combined with specific meteorological conditions that trapped pollutants. Further analysis suggests a 40% increase in NOx emissions from the industrial sector compared to the daily average." }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isOpen]);
    
    if (!isOpen) {
        return null;
    }

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setMessages([...messages, { sender: 'user', text: inputValue.trim() }]);
            setInputValue('');
            // Here you would typically call an API and get a response
        }
    };


    return (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-end justify-end" onClick={onClose}>
            <div className="fixed bottom-8 right-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="flex flex-col rounded-xl bg-copilot-widget shadow-2xl animate-fade-in-up">
                    <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <VisionEdgeIcon className="text-copilot-primary text-2xl" />
                            <h2 className="text-lg font-medium text-copilot-text-primary">Ask VisionEdge Copilot</h2>
                        </div>
                        <button onClick={onClose} className="text-copilot-text-secondary hover:text-copilot-text-primary">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </header>
                    <div ref={chatContainerRef} className="flex-1 space-y-6 overflow-y-auto p-6" style={{ maxHeight: '50vh' }}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'copilot' && (
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-copilot-primary/20">
                                        <span className="material-symbols-outlined text-copilot-primary text-xl">auto_awesome</span>
                                    </div>
                                )}
                                <div className={`flex flex-col gap-1 ${msg.sender === 'user' ? 'items-end' : ''}`}>
                                    <p className="text-sm text-copilot-text-secondary">{msg.sender === 'user' ? 'You' : 'VisionEdge Copilot'}</p>
                                    <div className={`rounded-lg px-4 py-3 ${msg.sender === 'user' ? 'rounded-br-none bg-copilot-primary text-copilot-background' : 'rounded-bl-none bg-zinc-800 text-copilot-text-primary'}`}>
                                        <p className="text-base font-normal leading-normal">{msg.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-white/10 px-6 py-4">
                        <form onSubmit={handleSendMessage} className="relative">
                            <input
                                className="form-input w-full rounded-lg border-none bg-zinc-800 py-3 pl-4 pr-12 text-base text-copilot-text-primary placeholder-copilot-text-secondary focus:outline-none focus:ring-2 focus:ring-copilot-primary/50"
                                placeholder="Ask about environmental trends..."
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button type="submit" className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-copilot-text-secondary hover:text-copilot-primary">
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
             <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default CopilotWidget;
