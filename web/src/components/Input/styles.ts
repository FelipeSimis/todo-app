import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
  isFocused: boolean;
  isFilled: boolean;
  hasButton: boolean;
}

export const Container = styled.div<ContainerProps>`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 16px;

  position: relative;

  background: #fff;
  border-radius: 4px;
  min-width: 200px;
  border: 2px solid #c7c7c7;

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #ff6f47 !important;
    `}

  ${props =>
    props.isFilled &&
    css`
      border-color: #ff6447 !important;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030 !important;
      padding: 8px 16px;

      > button {
        right: 40px;
      }
    `}

  &:not(:first-child) {
    margin-top: 6px;
  }

  input {
    ${props =>
      !props.hasButton
        ? css`
            width: calc(100% - 50px);
          `
        : css`
            width: calc(100% - 24px);
          `}

    position: absolute;
    top: 0;
    left: 12px;
    right: 12px;
    bottom: 0;

    background: none;
    border: 0;
    border-radius: 4px;
  }

  @media (min-width: 480px) {
    width: 400px;
  }
`;

const buttonProps = css`
  position: absolute;
  top: 4px;
  right: 4px;
  bottom: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

export const PasswordButton = styled.button`
  ${buttonProps};
  right: 8px;

  background: none;
  color: #b7b7b7;

  width: 20px;
`;

export const Button = styled.button`
  ${buttonProps};

  background: #ff6f47;
  color: #f7fffe;
  transition: all 0.3s ease;

  width: 24px;

  &:hover {
    background: #de522c;
  }
`;
