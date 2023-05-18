import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

/**
 * @deprecated
 */
export const Portal = ({ children, element = document.body }: PortalProps) => createPortal(children, element);
