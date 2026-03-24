'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

const ADMIN_STORAGE_KEY = 'razvan-admin';
const PASSWORD_STORAGE_KEY = 'razvan-report-password';

export default function ReportIssue() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [resultMessage, setResultMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      setIsAdmin(true);
      const url = new URL(window.location.href);
      url.searchParams.delete('admin');
      window.history.replaceState({}, '', url.toString());
    } else if (localStorage.getItem(ADMIN_STORAGE_KEY) === 'true') {
      setIsAdmin(true);
    }

    const savedPassword = localStorage.getItem(PASSWORD_STORAGE_KEY);
    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const addImages = useCallback((files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result;
        if (typeof dataUrl === 'string') {
          setImages((prev) => [...prev, dataUrl]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const imageFiles: File[] = [];
      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) imageFiles.push(file);
        }
      }
      if (imageFiles.length > 0) {
        e.preventDefault();
        addImages(imageFiles);
      }
    },
    [addImages]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        addImages(e.dataTransfer.files);
      }
    },
    [addImages]
  );

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !password.trim()) return;

    setStatus('submitting');

    try {
      const response = await fetch('/api/report-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          page: window.location.pathname,
          images,
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(PASSWORD_STORAGE_KEY, password.trim());
        setStatus('success');
        setResultMessage(`Issue ${data.identifier} created successfully!`);
        setTitle('');
        setDescription('');
        setImages([]);
      } else {
        setStatus('error');
        setResultMessage(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setResultMessage('Failed to connect to the server');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStatus('idle');
    setResultMessage('');
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      {/* Floating button */}
      <button
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full border-none bg-primary text-white text-xl cursor-pointer z-[9999] flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-[transform,box-shadow] duration-200 hover:scale-110 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        onClick={() => setIsOpen(true)}
        title="Report an issue"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </button>

      {isOpen && (
        /* Overlay */
        <div
          className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center"
          onClick={handleClose}
        >
          {/* Dialog */}
          <div
            className="bg-background text-text border border-gray-300 rounded-xl p-6 w-[90%] max-w-[480px] animate-fade-in shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
            onPaste={handlePaste}
          >
            <h3 className="m-0 mb-4 text-lg font-semibold">Report an Issue</h3>

            {status === 'success' && (
              <p className="text-text-block-border-success text-sm m-0 mb-4">{resultMessage}</p>
            )}

            {status === 'error' && (
              <p className="text-red text-sm m-0 mb-4">{resultMessage}</p>
            )}

            {status !== 'success' && (
              <>
                <label htmlFor="report-title" className="block text-[13px] font-medium mb-1.5 text-gray-700">
                  Title
                </label>
                <input
                  id="report-title"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-text text-sm font-[inherit] mb-3 box-border focus:outline-none focus:border-primary"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief summary of the issue"
                />

                <label htmlFor="report-description" className="block text-[13px] font-medium mb-1.5 text-gray-700">
                  Description
                </label>
                <textarea
                  id="report-description"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-text text-sm font-[inherit] mb-4 min-h-[120px] resize-y box-border focus:outline-none focus:border-primary"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you see and what you expected..."
                />

                <label htmlFor="report-password" className="block text-[13px] font-medium mb-1.5 text-gray-700">
                  Password
                </label>
                <input
                  id="report-password"
                  type="password"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-text text-sm font-[inherit] mb-3 box-border focus:outline-none focus:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                />

                {/* Attachments */}
                <div className="mb-4">
                  <label className="block text-[13px] font-medium mb-1.5 text-gray-700">Screenshots</label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-[border-color,background] duration-200 text-[13px] text-gray-700 hover:border-primary ${
                      isDragging
                        ? 'border-primary bg-[color:var(--color-primary)]/[0.07]'
                        : 'border-gray-300 bg-gray-100'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    {isDragging
                      ? 'Drop images here'
                      : 'Click to upload or drag & drop images (you can also paste with Ctrl+V)'}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) addImages(e.target.files);
                      e.target.value = '';
                    }}
                  />
                  {images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {images.map((src, i) => (
                        <div key={i} className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-300">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt={`Attachment ${i + 1}`} className="w-full h-full object-cover" />
                          <button
                            className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full border-none bg-black/60 text-white text-xs cursor-pointer flex items-center justify-center leading-none hover:bg-black/80"
                            onClick={() =>
                              setImages((prev) => prev.filter((_, j) => j !== i))
                            }
                            title="Remove"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Button row */}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 bg-transparent text-text text-sm font-[inherit] cursor-pointer transition-opacity duration-200 hover:opacity-85"
                onClick={handleClose}
              >
                {status === 'success' ? 'Close' : 'Cancel'}
              </button>
              {status !== 'success' && (
                <button
                  className="px-4 py-2 rounded-lg border border-primary bg-primary text-white text-sm font-[inherit] cursor-pointer transition-opacity duration-200 hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                  disabled={!title.trim() || !description.trim() || !password.trim() || status === 'submitting'}
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
