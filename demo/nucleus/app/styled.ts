'use client'

import styled from 'styled-components';

export const StyledLoader = styled.span`
  width: ${p => p.theme.sizes[10]};
  height: ${p => p.theme.sizes[10]};
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid ${p => p.theme.colors.neutrals[10]};
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
` as unknown as () => JSX.Element;
