import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

export const Portal = ({ children, element = document.getElementById('app') ?? document.body }: PortalProps) =>
  createPortal(children, element);
