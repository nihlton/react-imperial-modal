import React, { useState } from 'react';
import { useModal } from '../src';
import type { ModalProps } from '../src/types';

import './App.css';

export default function App() {
  const [userInput, setUserInput] = useState('');
  const openModal = useModal();

  const getUsersColor = async () => {
    const favoriteColor = await openModal(Prompt, {
      title: 'Question',
      message: 'what is your favorite color?',
    });

    setUserInput(favoriteColor || '');
  };

  const confirmColor = async () => {
    const confirmed = await openModal(Confirm, {
      title: 'Confirm',
      message: `Is ${userInput} your favorite color?`,
    });
    if (confirmed)
      openModal(Alert, {
        title: 'Confirmed',
        message: `${userInput} is your favorite color`,
      });
  };

  return (
    <div className="App">
      <h1>Imperative Modal API Demo</h1>
      <h2>User Color: {userInput}</h2>
      <button onClick={getUsersColor}>get color</button>
      {userInput && <button onClick={confirmColor}>confirm</button>}
    </div>
  );
}

// GENERIC PROMPT COMPONENT
type PromptProps = { title: string; message: string };
const Prompt = function (props: PromptProps & ModalProps<string | void>) {
  const [promptValue, setPromptValue] = useState<string>('');
  const { title, message, resolve } = props;

  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
      <input value={promptValue} onChange={(e) => setPromptValue(e.target.value)} />
      <div>
        <button onClick={() => resolve()}>cancel</button>
        <button onClick={() => resolve(promptValue)}>ok</button>
      </div>
    </div>
  );
};

// GENERIC CONFIRM COMPONENT
type ConfirmProps = { title: string; message: string };
const Confirm = function (props: ConfirmProps & ModalProps<boolean>) {
  const { title, message, resolve } = props;

  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
      <div>
        <button onClick={() => resolve(false)}>cancel</button>
        <button onClick={() => resolve(true)}>Confirm</button>
      </div>
    </div>
  );
};

// GENERIC ALERT COMPONENT
type AlertProps = { title: string; message: string };
const Alert = function (props: AlertProps & ModalProps) {
  const { title, message, resolve } = props;

  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
      <button onClick={() => resolve()}>ok</button>
    </div>
  );
};
