import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react'
import ModalContext from './ModalContext'
import Modal from './Modal'

const defaultConfig = {
  bodyOpenClass: 'modal-open',
  modalShadeClass: 'modal-shade',
  modalContainerClass: 'modals',
  modalClass: 'modal'
}

const previouslyFocusedElements = []
const ESC_KEY = 'Escape'

export const ModalProvider = ({ children, config = {}, appElement = () => {} }) => {
  const [ modalEntries, setModalEntries ] = useState([])
  const configuration = {...defaultConfig, config}
  const appContainer = useRef()
  
  const modalSetup = () => {
    // showing first modal
    const ariaTarget = appElement() || appContainer?.current
    document.documentElement.style.overflow = 'hidden'
    document.body.classList.add(configuration.bodyOpenClass)
    ariaTarget.setAttribute('aria-hidden', 'true');
  }
  
  const modalTakeDown = () => {
    // removing last modal
    const ariaTarget = appElement() || appContainer?.current
    document.documentElement.style.overflow = ''
    document?.body?.classList.remove(configuration.bodyOpenClass)
    ariaTarget.removeAttribute('aria-hidden');
  }
  
  const addModal = useCallback((modalEntry) => {
    // remember where focus was
    previouslyFocusedElements.push(document.activeElement)
    
    if (modalEntries.length === 0) {
      modalSetup()
    }
    
    if (modalEntries.includes(modalEntry)) {
      console.warn('tried to open a modal that was already opened')
    } else {
      setModalEntries(openModals => [...openModals, modalEntry ])
    }
  }, [modalEntries])
  
  const removeModal = useCallback((modalEntry) => {
    // set focus back
    const previouslyFocusedElement = previouslyFocusedElements.pop()
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
  const handleKey = e => {
    if (e.key === ESC_KEY) {
      internalClose(modalEntries.slice(-1)[0])
    }
  }
  const internalClose = (entry) => {
    entry.resolver()
    removeModal(entry)
  }
  
  return <ModalContext.Provider value={contextValue}>
    <React.Fragment>
      <div ref={appContainer}>
        {children}
      </div>
      {modalEntries.length > 0 && <div
        className={configuration.modalContainerClass}
        onKeyDown={handleKey}
      >
        {modalEntries.map((modalEntry, i) => (
          <Modal
            key={`modal-${i}`}
            className={configuration.modalClass}
            label={modalEntry.label}
            role={modalEntry.role}
          >{modalEntry.modal}</Modal>
        ))}
        <div className={configuration.modalShadeClass} onClick={() => internalClose(modalEntries.slice(-1)[0])} />
      </div>}
    </React.Fragment>
  </ModalContext.Provider>
}
