'use client';

import React from 'react';
import styled from 'styled-components';

const ThoughtWrapperCss = styled.div`
  display: flex;
  background: ${props =>
    `radial-gradient(closest-side, ${props.theme.homeBgDark}, ${props.theme.homeBgLight})`};
  padding: 20px;
  border-radius: 30px;
  max-width: 100%;
  min-width: 40px;
  min-height: 40px;
  margin: 20px;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:before,
  &:after {
    content: '';
    background-color: ${props => props.theme.homeBgLight};
    border-radius: 50%;
    display: block;
    position: absolute;
    z-index: -1;
  }
  &:before {
    width: 44px;
    height: 44px;
    top: -12px;
    left: 28px;
    box-shadow: ${props => `-50px 30px 0 -12px ${props.theme.homeBgLight}`};
  }
  &:after {
    bottom: -10px;
    right: 26px;
    width: 30px;
    height: 30px;
    box-shadow: ${props =>
      `40px -34px 0 0 ${props.theme.homeBgLight}, -53px 1px 0 8px ${props.theme.homeBgLight},
      -24px 34px 0 -4px ${props.theme.homeBgLight}, -3px 50px 0 -8px ${props.theme.homeBgLight}`};
  }
`;

export default function ThoughtCloud({ children }: { children: React.ReactNode }) {
  return <ThoughtWrapperCss>{children}</ThoughtWrapperCss>;
}
