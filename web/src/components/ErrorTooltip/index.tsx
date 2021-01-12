import React from 'react';

import { Container } from './styles';

interface Props {
  title: string;
}

const ErrorTooltip: React.FC<Props> = ({ title, children }) => {
  return (
    <Container>
      <span>{title}</span>

      {children}
    </Container>
  );
};

export default ErrorTooltip;
