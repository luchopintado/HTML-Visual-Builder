import React from 'react';

export interface ElementNode {
  id: string;
  tag: keyof JSX.IntrinsicElements;
  classes: string;
  content?: string;
  children: ElementNode[];
}

export interface AvailableComponent {
  tag: keyof JSX.IntrinsicElements;
  name: string;
  icon: JSX.Element;
  defaultClasses: string;
  defaultContent?: string;
}

export type DragItem = AvailableComponent | ElementNode;