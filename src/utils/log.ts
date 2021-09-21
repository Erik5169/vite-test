const projectName = import.meta.env.VITE_GLOB_APP_TITLE;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function warn(message: string) {
  console.warn(`[${projectName} warn]:${message}`);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`);
}
