import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    min-height: 100%;
  }

  body, #root {
    height: 100%;
  }

  body {
    background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    color: white;
  }

  *, input, button {
    font-family: Poppins, sans-serif;
  }

  button {
    cursor: pointer;
    border: 0;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    width: 8px;
    border-radius: 8px;

    background: #b4b4b4;
  }
`;
