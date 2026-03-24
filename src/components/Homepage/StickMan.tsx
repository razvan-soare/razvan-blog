'use client';

import React, { useEffect, useRef, useState } from 'react';
import ThoughtCloud from '@/components/ThoughtCloud';

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

    let rafId: number | null = null;

    function moveEyes(e: MouseEvent) {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
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
      });
    }

    window.addEventListener('mousemove', moveEyes, false);
    return () => {
      window.removeEventListener('mousemove', moveEyes, false);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [monsterSvg]);

  return (
    <div className="group h-[200px] w-[200px] relative ml-auto z-[180] bg-background rounded-full shadow-[0px_0px_35px_35px_var(--color-background)] [&_#rest-hand]:block [&_#wave-hand]:hidden hover:[&_#rest-hand]:hidden hover:[&_#wave-hand]:block">
      {/* Thought cloud - shown on hover via group-hover */}
      <div className="absolute right-[100px] w-[500px] top-[-80%] opacity-0 transition-opacity duration-200 pointer-events-none pb-[100px] group-hover:opacity-100 group-hover:pointer-events-auto">
        <ThoughtCloud>
          <h1 className="relative text-text text-xl leading-8 max-tablet:text-[26px] max-tablet:leading-[30px] max-tablet:text-center [&_span]:text-tertiary">
            Hello{' '}
            <span role="img" aria-label="hi">👋</span>{' '}
            I am Razvan, <span>React developer</span> and technology enthusiast{' '}
            <span role="img" aria-label="tada">🎉</span>
          </h1>
        </ThoughtCloud>
      </div>

      {/* SVG wrapper with floating animation */}
      <div className="w-full relative flex justify-center items-center flex-col animate-updown [&_.monster]:relative [&_.monster]:h-1/2 [&_.monster]:w-1/2 [&_.monster]:z-10 [&_.monster_svg]:w-full [&_.monster_svg]:h-full [&_.island]:w-4/5 [&_.island]:h-4/5 [&_.island]:-mt-[45px] [&_.piggy]:absolute [&_.piggy]:w-[30px] [&_.piggy]:h-[30px] [&_.piggy]:right-[45px] [&_.piggy]:top-[75px] [&_.piggy]:z-[15]">
        <div
          className="monster"
          ref={monsterRef}
          dangerouslySetInnerHTML={{ __html: monsterSvg }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="island" src="/images/svg/island.svg" alt="island" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="piggy" src="/images/svg/piggy.svg" alt="piggy" />
      </div>
    </div>
  );
}
