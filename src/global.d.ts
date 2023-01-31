declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const clasNames: IClassNames;
  export = clasNames;
}