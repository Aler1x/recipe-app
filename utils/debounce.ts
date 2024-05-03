export function debounce(func: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function(...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, delay);
  };
}
