export default function ToCamelCase<T>(CurrentObject: T, ExcludedKeys: (keyof T)[] = []): Partial<T> {
    const Result: Partial<T> = {};
    
    for (const Key in CurrentObject) {
        if (Object.prototype.hasOwnProperty.call(CurrentObject, Key) && !ExcludedKeys.includes(Key)) {
            const Value = CurrentObject[Key];
            const CamelCaseKey = Key.charAt(0).toLowerCase() + Key.slice(1);

            if (Array.isArray(Value)) {
                Result[CamelCaseKey as keyof T] = ToCamelCaseArray(Value, ExcludedKeys);
            } else if (typeof Value === 'object' && Value !== null) {
                // Recursively process nested objects
                Result[CamelCaseKey as keyof T] = ToCamelCase(Value as T, ExcludedKeys) as T[Extract<keyof T, string>];
            } else {
                Result[CamelCaseKey as keyof T] = Value;
            } 
        }
    }
    
    return Result;
};

export const ToCamelCaseArray = <T>(CurrentArray: any, ExcludedKeys: (keyof T)[] = []) => {
    for (let i = 0; i < CurrentArray.length; i++) {
        if (Array.isArray(CurrentArray[i])) {
            ToCamelCaseArray(CurrentArray[i], ExcludedKeys);
        } else if (typeof CurrentArray[i] === 'object' && CurrentArray[i] !== null) {
            CurrentArray[i] = ToCamelCase(CurrentArray[i] as T, ExcludedKeys) as T[Extract<keyof T, string>];
        }
    }

    return CurrentArray;
}