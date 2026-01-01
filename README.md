# 👑 react-imperial-modal
**Imperative API for modals**

```typescript
  const favoriteColor = await openModal(Prompt, {
    title: 'Question',
    message: 'what is your favorite color?',
  });
```

Often, a interactive branching UI flow is complex enough that a declarative approach becomes too cumbersome and verbose.  Imagine an experience where an application prompts a user to confirm before a destructive action, then informs the user of the success or failure of the action.  The content of those modals, the result of the actions - all has to go into the state.

Imagine that same page has actions for adding items, editing them etc.  It all quickly spirals out of control, with half your state devoted to which modal is open or closed, forget whats inside them. 🤮

Now imagine an imperative API implementation 🌈

[LIVE DEMO](https://codesandbox.io/s/hungry-pond-5exs1?file=/src/App.js)


## Add it to your project

```
yarn add react-imperial-modal
```
or
```
npm install react-imperial-modal
```

## Basic Usage

wrap your app with `<ModalProvider>`

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ModalProvider } from 'react-imperial-modal'
import App from './App';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <ModalProvider>
      <App />
    </ModalProvider>,
  );
}

```

Define a modal with the `ModalProps` type
```tsx
  import type { ModalProps } from 'react-imperial-modal';

  type MyModalProps = { message: string } & ModalProps;

  const MyModal = function (props: MyModalProps) {
    const { message, close } = props;
    return (
      <div>
        <p>{message}</p>
        <button onClick={() => close()}>ok</button>
      </div>
    );
  };
```

Import the `useModal` hook
```tsx
  import { useModal } from 'react-imperial-modal';
  ...
  const openModal = useModal();
  ...
  openModal(MyModal, { message: 'hello' });
```

## Advanced Usage

### `openModal`  

The `openModal` method accepts a number of additional arguments.

```typescript
  <T, P>(
    Component: React.ComponentType<P & ModalProps<T>>,
    componentProps: P,              
    ignoreEscape: boolean = false,  // `true` prevents the `ESC` key from closing the modal
    label?: string,                 // aria attributes 
    labelledby?: string,            // ..
    role: string = 'dialog',        // ..
  )
```

### `ModalProps` and Promises 

The `openModal` method returns a promise which can be resolved within the modal.  The `ModalProps` type accepts an optional type argument that determines what values the promise will return.

given:
```typescript
  export interface ModalProps<T = void> {
    modalId: string;
    resolve: (val: T) => void;
    reject: (reason?: unknown) => void;
    close: () => void;
  }
```

you can:
```tsx
  type PromptProps = { title: string; message: string } & ModalProps<string | void>;

  const Prompt = function (props: PromptProps) {
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
```

then:
```typeScript
  const openModal = useModal();
  ...
  const getUsersColor = () => {
    openModal(Prompt, {
      title: 'Question',
      message: 'what is your favorite color?',
    }).then((favoriteColor) => console.log(favoriteColor));
  };

```
or
```typeScript
  const openModal = useModal();
  ...
  const getUsersColor = async () => {
    const favoriteColor = await openModal(Prompt, {
      title: 'Question',
      message: 'what is your favorite color?',
    });

    console.log(favoriteColor);
  };
```

### `useModalDangerously` 

`useModalDangerously` provides additional methods which can be used to control opened modal instances. These methods are offered as an escape hatch and should be used carefully.

```typeScript
  openModal: [...same as `useModal`...]
  closeModal: (id?: string) => void;
  resolveModal: (val: unknown, id?: string) => void;
  rejectModal: (reason?: unknown, id?: string) => void;
```

**Notes:** 
  - `resolveModal` does not offer type safety.  *Use with caution!*
  - the `id` arugment of `resolveModal`, `rejectModal`, and `closeModal` is optional.  Ommitting it will operate on the most recently opened modal.

```typeScript
  const [openModal, closeModal, resolveModal, rejectModal ] = useModalDangerously();

  const nameModal = openModal(Prompt, { title: 'Name', message: 'choose a name' });
```

then:
```typeScript
  resolveModal('wisely', nameModal.id);  // this value cannot be type checked which can introduce runtime errors.
```

```typeScript
  rejectModal(new Error('did not choose wisely')); // id not provided.  will close the most recent modal
```

```typeScript
  closeModal(); // id not provided.  will close the most recent modal
```


### ModalProvider Config
you can specify `class` attributes for the `<body/>` element, as well as the each modal element, and their container

```typeScript
  type ModalProviderConfig = {
    bodyOpenClass?: string;
    modalContainerClass?: string;
    modalClass?: string;
  };
```
```tsx
  const modalConfiguration = {
    bodyOpenClass: 'blur';
    modalContainerClass: 'modals';
    modalClass: 'modal';
  }

  <ModalProvider config={modalConfiguration} >
    <App />
  </ModalProvider>
```

## CSS and styling

No default CSS is provided nor applied.  The following is provided as a recommendation, or starting point.


