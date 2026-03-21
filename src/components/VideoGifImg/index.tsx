'use client';

import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const WrapperCss = styled.div`
  margin-bottom: 30px;
  video, img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

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
      <WrapperCss style={style}>
        <video
          ref={videoRef}
          src={`/images/${path}`}
          controls={false}
          autoPlay={false}
          loop
          playsInline
          muted
        />
      </WrapperCss>
    );
  }

  return (
    <WrapperCss style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/${path}`} alt="content" />
    </WrapperCss>
  );
}
