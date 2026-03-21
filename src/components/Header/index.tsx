'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { useTheme } from '@/lib/ThemeContext';
import { SunIcon, MoonIcon } from '@/components/ThemeIcons';

const SpacerCss = styled.div`
  height: 30px;
  width: 100%;
`;

const StyledAnimatedContainerCss = styled.div`
  position: sticky;
  top: -1px;
  padding: 0 50px;
  margin: 0 auto;
  max-width: 1300px;
  z-index: 200;
  background: ${props => props.theme.backgroundBlured};
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    padding: 0;
  }
`;

const ContainerCss = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 32px;

  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    font-size: 22px;
  }
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    padding: 7px 16px;
    justify-content: space-between;
  }
`;

const NavContainerCss = styled.nav`
  margin-left: 50px;
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    justify-content: flex-end;
  }
`;

const ListCss = styled.ul<{ $isOpen: boolean }>`
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 10px;
    a {
      text-decoration: none;
      color: ${props => props.theme.text};
      font-size: 16px;
      padding: 10px;
      font-weight: 400;
      letter-spacing: 0.3px;
    }
  }
`;

const DesktopViewCss = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    display: none;
  }
`;

const MobileViewCss = styled.div`
  display: none;
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    display: block;
  }
`;

const MobileMenuCss = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.backgroundBlured};
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: opacity 500ms ease 0s, background-color 350ms ease 0s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    flex-direction: column;
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  li {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 !important;
    transform: translateX(-70%);
    transition: transform 400ms ease 0s;
    a, div {
      padding: 15px 20px;
      font-size: 24px;
    }
  }

  ${props =>
    props.$isOpen &&
    css`
      opacity: 1;
      pointer-events: all;
      li {
        transform: translateX(0%);
      }
      li:nth-child(1) { transition-delay: 0ms; }
      li:nth-child(2) { transition-delay: 100ms; }
      li:nth-child(3) { transition-delay: 200ms; }
      li:nth-child(4) { transition-delay: 300ms; }
      li:nth-child(5) { transition-delay: 400ms; }
      li:nth-child(6) { transition-delay: 500ms; }
    `}
`;

const BurgerCss = styled.div<{ $isOpen: boolean }>`
  width: 30px;
  height: 20px;
  position: relative;
  cursor: pointer;
  z-index: 200;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: ${props => props.theme.text};
    border-radius: 2px;
    opacity: 1;
    left: 0;
    transition: all 250ms ease;

    &:nth-child(1) {
      top: ${props => (props.$isOpen ? '9px' : '0')};
      transform: ${props => (props.$isOpen ? 'rotate(135deg)' : 'none')};
    }
    &:nth-child(2) {
      top: 9px;
      opacity: ${props => (props.$isOpen ? 0 : 1)};
    }
    &:nth-child(3) {
      top: ${props => (props.$isOpen ? '9px' : '18px')};
      transform: ${props => (props.$isOpen ? 'rotate(-135deg)' : 'none')};
    }
  }
`;

const ToggleCss = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 20px;
`;

function ThemeToggle() {
  const { isLightTheme, toggleTheme } = useTheme();
  return (
    <ToggleCss onClick={toggleTheme}>
      {isLightTheme ? <MoonIcon /> : <SunIcon />}
    </ToggleCss>
  );
}

function Menu({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      <ListCss $isOpen={isOpen}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/snippets">Snippets</Link></li>
        <li><Link href="/projects">Projects</Link></li>
      </ListCss>
      <ListCss $isOpen={isOpen}>
        <li><ThemeToggle /></li>
      </ListCss>
    </>
  );
}

export default function Header({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SpacerCss />
      <StyledAnimatedContainerCss>
        <ContainerCss>
          <Link href="/">
            <h1>{title}</h1>
          </Link>
          <NavContainerCss>
            <DesktopViewCss>
              <Menu isOpen={true} />
            </DesktopViewCss>
            <MobileViewCss>
              <BurgerCss $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <span />
                <span />
                <span />
              </BurgerCss>
              <MobileMenuCss $isOpen={isOpen} onClick={() => setIsOpen(false)}>
                <Menu isOpen={isOpen} />
              </MobileMenuCss>
            </MobileViewCss>
          </NavContainerCss>
        </ContainerCss>
      </StyledAnimatedContainerCss>
    </>
  );
}
