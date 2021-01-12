import React, { CSSProperties, useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container, ProgressBar } from './styles';

const icons = {
  info: <FiInfo />,
  success: <FiCheckCircle />,
  error: <FiAlertCircle />,
};

interface ToastProps {
  message: ToastMessage;
  style: CSSProperties;
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        <p>{message.description}</p>
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle />
      </button>

      <ProgressBar progressType={message.type || 'info'} />
    </Container>
  );
};

export default Toast;
