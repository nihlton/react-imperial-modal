# 👑 react-imperial-modal 👑 [sorta BETA]
**Imperative API for modals**

Often, a interactive branching UI flow is complex enough that a declarative approach becomes too cumbersome and verbose.  Imagine an experience where an application prompts a user to confirm before a destructive action, then confirms the success or failure of the action.  The content of those modals, the result of the actions - all has to go into the state.

Now imagine that same page has actions for adding items, editing them etc.  It all quickly spirals out of control, with half your state is devoted to which modal is open or closed, forget whats inside them.

Now imagine an imperative API implementation.

## Usage

```
yarn add react-imperial-modal
```
or
```
npm install react-imperial-modal
```

wrap your app with `<ModalProvider>`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ModalProvider } from 'react-imperial-modal'

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Import the `useModal` hook.  it provides two methods, `openModal`, and `closeModal`

  - openModal(modal, label, role).  returns a promise.
    - **modal** - required.  any valid react element
    - **label** - encouraged.  provides an aria content label for your modal
    - **role** - optional.  'dialog' is default

  - closeModal(modal, result).  resolves the promise returned by `openModal`.  returns nothing.
    - **modal** - required.  any valid react element
    - **result** - optional.  used as the resolver value for the `openModal` promise.

```javascript
  import { useModal } from 'react-imperial-modal'
  
  ...
  
  const [ openModal, closeModal ] = useModal()

  ...

  const myModal = <div>
    I am a modal.  
    <button onClick={() => closeModal(myModal)}>ok</button>
  </div>
  openModal(myModal)
```

    
## Note:
the **modal** argument should be defined ahead of time, since its reference is used to both open and close the modal. Defining the modal within the `openModal` function call will mean you can't close the modal programatically.  The user can still close it by clicking the back drop, or hitting the escape key.


## Advanced Usage

### Promises / async await

the `openModal` method returns a promise which is resolved by the `closeModal` method.

given:
```javascript
const Prompt = function(props) {
  const [ myValue, setMyValue ] = useState('')
  const { message, close } = props
  
  return <div>
    <h1>Question</h1>
    <p>{message}</p>
    <input value={myValue} onChange={e => setMyValue(e.target.value)} />
    <button onClick={() => close(false)}>cancel</button>
    <button onClick={() => close(promptValue)}>ok</button>
  </div>
}

const Alert = function(props) {
  const { message, close } = props
  
  return <div>
    <h1>Alert</h1>
    <p>{message}</p>
    <button onClick={close}>ok</button>
  </div>
}
```

you can:
```javascript
  const getUsersColor = async () => {
    const colorModal = <Prompt
      message='what is your favorite color?'
      close={color => closeModal(colorModal, color)}/>
      
    const favoriteColor = await openModal(colorModal)
  
    console.log(favoriteColor)
  }
```

or
```javascript
  const getUsersColor = () => {
    const colorModal = <Prompt message='what is your favorite color?' close={color => closeModal(colorModal, color)}/>
    openModal(colorModal).then(favoriteColor => {
    
      console.log(favoriteColor)
    
    })
  }
```

### configuration

```javascript
  // these are the defaults
  const modalConfig = {
    bodyOpenClass: 'modal-open',      // applied to body element
    modalShadeClass: 'modal-shade',   // used to style modal back drop
    modalContainerClass: 'modals',    // element which contains all modals
    modalClass: 'modal',              // applied to each modal
  }
  
  // function that returns your app element.
  // will be hidden for screen readers (`aria-hidden`) while modals are open.
  // if not provided, a div wrapped around the `ModalProvider` children will be `aria-hidden`
  const appElement = () => document.getElementById('#some-element-id')
  
  ReactDOM.render(
    <React.StrictMode>
      <ModalProvider config={modalConfig} appElement={appElement} >
        <App />
      </ModalProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
```


## CSS and styling

No default CSS is provided or applied.  The following is provided as a recommendation, or starting point.

```css
.modals {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4000;
}

.modal-shade {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #0005;
  z-index: 4001;
}

.modal {
  padding: 2rem;
  background: white;
  position: relative;
  z-index: 4002;
}
```

[LIVE DEMO](https://codesandbox.io/s/hungry-pond-5exs1?file=/src/App.js)


# TO DO
  - idiot proof (null checks, warnings etc)

