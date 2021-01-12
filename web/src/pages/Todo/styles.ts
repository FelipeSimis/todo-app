import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 20px;

  h3 {
    font-size: 18px;
    font-weight: 500;
  }

  a {
    font-size: 18px;
    color: #fff;
    text-decoration: none;

    display: flex;
    align-items: center;

    z-index: 10;

    svg {
      margin-left: 8px;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 500px;
  margin: 0 auto;
  padding: 50px 12px;

  overflow-x: hidden;

  form {
    width: 100%;
    margin-top: 50px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Select = styled.div`
  position: relative;

  width: 150px;
  margin-left: 8px;
  padding: 16px;

  background: #fff;

  select {
    appearance: none;

    box-shadow: none;
    border: 0 !important;
    background-image: none;

    color: #ff6f47;
    cursor: pointer;

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    width: 100%;
    padding: 0 0 0 12px;
  }

  svg {
    position: absolute;
    right: 4px;
    bottom: 25%;
    z-index: 10;

    color: #ff6f47;
    pointer-events: none;
  }
`;

export const Tasks = styled.div`
  width: 100%;
  margin-top: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  > ul {
    width: 100%;
    list-style-type: none;
  }
`;
