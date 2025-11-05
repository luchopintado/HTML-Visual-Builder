import type { AvailableComponent } from './types';

export const ItemTypes = {
  ELEMENT: 'element',
};

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const TextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);

const ButtonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
  </svg>
);

const HeadingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-4-16v16M8 4h8M4 20h16" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

export const ClearAllIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
  </svg>
);

export const AVAILABLE_COMPONENTS: AvailableComponent[] = [
  {
    tag: 'div',
    name: 'Contenedor',
    icon: <CodeIcon />,
    defaultClasses: 'p-4 bg-slate-700 border border-slate-600 rounded-lg min-h-[50px]',
  },
  {
    tag: 'div',
    name: 'Flex Horizontal',
    icon: <CodeIcon />,
    defaultClasses: 'flex gap-4 p-4 bg-slate-700 border border-slate-600 rounded-lg min-h-[50px]',
  },
  {
    tag: 'div',
    name: 'Flex Vertical',
    icon: <CodeIcon />,
    defaultClasses: 'flex flex-col gap-4 p-4 bg-slate-700 border border-slate-600 rounded-lg min-h-[50px]',
  },
  {
    tag: 'h1',
    name: 'Encabezado 1',
    icon: <HeadingIcon />,
    defaultClasses: 'text-4xl font-bold text-white',
    defaultContent: 'Encabezado Principal',
  },
  {
    tag: 'p',
    name: 'Párrafo',
    icon: <TextIcon />,
    defaultClasses: 'text-base text-slate-300',
    defaultContent: 'Este es un párrafo de ejemplo. Puedes editar este texto.',
  },
  {
    tag: 'button',
    name: 'Botón',
    icon: <ButtonIcon />,
    defaultClasses: 'px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold',
    defaultContent: 'Click aquí',
  },
  {
    tag: 'ul',
    name: 'Lista',
    icon: <ListIcon />,
    defaultClasses: 'list-disc list-inside p-4 bg-slate-700 border border-slate-600 rounded-lg min-h-[50px] space-y-2',
  },
  {
    tag: 'li',
    name: 'Item de Lista',
    icon: <ListIcon />,
    defaultClasses: 'text-slate-300',
    defaultContent: 'Ítem de la lista',
  },
];
