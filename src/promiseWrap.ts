export function promiseWrap(func: any, ...funcArgs: any[]): Promise<any> {
  return new Promise(<T>(resolve: Function, reject: Function): Promise<T> => {
    return func(...funcArgs, resolve).catch(reject);
  });
}
