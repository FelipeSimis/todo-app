import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './hooks/auth';
import { ToastProvider } from './hooks/toast';
import { TodoProvider } from './hooks/todo';

import GlobalStyles from './styles/GlobalStyles';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <TodoProvider>
            <Routes />
          </TodoProvider>
        </ToastProvider>
      </AuthProvider>

      <GlobalStyles />
    </BrowserRouter>
  );
};

export default App;
