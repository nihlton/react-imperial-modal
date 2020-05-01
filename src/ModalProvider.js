import React, { useState } from 'react'
import ModalContext from './ModalContext'
import Modal from './Modal'

const defaultConfig = {
  bodyOpenClass: 'modal-open',
  modalShadeClass: 'modal-shade',
  modalContainerClass: 'modals',
  modalClass: 'modal'
}

export const ModalProvider = ({ children, config }) => {
  const [ modals, setModals ] = useState([])
  const configuration = {...defaultConfig, config}
  
  const addModal = modal => setModals(openModals => [...openModals, modal])
  const removeModal = modal => setModals(openModals => {
    const newModals = [...openModals]
    newModals.splice(newModals.indexOf(modal), 1)
    return newModals
  })
  
  return <ModalContext.Provider value={{ addModal, removeModal }}>
    <React.Fragment>
      {children}
      {modals.length > 0 && <div className={configuration.modalContainerClass} >
        {modals.map((modal, i) => <Modal key={`modal-${i}`} className={configuration.modalClass}>{modal}</Modal>)}
        <div className={configuration.modalShadeClass} onClick={() => removeModal(modals.slice(0, -1))} />
      </div>}
    </React.Fragment>
  </ModalContext.Provider>
}
