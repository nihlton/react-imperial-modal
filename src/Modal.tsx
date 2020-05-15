import * as React from 'react'
import {ReactChildren, ReactElement} from "react";
const { useRef, useEffect } = React

const focusableSelector = [
  'a[href]:not([tabindex=\'-1\'])',
  'area[href]:not([tabindex=\'-1\'])',
  'input:not([disabled]):not([tabindex=\'-1\'])',
  'select:not([disabled]):not([tabindex=\'-1\'])',
  'textarea:not([disabled]):not([tabindex=\'-1\'])',
  'button:not([disabled]):not([tabindex=\'-1\'])',
  'iframe:not([tabindex=\'-1\'])',
  '[tabindex]:not([tabindex=\'-1\'])',
  '[contentEditable=true]:not([tabindex=\'-1\'])'
].join(', ')

type ModalProps = {
  className?: string,
  children?: ReactChildren,
  label?: string,
  role?: string,
}

const Modal = function (props : ModalProps): ReactElement {
  const { className, children, label, role } = props
  const modalRef = useRef<HTMLDivElement>()
  
  useEffect(() => {
    handleTabBoundary([0, 1])
  }, [ modalRef ])
  
  const handleTabBoundary = (indexes : number[]) : void => {
    const focusableElements = Array.from(modalRef?.current?.querySelectorAll<HTMLElement>(focusableSelector)) || []
    const element = focusableElements.slice(...indexes)[0]
    
    if (element) { element.focus() }
  }
  
  return <React.Fragment>
    <div tabIndex={0} onFocus={() => handleTabBoundary([-1])}/>
    <div
      role={role}
      aria-label={label}
      ref={modalRef}
      className={className}>{children}</div>
    <div tabIndex={0} onFocus={() => handleTabBoundary([0, 1])}/>
  </React.Fragment>
}

export default Modal
