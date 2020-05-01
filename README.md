# 👑 react-imperial-modal 👑 [VERY BETA]
**Imperative API for modals**

Often, a interactive branching UI flow is complex enough that a declarative approach becomes too cumbersome and verbose.  Imagine an experience where an application prompts a user to confirm before a destructive action, then confirms the success or failure of the action.  The content of those modals, the result of the actions - all has to go into the state.

Now imagine that same page has actions for adding items, editing them etc.  It all quickly spirals out of control, with half your state is devoted to which modal is open or closed, forget whats inside them.

How imagine an imperative API implementation.

```javascript
  const [ userInput, setUserInput ] = useState('')
  const [ openModal, closeModal ] = useModal()
  
  const getUsersColor = async () => {
    const colorModal = <Prompt message='what is your favorite color?' close={color => closeModal(colorModal, color)}/>
    const favoriteColor = await openModal(colorModal)
  
    if (favoriteColor) {
      const alertModal = <Alert message={`your favorite color is ${favoriteColor}`} close={() => closeModal(alertModal)}/>
      setUserInput(favoriteColor)
      openModal(alertModal)
    } else {
      const alertModal = <Alert message={`you didn't provide a color`} close={() => closeModal(alertModal)}/>
      openModal(alertModal)
    }
  }
```

[LIVE DEMO](https://codesandbox.io/s/hungry-pond-5exs1?file=/src/App.js)

# TO DO

  - idiot proof (null checks, warnings etc)
  - accessibility
    - manage focus
    - handle escape key
    - ARIA attributes
