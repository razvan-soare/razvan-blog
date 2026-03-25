'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';
import { SunIcon, MoonIcon } from '@/components/ThemeIcons';

function ThemeToggle() {
  const { isLightTheme, toggleTheme } = useTheme();
  return (
    <div
      className="cursor-pointer flex items-center p-2.5 text-xl"
      onClick={toggleTheme}
    >
      {isLightTheme ? <MoonIcon /> : <SunIcon />}
    </div>
  );
}

function Menu({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      <ul
        className={`flex items-center list-none p-0 m-0 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <li className="m-2.5">
          <Link
            href="/"
            className="no-underline text-text text-base p-2.5 font-normal tracking-wide"
          >
            Home
          </Link>
        </li>
        <li className="m-2.5">
          <Link
            href="/about"
            className="no-underline text-text text-base p-2.5 font-normal tracking-wide"
          >
            About
          </Link>
        </li>
        <li className="m-2.5">
          <Link
            href="/snippets"
            className="no-underline text-text text-base p-2.5 font-normal tracking-wide"
          >
            Snippets
          </Link>
        </li>
        <li className="m-2.5">
          <Link
            href="/projects"
            className="no-underline text-text text-base p-2.5 font-normal tracking-wide"
          >
            Projects
          </Link>
        </li>
      </ul>
      <ul
        className={`flex items-center list-none p-0 m-0 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <li className="m-2.5">
          <ThemeToggle />
        </li>
      </ul>
    </>
  );
}

export default function Header({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Spacer */}
      <div className="h-[30px] w-full" />

      {/* Sticky container */}
      <div className="sticky top-[-1px] px-[80px] mx-auto max-w-[1300px] z-[200] bg-background-blured tablet:px-0 max-tablet:px-0">
        {/* Header bar */}
        <header className="flex justify-start items-center px-8 [&_a]:text-primary [&_a]:no-underline [&_a]:text-[22px] max-tablet:px-4 max-tablet:py-[7px] max-tablet:justify-between">
          <Link href="/">
            <h1>{title}</h1>
          </Link>

          {/* Nav */}
          <nav className="ml-[50px] flex flex-1 w-full items-center max-tablet:justify-end">
            {/* Desktop */}
            <div className="flex justify-between items-center w-full max-tablet:hidden">
              <Menu isOpen={true} />
            </div>

            {/* Mobile */}
            <div className="hidden max-tablet:block">
              {/* Burger */}
              <div
                className="w-[30px] h-5 relative cursor-pointer z-[200]"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span
                  className={`block absolute h-0.5 w-full bg-text rounded-sm opacity-100 left-0 transition-all duration-250 ${
                    isOpen ? 'top-[9px] rotate-[135deg]' : 'top-0 rotate-0'
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-full bg-text rounded-sm left-0 top-[9px] transition-all duration-250 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-full bg-text rounded-sm opacity-100 left-0 transition-all duration-250 ${
                    isOpen ? 'top-[9px] -rotate-[135deg]' : 'top-[18px] rotate-0'
                  }`}
                />
              </div>

              {/* Mobile overlay menu */}
              <div
                className={`fixed inset-0 bg-background-blured z-[100] flex justify-center items-center cursor-pointer transition-[opacity,background-color] duration-500 max-tablet:flex-col [&_ul]:flex [&_ul]:flex-col [&_ul]:justify-center [&_ul]:items-center [&_ul]:text-center ${
                  isOpen
                    ? 'opacity-100 pointer-events-auto [&_li]:translate-x-0'
                    : 'opacity-0 pointer-events-none [&_li]:-translate-x-[70%]'
                } [&_li]:w-full [&_li]:text-center [&_li]:flex [&_li]:justify-center [&_li]:items-center [&_li]:!m-0 [&_li]:transition-transform [&_li]:duration-[400ms] [&_li:nth-child(1)]:delay-[0ms] [&_li:nth-child(2)]:delay-100 [&_li:nth-child(3)]:delay-200 [&_li:nth-child(4)]:delay-300 [&_li:nth-child(5)]:delay-[400ms] [&_li:nth-child(6)]:delay-500 [&_li_a]:!p-[15px_20px] [&_li_a]:!text-2xl [&_li_div]:!p-[15px_20px] [&_li_div]:!text-2xl`}
                onClick={() => setIsOpen(false)}
              >
                <Menu isOpen={isOpen} />
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}
