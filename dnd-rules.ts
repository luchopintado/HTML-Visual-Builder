import React from 'react';

// A mapping of parent tags to an array of allowed child tags.
// `null` means the element cannot have any children.
// 'BODY' is a special key for the root-level drop area.
// Fix: Use React.JSX namespace for JSX types.
const HIERARCHY_RULES: Record<string, (keyof React.JSX.IntrinsicElements)[] | null> = {
  'body': ['div', 'p', 'h1', 'button', 'ul'], // Root level elements
  'div': ['div', 'p', 'h1', 'button', 'ul'],
  'ul': ['li'],
  'li': ['p', 'div'], // A list item can contain text or other divs
  'p': null,
  'h1': null,
  'button': null,
};

/**
 * Checks if a child element can be dropped into a parent element.
 * @param parentTag The tag of the potential parent element.
 * @param childTag The tag of the element being dragged.
 * @returns `true` if the drop is allowed, `false` otherwise.
 */
export const canDropElement = (parentTag: string, childTag: string): boolean => {
  const allowedChildren = HIERARCHY_RULES[parentTag as keyof typeof HIERARCHY_RULES];
  
  if (allowedChildren === undefined) {
    return false; // If parent tag is not in rules, deny by default
  }

  if (allowedChildren === null) {
    return false; // Parent accepts no children
  }
  
  // Fix: Use React.JSX namespace for JSX types.
  return allowedChildren.includes(childTag as keyof React.JSX.IntrinsicElements);
};