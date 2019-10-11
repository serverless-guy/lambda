/**
 * Use the second parameter as value if first parameter is null or undefined
 * @param nullableValue
 * @param defaultValue
 * @return
 */
export function defaultsTo<T>(nullableValue: T, defaultValue?: T): T {
  if (!!nullableValue) {
    return nullableValue;
  }

  return defaultValue as T;
}
