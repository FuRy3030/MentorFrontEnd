import { useFormContext } from "react-hook-form";
import { EuiFormRow, EuiSuperSelectOption } from '@elastic/eui';
import clsx from "clsx";
import dynamic from "next/dynamic";
import { ReactElement } from "react";
import GetNestedProperties from "../../../helpers/universal/GetNestedProperties";

interface MySelectFieldProps<T> {
    Label: string;
    Name: string;
    Options: EuiSuperSelectOption<T>[];
    OnChange?: () => void;
    HelpText?: string;
    Placeholder?: string;
    ClassName?: string;
    ClassNameRow?: string;
    FullWidth?: boolean;
    IsValueNumber?: boolean;
    Prepend?: ReactElement | ReactElement [];
    Append?: ReactElement | ReactElement [];
};

function MySelectField<T extends string>(Props: MySelectFieldProps<T>) {
    const { watch, setValue, formState: { errors }, trigger } = useFormContext();
    const EuiSuperSelect: any = dynamic(() => import('@elastic/eui').then(module => module.EuiSuperSelect), 
        {ssr: true});

    return (
        <EuiFormRow label={Props.Label} helpText={Props.HelpText} fullWidth={Props.FullWidth}
            isInvalid={!!GetNestedProperties(errors, Props.Name)} 
            error={GetNestedProperties(errors, Props.Name)?.message?.toString()} className={Props.ClassNameRow}
        >
            <EuiSuperSelect
                options={Props.Options}
                valueOfSelected={(Props.IsValueNumber && watch(Props.Name)) ? 
                    (watch(Props.Name)).toString() : watch(Props.Name)}
                onChange={(Value: T) => {
                    if (Props.IsValueNumber) setValue(Props.Name, parseInt(Value));
                    else setValue(Props.Name, Value);
                    Props.OnChange && Props.OnChange();
                    trigger(Props.Name);
                }}
                placeholder={Props.Placeholder}
                className={clsx('StandardFont', Props.ClassName)}
                fullWidth={Props.FullWidth}
                isInvalid={!!GetNestedProperties(errors, Props.Name)}
                prepend={Props.Prepend}
                append={Props.Append}
                itemLayoutAlign="center"
                hasDividers
            />
        </EuiFormRow>
    );
};

export default MySelectField;