import * as React from 'react'
import {ModalEntry} from "./types";

const useWithoutProvider = (modalEntry : ModalEntry) : void => {
  throw new Error( 'Attempted to call useModal outside of modal context. Make sure your component is inside ModalProvider.' )
}

export const ModalContext = React.createContext({
  addModal: useWithoutProvider,
  removeModal: useWithoutProvider
})
