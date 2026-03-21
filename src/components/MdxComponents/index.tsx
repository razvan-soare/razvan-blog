'use client';

import React from 'react';
import styled from 'styled-components';

const StyledTextBlock = styled.div<{ $variant: string }>`
  border-left-style: solid;
  border-left-width: 3px;
  border-radius: 6px 6px 6px 3px;
  font-size: 17px;
  line-height: 1.5;
  font-weight: 300;
  margin-bottom: 64px;
  margin-top: 48px;
  padding: 24px 32px;
  position: relative;
  transition: background-color 350ms ease 0s, border-color 350ms ease 0s;
  border-color: ${props => props.theme.textBlockBorder[props.$variant as keyof typeof props.theme.textBlockBorder]};
  background: ${props => props.theme.textBlock[props.$variant as keyof typeof props.theme.textBlock]};
  & > *:last-child {
    margin-bottom: 0;
  }
`;

const StyledIconWrap = styled.div<{ $variant: string }>`
  background: ${props => props.theme.background};
  border-radius: 50%;
  display: block;
  left: 0;
  padding: 7px;
  position: absolute;
  top: 0;
  transform: translate(-50%, -50%);
  transition: background-color 350ms ease 0s;
  font-size: 20px;
`;

function TextBlock({ variant, children }: { variant: string; children: React.ReactNode }) {
  const icons: Record<string, string> = {
    success: '✅',
    warning: '⚠️',
    danger: '🛑',
    info: 'ℹ️',
    primary: 'ℹ️',
  };

  return (
    <StyledTextBlock $variant={variant}>
      <StyledIconWrap $variant={variant}>{icons[variant] || icons.info}</StyledIconWrap>
      {children}
    </StyledTextBlock>
  );
}

export function Primary({ children }: { children: React.ReactNode }) {
  return <TextBlock variant="primary">{children}</TextBlock>;
}

export function Info({ children }: { children: React.ReactNode }) {
  return <TextBlock variant="info">{children}</TextBlock>;
}

export function Success({ children }: { children: React.ReactNode }) {
  return <TextBlock variant="success">{children}</TextBlock>;
}

export function Warning({ children }: { children: React.ReactNode }) {
  return <TextBlock variant="warning">{children}</TextBlock>;
}

export function Danger({ children }: { children: React.ReactNode }) {
  return <TextBlock variant="danger">{children}</TextBlock>;
}

const CustomUnderlineCss = styled.span`
  position: relative;
  border-bottom-width: 2px;
  border-bottom-style: solid;
`;

export function U({ children }: { children: React.ReactNode }) {
  return <CustomUnderlineCss>{children}</CustomUnderlineCss>;
}
