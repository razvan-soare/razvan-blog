'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dialog = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.gray300};
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 480px;
  animation: ${fadeIn} 0.2s ease-out;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const DialogTitle = styled.h3`
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 600;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.gray700};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.gray300};
  border-radius: 8px;
  background: ${({ theme }) => theme.gray100};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-family: inherit;
  margin-bottom: 12px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.gray300};
  border-radius: 8px;
  background: ${({ theme }) => theme.gray100};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-family: inherit;
  margin-bottom: 16px;
  min-height: 120px;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.primary : theme.gray300};
  background: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.primary : 'transparent'};
  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? 'white' : theme.text};
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.textBlockBorder.success};
  font-size: 14px;
  margin: 0 0 16px;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.red};
  font-size: 14px;
  margin: 0 0 16px;
`;

const AttachmentSection = styled.div`
  margin-bottom: 16px;
`;

const DropZone = styled.div<{ $isDragging: boolean }>`
  border: 2px dashed ${({ theme, $isDragging }) =>
    $isDragging ? theme.primary : theme.gray300};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  background: ${({ theme, $isDragging }) =>
    $isDragging ? `${theme.primary}11` : theme.gray100};
  font-size: 13px;
  color: ${({ theme }) => theme.gray700};

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ImagePreviewGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.gray300};
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

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
      // Clean the URL
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
      <FloatingButton onClick={() => setIsOpen(true)} title="Report an issue">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </FloatingButton>

      {isOpen && (
        <Overlay onClick={handleClose}>
          <Dialog onClick={(e) => e.stopPropagation()} onPaste={handlePaste}>
            <DialogTitle>Report an Issue</DialogTitle>

            {status === 'success' && (
              <SuccessMessage>{resultMessage}</SuccessMessage>
            )}

            {status === 'error' && (
              <ErrorMessage>{resultMessage}</ErrorMessage>
            )}

            {status !== 'success' && (
              <>
                <Label htmlFor="report-title">Title</Label>
                <Input
                  id="report-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief summary of the issue"
                />

                <Label htmlFor="report-description">Description</Label>
                <TextArea
                  id="report-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you see and what you expected..."
                />

                <Label htmlFor="report-password">Password</Label>
                <Input
                  id="report-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                />

                <AttachmentSection>
                  <Label>Screenshots</Label>
                  <DropZone
                    $isDragging={isDragging}
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
                  </DropZone>
                  <HiddenFileInput
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) addImages(e.target.files);
                      e.target.value = '';
                    }}
                  />
                  {images.length > 0 && (
                    <ImagePreviewGrid>
                      {images.map((src, i) => (
                        <ImagePreviewWrapper key={i}>
                          <ImagePreview src={src} alt={`Attachment ${i + 1}`} />
                          <RemoveImageButton
                            onClick={() =>
                              setImages((prev) => prev.filter((_, j) => j !== i))
                            }
                            title="Remove"
                          >
                            &times;
                          </RemoveImageButton>
                        </ImagePreviewWrapper>
                      ))}
                    </ImagePreviewGrid>
                  )}
                </AttachmentSection>
              </>
            )}

            <ButtonRow>
              <Button onClick={handleClose}>
                {status === 'success' ? 'Close' : 'Cancel'}
              </Button>
              {status !== 'success' && (
                <Button
                  $variant="primary"
                  onClick={handleSubmit}
                  disabled={!title.trim() || !description.trim() || !password.trim() || status === 'submitting'}
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit'}
                </Button>
              )}
            </ButtonRow>
          </Dialog>
        </Overlay>
      )}
    </>
  );
}
