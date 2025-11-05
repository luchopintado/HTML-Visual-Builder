import { CodeIcon, HeadingIcon, TextIcon, ButtonIcon, ListIcon } from './components/Icons';
import type { AvailableComponent } from './types';

export const ItemTypes = {
  ELEMENT: 'element',
};

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
