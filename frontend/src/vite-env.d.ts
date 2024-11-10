/// <reference types="vite/client" />

/*
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
*/

/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent, defineEmits } from 'vue'
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
    >
  export default component
  export { defineEmits }
}

interface ImportMeta {
  env: {
    VITE_API_HOST: string
  }
}

declare module '*.vue';
declare module '*.ts';
declare module '*';
