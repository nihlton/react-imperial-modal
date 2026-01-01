import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ModalProvider } from '../src';

const container = document.getElementById('root');
const defaultConfig = {
  bodyOpenClass: 'modal-open',
  modalContainerClass: 'modals',
  modalClass: 'modal',
};

if (container) {
  const root = createRoot(container);
  root.render(
    <ModalProvider config={defaultConfig}>
      <App />
    </ModalProvider>,
  );
}
