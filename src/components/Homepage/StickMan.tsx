'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ThoughtCloud from '@/components/ThoughtCloud';

const HeroTextCss = styled.h1`
  position: relative;
  color: ${props => props.theme.text};
  font-size: 20px;
  line-height: 32px;
  span {
    color: ${props => props.theme.tertiary};
  }
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    font-size: 26px;
    line-height: 30px;
    text-align: center;
  }
`;

const ThoughtWrapperCss = styled.div`
  position: absolute;
  right: 100px;
  width: 500px;
  top: -80%;
  opacity: 0;
  transition: opacity 200ms ease 0s;
  pointer-events: none;
  padding-bottom: 100px;
`;

const StickManWrapperCss = styled.div`
  height: 200px;
  width: 200px;
  position: relative;
  margin-left: auto;
  z-index: 180;
  background: ${props => props.theme.background};
  border-radius: 50%;
  box-shadow: 0px 0px 35px 35px ${props => props.theme.background};

  #rest-hand {
    display: block;
  }
  #wave-hand {
    display: none;
  }

  &:hover {
    ${ThoughtWrapperCss} {
      opacity: 1;
      pointer-events: all;
    }
    #rest-hand {
      display: none;
    }
    #wave-hand {
      display: block;
    }
  }
`;

const SvgWrapperCss = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: updown 4s ease-in-out infinite;

  @keyframes updown {
    0% { transform: translateY(10px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(10px); }
  }

  .monster {
    position: relative;
    height: 50%;
    width: 50%;
    margin-left: 0px;
    z-index: 10;

    svg {
      width: 100%;
      height: 100%;
    }
  }
  .island {
    width: 80%;
    height: 80%;
    margin-top: -45px;
  }

  .piggy {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 45px;
    top: 75px;
    z-index: 15;
  }
`;

export default function StickMan() {
  const monsterRef = useRef<HTMLDivElement>(null);
  const [monsterSvg, setMonsterSvg] = useState('');

  useEffect(() => {
    fetch('/images/svg/monster.svg')
      .then(res => res.text())
      .then(setMonsterSvg)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!monsterSvg) return;

    const leftEye = document.getElementById('left-eye');
    const rightEye = document.getElementById('right-eye');
    if (!leftEye || !rightEye) return;

    const maxOffset = 27;

    function moveEyes(e: MouseEvent) {
      if (!leftEye || !rightEye) return;
      const mouseX = e.pageX;
      const mouseY = e.pageY;

      const pageScrollOffset = window.scrollY;
      const valuesLeftEye = leftEye.getBoundingClientRect();
      const centerLeftEye = {
        x: valuesLeftEye.x + valuesLeftEye.width / 2,
        y: valuesLeftEye.y + pageScrollOffset + valuesLeftEye.height / 2,
      };
      const valuesRightEye = rightEye.getBoundingClientRect();
      const centerRightEye = {
        x: valuesRightEye.x + valuesRightEye.width / 2,
        y: valuesRightEye.y + pageScrollOffset + valuesRightEye.height / 2,
      };

      let offsetX = (mouseX - (centerRightEye.x + centerLeftEye.x) / 2) / 10;
      if (offsetX < -maxOffset) offsetX = -maxOffset;
      else if (offsetX > maxOffset) offsetX = maxOffset;

      let offsetY = (mouseY - centerLeftEye.y) / 5;
      if (offsetY < -maxOffset) offsetY = -maxOffset;
      else if (offsetY > maxOffset) offsetY = maxOffset;

      leftEye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      rightEye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    window.addEventListener('mousemove', moveEyes, false);
    return () => window.removeEventListener('mousemove', moveEyes, false);
  }, [monsterSvg]);

  return (
    <StickManWrapperCss>
      <ThoughtWrapperCss>
        <ThoughtCloud>
          <HeroTextCss>
            Hello{' '}
            <span role="img" aria-label="hi">👋</span>{' '}
            I am Razvan, <span>React developer</span> and technology enthusiast{' '}
            <span role="img" aria-label="tada">🎉</span>
          </HeroTextCss>
        </ThoughtCloud>
      </ThoughtWrapperCss>
      <SvgWrapperCss>
        <div
          className="monster"
          ref={monsterRef}
          dangerouslySetInnerHTML={{ __html: monsterSvg }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="island" src="/images/svg/island.svg" alt="island" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="piggy" src="/images/svg/piggy.svg" alt="piggy" />
      </SvgWrapperCss>
    </StickManWrapperCss>
  );
}
