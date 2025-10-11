
import React, { useState, useCallback, useRef } from 'react';
import Sidebar from './Sidebar';

const EDGE_IMPULSE_API_KEY = 'ei_238fae...'; // This should be securely stored, but for now it's here as requested.
const EDGE_IMPULSE_INGESTION_API = 'https://ingestion.edgeimpulse.com/api/training/files';

const IngestionPage: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [label, setLabel] = useState('');
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }, []);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onDrop(Array.from(e.dataTransfer.files));
        }
    };
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onDrop(Array.from(e.target.files));
            // Reset file input to allow selecting the same file again
            e.target.value = '';
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const removeFile = (fileName: string) => {
        setFiles(files.filter(file => file.name !== fileName));
    };

    const handleUpload = async () => {
        if (files.length === 0 || !label.trim()) {
            setStatus('error');
            setStatusMessage('Please select files and provide a label.');
            return;
        }

        setStatus('uploading');
        setStatusMessage('Uploading files...');

        const formData = new FormData();
        files.forEach(file => {
            formData.append('data', file);
        });

        try {
            const response = await fetch(EDGE_IMPULSE_INGESTION_API, {
                method: 'POST',
                headers: {
                    'x-api-key': EDGE_IMPULSE_API_KEY,
                    'x-label': label,
                },
                body: formData,
            });

            if (response.ok) {
                setStatus('success');
                setStatusMessage('Files uploaded successfully!');
                setFiles([]);
            } else {
                const errorText = await response.text();
                setStatus('error');
                setStatusMessage(`Upload failed: ${errorText || response.statusText}`);
            }
        } catch (error) {
            setStatus('error');
            setStatusMessage(`An error occurred: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    return (
        <div className="flex min-h-screen bg-background-dark">
            <Sidebar />
            <div className="flex-1 bg-background-darker/50">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-surface-accent px-10 py-3">
                    <h1 className="text-white text-lg font-bold">Data Ingestion</h1>
                    <div className="flex items-center gap-3">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-L3B8Q4Z2iFhq3U9TIcZcorNrIeIoN6x71tmWbZjmEvpXpdlYWOV2gqONYBig7NXwgw-o1cQBhNPWZ1M_Kae228Zfni7pYC4CsrpRAyiiTIf121kdnW1rqv7snNRGMwUd7l-305dNqK_7WSFtCR8NyMBUyP33BKbUwEIZ6nc_1qX58wRjlpx_-SAltx1LLGd64ncUel2q56vmFHkK0aaa02uykkz_Jun4YhFtgrjCPgQX5qxbaVjmO4oD_mJNUPFrQXSO1UUfWlbJ")` }}></div>
                        <div>
                            <h1 className="text-white text-base font-medium">Dr. Evelyn Reed</h1>
                            <p className="text-text-secondary text-sm">Environmental Scientist</p>
                        </div>
                    </div>
                </header>
                <main className="p-10">
                    <div className="max-w-4xl mx-auto flex flex-col gap-6">
                        <div className="p-6 bg-surface rounded-xl flex flex-col gap-4">
                             <h2 className="text-white text-xl font-bold">Upload to Edge Impulse</h2>
                             <p className="text-text-secondary">Upload your sensor data files directly to your Edge Impulse project for training and analysis.</p>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="label" className="text-text-primary text-sm font-medium">Data Label</label>
                                <input
                                    id="label"
                                    type="text"
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                    placeholder="e.g., car, background_noise, plant_healthy"
                                    className="form-input w-full rounded-lg border-surface-accent bg-background-dark text-text-primary placeholder-text-secondary focus:border-primary focus:ring-primary"
                                />
                            </div>

                            <div 
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={openFileDialog}
                                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-surface-accent hover:border-primary/50'}`}
                            >
                                <input 
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                <span className="material-symbols-outlined text-primary text-4xl mb-4">cloud_upload</span>
                                <p className="text-text-primary">Drag & drop files here, or click to select files</p>
                                <p className="text-text-secondary text-sm">Supported formats: PNG, JPG, WAV, CBOR, JSON, etc.</p>
                            </div>
                        </div>

                        {files.length > 0 && (
                            <div className="p-6 bg-surface rounded-xl flex flex-col gap-4">
                                <h3 className="text-white text-lg font-medium">Selected Files ({files.length})</h3>
                                <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                    {files.map((file, index) => (
                                        <li key={`${file.name}-${index}`} className="flex items-center justify-between bg-background-dark p-3 rounded-lg">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                 <span className="material-symbols-outlined text-text-secondary">description</span>
                                                 <p className="text-text-primary text-sm truncate" title={file.name}>{file.name}</p>
                                            </div>
                                            <button onClick={() => removeFile(file.name)} className="text-negative hover:opacity-80 transition-opacity flex-shrink-0">
                                                 <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        <div className="flex items-center gap-4 mt-2">
                             <button
                                onClick={handleUpload}
                                disabled={status === 'uploading' || files.length === 0 || !label.trim()}
                                className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-primary text-background-dark text-base font-bold transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'uploading' ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Uploading...
                                    </>
                                ) : 'Upload Files'}
                            </button>
                            {status !== 'idle' && status !== 'uploading' && (
                                <p className={`text-sm ${status === 'success' ? 'text-positive' : 'text-negative'}`}>
                                    {statusMessage}
                                </p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default IngestionPage;
