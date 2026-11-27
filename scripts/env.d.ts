// What a consumer's bundler (Vite) provides, for this package's own check.
declare module '*.module.css' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
