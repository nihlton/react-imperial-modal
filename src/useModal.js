import { useRef, useState, useEffect, useContext } from 'react'
import ModalContext from './ModalContext'

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => { ref.current = value }, [value])
  
  return ref.current
}

export const useModal = () => {
  const [ localModalEntries, setLocalModalEntries ] = useState([])
  const prevEntries = usePrevious(localModalEntries) || []
  
  const context = useContext(ModalContext);
  
  useEffect(() => {
    const addedModals = localModalEntries.filter(modalEntry => !prevEntries.includes(modalEntry))
    const removedModals = prevEntries.filter(modalEntry => !localModalEntries.includes(modalEntry))
  
    addedModals.forEach(modalEntry => { context.addModal(modalEntry) })
    removedModals.forEach(modalEntry => { context.removeModal(modalEntry) })
    
  }, [ localModalEntries ])
  
  const open = (modal, label = '', role = 'dialog') => {
    let resolver
    const modalPromise = new Promise((resolve) => { resolver = resolve })
    const modalEntry = {modal, resolver, label, role}
    setLocalModalEntries(currentModalEntries => [...currentModalEntries, modalEntry ])
    
    return modalPromise
  }
  
  const close = (modal, result) => {
    setLocalModalEntries(currentModalEntries => {
      const thisEntry = currentModalEntries.find(entry => entry.modal === modal)
      const newModalEntries = [...currentModalEntries]
      newModalEntries.splice(newModalEntries.indexOf(thisEntry), 1)
      thisEntry.resolver(result)
      return newModalEntries
    })
  }
  
  return [ open, close ]
}
