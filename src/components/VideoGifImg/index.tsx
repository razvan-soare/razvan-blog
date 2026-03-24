'use client';

import React, { useRef, useEffect } from 'react';

interface VideoGifImgProps {
  type?: 'img' | 'video' | 'gif';
  path?: string;
  style?: React.CSSProperties;
}

export default function VideoGifImg({ type = 'img', path = '', style }: VideoGifImgProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (type !== 'video' || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [type]);

  if (type === 'video') {
    return (
      <div className="mb-[30px] [&_video]:block [&_video]:w-full [&_video]:h-full" style={style}>
        <video
          ref={videoRef}
          src={`/images/${path}`}
          controls={false}
          autoPlay={false}
          loop
          playsInline
          muted
        />
      </div>
    );
  }

  return (
    <div className="mb-[30px] [&_img]:block [&_img]:w-full [&_img]:h-full" style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/${path}`} alt="content" />
    </div>
  );
}
