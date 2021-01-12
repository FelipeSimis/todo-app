import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Wrapper = styled.div`
  padding: 30px;
  margin: 0 10px;

  background: #fff;
  border-radius: 12px;

  animation: ${appearFromLeft} 1s ease;

  form {
    color: #333;

    display: flex;
    flex-direction: column;
    align-items: center;

    fieldset {
      border: 0;

      legend {
        text-align: center;
        font-size: 26px;
        font-weight: 600;
      }

      p {
        margin: 8px 0;
        font-size: 14px;
        text-align: center;

        a {
          font-size: inherit;
          color: #48aee0;
        }
      }
    }
  }
`;

export const RemindContainer = styled.div`
  margin: 6px 0;

  display: flex;
  align-items: center;

  input {
    margin-right: 8px;
  }

  label {
    font-size: 13px;
  }
`;

export const Button = styled.button`
  width: 100%;
  margin-top: 12px;
  padding: 8px 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #48aee0;
  color: #fff;
  border-radius: 8px;
  transition: background 0.2s ease;

  position: relative;

  &:hover {
    background: #558ce6;
  }

  svg {
    position: absolute;
    right: 12px;
    font-size: 16px;
  }
`;
