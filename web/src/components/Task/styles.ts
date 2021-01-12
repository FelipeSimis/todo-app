import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled(animated.li)`
  width: 100%;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:first-child) {
    margin-top: 12px;
  }

  &.completed {
    transition: opacity 0.4s ease;
    opacity: 0.5 !important;

    span {
      text-decoration: line-through;
    }
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    background: #fff;
    border-radius: 4px;

    flex: 1;
    padding: 7px;

    &:hover {
      word-break: break-word;
    }
  }

  div {
    display: flex;
    align-items: center;
    height: 37px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 100%;
      padding: 4px 10px;

      color: #fff;
      transition: background 0.2s ease;

      &:first-child {
        background: #0bd4a2;

        &:hover {
          background: #23ba92;
        }
      }

      &:last-child {
        background: #ff6f47;

        &:hover {
          background: #de522c;
        }
      }
    }
  }
`;
