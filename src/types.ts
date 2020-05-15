import {ReactChildren, ReactElement} from 'react'

export type ModalEntry = {
  modal: ReactElement,
  resolver: () => Promise<any>,
  label?: string,
  role?: string
}

export type ModalProviderConfig = {
  bodyOpenClass?: string
  modalShadeClass?: string
  modalContainerClass?: string
  modalClass?: string
}

export type ModalProviderProps = {
  children?: ReactChildren
  config?: ModalProviderConfig
  appElement?: () => HTMLElement | void
}
