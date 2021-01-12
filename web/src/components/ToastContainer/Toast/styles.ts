import styled, { css, keyframes } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'info' | 'success' | 'error';
  hasDescription: boolean;
}

interface ProgressBarProps {
  progressType?: 'info' | 'success' | 'error';
}

const ToastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  position: relative;

  width: 360px;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  &:not(:first-child) {
    margin-top: 8px;
  }

  ${props => ToastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
    flex-shrink: 0;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;

      > svg {
        margin-top: 0;
      }
    `}

  > div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
    }
  }

  > button {
    position: absolute;
    top: 19px;
    right: 16px;

    background: none;
    border: 0;
    opacity: 0.6;
    color: inherit;
  }
`;

const progressBar = keyframes`
  from {
    width: 0;
  }

  to {
    width: calc(100% - 3px);
  }
`;

export const ProgressBar = styled.div<ProgressBarProps>`
  position: absolute;
  left: 3px;
  right: 3px;
  bottom: 0.2px;

  height: 3px;
  background: #3172b7;

  ${props =>
    (props.progressType === 'success' &&
      css`
        background: #2e656a;
      `) ||
    (props.progressType === 'error' &&
      css`
        background: #c53030;
      `)}

  animation: ${progressBar} 3s linear;
  border-radius: 0 0 10px 10px;
`;
