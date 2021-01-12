import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  left: 95%;

  display: flex;
  align-items: center;

  > span {
    width: 160px;
    background: #f06c6c;
    padding: 8px;

    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    color: #312e38;
    opacity: 0;
    visibility: hidden;

    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);

      border-width: 6px 6px 0 6px;
      border-style: solid;
      border-color: #f06c6c transparent;
    }
  }

  > svg {
    color: #c53030;
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
