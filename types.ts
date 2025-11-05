import React from 'react';

export interface ElementNode {
  id: string;
  // Fix: Use React.JSX namespace for JSX types.
  tag: keyof React.JSX.IntrinsicElements;
  classes: string;
  content?: string;
  children: ElementNode[];
}

export interface AvailableComponent {
  // Fix: Use React.JSX namespace for JSX types.
  tag: keyof React.JSX.IntrinsicElements;
  name: string;
  // Fix: Use React.JSX namespace for JSX types.
  icon: React.JSX.Element;
  defaultClasses: string;
  defaultContent?: string;
}

export type ActiveTab = 'gui' | 'code';

export type DragItem = AvailableComponent | ElementNode;