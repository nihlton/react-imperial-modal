import React, { useRef, useEffect } from 'react'

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

const tabBoundaryStyle = {

}

const Modal = function ({ className, children, label, role }) {
  const modalRef = useRef()
  
  useEffect(() => {
    handleTabBoundary([0, 1])
  }, [ modalRef ])
  
  const handleTabBoundary = (indexes) => {
    const focusableElements = [ ...(modalRef?.current?.querySelectorAll(focusableSelector) || [] )]
    const element = focusableElements.slice(...indexes)[0]
    
    if (element) { element.focus() }
  }
  
  return <React.Fragment>
    <div tabIndex={0} style={tabBoundaryStyle} onFocus={() => handleTabBoundary([-1])}/>
    <div
      role={role}
      aria-label={label}
      ref={modalRef}
      className={className}>{children}</div>
    <div tabIndex={0} style={tabBoundaryStyle} onFocus={() => handleTabBoundary([0, 1])}/>
  </React.Fragment>
}

export default Modal
