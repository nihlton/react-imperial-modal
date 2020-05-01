import React, { useState, useCallback, useMemo, useEffect } from 'react'
import ModalContext from './ModalContext'
import Modal from './Modal'

const defaultConfig = {
  bodyOpenClass: 'modal-open',
  modalShadeClass: 'modal-shade',
  modalContainerClass: 'modals',
  modalClass: 'modal'
}

export const ModalProvider = ({ children, config }) => {
  const [ modalEntries, setModalEntries ] = useState([])
  const configuration = {...defaultConfig, config}
  
  useEffect(() => {
    console.log('provider updated', modalEntries)
    
  }, [ modalEntries ])
  
  const addModal = useCallback((modalEntry) => {
    if (modalEntries.includes(modalEntry)) {
      console.warn('tried to open a modal that was already opened')
    } else {
      setModalEntries(openModals => [...openModals, modalEntry ])
    }
  }, [modalEntries])
  
  const removeModal = useCallback((modalEntry) => {
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
  
  const internalClose = (entry) => {
    entry.resolver()
    removeModal(entry)
  }
  
  return <ModalContext.Provider value={contextValue}>
    <React.Fragment>
      {children}
      {modalEntries.length > 0 && <div className={configuration.modalContainerClass} >
        {modalEntries.map((modalEntry, i) => (
          <Modal key={`modal-${i}`} className={configuration.modalClass}>{modalEntry.modal}</Modal>
        ))}
        <div className={configuration.modalShadeClass} onClick={() => internalClose(modalEntries.slice(-1)[0])} />
      </div>}
    </React.Fragment>
  </ModalContext.Provider>
}
