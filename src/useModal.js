import { useContext, useCallback } from 'react'
import ModalContext from './ModalContext'

export const useModal = () => {
  const context = useContext(ModalContext);
  
  return useCallback(() => {
    let resolver
    let thisModal
  
    const modalPromise = new Promise((resolve) => { resolver = resolve })
    
    const open = (modal) => {
      if (!thisModal) {
        thisModal = modal
        context.addModal(modal)
        return modalPromise
      } else {
        console.warn(`tried to open a modal that was already opened`)
      }
    }
  
    const close = (result) => {
      if (thisModal) {
        context.removeModal(context)
        return resolver(result)
      } else {
        console.warn(`tried to close a modal that hasn't opened`)
      }
    }
    return [ open, close ]
  }, [])
}
