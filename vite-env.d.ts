/// <reference types="vite/client" />

// Extensões de módulo para arquivos CSS
// Isso é necessário para o TypeScript entender as importações de módulos CSS
// e os estilos globais do Tailwind CSS
declare module '*.css' {
  const content: string;
  export default content;
}

// Extensões para arquivos de imagem
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// Tipos globais para o projeto
declare namespace JSX {
  interface IntrinsicElements {
    // Adicione aqui quaisquer elementos personalizados ou sobrescritas de tipos
  }
}

// Interface para variáveis de ambiente do Vite
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // Adicione outras variáveis de ambiente aqui
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
