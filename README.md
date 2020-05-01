#👑 react-imperial-modal 👑 [VERY BETA]
**Imperative API for modals**

Often, a interactive branching UI flow is complex enough that a declarative approach becomes too cumbersome and verbose.  Imagine an experience where an application prompts a user to confirm before a destructive action, then confirms the success or failure of the action.  The content of those modals, the result of the actions - all has to go into the state.

Now imagine that same page has actions for adding items, editing them etc.  It all quickly spirals out of control, with half your state is devoted to which modal is open or closed, forget whats inside them.

How imagine an imperative API implementation.

```javascript
  const [ userInput, setUserInput ] = useState('')
  const createModal = useModal()
  
  const getUsersColor = async () => {
    const [openColorModal, closeColorModal] = createModal()
    const favoriteColor = await openColorModal(
      <Prompt
        message='what is your favorite color?'
        close={closeColorModal}/>)
  
    if (favoriteColor) {
      const [ openAlertModal, closeAlertModal ] = createModal()
      setUserInput(favoriteColor)
      openAlertModal(
        <Alert
          message={`your favorite color is ${favoriteColor}`}
          close={closeAlertModal}/>)
    }
  }
```

# TO DO

  - finalize API signature. (can we make generic open open/close methods?)
  - accessibility
    - manage focus
    - handle escape key
    - ARIA attributes