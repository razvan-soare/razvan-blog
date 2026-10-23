'use client';

import React, { useEffect, useRef, useState } from 'react';
import ThoughtCloud from '@/components/ThoughtCloud';
import { flow, track, wave, type Keys } from '@/lib/motion';

// Idle life for the monster, following rossark-motion-skill. One 18 s loop: in the
// first half it glances at the posts and then at the piggy; in the second it looks
// at you, waves with its right arm, then glances at the posts again. Throughout it
// breathes, sways on its feet and blinks on each turn. The mouse takes over the gaze
// while it moves. Numbers are in the SVG's own units (512 wide, drawn at about
// 100 px) and degrees unless noted.
const LOOP = 18000;
const blink = (at: number): Keys => [[at, 0], [at + 110, 1], [at + 150, 1], [at + 340, 0, 'out']];
const MOTION = {
  gazeX: [
    [0, 0], [1200, 0], [1700, -24], [3600, -24], [4100, 0], [5600, 0], [6100, 22], [7800, 22], [8300, 0],
    [9800, 0], [10200, 14], [10700, 14], [11100, 0], [14500, 0], [15000, -24], [16800, -24], [17300, 0], [18000, 0],
  ] as Keys,
  gazeY: [
    [0, 0], [1200, 0], [1700, 3], [3600, 3], [4100, 0], [5600, 0], [6100, 16], [7800, 16], [8300, 0],
    [9800, 0], [10200, -12], [10700, -12], [11100, 0], [14500, 0], [15000, 3], [16800, 3], [17300, 0], [18000, 0],
  ] as Keys,
  lid: [
    [0, 0], ...blink(1150), ...blink(3550), ...blink(5550), ...blink(7750), ...blink(8090),
    ...blink(9450), ...blink(12700), ...blink(14450), ...blink(16750), [18000, 0],
  ] as Keys,
  // How far each lid slides when closed; they meet a little below the eye's middle.
  upperLidTravel: 145,
  lowerLidTravel: -33,
  maxGaze: 27,
  breath: 0.02,
  sway: 1.5,
  feet: [256, 504],
  // The wave: the shoulder lifts a little, the forearm swings up beside the head,
  // waves three times, and the body leans into it. Negative angles raise the arm.
  shoulder: [[0, 0], [9800, 0], [10300, -35], [12450, -35], [13050, 0], [18000, 0]] as const,
  elbow: [[0, 0], [9800, 0], [10350, -150], [12450, -150], [13150, 0], [18000, 0]] as const,
  lean: [[0, 0], [9800, 0], [10300, 2.5], [12450, 2.5], [13050, 0], [18000, 0]] as const,
  // The hand curls in at rest and straightens in line with the forearm while it waves.
  wrist: [[0, 0], [9800, 0], [10350, -30], [12450, -30], [13150, 0], [18000, 0]] as const,
  waving: [[0, 0], [10250, 0], [10450, 1], [12250, 1], [12450, 0], [18000, 0]] as Keys,
  waveSwing: 14,
  wavePeriod: 700,
  shoulderPivot: [428, 221.3],
  elbowPivot: [474.5, 248.2],
  wristPivot: [474.5, 298],
  // The piggy is an <img>, so these are CSS px and degrees.
  piggyBob: 1.5,
  piggyRock: 4,
  // How long the gaze stays with the mouse after it stops, and how fast it follows.
  followHold: 2500,
  followMs: 70,
};

export default function StickMan() {
  const rootRef = useRef<HTMLDivElement>(null);
  const piggyRef = useRef<HTMLImageElement>(null);
  const [monsterSvg, setMonsterSvg] = useState('');

  useEffect(() => {
    fetch('/images/svg/monster.svg')
      .then(res => res.text())
      .then(setMonsterSvg)
      .catch(() => {});
  }, []);

  // The monster is driven by one requestAnimationFrame clock that writes SVG transforms
  // directly; it must start after the fetched SVG is in the DOM and pause off screen.
  useEffect(() => {
    const root = rootRef.current;
    const svg = root?.querySelector('svg');
    const body = document.getElementById('monster-body');
    const pupil = document.getElementById('monster-pupil');
    const upperLid = document.getElementById('monster-lid-upper');
    const lowerLid = document.getElementById('monster-lid-lower');
    const arm = document.getElementById('monster-arm');
    const forearms = root?.querySelectorAll('.monster-forearm') ?? [];
    const hands = root?.querySelectorAll('.monster-hand') ?? [];
    const piggy = piggyRef.current;
    if (!root || !svg || !body || !pupil || !upperLid || !lowerLid || !arm || !piggy) return;
    // Reduced motion keeps the drawing still: frame 0 is the resting pose.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const m = MOTION;
    let t = 0;
    let last = 0;
    let rafId: number | null = null;
    let lastMouse = -Infinity;
    const mouseTarget = { x: 0, y: 0 };
    const mouseGaze = { x: 0, y: 0 };
    let follow = 0;

    function frame(now: number) {
      // Cap the step so a stalled or backgrounded tab resumes without a jump.
      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;
      t = (t + dt) % LOOP;

      const sy = 1 + m.breath * (wave(t, 4500) + 1) / 2;
      const sx = 1 / sy ** 0.6;
      const [fx, fy] = m.feet;
      const tilt = m.sway * wave(t, 9000) + flow(t, m.lean);
      body!.setAttribute('transform', `translate(${fx} ${fy}) rotate(${tilt}) scale(${sx} ${sy}) translate(${-fx} ${-fy})`);

      // Arm = key pose + idle sway; the forearm trails the shoulder by 90 ms.
      const shoulder = flow(t, m.shoulder) + 2 * wave(t, 3000, 0.3);
      const trail = 0.45 * (flow(t - 90, m.shoulder) - flow(t, m.shoulder));
      const swing = (at: number) => m.waveSwing * track(at, m.waving) * wave(at - 10350, m.wavePeriod);
      const elbow = flow(t, m.elbow) + 3 * wave(t, 2250, 0.6) + trail + swing(t);
      // The hand trails the wave swing by 80 ms, so it flicks a little at each turn.
      const wrist = flow(t, m.wrist) + 0.5 * (swing(t - 80) - swing(t));
      arm!.setAttribute('transform', `rotate(${shoulder} ${m.shoulderPivot.join(' ')})`);
      for (const forearm of forearms) forearm.setAttribute('transform', `rotate(${elbow} ${m.elbowPivot.join(' ')})`);
      for (const hand of hands) hand.setAttribute('transform', `rotate(${wrist} ${m.wristPivot.join(' ')})`);

      const k = 1 - Math.exp(-dt / m.followMs);
      mouseGaze.x += (mouseTarget.x - mouseGaze.x) * k;
      mouseGaze.y += (mouseTarget.y - mouseGaze.y) * k;
      const following = now - lastMouse < m.followHold ? 1 : 0;
      follow += (following - follow) * (1 - Math.exp(-dt / 250));
      const gx = track(t, m.gazeX) * (1 - follow) + mouseGaze.x * follow;
      const gy = track(t, m.gazeY) * (1 - follow) + mouseGaze.y * follow;
      pupil!.setAttribute('transform', `translate(${gx} ${gy})`);

      const lid = track(t, m.lid);
      upperLid!.setAttribute('transform', `translate(0 ${lid * m.upperLidTravel})`);
      lowerLid!.setAttribute('transform', `translate(0 ${lid * m.lowerLidTravel})`);

      piggy!.style.transform = `translateY(${m.piggyBob * wave(t, 3000, 0.4)}px) rotate(${m.piggyRock * wave(t, 4500, 0.15)}deg)`;

      rafId = requestAnimationFrame(frame);
    }

    function onMouseMove(e: MouseEvent) {
      const box = svg!.getBoundingClientRect();
      const eyeX = box.x + box.width * (256 / 512);
      const eyeY = box.y + box.height * (178.6 / 512);
      const clamp = (v: number) => Math.max(-m.maxGaze, Math.min(m.maxGaze, v));
      mouseTarget.x = clamp((e.clientX - eyeX) / 10);
      mouseTarget.y = clamp((e.clientY - eyeY) / 5);
      lastMouse = performance.now();
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && rafId === null) {
        last = 0;
        rafId = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
    observer.observe(root);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [monsterSvg]);

  const loaded = monsterSvg !== '';

  return (
    <div
      ref={rootRef}
      className="group h-[200px] w-[200px] relative ml-auto z-[180] bg-background rounded-full shadow-[0px_0px_35px_35px_var(--color-background)] [&_#rest-hand]:block [&_#wave-hand]:hidden hover:[&_#rest-hand]:hidden hover:[&_#wave-hand]:block transition-opacity duration-700 ease-out"
      style={{ opacity: loaded ? 1 : 0 }}
    >
      {/* Thought cloud - shown on hover via group-hover */}
      <div className="absolute right-[100px] w-[500px] top-[-55%] opacity-0 transition-opacity duration-200 pointer-events-none pb-[100px] group-hover:opacity-100 group-hover:pointer-events-auto">
        <ThoughtCloud>
          <h1 className="relative text-text text-xl leading-8 max-tablet:text-[26px] max-tablet:leading-[30px] max-tablet:text-center [&_span]:text-tertiary">
            Hello{' '}
            <span role="img" aria-label="hi">👋</span>{' '}
            I am Razvan, I <span>build products</span> and explore what AI can do
          </h1>
        </ThoughtCloud>
      </div>

      {/* SVG wrapper with floating animation */}
      <div className="w-full relative flex justify-center items-center flex-col animate-updown [&_.monster]:relative [&_.monster]:h-1/2 [&_.monster]:w-1/2 [&_.monster]:z-10 [&_.monster_svg]:w-full [&_.monster_svg]:h-full [&_.island]:w-4/5 [&_.island]:h-4/5 [&_.island]:-mt-[45px] [&_.piggy]:absolute [&_.piggy]:w-[30px] [&_.piggy]:h-[30px] [&_.piggy]:right-[45px] [&_.piggy]:top-[75px] [&_.piggy]:z-[15]">
        <div
          className="monster"
          dangerouslySetInnerHTML={{ __html: monsterSvg }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="island" src="/images/svg/island.svg" alt="island" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="piggy" ref={piggyRef} src="/images/svg/piggy.svg" alt="piggy" />
      </div>
    </div>
  );
}
