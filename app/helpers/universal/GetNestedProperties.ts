export default function GetNestedProperties(Object: object, PropertyPath: string) {
    const Properties = PropertyPath.split('.');
    let Value: any = Object;
    
    for (const Property of Properties) {       
        if (Value && !isNaN(parseInt(Property))) {
            Value = Value[parseInt(Property)];
        } else if (Value && Property in Value) {
            Value = Value[Property];
        } else {
            Value = undefined;
            break;
        }
    }

    return Value;
}