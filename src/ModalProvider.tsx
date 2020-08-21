import * as React from 'react'
import { ReactElement } from 'react'
import { ModalContext } from './ModalContext'
import Modal from './Modal'

import { ModalEntry, ModalProviderProps } from './types'

const { useRef, useState, useCallback, useMemo } = React

const defaultConfig = {
  bodyOpenClass: 'modal-open',
  modalShadeClass: 'modal-shade',
  modalContainerClass: 'modals',
  modalClass: 'modal'
}

const previouslyFocusedElements : HTMLElement[] = []
const ESC_KEY = 'Escape'


export const ModalProvider = ({ children, config = {}, appElement = () => {} }: ModalProviderProps ) : ReactElement => {
  const [ modalEntries, setModalEntries ] = useState([])
  const configuration = {...defaultConfig, ...config}
  const appContainer = useRef()
  
  const modalSetup = () : void => {
    // showing first modal
    const ariaTarget = appElement() || appContainer?.current
    document.documentElement.style.overflow = 'hidden'
    document.body.classList.add(configuration.bodyOpenClass)
    ariaTarget.setAttribute('aria-hidden', 'true');
  }
  
  const modalTakeDown = () : void => {
    // removing last modal
    const ariaTarget = appElement() || appContainer?.current
    document.documentElement.style.overflow = ''
    document?.body?.classList.remove(configuration.bodyOpenClass)
    ariaTarget.removeAttribute('aria-hidden');
  }
  
  const addModal = useCallback((modalEntry : ModalEntry) : void => {
    // remember where focus was
    previouslyFocusedElements.push(document.activeElement as HTMLInputElement)
    
    if (modalEntries.length === 0) {
      modalSetup()
    }
    
    if (modalEntries.includes(modalEntry)) {
      console.warn('tried to open a modal that was already opened')
    } else {
      setModalEntries(openModals => [...openModals, modalEntry ])
    }
  }, [modalEntries])
  
  const removeModal = useCallback((modalEntry : ModalEntry) : void => {
    // set focus back
    const previouslyFocusedElement:HTMLElement = previouslyFocusedElements.pop()
    if (document.documentElement.contains(previouslyFocusedElement)) {
      previouslyFocusedElement.focus()
    }
  
    if (modalEntries.length === 1) {
      modalTakeDown()
    }
    
    if (modalEntries.includes(modalEntry)) {
      setModalEntries(openModals => {
        const newModals = [...openModals]
        newModals.splice(newModals.indexOf(modalEntry), 1)
        return newModals
      })
    } else {
      console.warn(`tried to close a modal that isn't open`)
    }
  }, [modalEntries])
  
  const contextValue = useMemo(() => ({ addModal, removeModal }), [modalEntries]);

  const handleShade = () => {
    const topModal = modalEntries.slice(-1)[0]
    if (topModal.userDismiss) {
      internalClose(modalEntries.slice(-1)[0])
    }
  }

  const handleKey = (event : React.KeyboardEvent) : void => {
    const topModal = modalEntries.slice(-1)[0]
    if (event.key === ESC_KEY && topModal.userDismiss) {
      internalClose(topModal)
    }
  }

  const internalClose = (entry: ModalEntry) : void => {
    entry.resolver()
    removeModal(entry)
  }
  
  return <ModalContext.Provider value={contextValue}>
    <React.Fragment>
      <div ref={appContainer}>{children}</div>
      {modalEntries.length > 0 && <div className={configuration.modalContainerClass} onKeyDown={handleKey}>
        {modalEntries.map((modalEntry, i) => (
          <Modal
            key={`modal-${i}`}
            className={configuration.modalClass}
            label={modalEntry.label}
            role={modalEntry.role}
          >{modalEntry.modal}</Modal>
        ))}
        <div className={configuration.modalShadeClass} onClick={handleShade} />
      </div>}
    </React.Fragment>
  </ModalContext.Provider>
}
