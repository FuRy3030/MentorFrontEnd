export default function ToCamelCase<T>(CurrentObject: T, ExcludedKeys: (keyof T)[] = []): Partial<T> {
    const Result: Partial<T> = {};
    
    for (const Key in CurrentObject) {
        if (Object.prototype.hasOwnProperty.call(CurrentObject, Key) && !ExcludedKeys.includes(Key)) {
            const CamelCaseKey = Key.charAt(0).toLowerCase() + Key.slice(1);
            Result[CamelCaseKey as keyof T] = CurrentObject[Key];
        }
    }
    
    return Result;
}