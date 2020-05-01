import React from 'react'

const useWithoutProvider = () => {
  throw new Error( 'Attempted to call useModal outside of modal context. Make sure your component is inside ModalProvider.' )
}

const ModalContext = React.createContext({
  showModal: useWithoutProvider,
  hideModal: useWithoutProvider
})

export default ModalContext
