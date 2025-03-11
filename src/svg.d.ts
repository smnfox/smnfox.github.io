declare module '*.svg' {
  import type { SVGAttributes, DefineComponent } from 'vue';

  const content: DefineComponent<SVGAttributes>;
  export default content;
}

declare module '*.svg?skipsvgo' {
  import type { SVGAttributes, DefineComponent } from 'vue';

  const content: DefineComponent<SVGAttributes>;
  export default content;
}
