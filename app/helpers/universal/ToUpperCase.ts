export default function ToUpperCase<T>(CurrentObject: T, ExcludedKeys: (keyof T)[] = []): Partial<T> {
    const Result: Partial<T> = {};
  
    for (const Key in CurrentObject) {
      if (Object.prototype.hasOwnProperty.call(CurrentObject, Key) && !ExcludedKeys.includes(Key)) {
        const CamelCaseKey = Key.charAt(0).toUpperCase() + Key.slice(1);
        Result[CamelCaseKey as keyof T] = CurrentObject[Key];
      }
    }
  
    return Result;
}